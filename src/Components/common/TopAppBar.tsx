export function TopAppBar() {
  return (
    <header className="top-app-bar">
      <button className="app-icon-btn" title="Menu" disabled>
        ☰
      </button>
      <div className="app-title">VOID</div>
      <button className="app-icon-btn" title="Options" disabled>
        ⋮
      </button>
    </header>
  );
}
