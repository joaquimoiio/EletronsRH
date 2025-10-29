import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { vagasService } from '../../services/api';
import { ArrowLeft, Briefcase, MapPin, DollarSign, Calendar } from 'lucide-react';
import CandidaturaModal from '../../components/forms/CandidaturaModal';

const VagaDetalhes = () => {
  const { id } = useParams();
  const [vaga, setVaga] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCandidaturaModalOpen, setIsCandidaturaModalOpen] = useState(false);

  useEffect(() => {
    loadVaga();
  }, [id]);

  const loadVaga = async () => {
    try {
      setLoading(true);
      const response = await vagasService.getById(id);
      setVaga(response.data);
    } catch (error) {
      console.error('Erro ao carregar vaga:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!vaga) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-xl text-gray-600 mb-4">Vaga não encontrada</p>
            <Link to="/vagas" className="text-primary-600 hover:text-primary-700 font-semibold">
              Voltar para vagas
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link
          to="/vagas"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-6"
        >
          <ArrowLeft size={20} />
          Voltar para vagas
        </Link>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{vaga.titulo}</h1>
            <div className="flex flex-wrap gap-4 text-primary-100">
              <div className="flex items-center gap-2">
                <Briefcase size={18} />
                <span>{vaga.area?.nome || 'Não especificado'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>{vaga.localizacao || 'Não especificado'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>Publicado em {new Date(vaga.dataCriacao).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Salary */}
            {vaga.salario && (
              <div className="mb-8 p-6 bg-primary-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <DollarSign className="text-primary-600" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Salário</p>
                    <p className="text-2xl font-bold text-primary-700">R$ {vaga.salario}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Descrição da Vaga</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {vaga.descricao}
              </p>
            </div>

            {/* Requirements */}
            {vaga.requisitos && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Requisitos</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {vaga.requisitos}
                </p>
              </div>
            )}

            {/* Benefits */}
            {vaga.beneficios && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefícios</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {vaga.beneficios}
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsCandidaturaModalOpen(true)}
                  className="flex-1 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors"
                >
                  Candidatar-se
                </button>
                <button className="flex-1 bg-gray-200 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-300 transition-colors">
                  Salvar Vaga
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Candidatura */}
      <CandidaturaModal
        isOpen={isCandidaturaModalOpen}
        onClose={() => setIsCandidaturaModalOpen(false)}
        vagaId={id}
        vagaTitulo={vaga?.titulo}
      />
    </div>
  );
};

export default VagaDetalhes;
