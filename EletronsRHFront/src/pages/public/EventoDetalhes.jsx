import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventosService, getUploadUrl } from '../../services/api';
import { ArrowLeft, Calendar, MapPin, Clock, Users } from 'lucide-react';

const EventoDetalhes = () => {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvento();
  }, [id]);

  const loadEvento = async () => {
    try {
      setLoading(true);
      const response = await eventosService.getById(id);
      setEvento(response.data);
    } catch (error) {
      console.error('Erro ao carregar evento:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    return timeString.substring(0, 5);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!evento) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-xl text-gray-600 mb-4">Evento não encontrado</p>
            <Link to="/eventos" className="text-primary-600 hover:text-primary-700 font-semibold">
              Voltar para eventos
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
          to="/eventos"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-6"
        >
          <ArrowLeft size={20} />
          Voltar para eventos
        </Link>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Image */}
          {evento.imagemUrl ? (
            <img
              src={getUploadUrl(evento.imagemUrl)}
              alt={evento.titulo}
              className="w-full h-64 md:h-96 object-cover"
            />
          ) : (
            <div className="w-full h-64 md:h-96 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <Calendar className="text-white" size={96} />
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {evento.titulo}
            </h1>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-primary-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="text-primary-600" size={24} />
                  <div>
                    <p className="text-sm text-gray-600">Data</p>
                    <p className="font-semibold text-gray-900">{formatDate(evento.data)}</p>
                  </div>
                </div>
              </div>

              {evento.hora && (
                <div className="bg-primary-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="text-primary-600" size={24} />
                    <div>
                      <p className="text-sm text-gray-600">Horário</p>
                      <p className="font-semibold text-gray-900">{formatTime(evento.hora)}</p>
                    </div>
                  </div>
                </div>
              )}

              {evento.local && (
                <div className="bg-primary-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="text-primary-600" size={24} />
                    <div>
                      <p className="text-sm text-gray-600">Local</p>
                      <p className="font-semibold text-gray-900">{evento.local}</p>
                    </div>
                  </div>
                </div>
              )}

              {evento.vagas && (
                <div className="bg-primary-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="text-primary-600" size={24} />
                    <div>
                      <p className="text-sm text-gray-600">Vagas Disponíveis</p>
                      <p className="font-semibold text-gray-900">{evento.vagas} vagas</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre o Evento</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {evento.descricao}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <button className="w-full bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition-colors">
                Inscrever-se no Evento
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventoDetalhes;
