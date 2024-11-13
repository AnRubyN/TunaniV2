import React from 'react';
import FotoArtesanao from '../assets/artesanos.jpg';
import '../styles/inf-cooperativas-styles.css';

export const ComponenteInfoCooperativa = () => {
  return (
    <div className="grid-layout-contenido">
      <div className="caja-titulo-cooperativa">¿Qué es una cooperativa?</div>
      <div className="caja2">
        <p className="texto-cooperativa">
          Una cooperativa es una organización o empresa propiedad de sus miembros, quienes se unen
          voluntariamente para satisfacer sus necesidades económicas, sociales y culturales comunes mediante
          un proyecto gestionado democráticamente. Las cooperativas se rigen por principios de participación
          igualitaria, donde las decisiones se toman colectivamente, y los beneficios o ganancias se distribuyen
          entre los miembros de acuerdo a su participación o contribución, no basándose en la cantidad de
          capital invertido.
        </p>
      </div>
      <div className="caja3">
        <img src={FotoArtesanao} alt="Artesanos" />
      </div>
    </div>
  );
};
