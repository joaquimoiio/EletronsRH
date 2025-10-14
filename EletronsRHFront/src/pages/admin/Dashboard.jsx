import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { vagasService, eventosService, areasService } from '../../services/api';
import { Briefcase, Calendar, Tags, TrendingUp, Users, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    vagas: 0,
    eventos: 0,
    areas: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentVagas, setRecentVagas] = useState([]);
  const [recentEventos, setRecentEventos] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [vagasRes, eventosRes, areasRes] = await Promise.all([
        vagasService.getAll(),
        eventosService.getAll(),
        areasService.getAll(),
      ]);

      const vagas = vagasRes.data || [];
      const eventos = eventosRes.data || [];
      const areas = areasRes.data || [];

      setStats({
        vagas: vagas.length,
        eventos: eventos.length,
        areas: areas.length,
      });

      // Get recent items (last 5)
      setRecentVagas(vagas.slice(0, 5));
      setRecentEventos(eventos.slice(0, 5));
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Vagas',
      value: stats.vagas,
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600',
      link: '/admin/vagas',
    },
    {
      title: 'Eventos',
      value: stats.eventos,
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      link: '/admin/eventos',
    },
    {
      title: 'Áreas',
      value: stats.areas,
      icon: Tags,
      color: 'from-green-500 to-green-600',
      link: '/admin/areas',
    },
  ];

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
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Bem-vindo ao painel administrativo</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              to={stat.link}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 duration-300 overflow-hidden"
            >
              <div className={`bg-gradient-to-br ${stat.color} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-medium">{stat.title}</p>
                    <p className="text-4xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <Icon size={48} className="opacity-80" />
                </div>
              </div>
              <div className="p-4 bg-gray-50 flex items-center justify-between">
                <span className="text-sm text-gray-600">Ver todos</span>
                <ArrowRight size={16} className="text-gray-400" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Items Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Vagas */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Briefcase size={24} />
              Vagas Recentes
            </h2>
          </div>
          <div className="p-4">
            {recentVagas.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Nenhuma vaga cadastrada</p>
            ) : (
              <div className="space-y-3">
                {recentVagas.map((vaga) => (
                  <div
                    key={vaga.id}
                    className="p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900">{vaga.titulo}</h3>
                    <p className="text-sm text-gray-600 line-clamp-1">{vaga.descricao}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(vaga.dataCriacao).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <Link
              to="/admin/vagas"
              className="block mt-4 text-center text-primary-600 hover:text-primary-700 font-medium"
            >
              Ver todas as vagas →
            </Link>
          </div>
        </div>

        {/* Recent Eventos */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 text-white">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Calendar size={24} />
              Eventos Recentes
            </h2>
          </div>
          <div className="p-4">
            {recentEventos.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Nenhum evento cadastrado</p>
            ) : (
              <div className="space-y-3">
                {recentEventos.map((evento) => (
                  <div
                    key={evento.id}
                    className="p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900">{evento.titulo}</h3>
                    <p className="text-sm text-gray-600 line-clamp-1">{evento.descricao}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(evento.data).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <Link
              to="/admin/eventos"
              className="block mt-4 text-center text-purple-600 hover:text-purple-700 font-medium"
            >
              Ver todos os eventos →
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/vagas"
            className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-400 transition-colors text-center"
          >
            <Briefcase className="mx-auto text-blue-600 mb-2" size={32} />
            <span className="font-semibold text-gray-900">Nova Vaga</span>
          </Link>
          <Link
            to="/admin/eventos"
            className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 hover:border-purple-400 transition-colors text-center"
          >
            <Calendar className="mx-auto text-purple-600 mb-2" size={32} />
            <span className="font-semibold text-gray-900">Novo Evento</span>
          </Link>
          <Link
            to="/admin/areas"
            className="p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 hover:border-green-400 transition-colors text-center"
          >
            <Tags className="mx-auto text-green-600 mb-2" size={32} />
            <span className="font-semibold text-gray-900">Nova Área</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
