import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/producto-page-style.css";
import axios from 'axios';

const ProductoPage = () => {
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  useEffect(() => {
    const productoSeleccionado = JSON.parse(sessionStorage.getItem('productoSeleccionado'));
    if (productoSeleccionado) {
      axios.get(`https://tunaniback-0bd56842295c.herokuapp.com/api/producto/${productoSeleccionado.id}/imagenes/`)
        .then(response => {
          setProducto(productoSeleccionado);
          setImagenes(response.data.images);
          setImagenSeleccionada(response.data.images[0] || null);
        })
        .catch(error => {
          console.error('Error al obtener las imágenes del producto:', error);
          setProducto(productoSeleccionado);
        });
    }
  }, []);

  if (!producto) {
    return <p>No se ha seleccionado ningún producto.</p>;
  }

  const agregarAlCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    navigate('/carrito');
  };

  return (
    <div className="producto-page">
      <div className="producto-contenedor">
        <div className="producto-imagenes-secundarias">
          {imagenes.map((imagen, index) => (
            <img 
              key={index}
              src={imagen}
              alt={`Miniatura de ${producto.nombre} ${index + 1}`}
              className="producto-miniatura"
              onClick={() => setImagenSeleccionada(imagen)}
            />
          ))}
        </div>
        <div className="producto-imagen-principal">
          {imagenSeleccionada ? (
            <img src={imagenSeleccionada} alt={`Imagen de ${producto.nombre}`} />
          ) : (
            <p>No hay imágenes disponibles para este producto.</p>
          )}
        </div>
        <div className="producto-detalles">
          <h2>{producto.nombre}</h2>
       
          <p className="producto-precio">${producto.precio} MXN</p>
          <p className="producto-cooperativa">Nombre de Cooper</p>
         
          <p className="producto-descripcion">{producto.descripcion}</p>
          <div className="producto-acciones">
            <button onClick={agregarAlCarrito} className="producto-boton-cesta">📥︎  Añadir a la cesta</button>
            <button className="producto-boton-favorito">❤</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoPage;
