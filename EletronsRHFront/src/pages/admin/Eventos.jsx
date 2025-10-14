import { useState, useEffect } from 'react';
import { eventosService, getUploadUrl } from '../../services/api';
import { Plus, Edit2, Trash2, X, Save, Calendar, Clock, MapPin, Users, Image as ImageIcon } from 'lucide-react';

const Eventos = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvento, setEditingEvento] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    data: '',
    hora: '',
    local: '',
    vagas: '',
    imagemUrl: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

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
      alert('Erro ao carregar eventos');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (evento = null) => {
    if (evento) {
      setEditingEvento(evento);
      setFormData({
        titulo: evento.titulo,
        descricao: evento.descricao || '',
        data: evento.data || '',
        hora: evento.hora || '',
        local: evento.local || '',
        vagas: evento.vagas || '',
        imagemUrl: evento.imagemUrl || ''
      });
      // Set preview if there's an existing image
      if (evento.imagemUrl) {
        setImagePreview(getUploadUrl(evento.imagemUrl));
      }
    } else {
      setEditingEvento(null);
      setFormData({
        titulo: '',
        descricao: '',
        data: '',
        hora: '',
        local: '',
        vagas: '',
        imagemUrl: ''
      });
      setImagePreview(null);
    }
    setImageFile(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEvento(null);
    setFormData({
      titulo: '',
      descricao: '',
      data: '',
      hora: '',
      local: '',
      vagas: '',
      imagemUrl: ''
    });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem');
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('O arquivo deve ter no máximo 5MB');
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Create FormData for multipart/form-data
      const formDataToSend = new FormData();
      formDataToSend.append('titulo', formData.titulo);
      formDataToSend.append('descricao', formData.descricao);
      formDataToSend.append('data', formData.data);
      formDataToSend.append('hora', formData.hora);
      formDataToSend.append('local', formData.local);
      formDataToSend.append('vagas', formData.vagas);

      // Add image file if selected
      if (imageFile) {
        formDataToSend.append('imagem', imageFile);
      }

      if (editingEvento) {
        await eventosService.update(editingEvento.id, formDataToSend);
        alert('Evento atualizado com sucesso!');
      } else {
        await eventosService.create(formDataToSend);
        alert('Evento criado com sucesso!');
      }
      handleCloseModal();
      loadEventos();
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
      alert('Erro ao salvar evento: ' + (error.response?.data?.message || error.message));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este evento?')) return;

    try {
      await eventosService.delete(id);
      alert('Evento excluído com sucesso!');
      loadEventos();
    } catch (error) {
      console.error('Erro ao excluir evento:', error);
      alert('Erro ao excluir evento');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
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
          <h1 className="text-3xl font-bold text-gray-900">Eventos</h1>
          <p className="text-gray-600 mt-2">Gerencie os eventos da empresa</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          <Plus size={20} />
          Novo Evento
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Imagem</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Título</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Data</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Hora</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Local</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Vagas</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {eventos.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    <Calendar size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-lg font-medium">Nenhum evento cadastrado</p>
                    <p className="text-sm text-gray-400 mt-1">Clique em "Novo Evento" para começar</p>
                  </td>
                </tr>
              ) : (
                eventos.map((evento) => (
                  <tr key={evento.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      {evento.imagemUrl ? (
                        <img
                          src={getUploadUrl(evento.imagemUrl)}
                          alt={evento.titulo}
                          className="w-16 h-16 object-cover rounded-lg shadow-sm"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <ImageIcon size={24} className="text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{evento.titulo}</div>
                      {evento.descricao && (
                        <div className="text-sm text-gray-500 mt-1 line-clamp-2">{evento.descricao}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar size={16} className="text-gray-400" />
                        {formatDate(evento.data)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock size={16} className="text-gray-400" />
                        {evento.hora || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin size={16} className="text-gray-400" />
                        <span className="line-clamp-1">{evento.local || '-'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-gray-400" />
                        <span className="font-medium text-gray-900">{evento.vagas || '0'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(evento)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(evento.id)}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full my-8">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white flex items-center justify-between rounded-t-xl">
              <h2 className="text-2xl font-bold">
                {editingEvento ? 'Editar Evento' : 'Novo Evento'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Título */}
              <div>
                <label htmlFor="titulo" className="block text-sm font-semibold text-gray-700 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  id="titulo"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Ex: Workshop de Desenvolvimento Pessoal"
                />
              </div>

              {/* Descrição */}
              <div>
                <label htmlFor="descricao" className="block text-sm font-semibold text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                  placeholder="Descreva o evento..."
                />
              </div>

              {/* Data e Hora */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="data" className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar size={16} className="inline mr-1" />
                    Data *
                  </label>
                  <input
                    type="date"
                    id="data"
                    value={formData.data}
                    onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="hora" className="block text-sm font-semibold text-gray-700 mb-2">
                    <Clock size={16} className="inline mr-1" />
                    Hora *
                  </label>
                  <input
                    type="time"
                    id="hora"
                    value={formData.hora}
                    onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Local */}
              <div>
                <label htmlFor="local" className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin size={16} className="inline mr-1" />
                  Local *
                </label>
                <input
                  type="text"
                  id="local"
                  value={formData.local}
                  onChange={(e) => setFormData({ ...formData, local: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Ex: Auditório Principal - Sala 101"
                />
              </div>

              {/* Vagas */}
              <div>
                <label htmlFor="vagas" className="block text-sm font-semibold text-gray-700 mb-2">
                  <Users size={16} className="inline mr-1" />
                  Número de Vagas *
                </label>
                <input
                  type="number"
                  id="vagas"
                  value={formData.vagas}
                  onChange={(e) => setFormData({ ...formData, vagas: e.target.value })}
                  required
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Ex: 50"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label htmlFor="imagem" className="block text-sm font-semibold text-gray-700 mb-2">
                  <ImageIcon size={16} className="inline mr-1" />
                  Imagem do Evento
                </label>
                <div className="space-y-3">
                  <input
                    type="file"
                    id="imagem"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                  />
                  <p className="text-xs text-gray-500">
                    Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: 5MB
                  </p>

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="relative mt-3">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg shadow-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                        title="Remover imagem"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
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
                  className="flex-1 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      Salvar Evento
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Eventos;
