import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Lightbulb,
  Target,
  Scale,
  MapPin,
  Mail,
  Phone,
  Instagram,
  Facebook,
  MessageCircle,
  ChevronDown,
  Zap,
  Building2,
  HardHat,
  Factory
} from 'lucide-react';

const COLORS = {
  primary: '#004AAD',
  primaryLight: '#3385FF',
  primaryDark: '#002B67',
  secondary: '#FFD700',
  secondaryDark: '#E6C200',
};

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Altura do header fixo
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      // Scroll suave e lento customizado
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = 1500; // 1.5 segundos (mais lento)
      let start = null;

      const animation = (currentTime) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function para movimento suave (ease-in-out)
        const ease = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Fixo */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src="http://eletronsmateriaiseletricos.com.br/wp-content/uploads/2018/11/logo-eletrons.png"
                alt="Grupo Elétrons"
                className="h-16 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-lg font-medium transition-colors"
                style={{ color: COLORS.primary }}
                onMouseEnter={(e) => e.target.style.color = COLORS.secondary}
                onMouseLeave={(e) => e.target.style.color = COLORS.primary}
              >
                Início
              </Link>
              <Link
                to="/vagas"
                className="text-lg font-medium transition-colors"
                style={{ color: COLORS.primary }}
                onMouseEnter={(e) => e.target.style.color = COLORS.secondary}
                onMouseLeave={(e) => e.target.style.color = COLORS.primary}
              >
                Vagas
              </Link>
              <Link
                to="/eventos"
                className="text-lg font-medium transition-colors"
                style={{ color: COLORS.primary }}
                onMouseEnter={(e) => e.target.style.color = COLORS.secondary}
                onMouseLeave={(e) => e.target.style.color = COLORS.primary}
              >
                Eventos
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              style={{ color: COLORS.primary }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <ChevronDown
                className={`transform transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`}
                size={24}
              />
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-gray-200">
              <Link
                to="/"
                className="block py-3 px-4 text-lg font-medium transition-colors"
                style={{ color: COLORS.primary }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Início
              </Link>
              <Link
                to="/vagas"
                className="block py-3 px-4 text-lg font-medium transition-colors"
                style={{ color: COLORS.primary }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Vagas
              </Link>
              <Link
                to="/eventos"
                className="block py-3 px-4 text-lg font-medium transition-colors"
                style={{ color: COLORS.primary }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Eventos
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Espaçador para o header fixo */}
      <div className="h-20"></div>

      {/* Hero Section */}
      <section
        className="relative text-white py-20 md:py-32 overflow-hidden"
        style={{ background: `linear-gradient(to bottom right, ${COLORS.primary}, #003A8A, ${COLORS.primaryDark})` }}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl"
            style={{ backgroundColor: COLORS.secondary }}
          ></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Bem-vindo ao
              <span className="block mt-2" style={{ color: COLORS.secondary }}>Grupo Elétrons</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Entregamos diariamente soluções inteligentes para viver melhor
            </p>
            <button
              onClick={() => scrollToSection('historia')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl"
              style={{
                backgroundColor: COLORS.secondary,
                color: COLORS.primary
              }}
            >
              Conheça Nossa História
              <ChevronDown size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Seção Nossa História */}
      <section id="historia" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-4xl md:text-5xl font-bold text-center mb-12"
              style={{ color: COLORS.primary }}
            >
              NOSSA HISTÓRIA
            </h2>

            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p className="animate-fade-in">
                O grupo Elétrons iniciou na garagem de casa, se transformando em uma loja de materiais elétricos em <span className="font-bold" style={{ color: COLORS.primary }}>1992</span>.
                Com o objetivo de facilitar e fornecer produtos e serviços de qualidade, visando o acesso aos benefícios e soluções da energia elétrica.
              </p>

              <p className="animate-fade-in">
                Desde então, temos trabalhado com dedicação para sermos reconhecidos na região <span className="font-bold" style={{ color: COLORS.primary }}>Sul de Santa Catarina</span> como uma empresa de produtos e serviços qualificados e certificados no setor elétrico.
              </p>

              <p className="animate-fade-in">
                A nossa trajetória é marcada pelo <span className="font-bold" style={{ color: COLORS.primary }}>crescimento constante</span>, incluindo os demais setores de construção, manutenção e projeto de redes de distribuição (Montagens elétricas), juntamente com a fabricação de Kit Postes.
              </p>

              <div
                className="p-8 rounded-2xl my-8"
                style={{
                  background: `linear-gradient(to right, #E6F0FF, #FFFCE0)`,
                  borderLeft: `4px solid ${COLORS.primary}`
                }}
              >
                <p className="text-xl font-semibold mb-4" style={{ color: COLORS.primary }}>
                  Nossa Evolução
                </p>
                <p>
                  A nossa empresa cresceu ao longo dos anos e, com cada etapa, buscamos sempre inovar e melhorar.
                </p>
              </div>

              <p className="animate-fade-in">
                Conseguimos consolidar nossa presença no seguimento e hoje somos <span className="font-bold" style={{ color: COLORS.primary }}>referência no ramo</span>.
                Com uma equipe comprometida, conseguimos realizar feitos importantes.
              </p>

              <p className="text-xl font-semibold text-center mt-8 animate-fade-in" style={{ color: COLORS.primary }}>
                Estamos orgulhosos da nossa história e ansiosos para as novas conquistas que vamos alcançar juntos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Missão, Visão e Valores */}
      <section id="missao" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-16"
            style={{ color: COLORS.primary }}
          >
            MISSÃO, VISÃO E VALORES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Missão */}
            <div
              className="bg-white p-8 rounded-2xl shadow-lg transition-all transform hover:-translate-y-2 duration-300"
              style={{ borderTop: `4px solid ${COLORS.secondary}` }}
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto"
                style={{ background: `linear-gradient(to bottom right, ${COLORS.secondary}, ${COLORS.secondaryDark})` }}
              >
                <Lightbulb className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4" style={{ color: COLORS.primary }}>
                Nossa Missão
              </h3>
              <p className="text-gray-700 text-center leading-relaxed text-lg">
                Entregamos diariamente soluções inteligentes para viver melhor.
              </p>
            </div>

            {/* Visão */}
            <div
              className="bg-white p-8 rounded-2xl shadow-lg transition-all transform hover:-translate-y-2 duration-300"
              style={{ borderTop: `4px solid ${COLORS.primary}` }}
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto"
                style={{ background: `linear-gradient(to bottom right, ${COLORS.primary}, ${COLORS.primaryDark})` }}
              >
                <Target className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4" style={{ color: COLORS.primary }}>
                Nossa Visão
              </h3>
              <p className="text-gray-700 text-center leading-relaxed text-lg">
                Chegar em 2025 com uma equipe altamente qualificada entregando um aumento de 50% no faturamento.
              </p>
            </div>

            {/* Valores */}
            <div
              className="bg-white p-8 rounded-2xl shadow-lg transition-all transform hover:-translate-y-2 duration-300"
              style={{ borderTop: `4px solid ${COLORS.secondary}` }}
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto"
                style={{ background: `linear-gradient(to bottom right, ${COLORS.secondary}, ${COLORS.secondaryDark})` }}
              >
                <Scale className="text-white" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4" style={{ color: COLORS.primary }}>
                Nossos Valores
              </h3>
              <div className="text-gray-700 text-center leading-relaxed text-lg space-y-2">
                <p className="font-semibold" style={{ color: COLORS.primary }}>Energia</p>
                <p className="font-semibold" style={{ color: COLORS.primary }}>Comprometimento</p>
                <p className="font-semibold" style={{ color: COLORS.primary }}>Ética</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Estrutura Organizacional */}
      <section id="estrutura" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-8"
            style={{ color: COLORS.primary }}
          >
            ESTRUTURA ORGANIZACIONAL
          </h2>
          <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-16">
            O Grupo Elétrons é formado por divisões especializadas que garantem eficiência, inovação e qualidade em cada etapa de nossos serviços.
          </p>

          <div className="max-w-4xl mx-auto">
            {/* Grupo Principal */}
            <div
              className="text-white p-8 rounded-2xl shadow-xl mb-8 text-center"
              style={{ background: `linear-gradient(to bottom right, ${COLORS.primary}, ${COLORS.primaryDark})` }}
            >
              <Building2 className="mx-auto mb-4" size={48} />
              <h3 className="text-3xl font-bold">GRUPO ELÉTRONS</h3>
            </div>

            {/* Divisões */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Loja de Materiais */}
              <div
                className="p-6 rounded-xl shadow-lg transition-all transform hover:-translate-y-2"
                style={{
                  background: `linear-gradient(to bottom right, ${COLORS.secondary}, ${COLORS.secondaryDark})`,
                  color: COLORS.primary
                }}
              >
                <Zap className="mx-auto mb-4" size={36} />
                <h4 className="text-xl font-bold text-center">
                  Loja de Materiais Elétricos
                </h4>
              </div>

              {/* Montagem Elétrica */}
              <div
                className="p-6 rounded-xl shadow-lg transition-all transform hover:-translate-y-2"
                style={{
                  background: `linear-gradient(to bottom right, ${COLORS.secondary}, ${COLORS.secondaryDark})`,
                  color: COLORS.primary
                }}
              >
                <HardHat className="mx-auto mb-4" size={36} />
                <h4 className="text-xl font-bold text-center">
                  Montagem Elétrica
                  <span className="block text-sm mt-2">(Divisão Celesc)</span>
                </h4>
              </div>

              {/* Fabricação */}
              <div
                className="p-6 rounded-xl shadow-lg transition-all transform hover:-translate-y-2"
                style={{
                  background: `linear-gradient(to bottom right, ${COLORS.secondary}, ${COLORS.secondaryDark})`,
                  color: COLORS.primary
                }}
              >
                <Factory className="mx-auto mb-4" size={36} />
                <h4 className="text-xl font-bold text-center">
                  Fabricação de Poste Homologado Celesc
                </h4>
              </div>
            </div>

            {/* Linhas de conexão (decorativas) */}
            <div className="hidden md:block relative -mt-48 mb-48 pointer-events-none">
              <svg className="w-full h-48" viewBox="0 0 800 200">
                <line x1="400" y1="0" x2="133" y2="200" stroke={COLORS.secondary} strokeWidth="3" strokeDasharray="5,5" />
                <line x1="400" y1="0" x2="400" y2="200" stroke={COLORS.secondary} strokeWidth="3" strokeDasharray="5,5" />
                <line x1="400" y1="0" x2="667" y2="200" stroke={COLORS.secondary} strokeWidth="3" strokeDasharray="5,5" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Trabalhe Conosco */}
      <section
        id="trabalhe"
        className="py-20 text-white"
        style={{ background: `linear-gradient(to bottom right, ${COLORS.primary}, #003A8A, ${COLORS.primaryDark})` }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              VENHA TRABALHAR COM A GENTE
            </h2>
            <p className="text-xl mb-10 leading-relaxed">
              Faça parte da nossa equipe e cresça conosco!
              <br />
              Clique abaixo para ver as oportunidades abertas.
            </p>
            <Link
              to="/vagas"
              className="inline-flex items-center gap-2 px-10 py-5 rounded-xl font-bold text-xl transition-all transform hover:scale-105 shadow-2xl"
              style={{
                backgroundColor: COLORS.secondary,
                color: COLORS.primary
              }}
            >
              Trabalhe Conosco
              <Zap size={24} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contato"
        className="text-white pt-16 pb-8"
        style={{ backgroundColor: '#000E22' }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Coluna 1 - Localização */}
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.secondary }}>Localização</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin style={{ color: COLORS.secondary }} className="flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-300">
                    R. Prudente de Morais, 638<br />
                    Centro<br />
                    Tubarão - SC<br />
                    CEP: 88701-400
                  </p>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors"
                  style={{ color: COLORS.secondary }}
                >
                  <MapPin size={18} />
                  Ver no Google Maps
                </a>
              </div>
            </div>

            {/* Coluna 2 - Redes Sociais */}
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.secondary }}>Redes Sociais</h3>
              <div className="space-y-3">
                <a
                  href="https://www.instagram.com/eletronsoficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-gray-100 transition-colors"
                >
                  <Instagram size={24} />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.facebook.com/eletronsoficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-gray-100 transition-colors"
                >
                  <Facebook size={24} />
                  <span>Facebook</span>
                </a>
                <a
                  href="https://wa.me/5548999866454"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-300 hover:text-gray-100 transition-colors"
                >
                  <MessageCircle size={24} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Coluna 3 - Canal de Denúncia */}
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.secondary }}>Ouvidoria</h3>
              <p className="text-gray-300 mb-4">
                Canal confidencial para denúncias e sugestões
              </p>
              <a
                href="https://docs.google.com/forms"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-lg font-semibold transition-colors"
                style={{
                  backgroundColor: COLORS.secondary,
                  color: COLORS.primary
                }}
              >
                Acessar Canal de Denúncia
              </a>
            </div>

            {/* Coluna 4 - Contato */}
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.secondary }}>Contato</h3>
              <div className="space-y-3">
                <a
                  href="mailto:contato@grupoeletrons.com.br"
                  className="flex items-center gap-3 text-gray-300 hover:text-gray-100 transition-colors"
                >
                  <Mail size={20} />
                  <span>contato@grupoeletrons.com.br</span>
                </a>
                <a
                  href="tel:+554830000000"
                  className="flex items-center gap-3 text-gray-300 hover:text-gray-100 transition-colors"
                >
                  <Phone size={20} />
                  <span>(48) 3000-0000</span>
                </a>
              </div>
            </div>
          </div>

          {/* Rodapé inferior */}
          <div
            className="pt-8 text-center"
            style={{ borderTop: '1px solid #002B67' }}
          >
            <p className="text-gray-400">
              © 2025 Grupo Elétrons. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
