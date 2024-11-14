import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ComponenteVerCooperativa.css';
import imagen1 from '../assets/imagenes/cooperativa1.png';
import imagen2 from '../assets/imagenes/cooperativa2.jpg';
import imagen3 from '../assets/imagenes/cooperativa3.jpg';
import imagen4 from '../assets/imagenes/cooperativa4.jpg';
import imagen5 from '../assets/imagenes/cooperativa5.jpg';
import imagen6 from '../assets/imagenes/cooperativa6.jpg';

const cooperativas = [
  { id: 1, nombre: 'Cooperativa San Miguel', imagen: imagen1 },
  { id: 2, nombre: 'Cooperativa Los Pinos', imagen: imagen2 },
  { id: 3, nombre: 'Cooperativa Artesanos Unidos', imagen: imagen3 },
  { id: 4, nombre: 'Cooperativa Manos de Oro', imagen: imagen4 },
  { id: 5, nombre: 'Cooperativa Esperanza', imagen: imagen5 },
  { id: 6, nombre: 'Cooperativa Tradición Viva', imagen: imagen6 },
];

export const ComponenteVerCooperativa = () => {
  const navigate = useNavigate();

  const handleCooperativaClick = (id) => {
    navigate(`/detalles-cooperativa/${id}`);
  };

  return (
    <div className="ver-cooperativa-container">
      <h1 className="ver-cooperativa-titulo">Cooperativas</h1>
      <div className="ver-cooperativa-grid">
        {cooperativas.map((cooperativa) => (
          <div
            key={cooperativa.id}
            className="ver-cooperativa-card"
            onClick={() => handleCooperativaClick(cooperativa.id)}
          >
            <div className="ver-cooperativa-card-imagen">
              <img src={cooperativa.imagen} alt={cooperativa.nombre} className="imagen-tarjeta" />
            </div>
            <p className="ver-cooperativa-card-texto">{cooperativa.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
