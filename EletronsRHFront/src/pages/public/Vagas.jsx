import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { vagasService, areasService } from '../../services/api';
import { Briefcase, MapPin, DollarSign, Calendar, Search, Filter } from 'lucide-react';

const Vagas = () => {
  const [vagas, setVagas] = useState([]);
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [vagasRes, areasRes] = await Promise.all([
        vagasService.getAll(),
        areasService.getAll(),
      ]);
      setVagas(vagasRes.data || []);
      setAreas(areasRes.data || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredVagas = vagas.filter((vaga) => {
    const matchesSearch = vaga.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vaga.descricao?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArea = !selectedArea || vaga.area?.id?.toString() === selectedArea;
    return matchesSearch && matchesArea;
  });

  const getAreaName = (areaId) => {
    const area = areas.find((a) => a.id === areaId);
    return area?.nome || 'Não especificado';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Vagas Disponíveis</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encontre a oportunidade perfeita para você
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={20} />
              <input
                type="text"
                placeholder="Buscar por título ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              />
            </div>

            {/* Area Filter */}
            <div className="relative group">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors" size={20} />
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none transition-all"
              >
                <option value="">Todas as áreas</option>
                {areas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredVagas.length} {filteredVagas.length === 1 ? 'vaga encontrada' : 'vagas encontradas'}
          </p>
        </div>

        {/* Vagas List */}
        {filteredVagas.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
            <Briefcase className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-xl text-gray-600">Nenhuma vaga encontrada</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredVagas.map((vaga, index) => (
              <Link
                key={vaga.id}
                to={`/vagas/${vaga.id}`}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300 p-6 border border-gray-100 hover:border-primary-200 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors">
                      {vaga.titulo}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {vaga.descricao}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                        <Briefcase size={16} className="text-primary-600" />
                        <span>{getAreaName(vaga.area?.id)}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                        <MapPin size={16} className="text-primary-600" />
                        <span>{vaga.localizacao || 'Não especificado'}</span>
                      </div>
                      {vaga.salario && (
                        <div className="flex items-center gap-2 bg-primary-50 px-3 py-1.5 rounded-lg">
                          <DollarSign size={16} className="text-primary-600" />
                          <span className="font-semibold text-primary-700">R$ {vaga.salario}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                        <Calendar size={16} className="text-primary-600" />
                        <span>{new Date(vaga.dataCriacao).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <span className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-xl font-semibold text-sm group-hover:from-primary-700 group-hover:to-primary-800 transition-all shadow-md group-hover:shadow-lg">
                      Ver Detalhes
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
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

export default Vagas;
