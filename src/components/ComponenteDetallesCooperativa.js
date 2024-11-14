import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/ComponenteDetallesCooperativa.css';
import imagen1 from '../assets/imagenes/cooperativa1.png';
import imagen2 from '../assets/imagenes/cooperativa2.jpg';
import imagen3 from '../assets/imagenes/cooperativa3.jpg';
import imagen4 from '../assets/imagenes/cooperativa4.jpg';
import imagen5 from '../assets/imagenes/cooperativa5.jpg';
import imagen6 from '../assets/imagenes/cooperativa6.jpg';
import cooperativa1_integrante1 from '../assets/imagenes/cooperativa1_integrante1.png';
import cooperativa1_integrante2 from '../assets/imagenes/cooperativa1_integrante2.png';
import cooperativa1_integrante3 from '../assets/imagenes/cooperativa1_integrante3.png';
import cooperativa1_integrante4 from '../assets/imagenes/cooperativa1_integrante4.png';



const cooperativas = [
  { id: 1, nombre: 'Cooperativa San Miguel', imagen: imagen1, descripcion:
    'En cada pieza que creamos, llevamos con nosotros siglos de historia que nuestros ancestros nos han transmitido con amor y sabiduría. Nuestras manos siguen sus pasos, y cada movimiento está lleno de gratitud hacia ellos. No solo es arte; es nuestra manera de honrar nuestras raíces y darles vida en cada detalle, cada textura, cada color que seleccionamos con devoción. Este trabajo no es solo nuestro; es el legado de quienes nos precedieron y el regalo que queremos dejar para quienes vendrán después. Somos guardianes de esta cultura, y cada creación es una ofrenda de respeto y cariño.', region: 'Región de Pátzcuaro' },
  { id: 2, nombre: 'Cooperativa Los Pinos', imagen: imagen2, descripcion:
    'Cada vez que tejemos o tallamos, sentimos una conexión profunda con nuestra cultura y la naturaleza que nos rodea. Nuestro trabajo es una expresión de amor por nuestras raíces, y cada pieza lleva una parte de nuestro corazón, de nuestras memorias y de las historias de nuestra gente. Nos llena de gratitud tener la oportunidad de compartir la belleza de nuestra herencia, y ver cómo nuestras creaciones encuentran un lugar en otros hogares es una bendición. Para nosotros, esta labor no es solo un oficio; es una forma de devolver al mundo lo que nuestra tierra y nuestra historia nos han dado.', region: 'Región de Zamora' },
  { id: 3, nombre: 'Cooperativa Artesanos Unidos', imagen: imagen3, descripcion:
    'Cuando trabajamos con nuestras manos, sentimos que nuestros ancestros están presentes, guiándonos y recordándonos el poder de nuestras tradiciones. Cada patrón, cada color, está lleno de significados que nos fueron enseñados desde pequeños, y en cada obra intentamos transmitir la esencia de lo que somos y de dónde venimos. Crear es nuestra manera de honrar a nuestra comunidad y de mantener vivos los recuerdos y las enseñanzas que nos fueron transmitidos. Hacemos cada pieza con respeto y dedicación.', region: 'Región de Zirahuén' },
  { id: 4, nombre: 'Cooperativa Manos de Oro', imagen: imagen4, descripcion:
    'Nuestras manos no solo moldean materiales; cuentan historias que están grabadas en nuestras memorias y en la historia de nuestro pueblo. En cada artesanía que creamos, ponemos el amor y respeto que sentimos por nuestra gente y por quienes caminaron antes que nosotros, aquellos que nos enseñaron que este trabajo es sagrado. Nuestro trabajo es nuestro orgullo, y cada vez que alguien aprecia una de nuestras piezas, sentimos que ese legado cobra vida, que nuestra identidad se fortalece. Estamos agradecidos por poder expresar nuestra cultura en cada detalle que hacemos, y por poder compartir esa belleza con quienes valoran el arte y la historia.', region: 'Región de Uruapan' },
  { id: 5, nombre: 'Cooperativa Esperanza', imagen: imagen5, descripcion:
    'Para nosotros, crear artesanías es un acto de amor y devoción hacia nuestras raíces y nuestras creencias. Cada hilo, cada trazo, lleva nuestra gratitud por el lugar del que venimos, por el cariño de nuestras familias y por las enseñanzas que hemos recibido. No trabajamos solo para crear; trabajamos para recordar, para celebrar, y para compartir con otros la riqueza y la magia de nuestra cultura. Nuestras piezas no solo son objetos; son fragmentos de nuestra alma, de la historia que queremos preservar y del cariño que sentimos por nuestras tradiciones. Es un honor y un privilegio poder vivir de este legado.', region: 'Región de Tzintzuntzan' },
  { id: 6, nombre: 'Cooperativa Tradición Viva', imagen: imagen6, descripcion:
    'Cada pieza que hacemos es un pequeño homenaje a nuestros antepasados, a la naturaleza, y a la tierra que nos vio crecer, esa tierra que nos da su color y textura. Cuando trabajamos, sentimos que estamos escribiendo una historia en la que todos nuestros ancestros también participan, que nuestras manos son una extensión de las suyas. Nos llena de orgullo y agradecimiento saber que podemos ofrecer al mundo un pedacito de nuestra herencia, que podemos expresar quiénes somos y de dónde venimos en cada detalle que esculpimos o pintamos. Este arte nos da vida y sentido.', region: 'Región de Paracho' },
];

const integrantesPorCooperativa = {
  1: [
    { id: 1, nombre: 'María Pérez', imagen: cooperativa1_integrante1 },
    { id: 2, nombre: 'Ana López', imagen: cooperativa1_integrante2 },
    { id: 3, nombre: 'Luisa Gómez', imagen: cooperativa1_integrante3 },
    { id: 4, nombre: 'María Rivera', imagen: cooperativa1_integrante4 },
  ],
  2: [
    { id: 1, nombre: 'Carlos Martínez', imagen: imagen1 },
    { id: 2, nombre: 'Lucía Rojas', imagen: imagen1 },
    { id: 3, nombre: 'Carmen Jiménez', imagen: imagen1 },
    { id: 4, nombre: 'José Fernández', imagen: imagen1 },
  ],
  3: [
    { id: 1, nombre: 'Carlos Martínez', imagen: imagen1 },
    { id: 2, nombre: 'Lucía Rojas', imagen: imagen1 },
    { id: 3, nombre: 'Carmen Jiménez', imagen: imagen1 },
    { id: 4, nombre: 'José Fernández', imagen: imagen1 },
  ],
  4: [
    { id: 1, nombre: 'Carlos Martínez', imagen: imagen1 },
    { id: 2, nombre: 'Lucía Rojas', imagen: imagen1 },
    { id: 3, nombre: 'Carmen Jiménez', imagen: imagen1 },
    { id: 4, nombre: 'José Fernández', imagen: imagen1 },
  ],
  5: [
    { id: 1, nombre: 'Carlos Martínez', imagen: imagen1 },
    { id: 2, nombre: 'Lucía Rojas', imagen: imagen1 },
    { id: 3, nombre: 'Carmen Jiménez', imagen: imagen1 },
    { id: 4, nombre: 'José Fernández', imagen: imagen1 },
  ],
  6: [
    { id: 1, nombre: 'Carlos Martínez', imagen: imagen1 },
    { id: 2, nombre: 'Lucía Rojas', imagen: imagen1 },
    { id: 3, nombre: 'Carmen Jiménez', imagen: imagen1 },
    { id: 4, nombre: 'José Fernández', imagen: imagen1 },
  ],
  // Puedes agregar más integrantes para las demás cooperativas de manera similar
};

export const ComponenteDetallesCooperativa = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const cooperativa = cooperativas.find((coop) => coop.id === parseInt(id));
  const integrantes = integrantesPorCooperativa[id] || [];

  const handleIntegranteClick = (id) => {
    navigate(`/detalles-integrante/${id}`);
  };
  
  if (!cooperativa) {
    return <p>Cooperativa no encontrada</p>;
  }

  return (
    <div className="detalles-cooperativa-container">
      <h1 className="detalles-cooperativa-titulo">{cooperativa.nombre}</h1>
      <p className="detalles-cooperativa-subtitulo"><i>"Transformando ideas y sueños en arte"</i></p>
      <p className="detalles-cooperativa-region">{cooperativa.region}</p>

      <div className="detalles-cooperativa-info">
        <img src={cooperativa.imagen} alt={cooperativa.nombre} className="detalles-cooperativa-imagen" />
        <p className="detalles-cooperativa-descripcion">{cooperativa.descripcion}</p>
      </div>

      <h2 className="detalles-cooperativa-subtitulo-integrantes">Integrantes del colectivo</h2>
      <div className="integrantes-cooperativa">
        {integrantes.map((integrante, index) => (
          <div key={index} className="integrante-card" onClick={() => handleIntegranteClick(integrante.id)}>
            <img src={integrante.imagen} alt={integrante.nombre} className="integrante-imagen" />
            <p className="integrante-nombre">{integrante.nombre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
