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
  Factory,
  ShoppingCart
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
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState(null);

  const divisoesInfo = {
    loja: {
      title: "Loja de Materiais Elétricos",
      description: "TÉCNICOS é uma loja completa em materiais elétricos. Trabalhamos com as melhores marcas do segmento e oferecemos sempre facilidades de negociação tanto para o dia a dia da construção civil em geral. Do básico ao acabamento."
    },
    montagem: {
      title: "Montagem Elétrica (Divisão Celesc)",
      description: "Atuamos no ramo de instalações elétricas com grande experiência no mercado. Serviços com qualidade e segurança, profissionais devidamente treinados."
    },
    fabricacao: {
      title: "Fabricação de Poste Homologado Celesc",
      description: "Nossa fábrica de kit postes conta com um rigoroso padrão de qualidade onde todo produto é acompanhado de materiais homologados pela concessionária. O kit poste é formado pelo poste, rabicho, caixa para abrigo dos medidores (DPS), haste de aterramento e conectores.\n\nNosso produto é acompanhado por profissionais da fabricação à entrega.\n\nSOMOS HOMOLOGADOS: nossa fábrica de kit postes é homologada pela CEMIG e demais cooperativas (CERGAL, CERPA, LCEG, AMMA, COOPERVAL, ANACE, CEGERO, CERMOFUL)."
    }
  };

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
      {/* Botão WhatsApp Flutuante */}
      <a
        href="https://wa.me/5548999866454"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
        style={{
          backgroundColor: '#25D366',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)'
        }}
        aria-label="Contato via WhatsApp"
      >
        <svg
          viewBox="0 0 32 32"
          className="w-8 h-8"
          fill="white"
        >
          <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-5.247 1.409 1.417-5.267-0.316-0.518c-1.351-2.217-2.067-4.773-2.067-7.396 0-7.69 6.26-13.95 13.95-13.95s13.95 6.26 13.95 13.95-6.26 13.95-13.95 13.95zM21.305 19.26c-0.346-0.174-2.049-1.007-2.366-1.123-0.316-0.116-0.547-0.174-0.776 0.174s-0.893 1.123-1.094 1.347c-0.201 0.231-0.402 0.26-0.748 0.087-0.346-0.174-1.461-0.539-2.785-1.722-1.031-0.922-1.727-2.059-1.929-2.406-0.201-0.346-0.022-0.533 0.152-0.705 0.156-0.156 0.346-0.402 0.518-0.603 0.174-0.201 0.231-0.346 0.346-0.576 0.116-0.231 0.058-0.433-0.028-0.603s-0.776-1.87-1.063-2.565c-0.28-0.672-0.56-0.58-0.776-0.591-0.201-0.010-0.431-0.012-0.661-0.012s-0.603 0.087-0.919 0.433c-0.316 0.346-1.206 1.179-1.206 2.873s1.235 3.333 1.406 3.561c0.174 0.231 2.427 3.722 5.886 5.212 0.821 0.354 1.462 0.566 1.962 0.724 0.825 0.262 1.577 0.225 2.168 0.137 0.661-0.099 2.049-0.835 2.335-1.642 0.288-0.807 0.288-1.501 0.201-1.642-0.086-0.14-0.316-0.231-0.662-0.405z"/>
        </svg>
      </a>

      {/* Header Fixo */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50" style={{ fontFamily: "'Montserrat', 'Helvetica Neue', Arial, sans-serif" }}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src="http://eletronsmateriaiseletricos.com.br/wp-content/uploads/2018/11/logo-eletrons.png"
                alt="Grupo Elétrons"
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {/* Nossa História - Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setOpenDropdown('historia')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors tracking-wide uppercase">
                  Nossa História
                  <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                </button>
                {openDropdown === 'historia' && (
                  <div className="absolute top-full left-0 mt-0 bg-white shadow-lg min-w-[240px] py-1 border-t-2 border-gray-800">
                    <button
                      onClick={() => scrollToSection('estrutura')}
                      className="w-full text-left block px-5 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      Estrutura
                    </button>
                    <button
                      onClick={() => scrollToSection('missao')}
                      className="w-full text-left block px-5 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      Missão, Visão e Valores
                    </button>
                  </div>
                )}
              </div>

              {/* Serviços */}
              <button
                onClick={() => scrollToSection('estrutura')}
                className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors tracking-wide uppercase"
              >
                Serviços
              </button>

              {/* Trabalhe Conosco */}
              <Link
                to="/vagas"
                className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors tracking-wide uppercase"
              >
                Trabalhe Conosco
              </Link>

              {/* Blog */}
              <Link
                to="/eventos"
                className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors tracking-wide uppercase"
              >
                Blog
              </Link>

              {/* Contato - Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setOpenDropdown('contato')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors tracking-wide uppercase">
                  Contato
                  <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                </button>
                {openDropdown === 'contato' && (
                  <div className="absolute top-full right-0 mt-0 bg-white shadow-lg min-w-[240px] py-1 border-t-2 border-gray-800">
                    <button
                      onClick={() => scrollToSection('contato')}
                      className="w-full text-left flex items-center gap-2 px-5 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      <ShoppingCart size={16} />
                      Solicite um Orçamento
                    </button>
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
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
            <nav className="lg:hidden py-4 border-t border-gray-200">
              {/* Nossa História */}
              <div>
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'historia-mobile' ? null : 'historia-mobile')}
                  className="w-full flex items-center justify-between py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 uppercase"
                >
                  Nossa História
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${openDropdown === 'historia-mobile' ? 'rotate-180' : ''}`}
                  />
                </button>
                {openDropdown === 'historia-mobile' && (
                  <div className="bg-gray-50">
                    <button
                      onClick={() => { scrollToSection('estrutura'); setMobileMenuOpen(false); }}
                      className="w-full text-left block py-2 px-8 text-sm text-gray-600 hover:text-gray-900"
                    >
                      Estrutura
                    </button>
                    <button
                      onClick={() => { scrollToSection('missao'); setMobileMenuOpen(false); }}
                      className="w-full text-left block py-2 px-8 text-sm text-gray-600 hover:text-gray-900"
                    >
                      Missão, Visão e Valores
                    </button>
                  </div>
                )}
              </div>

              {/* Serviços */}
              <button
                onClick={() => { scrollToSection('estrutura'); setMobileMenuOpen(false); }}
                className="w-full text-left block py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 uppercase"
              >
                Serviços
              </button>

              {/* Trabalhe Conosco */}
              <Link
                to="/vagas"
                className="block py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 uppercase"
                onClick={() => setMobileMenuOpen(false)}
              >
                Trabalhe Conosco
              </Link>

              {/* Blog */}
              <Link
                to="/eventos"
                className="block py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 uppercase"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>

              {/* Contato */}
              <div>
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'contato-mobile' ? null : 'contato-mobile')}
                  className="w-full flex items-center justify-between py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 uppercase"
                >
                  Contato
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${openDropdown === 'contato-mobile' ? 'rotate-180' : ''}`}
                  />
                </button>
                {openDropdown === 'contato-mobile' && (
                  <div className="bg-gray-50">
                    <button
                      onClick={() => { scrollToSection('contato'); setMobileMenuOpen(false); }}
                      className="w-full text-left flex items-center gap-2 py-2 px-8 text-sm text-gray-600 hover:text-gray-900"
                    >
                      <ShoppingCart size={16} />
                      Solicite um Orçamento
                    </button>
                  </div>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Espaçador para o header fixo */}
      <div className="h-20"></div>

      {/* Hero Section - Imagem com Botão */}
      <section className="relative w-full bg-white">
        <img
          src="/images/Agrupar2.png"
          alt="Grupo Elétrons"
          className="w-full h-auto object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />

        {/* Botão no canto inferior esquerdo */}
        <div className="absolute bottom-16 left-16 z-10">
          <button
            onClick={() => scrollToSection('historia')}
            className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all transform hover:scale-105 shadow-xl"
            style={{
              backgroundColor: COLORS.secondary,
              color: COLORS.primary
            }}
          >
            Conheça Nossa História
            <ChevronDown size={20} />
          </button>
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

            <div className="space-y-8 text-gray-700 text-lg leading-relaxed">
              <p className="animate-fade-in text-justify">
                O grupo Elétrons surgiu em <span className="font-bold" style={{ color: COLORS.primary }}>1992</span>, na cidade de <span className="font-bold" style={{ color: COLORS.primary }}>Tubarão, Santa Catarina</span>, em uma garagem, com o objetivo de facilitar e fornecer produtos e serviços de qualidade, visando o acesso aos benefícios e soluções de energia elétrica. Desde então, transformou-se em referência no Sul de Santa Catarina pela qualidade, confiança e excelência técnica em produtos e serviços do setor elétrico.
              </p>

              {/* Divisor */}
              <div className="border-t border-gray-200 my-8"></div>

              {/* Evolução */}
              <div className="mt-10">
                <h3 className="text-3xl font-bold mb-6 animate-fade-in" style={{ color: COLORS.primary }}>
                  Evolução
                </h3>
                <div className="space-y-4">
                  <p className="animate-fade-in text-justify">
                    O crescimento veio acompanhado de novos horizontes. Além da loja, atuamos também em construção, manutenção e projetos de redes de distribuição, além da fabricação de Kit Postes padrão Celesc e Cooperativa, unindo experiência e tecnologia em cada etapa do trabalho.
                  </p>
                  <p className="animate-fade-in text-justify italic" style={{ color: COLORS.primary }}>
                    Mais de três décadas depois, seguimos com o mesmo propósito que nos trouxe até aqui: entregar soluções elétricas seguras, eficientes e acessíveis, sempre com energia para evoluir.
                  </p>
                </div>
              </div>

              {/* Divisor */}
              <div className="border-t border-gray-200 my-8"></div>

              {/* Visão de futuro */}
              <div className="mt-10">
                <h3 className="text-3xl font-bold mb-6 animate-fade-in" style={{ color: COLORS.primary }}>
                  Visão de futuro
                </h3>
                <div className="space-y-4">
                  <p className="animate-fade-in text-justify">
                    O futuro da Elétrons é iluminado pela inovação. Estamos comprometidos em modernizar nossos processos, ampliar nossas estruturas e adotar práticas sustentáveis, sem abrir mão da essência que nos diferencia: o cuidado com as pessoas e o compromisso com a excelência.
                  </p>
                  <p className="animate-fade-in text-justify font-semibold text-xl italic" style={{ color: COLORS.primary }}>
                    Acreditamos que energia é muito mais do que eletricidade, é o que move o progresso e conecta pessoas, ideias e sonhos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Estrutura Organizacional */}
      <section id="estrutura" className="py-20 bg-white overflow-visible relative" style={{ zIndex: 10 }}>
        <div className="container mx-auto px-4 overflow-visible">
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-8"
            style={{ color: COLORS.primary }}
          >
            ESTRUTURA ORGANIZACIONAL
          </h2>
          <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto mb-16">
            O Grupo Elétrons é formado por divisões especializadas que garantem eficiência, inovação e qualidade em cada etapa de nossos serviços.
          </p>

          <div className="max-w-4xl mx-auto overflow-visible">
            {/* Grupo Principal */}
            <div
              className="text-white p-8 rounded-2xl shadow-xl mb-8 text-center"
              style={{ background: `linear-gradient(to bottom right, ${COLORS.primary}, ${COLORS.primaryDark})` }}
            >
              <Building2 className="mx-auto mb-4" size={48} />
              <h3 className="text-3xl font-bold">GRUPO ELÉTRONS</h3>
            </div>

            {/* Divisões */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 gap-y-8">
              {/* Loja de Materiais */}
              <div className="relative">
                <div
                  className="p-6 rounded-xl shadow-lg transition-all transform hover:-translate-y-2 cursor-pointer"
                  style={{
                    background: `linear-gradient(to bottom right, ${COLORS.secondary}, ${COLORS.secondaryDark})`,
                    color: COLORS.primary
                  }}
                  onMouseEnter={() => setActiveTooltip('loja')}
                  onMouseLeave={() => setActiveTooltip(null)}
                  onClick={() => setActiveTooltip(activeTooltip === 'loja' ? null : 'loja')}
                >
                  <Zap className="mx-auto mb-4" size={36} />
                  <h4 className="text-xl font-bold text-center">
                    Loja de Materiais Elétricos
                  </h4>
                </div>

                {/* Tooltip abaixo do card */}
                {activeTooltip === 'loja' && (
                  <div className="mt-4 md:absolute md:left-0 md:right-0 md:top-full md:mt-2" style={{ zIndex: 9999 }}>
                    <div
                      className="bg-white p-4 rounded-lg shadow-2xl border-2"
                      style={{
                        borderColor: COLORS.secondary
                      }}
                    >
                      <button
                        className="float-right text-gray-500 hover:text-gray-700 text-lg font-bold -mt-1 -mr-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveTooltip(null);
                        }}
                      >
                        ✕
                      </button>
                      <h5 className="font-bold text-sm mb-2 pr-6" style={{ color: COLORS.primary }}>
                        {divisoesInfo.loja.title}
                      </h5>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {divisoesInfo.loja.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Montagem Elétrica */}
              <div className="relative">
                <div
                  className="p-6 rounded-xl shadow-lg transition-all transform hover:-translate-y-2 cursor-pointer"
                  style={{
                    background: `linear-gradient(to bottom right, ${COLORS.secondary}, ${COLORS.secondaryDark})`,
                    color: COLORS.primary
                  }}
                  onMouseEnter={() => setActiveTooltip('montagem')}
                  onMouseLeave={() => setActiveTooltip(null)}
                  onClick={() => setActiveTooltip(activeTooltip === 'montagem' ? null : 'montagem')}
                >
                  <HardHat className="mx-auto mb-4" size={36} />
                  <h4 className="text-xl font-bold text-center">
                    Montagem Elétrica
                    <span className="block text-sm mt-2">(Divisão Celesc)</span>
                  </h4>
                </div>

                {/* Tooltip abaixo do card */}
                {activeTooltip === 'montagem' && (
                  <div className="mt-4 md:absolute md:left-0 md:right-0 md:top-full md:mt-2" style={{ zIndex: 9999 }}>
                    <div
                      className="bg-white p-4 rounded-lg shadow-2xl border-2"
                      style={{
                        borderColor: COLORS.secondary
                      }}
                    >
                      <button
                        className="float-right text-gray-500 hover:text-gray-700 text-lg font-bold -mt-1 -mr-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveTooltip(null);
                        }}
                      >
                        ✕
                      </button>
                      <h5 className="font-bold text-sm mb-2 pr-6" style={{ color: COLORS.primary }}>
                        {divisoesInfo.montagem.title}
                      </h5>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {divisoesInfo.montagem.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Fabricação */}
              <div className="relative">
                <div
                  className="p-6 rounded-xl shadow-lg transition-all transform hover:-translate-y-2 cursor-pointer"
                  style={{
                    background: `linear-gradient(to bottom right, ${COLORS.secondary}, ${COLORS.secondaryDark})`,
                    color: COLORS.primary
                  }}
                  onMouseEnter={() => setActiveTooltip('fabricacao')}
                  onMouseLeave={() => setActiveTooltip(null)}
                  onClick={() => setActiveTooltip(activeTooltip === 'fabricacao' ? null : 'fabricacao')}
                >
                  <Factory className="mx-auto mb-4" size={36} />
                  <h4 className="text-xl font-bold text-center">
                    Fabricação de Poste Homologado Celesc
                  </h4>
                </div>

                {/* Tooltip abaixo do card */}
                {activeTooltip === 'fabricacao' && (
                  <div className="mt-4 md:absolute md:left-0 md:right-0 md:top-full md:mt-2" style={{ zIndex: 9999 }}>
                    <div
                      className="bg-white p-4 rounded-lg shadow-2xl border-2"
                      style={{
                        borderColor: COLORS.secondary
                      }}
                    >
                      <button
                        className="float-right text-gray-500 hover:text-gray-700 text-lg font-bold -mt-1 -mr-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveTooltip(null);
                        }}
                      >
                        ✕
                      </button>
                      <h5 className="font-bold text-sm mb-2 pr-6" style={{ color: COLORS.primary }}>
                        {divisoesInfo.fabricacao.title}
                      </h5>
                      <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                        {divisoesInfo.fabricacao.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Missão, Visão e Valores */}
      <section id="missao" className="py-20 bg-gradient-to-b from-gray-50 to-white relative" style={{ zIndex: 1 }}>
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
                Chegar em 2027 com uma equipe altamente qualificada entregando um aumento de 50% no faturamento.
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

      {/* Seção Trabalhe Conosco */}
      <section
        id="trabalhe"
        className="relative py-20 text-white overflow-hidden"
        style={{ background: `linear-gradient(to bottom right, ${COLORS.primary}, #003A8A, ${COLORS.primaryDark})` }}
      >
        {/* Imagem de fundo com 50% de opacidade */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/IMG_7419.JPG)',
            opacity: 0.5
          }}
        ></div>

        <div className="container mx-auto px-4 text-center relative z-10">
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
        className="text-white pt-10 pb-6"
        style={{ backgroundColor: '#000E22' }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {/* Coluna 1 - Logo */}
            <div className="flex items-start justify-center lg:justify-start">
              <img
                src="http://eletronsmateriaiseletricos.com.br/wp-content/uploads/2018/11/logo-eletrons.png"
                alt="Grupo Elétrons"
                className="h-20 w-auto"
              />
            </div>

            {/* Coluna 2 - Localização */}
            <div>
              <h3 className="text-lg font-bold mb-2.5" style={{ color: COLORS.secondary }}>Localização</h3>
              <div className="space-y-1.5">
                <div className="flex items-start gap-2">
                  <MapPin style={{ color: COLORS.secondary }} className="flex-shrink-0 mt-1" size={18} />
                  <p className="text-gray-300 text-sm leading-relaxed">
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
                  className="inline-flex items-center gap-1 transition-colors text-sm"
                  style={{ color: COLORS.secondary }}
                >
                  <MapPin size={16} />
                  Ver no Google Maps
                </a>
              </div>
            </div>

            {/* Coluna 2 - Redes Sociais */}
            <div>
              <h3 className="text-lg font-bold mb-2.5" style={{ color: COLORS.secondary }}>Redes Sociais</h3>
              <div className="space-y-1.5">
                <a
                  href="https://www.instagram.com/eletronsoficial/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-gray-100 transition-colors"
                >
                  <Instagram size={20} />
                  <span className="text-sm">Instagram</span>
                </a>
                <a
                  href="https://www.facebook.com/eletronsoficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-300 hover:text-gray-100 transition-colors"
                >
                  <Facebook size={20} />
                  <span className="text-sm">Facebook</span>
                </a>
              </div>
            </div>

            {/* Coluna 3 - Canal de Denúncia */}
            <div>
              <h3 className="text-lg font-bold mb-2.5" style={{ color: COLORS.secondary }}>Ouvidoria</h3>
              <p className="text-gray-300 mb-2.5 text-sm leading-relaxed">
                Canal confidencial para<br />denúncias e sugestões
              </p>
              <a
                href="https://docs.google.com/forms"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
                style={{
                  backgroundColor: COLORS.secondary,
                  color: COLORS.primary
                }}
              >
                Acessar Canal
              </a>
            </div>

            {/* Coluna 4 - Contato */}
            <div>
              <h3 className="text-lg font-bold mb-2.5" style={{ color: COLORS.secondary }}>Contato</h3>
              <div className="space-y-1.5">
                <a
                  href="mailto:contato@eletronsmateriaiseletricos.com.br"
                  className="flex items-start gap-2 text-gray-300 hover:text-gray-100 transition-colors break-all"
                >
                  <Mail size={18} className="flex-shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">contato@eletronsmateriaiseletricos.com.br</span>
                </a>
                <a
                  href="tel:+554836265170"
                  className="flex items-center gap-2 text-gray-300 hover:text-gray-100 transition-colors"
                >
                  <Phone size={18} />
                  <span className="text-sm">(48) 3626-5170</span>
                </a>
              </div>
            </div>
          </div>

          {/* Rodapé inferior */}
          <div
            className="pt-5 text-center"
            style={{ borderTop: '1px solid #002B67' }}
          >
            <p className="text-gray-400 text-sm">
              © 2025 Grupo Elétrons. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
