import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventosService, getUploadUrl } from '../../services/api';
import { Calendar, MapPin, Clock, Users, Search } from 'lucide-react';

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadEventos();
  }, []);

  const loadEventos = async () => {
    try {
      setLoading(true);
      const response = await eventosService.getAll();
      setEventos(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEventos = eventos.filter((evento) =>
    evento.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evento.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Eventos</h1>
          <p className="text-xl text-gray-600">
            Participe dos nossos eventos e networking
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredEventos.length} {filteredEventos.length === 1 ? 'evento encontrado' : 'eventos encontrados'}
          </p>
        </div>

        {/* Eventos Grid */}
        {filteredEventos.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-xl text-gray-600">Nenhum evento encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEventos.map((evento) => (
              <Link
                key={evento.id}
                to={`/eventos/${evento.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 duration-300 overflow-hidden"
              >
                {/* Image */}
                {evento.imagemUrl ? (
                  <img
                    src={getUploadUrl(evento.imagemUrl)}
                    alt={evento.titulo}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                    <Calendar className="text-white" size={64} />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {evento.titulo}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {evento.descricao}
                  </p>

                  {/* Info */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{formatDate(evento.data)}</span>
                    </div>
                    {evento.hora && (
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{formatTime(evento.hora)}</span>
                      </div>
                    )}
                    {evento.local && (
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span className="line-clamp-1">{evento.local}</span>
                      </div>
                    )}
                    {evento.vagas && (
                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span>{evento.vagas} vagas disponíveis</span>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="text-primary-600 font-semibold hover:text-primary-700">
                      Ver detalhes →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Eventos;
