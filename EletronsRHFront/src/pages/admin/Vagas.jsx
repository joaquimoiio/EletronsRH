import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { vagasService, areasService } from '../../services/api';
import { Plus, Edit2, Trash2, X, Save, Briefcase, MapPin, DollarSign, Users } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import Toast from '../../components/common/Toast';
import ConfirmDialog from '../../components/common/ConfirmDialog';

const Vagas = () => {
  const navigate = useNavigate();
  const { toasts, showToast, removeToast } = useToast();
  const [vagas, setVagas] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVaga, setEditingVaga] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, vagaId: null });
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    requisitos: '',
    beneficios: '',
    salario: '',
    localizacao: '',
    areaId: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [vagasResponse, areasResponse] = await Promise.all([
        vagasService.getAll(),
        areasService.getAll()
      ]);
      setVagas(vagasResponse.data || []);
      setAreas(areasResponse.data || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      showToast('Erro ao carregar dados', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);


  const getAreaNome = (areaId) => {
    const area = areas.find(a => a.id === areaId);
    return area ? area.nome : '-';
  };

  const handleOpenModal = (vaga = null) => {
    if (vaga) {
      setEditingVaga(vaga);
      setFormData({
        titulo: vaga.titulo,
        descricao: vaga.descricao || '',
        requisitos: vaga.requisitos || '',
        beneficios: vaga.beneficios || '',
        salario: vaga.salario || '',
        localizacao: vaga.localizacao || '',
        areaId: vaga.area?.id || ''
      });
    } else {
      setEditingVaga(null);
      setFormData({
        titulo: '',
        descricao: '',
        requisitos: '',
        beneficios: '',
        salario: '',
        localizacao: '',
        areaId: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingVaga(null);
    setFormData({
      titulo: '',
      descricao: '',
      requisitos: '',
      beneficios: '',
      salario: '',
      localizacao: '',
      areaId: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Converter areaId para número
      const dataToSubmit = {
        ...formData,
        areaId: formData.areaId ? parseInt(formData.areaId) : null
      };

      if (editingVaga) {
        await vagasService.update(editingVaga.id, dataToSubmit);
        showToast('Vaga atualizada com sucesso!', 'success');
      } else {
        await vagasService.create(dataToSubmit);
        showToast('Vaga criada com sucesso!', 'success');
      }
      handleCloseModal();
      loadData();
    } catch (error) {
      console.error('Erro ao salvar vaga:', error);
      showToast('Erro ao salvar vaga', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (vagaId) => {
    setDeleteConfirm({ isOpen: true, vagaId });
  };

  const confirmDelete = async () => {
    try {
      await vagasService.delete(deleteConfirm.vagaId);
      showToast('Vaga excluída com sucesso!', 'success');
      loadData();
    } catch (error) {
      console.error('Erro ao excluir vaga:', error);
      showToast('Erro ao excluir vaga', 'error');
    }
  };

  const formatSalario = (salario) => {
    if (!salario) return '-';
    // Se já estiver formatado, retornar como está
    if (salario.includes('R$')) return salario;
    // Tentar formatar como número
    const numero = parseFloat(salario);
    if (!isNaN(numero)) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(numero);
    }
    return salario;
  };

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vagas</h1>
          <p className="text-gray-600 mt-2">Gerencie as vagas de emprego disponíveis</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Plus size={20} />
          Nova Vaga
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total de Vagas</p>
              <p className="text-3xl font-bold mt-1">{vagas.length}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Briefcase size={28} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Áreas Ativas</p>
              <p className="text-3xl font-bold mt-1">{areas.length}</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <MapPin size={28} />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Publicadas Hoje</p>
              <p className="text-3xl font-bold mt-1">0</p>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <DollarSign size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Título</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Área</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Localização</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Salário</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vagas.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <Briefcase size={48} className="mb-4 opacity-30" />
                      <p className="text-lg font-medium">Nenhuma vaga cadastrada</p>
                      <p className="text-sm mt-1">Clique em "Nova Vaga" para começar</p>
                    </div>
                  </td>
                </tr>
              ) : (
                vagas.map((vaga) => (
                  <tr key={vaga.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary-100 p-2 rounded-lg">
                          <Briefcase size={20} className="text-primary-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{vaga.titulo}</p>
                          {vaga.descricao && (
                            <p className="text-sm text-gray-500 line-clamp-1">{vaga.descricao}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {vaga.area?.nome || getAreaNome(vaga.area?.id)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={16} className="text-gray-400" />
                        <span>{vaga.localizacao || '-'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-green-600">
                        {formatSalario(vaga.salario)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/admin/vagas/${vaga.id}/candidatos`)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Ver Candidatos"
                        >
                          <Users size={18} />
                        </button>
                        <button
                          onClick={() => handleOpenModal(vaga)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(vaga.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Excluir"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Briefcase size={24} />
                </div>
                <h2 className="text-2xl font-bold">
                  {editingVaga ? 'Editar Vaga' : 'Nova Vaga'}
                </h2>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Título e Área */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="titulo" className="block text-sm font-semibold text-gray-700 mb-2">
                    Título da Vaga *
                  </label>
                  <input
                    type="text"
                    id="titulo"
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Ex: Desenvolvedor Full Stack"
                  />
                </div>

                <div>
                  <label htmlFor="areaId" className="block text-sm font-semibold text-gray-700 mb-2">
                    Área *
                  </label>
                  <select
                    id="areaId"
                    value={formData.areaId}
                    onChange={(e) => setFormData({ ...formData, areaId: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
                  >
                    <option value="">Selecione uma área</option>
                    {areas.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Localização e Salário */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="localizacao" className="block text-sm font-semibold text-gray-700 mb-2">
                    Localização *
                  </label>
                  <input
                    type="text"
                    id="localizacao"
                    value={formData.localizacao}
                    onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Ex: São Paulo - SP"
                  />
                </div>

                <div>
                  <label htmlFor="salario" className="block text-sm font-semibold text-gray-700 mb-2">
                    Salário
                  </label>
                  <input
                    type="text"
                    id="salario"
                    value={formData.salario}
                    onChange={(e) => setFormData({ ...formData, salario: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Ex: R$ 8.000,00 ou A combinar"
                  />
                </div>
              </div>

              {/* Descrição */}
              <div>
                <label htmlFor="descricao" className="block text-sm font-semibold text-gray-700 mb-2">
                  Descrição da Vaga *
                </label>
                <textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  required
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                  placeholder="Descreva as responsabilidades e o que a pessoa fará no dia a dia..."
                />
              </div>

              {/* Requisitos */}
              <div>
                <label htmlFor="requisitos" className="block text-sm font-semibold text-gray-700 mb-2">
                  Requisitos *
                </label>
                <textarea
                  id="requisitos"
                  value={formData.requisitos}
                  onChange={(e) => setFormData({ ...formData, requisitos: e.target.value })}
                  required
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                  placeholder="Liste os requisitos necessários (experiência, habilidades, formação...)&#10;&#10;Ex:&#10;- Experiência com React e Node.js&#10;- Conhecimento em bancos de dados SQL&#10;- Inglês intermediário"
                />
              </div>

              {/* Benefícios */}
              <div>
                <label htmlFor="beneficios" className="block text-sm font-semibold text-gray-700 mb-2">
                  Benefícios
                </label>
                <textarea
                  id="beneficios"
                  value={formData.beneficios}
                  onChange={(e) => setFormData({ ...formData, beneficios: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                  placeholder="Liste os benefícios oferecidos...&#10;&#10;Ex:&#10;- Vale alimentação&#10;- Plano de saúde&#10;- Home office&#10;- Auxílio educação"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      Salvar Vaga
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, vagaId: null })}
        onConfirm={confirmDelete}
        title="Excluir Vaga"
        message="Tem certeza que deseja excluir esta vaga? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        type="danger"
      />
    </div>
  );
};

export default Vagas;
