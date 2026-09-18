// Casca do header: barra fixa, largura do container e altura definida.
// O conteúdo (logo, navegação e ações) entra aqui.
export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner container">
        <div className="header-start" />
        <div className="header-end" />
      </div>
    </header>
  );
}
