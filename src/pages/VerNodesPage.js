import React from 'react';
import { ComponenteFooterPag } from '../components/ComponenteFooterPag';
import ComponenteHeader from '../components/ComponenteHeader';
import { ComponenteVerNodes } from '../components/ComponenteVerNodes';
import BarraBusqueda from '../components/BarraBusqueda';

const VerNodesPage = () => {
    return (
        <div className="App">
          <header className="App-header">
            <ComponenteHeader />
          </header>
          <main>
            <div className="contenedor-barra-de-busqueda">
            <BarraBusqueda />
            </div>
            <ComponenteVerNodes />
          </main>
          <footer>
          <ComponenteFooterPag/>
          </footer>
        </div>
      );
};

export default VerNodesPage;
