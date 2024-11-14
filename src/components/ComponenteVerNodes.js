import React from 'react';
import '../styles/ComponenteVerNodes.css';
import node1 from '../assets/imagenes/node1.jpg';
import node2 from '../assets/imagenes/node2.jpg';
import node3 from '../assets/imagenes/node3.jpg';
import node4 from '../assets/imagenes/node4.jpg';
import node5 from '../assets/imagenes/node5.jpg';
import node6 from '../assets/imagenes/node6.jpg';

export const ComponenteVerNodes = () => {
  const nodes = [
    { id: 1, nombre: 'Pátzcuaro', imagen: node1 },
    { id: 2, nombre: 'Zamora', imagen: node2 },
    { id: 3, nombre: 'Tzintzuntzan', imagen: node3 },
    { id: 4, nombre: 'Uruapan', imagen: node4 },
    { id: 5, nombre: 'Zirahuén', imagen: node5 },
    { id: 6, nombre: 'Paracho', imagen: node6 },
    // Agrega más nodes según sea necesario
  ];

  return (
    <div className="ver-nodes-main-content">
      <h2>Nodes por tu región</h2>
      <div className="ver-nodes-grid">
        {nodes.map((node) => (
          <div key={node.id} className="ver-nodes-card">
            <img src={node.imagen} alt={node.nombre} className="ver-nodes-card-imagen" />
            <p className="ver-nodes-card-nombre">{node.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
