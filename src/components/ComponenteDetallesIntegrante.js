// src/components/ComponenteDetallesIntegrante.js
import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ComponenteDetallesIntegrante.css';
import foto1 from '../assets/imagenes/cooperativa1_integrante1.png';
import foto2 from '../assets/imagenes/cooperativa1_integrante2.png';
import foto3 from '../assets/imagenes/cooperativa1_integrante3.png';
import foto4 from '../assets/imagenes/cooperativa1_integrante4.png';
import cantaro2 from '../assets/imagenes/cantaro2.jpg';
import cantaro3 from '../assets/imagenes/cantaro3.jpg';

// Información simulada de los integrantes
const integrantes = [
  {
    id: 1,
    nombre: 'Artista María Pérez',
    nodo: 'Nodes Pátzcuaro - Zirahuén',
    sociedad: 'Sociedad Artesanal San Miguel',
    region: 'Oaxaca, México',
    fechaNacimiento: '10 de Marzo de 1985',
    estilo: 'Tejido y Bordado',
    ubicacion: 'Calle Principal #123, Oaxaca, México',
    redes: ['Facebook', 'Instagram', 'Comercio Electrónico', 'WhatsApp'],
    descripcion:
      'Desde pequeña, vi a mis abuelos y padres dedicarse con tanto amor a la artesanía, y supe que este sería también mi camino. Para mí, cada pieza que creo no es solo un objeto; es un pedazo de nuestra historia, una muestra de la riqueza de nuestra cultura. Cuando mis manos trabajan, siento que estoy en compañía de mis antepasados, que me guían y me inspiran a crear algo especial. A través de mis creaciones, busco honrar sus enseñanzas y preservar la esencia de mi pueblo. Mi mayor alegría es ver cómo mis piezas llevan un pedacito de nuestro corazón a otros hogares.',
    obras: [
      { nombre: 'Cántaro de barro', precio: '$200.00', imagen: cantaro2 },
      { nombre: 'Jarrón pintado', precio: '$150.00', imagen: cantaro3 },
    ],
    imagen: foto1,
  },
  {
    id: 2,
    nombre: 'Artista Ana López',
    nodo: 'Nodes Pátzcuaro - Zirahuén',
    sociedad: 'Sociedad Artesanal San Miguel',
    region: 'Chiapas, México',
    fechaNacimiento: '22 de Julio de 1975',
    estilo: 'Alfarería y Cerámica',
    ubicacion: 'Centro Histórico, Chiapas, México',
    redes: ['Facebook', 'Instagram', 'Comercio Electrónico', 'WhatsApp'],
    descripcion:
      'La naturaleza y nuestras tradiciones son mi fuente de inspiración. Cada mañana, me despierto con gratitud por la oportunidad de dar vida a lo que mi imaginación y mis manos pueden crear. En mi familia, la artesanía se transmite de generación en generación, y saber que continúo este legado me llena de orgullo. Mis obras no solo son adornos, son símbolos de la conexión que tenemos con nuestra tierra y nuestra gente. Cada vez que alguien valora una de mis piezas, siento que nuestras raíces se fortalecen y que nuestra cultura vive en cada hogar que las acoge.',
    obras: [
      { nombre: 'Vasija de barro', precio: '$80.00', imagen: cantaro2 },
      { nombre: 'Cuenco pintado', precio: '$120.00', imagen: cantaro3 },
    ],
    imagen: foto2,
  },
  {
    id: 3,
    nombre: 'Artista Luisa Gómez',
    nodo: 'Nodes Pátzcuaro - Zirahuén',
    sociedad: 'Sociedad Artesanal San Miguel',
    region: 'Chiapas, México',
    fechaNacimiento: '22 de Julio de 1975',
    estilo: 'Alfarería y Cerámica',
    ubicacion: 'Centro Histórico, Chiapas, México',
    redes: ['Facebook', 'Instagram', 'Comercio Electrónico', 'WhatsApp'],
    descripcion:
      'La pasión por la artesanía corre por mis venas desde que tengo memoria. Cada detalle que esculpo, cada color que selecciono, lo hago pensando en el amor y la dedicación que mis ancestros pusieron en su trabajo. Mi arte es mi manera de agradecerles, de mantener viva su memoria y de transmitir sus enseñanzas a futuras generaciones. Mi sueño es que quienes tienen mis piezas puedan sentir la historia, la alegría y el esfuerzo que pongo en cada una. Agradezco profundamente a quienes aprecian este arte, porque juntos mantenemos viva una tradición que significa tanto para mi comunidad.',
    obras: [
      { nombre: 'Vasija de barro', precio: '$80.00', imagen: cantaro2 },
      { nombre: 'Cuenco pintado', precio: '$120.00', imagen: cantaro3 },
    ],
    imagen: foto3,
  },
  {
    id: 4,
    nombre: 'Artista María Rivera',
    nodo: 'Nodes Pátzcuaro - Zirahuén',
    sociedad: 'Sociedad Artesanal San Miguel',
    region: 'Chiapas, México',
    fechaNacimiento: '22 de Julio de 1975',
    estilo: 'Alfarería y Cerámica',
    ubicacion: 'Centro Histórico, Chiapas, México',
    redes: ['Facebook', 'Instagram', 'Comercio Electrónico', 'WhatsApp'],
    descripcion:
      'Mi trabajo es más que un oficio, es una forma de conectar con mis raíces y compartir la belleza de nuestra cultura. Crecí rodeado de herramientas y materiales, viendo a mis padres y abuelos crear arte con sus manos. Hoy, cada pieza que realizo es un tributo a ellos, a su esfuerzo y dedicación. La artesanía me permite expresarme y compartir con el mundo un pedacito de nuestra historia. Me siento agradecido de poder hacer lo que amo y de tener la oportunidad de llevar la esencia de nuestro pueblo a lugares lejanos. Saber que mis piezas pueden inspirar a otros es un regalo invaluable.',
    obras: [
      { nombre: 'Vasija de barro', precio: '$80.00', imagen: cantaro2 },
      { nombre: 'Cuenco pintado', precio: '$120.00', imagen: cantaro3 },
    ],
    imagen: foto4,
  },
];

const ComponenteDetallesIntegrante = () => {
  const { id } = useParams();
  const integrante = integrantes.find((integ) => integ.id === parseInt(id));

  if (!integrante) {
    return <p>Integrante no encontrado</p>;
  }

  return (
    <div className="detalles-integrante-container">
      <h1 className="integrante-nombre">{integrante.nombre}</h1>
      <p className="integrante-nodo">{integrante.nodo}</p>
      <p className="integrante-sociedad">{integrante.sociedad}</p>
      <p className="integrante-region">{integrante.region}, {integrante.fechaNacimiento}</p>

      <div className="integrante-info">
        <img src={integrante.imagen} alt={integrante.nombre} className="integrante-imagen-detalles" />
        <div className="integrante-biografia">
          <h2>Biografía</h2>
          <p>{integrante.descripcion}</p>
        </div>
      </div>

      <div className="integrante-detalles-columns">
        <div>
          <h3>Estilo o Enfoque</h3>
          <p>{integrante.estilo}</p>
        </div>
        <div>
          <h3>Ubicación del negocio</h3>
          <p>{integrante.ubicacion}</p>
        </div>
        <div>
          <h3>Redes sociales</h3>
          <ul>
            {integrante.redes.map((red, index) => (
              <li key={index}>{red}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="ajuste">
        <h2>Obras del Artesano</h2>
        <div className="integrante-obras">
          {integrante.obras.map((obra, index) => (
            <div key={index} className="obra-card">
              <img src={obra.imagen} alt={obra.nombre} className="obra-imagen" />
              <p className="obra-nombre">{obra.nombre}</p>
              <p className="obra-precio">{obra.precio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComponenteDetallesIntegrante;
