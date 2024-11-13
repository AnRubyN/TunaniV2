// src/pages/DetallesCooperativaPage.js
import React from 'react';
import { ComponenteDetallesCooperativa } from '../components/ComponenteDetallesCooperativa';
import { ComponenteFooterPag } from '../components/ComponenteFooterPag';
import ComponenteHeader from '../components/ComponenteHeader';

function DetallesCooperativaPage() {
  return (
    <div className="App">
      <header className="App-header">
        <ComponenteHeader />
      </header>
      <main>
        <ComponenteDetallesCooperativa />
      </main>
      <footer>
      <ComponenteFooterPag/>
      </footer>
    </div>
  );
}

export default DetallesCooperativaPage;
