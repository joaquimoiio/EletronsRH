import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const navLinks = [
    {
      label: 'NOSSA HISTÓRIA',
      dropdown: [
        { path: '#estrutura', label: 'Estrutura', scrollTo: 'estrutura' },
        { path: '#missao', label: 'Missão, Visão e Valores', scrollTo: 'missao' },
      ]
    },
    { path: '#estrutura', label: 'SERVIÇOS', scrollTo: 'estrutura' },
    { path: '/vagas', label: 'TRABALHE CONOSCO' },
    { path: '/eventos', label: 'BLOG' },
    {
      label: 'CONTATO',
      dropdown: [
        { path: '#contato', label: 'Solicite um Orçamento', scrollTo: 'contato' },
      ]
    },
  ];

  const isActive = (path) => location.pathname === path;

  const handleScrollOrNavigate = (item, e) => {
    if (item.scrollTo) {
      e.preventDefault();
      if (location.pathname !== '/') {
        window.location.href = '/#' + item.scrollTo;
      } else {
        const element = document.getElementById(item.scrollTo);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }
      setOpenDropdown(null);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="http://eletronsmateriaiseletricos.com.br/wp-content/uploads/2018/11/logo-eletrons.png"
              alt="Eletrons"
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => link.dropdown && setOpenDropdown(index)}
                onMouseLeave={() => link.dropdown && setOpenDropdown(null)}
              >
                {link.dropdown ? (
                  <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-900 transition-colors tracking-wide">
                    {link.label}
                    <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    onClick={(e) => handleScrollOrNavigate(link, e)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-900 transition-colors tracking-wide"
                  >
                    {link.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {link.dropdown && openDropdown === index && (
                  <div className="absolute top-full left-0 mt-0 bg-white shadow-lg rounded-b-lg min-w-[220px] py-2 border-t-2 border-blue-900">
                    {link.dropdown.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.path}
                        onClick={(e) => handleScrollOrNavigate(item, e)}
                        className="block px-6 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            {navLinks.map((link, index) => (
              <div key={index}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                      className="w-full flex items-center justify-between py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      {link.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${openDropdown === index ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {openDropdown === index && (
                      <div className="bg-gray-50">
                        {link.dropdown.map((item, idx) => (
                          <Link
                            key={idx}
                            to={item.path}
                            onClick={(e) => handleScrollOrNavigate(item, e)}
                            className="block py-2 px-8 text-sm text-gray-600 hover:text-blue-900"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.path}
                    onClick={(e) => handleScrollOrNavigate(link, e)}
                    className="block py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
