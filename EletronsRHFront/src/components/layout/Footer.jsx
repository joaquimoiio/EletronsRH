const Footer = () => {
  return (
    <footer className="">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-300 font-semibold">
            &copy; {new Date().getFullYear()} Copyright - Eletrons
          </p>
          <p className="text-white text-sm mt-2">
            Sistema de Recursos Humanos - Carreiras e Oportunidades
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
