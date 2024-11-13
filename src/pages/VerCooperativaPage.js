import React from 'react';
import { ComponenteFooterPag } from '../components/ComponenteFooterPag';
import ComponenteHeader from '../components/ComponenteHeader';
import { ComponenteVerCooperativa } from '../components/ComponenteVerCooperativa';
import BarraBusqueda from '../components/BarraBusqueda';

const VerCooperativaPage = () => {
  return (
    <div className="App">
      <header className="App-header">
        <ComponenteHeader />
      </header>
      <main>
        <div className="contenedor-barra-de-busqueda">
        <BarraBusqueda />
        </div>
        <ComponenteVerCooperativa />
      </main>
      <footer>
      <ComponenteFooterPag/>
      </footer>
    </div>
  );
};

export default VerCooperativaPage;
