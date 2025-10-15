import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { vagasService } from '../../services/api';
import axios from 'axios';
import {
  ArrowLeft,
  Users,
  Download,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Filter
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import Toast from '../../components/common/Toast';
import ConfirmDialog from '../../components/common/ConfirmDialog';

const API_BASE_URL = 'http://localhost:8080/api';

const Candidatos = () => {
  const { vagaId } = useParams();
  const navigate = useNavigate();
  const { toasts, showToast, removeToast } = useToast();
  const [vaga, setVaga] = useState(null);
  const [candidatos, setCandidatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
    confirmText: 'Confirmar',
    onConfirm: null
  });

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      // Carregar dados da vaga
      const vagaResponse = await vagasService.getById(vagaId);
      setVaga(vagaResponse.data);

      // Carregar candidatos
      let url = `${API_BASE_URL}/vagas/${vagaId}/candidatos`;
      const params = new URLSearchParams();

      if (statusFilter) {
        params.append('status', statusFilter);
      }
      if (searchTerm) {
        params.append('filtro', searchTerm);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const candidatosResponse = await axios.get(url);
      setCandidatos(candidatosResponse.data || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      showToast('Erro ao carregar dados', 'error');
    } finally {
      setLoading(false);
    }
  }, [vagaId, statusFilter, searchTerm, showToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleStatusChange = async (candidatoId, novoStatus, statusLabel) => {
    setConfirmDialog({
      isOpen: true,
      type: novoStatus === 'APROVADO' ? 'info' : 'warning',
      title: `${statusLabel} Candidato`,
      message: `Tem certeza que deseja ${statusLabel.toLowerCase()} este candidato?`,
      confirmText: statusLabel,
      onConfirm: async () => {
        try {
          await axios.patch(`${API_BASE_URL}/candidatos/${candidatoId}/status`, {
            status: novoStatus
          });
          showToast(`Candidato ${statusLabel.toLowerCase()} com sucesso!`, 'success');
          loadData();
        } catch (error) {
          console.error('Erro ao atualizar status:', error);
          showToast('Erro ao atualizar status', 'error');
        }
      }
    });
  };

  const handleChamarEntrevista = (candidatoId) => {
    setConfirmDialog({
      isOpen: true,
      type: 'info',
      title: 'Chamar para Entrevista',
      message: 'Deseja chamar este candidato para entrevista?',
      confirmText: 'Chamar',
      onConfirm: async () => {
        try {
          await axios.patch(`${API_BASE_URL}/candidatos/${candidatoId}/chamar`);
          showToast('Candidato chamado para entrevista!', 'success');
          loadData();
        } catch (error) {
          console.error('Erro ao chamar candidato:', error);
          showToast('Erro ao chamar candidato', 'error');
        }
      }
    });
  };

  const downloadCurriculo = (caminhoCurriculo) => {
    if (!caminhoCurriculo) {
      showToast('Currículo não disponível', 'warning');
      return;
    }
    window.open(`http://localhost:8080/uploads/${caminhoCurriculo}`, '_blank');
  };

  const getStatusBadge = (status) => {
    const badges = {
      INSCRITO: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Aguardando Análise', icon: Clock },
      CHAMADO: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Chamado p/ Entrevista', icon: Phone },
      APROVADO: { bg: 'bg-green-100', text: 'text-green-800', label: 'Aprovado', icon: CheckCircle }
    };

    const badge = badges[status] || badges.INSCRITO;
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${badge.bg} ${badge.text}`}>
        <Icon size={14} />
        {badge.label}
      </span>
    );
  };

  const filteredCandidatos = candidatos.filter(candidato =>
    candidato.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidato.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate('/admin/vagas')}
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-4"
        >
          <ArrowLeft size={20} />
          Voltar para Vagas
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{vaga?.titulo}</h1>
            <p className="text-gray-600 mt-2">Gerencie os candidatos desta vaga</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total</p>
              <p className="text-3xl font-bold mt-1">{candidatos.length}</p>
            </div>
            <Users size={28} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Chamados p/ Entrevista</p>
              <p className="text-3xl font-bold mt-1">
                {candidatos.filter(c => c.status === 'CHAMADO').length}
              </p>
            </div>
            <Phone size={28} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Aprovados</p>
              <p className="text-3xl font-bold mt-1">
                {candidatos.filter(c => c.status === 'APROVADO').length}
              </p>
            </div>
            <CheckCircle size={28} className="opacity-80" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Filter size={16} className="inline mr-2" />
              Filtrar por status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            >
              <option value="">Todos os status</option>
              <option value="INSCRITO">Aguardando Análise</option>
              <option value="CHAMADO">Chamados p/ Entrevista</option>
              <option value="APROVADO">Aprovados</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Buscar candidato
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nome ou e-mail..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Candidatos List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {filteredCandidatos.length === 0 ? (
          <div className="p-12 text-center">
            <Users size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600">Nenhum candidato encontrado</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredCandidatos.map((candidato) => (
              <div key={candidato.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-primary-100 p-3 rounded-full">
                        <Users size={24} className="text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{candidato.nome}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center gap-1">
                            <Mail size={14} />
                            <a href={`mailto:${candidato.email}`} className="hover:text-primary-600">
                              {candidato.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone size={14} />
                            <a href={`tel:${candidato.telefone}`} className="hover:text-primary-600">
                              {candidato.telefone}
                            </a>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            {new Date(candidato.dataInscricao).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      {getStatusBadge(candidato.status)}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => downloadCurriculo(candidato.caminhoCurriculo, candidato.nome)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                      disabled={!candidato.caminhoCurriculo}
                      title={!candidato.caminhoCurriculo ? 'Currículo não disponível' : 'Baixar currículo'}
                    >
                      <Download size={16} />
                      Ver Currículo
                    </button>

                    {candidato.status === 'INSCRITO' && (
                      <button
                        onClick={() => handleChamarEntrevista(candidato.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-semibold"
                      >
                        <Phone size={16} />
                        Chamar
                      </button>
                    )}

                    {candidato.status === 'CHAMADO' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(candidato.id, 'APROVADO', 'Aprovar')}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
                        >
                          <CheckCircle size={16} />
                          Aprovar
                        </button>
                        <button
                          onClick={() => handleStatusChange(candidato.id, 'INSCRITO', 'Rejeitar')}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
                        >
                          <XCircle size={16} />
                          Rejeitar
                        </button>
                      </>
                    )}

                    {candidato.status === 'APROVADO' && (
                      <div className="flex items-center justify-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
                        <CheckCircle size={16} className="text-green-600" />
                        <span className="text-sm text-green-700 font-semibold">Aprovado</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Toasts */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText={confirmDialog.confirmText}
        type={confirmDialog.type}
      />
    </div>
  );
};

export default Candidatos;
