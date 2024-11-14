import React from 'react';
import ComponenteDetallesIntegrante from '../components/ComponenteDetallesIntegrante';
import { ComponenteFooterPag } from '../components/ComponenteFooterPag';
import ComponenteHeader from '../components/ComponenteHeader';

function DetallesIntegrantePage() {
  return (
    <div className="App">
      <header className="App-header">
        <ComponenteHeader />
      </header>
      <main>
        <ComponenteDetallesIntegrante />
      </main>
      <footer>
        <ComponenteFooterPag />
      </footer>
    </div>
  );
}

export default DetallesIntegrantePage;
