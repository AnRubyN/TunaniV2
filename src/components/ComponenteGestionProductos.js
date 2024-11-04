import React, { useState, useEffect, useRef  } from "react";
import axios from "axios";
import "../styles/ComponenteGestionProductos.css";
import useCooperativaId from '../hooks/useCooperativaId'; // Importar el hook personalizado



const PerfilProducto = ({ initialProductoId }) => {
  const { cooperativaId, error: cooperativaError } = useCooperativaId();
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState(null);
  const [artesanos, setArtesanos] = useState([]); // Definir el estado para artesanos
  const fileInputRefs = useRef({}); // Para almacenar referencias a los inputs de archivos

  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isImageEditing, setIsImageEditing] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [newProduct, setNewProduct] = useState({
    
    
    nombre: "",
    precio: "",
    material: "",
    stock: "",
    descripcion: "",
  });

  const [newProductId, setNewProductId] = useState(null); // Guardar el ID del nuevo producto

  useEffect(() => {
    const fetchData = async () => {
      if (cooperativaId) {
        try {
          const response = await axios.get(
            `https://tunaniback-0bd56842295c.herokuapp.com/api/cooperativas/${cooperativaId}/productos/`
          );
          const productosData = response.data;
          setProductos(productosData);
          
          // Seleccionar el primer producto si no se proporciona `initialProductoId`
          const selectedProducto = initialProductoId
            ? productosData.find(p => p.id === initialProductoId)
            : productosData[0];

          if (selectedProducto) {
            setProducto(selectedProducto);
          } else {
            setError("No se encontró ningún producto para esta cooperativa.");
          }
        
          // Fetch de artesanos
          const responseArtesanos = await axios.get(
            `https://tunaniback-0bd56842295c.herokuapp.com/api/cooperativas/${cooperativaId}/artesanos/`
          );
          setArtesanos(responseArtesanos.data);
          
          setLoading(false);
        } catch (err) {
          setError("Error al cargar la información: " + err.message);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [cooperativaId, initialProductoId]);

  const mostrarMensaje = (type, message) => {
    setAlertMessage({ type, message });
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  const handleImageChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const handleDataChange = (event) => {
    const { name, value } = event.target;
    setProducto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (files.length > 0) {
      const imageFormData = new FormData();
      files.forEach((file) => imageFormData.append("imagen", file));
  
      try {
        const response = await axios.post(
          `https://tunaniback-0bd56842295c.herokuapp.com/api/productos/${producto.id}/agregar-fotos/`,
          imageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setProducto((prev) => ({
          ...prev,
          imagenes: response.data.map(imagen => ({
            ...imagen,
            imagen_url: `${window.location.origin}${imagen.ubicacion}`
          }))
        }));
        mostrarMensaje("success", "Imágenes subidas correctamente.");
      } catch (err) {
        mostrarMensaje("error", "Error al subir las imágenes: " + err.message);
      }
    }
  
    setIsImageEditing(false);
    setLoading(false);
  };

  const handleImageUpload = async (productoId, event) => {
    const files = event.target.files;

    if (files.length > 0) {
      const imageFormData = new FormData();
      Array.from(files).forEach((file) => imageFormData.append("imagen", file));

      try {
        await axios.post(
          `https://tunaniback-0bd56842295c.herokuapp.com/api/productos/${productoId}/agregar-fotos/`,
          imageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        mostrarMensaje("success", "Imágenes subidas correctamente.");
      } catch (err) {
        mostrarMensaje("error", "Error al subir las imágenes: " + err.message);
      }
    }
  };

  const handleImageUploadEdited = async (productoId, event) => {
    const files = event.target.files;

    if (files.length > 0) {
      const imageFormData = new FormData();
      Array.from(files).forEach((file) => imageFormData.append("imagen", file));

      try {
        await axios.put(
          `https://tunaniback-0bd56842295c.herokuapp.com/api/imagenes-producto/actualizar/${productoId}/`,
          imageFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        mostrarMensaje("success", "Imágenes subidas correctamente.");
      } catch (err) {
        mostrarMensaje("error", "Error al subir las imágenes: " + err.message);
      }
    }
  };

  const handleDataSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updateFormData = new FormData();
    Object.keys(producto).forEach((key) => {
      if (key !== "imagenes") {
        updateFormData.append(key, producto[key]);
      }
    });

    try {
      const response = await axios.put(
        `https://tunaniback-0bd56842295c.herokuapp.com/api/productos/actualizar/${producto.id}/`,
        updateFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProducto(response.data);
      mostrarMensaje("success", "Datos actualizados correctamente.");
    } catch (err) {
      mostrarMensaje("error", "Error al actualizar los datos: " + err.message);
    }

    setIsEditing(false);
    setLoading(false);
  };

  const handleNewProductChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewProductSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `https://tunaniback-0bd56842295c.herokuapp.com/api/cooperativas/${cooperativaId}/productos/crear/`,
        {
          ...newProduct,
          cooperativa: cooperativaId,  // Asegúrate de incluir el ID de la cooperativa
        }
      );
      const productoCreado = response.data;

      setProductos((prev) => [...prev, productoCreado]);
      mostrarMensaje("success", "Producto agregado correctamente.");
      setNewProductId(productoCreado.id); // Guardar el ID del nuevo producto
      setIsImageEditing(true);
      setIsAddingProduct(false);
      setNewProduct({
        nombre: "",
        precio: "",
        material: "",
        stock: "",
        descripcion: "",
      });
    } catch (err) {
      mostrarMensaje("error", "Error al agregar el producto: " + err.message);
    }

    setLoading(false);
  };

  const handleSort = (key) => {
    const sortedProductos = [...productos].sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    setProductos(sortedProductos);
  };

  const borrarProducto = async (productoId) => {
    try {
      await axios.delete(`https://tunaniback-0bd56842295c.herokuapp.com/api/productos/eliminar/${productoId}/`);
      setProductos(productos.filter((prod) => prod.id !== productoId));
      mostrarMensaje("success", "Producto borrado correctamente.");
    } catch (err) {
      mostrarMensaje("error", "Error al borrar el producto: " + err.message);
    }
  };

  const toggleAddProductModal = () => {
    setIsAddingProduct((prev) => !prev);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const filteredProductos = productos.filter((producto) =>
    Object.values(producto)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  


  if (loading) return <div id="cargando"></div>;
  if (error || cooperativaError) return <p>Error al cargar: {error || cooperativaError}</p>;

  if (!producto) {
    return <div>
       No se ha encontrado la información del producto.
      </div>;
  }


  return (
    <div className="apartado-artesanias-container">
      <div className="titulo-boton-agregar-container">
        <h2 id="titulo-artesanias">Artesanias Registradas</h2>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍︎ Buscar Producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      <button onClick={toggleAddProductModal}>
        {isAddingProduct ? "Cancelar" : "🞣 Agregar Producto"}
      </button>

      </div>
      

      {isAddingProduct && (
        <div className="modal-backdrop">
        <div className="modal-content">
          <h2>Paso 1: Agrega los detalles de tu producto</h2>
          <br />
          <h4>Nombre *</h4>
          <input
            className="cajas"
            name="nombre"
            value={newProduct.nombre}
            onChange={handleNewProductChange}
            placeholder="Nombre"
          />
          <br />
          <h4>Precio *</h4>
          <input
            className="cajas"
            type="text"
            name="precio"
            value={newProduct.precio}
            onChange={handleNewProductChange}
            placeholder="Precio"
          />
          <br />
          <h4>Descripción</h4>
          <input
            className="cajas"
            id="Descripción"
            name="descripcion"
            value={newProduct.descripcion}
            onChange={handleNewProductChange}
            placeholder="Descripción (255 caracteres máximo)"
            maxLength={255}

          />
          <br />
          <h4>Material *</h4>
          <input
            className="cajas"
            name="material"
            value={newProduct.material}
            onChange={handleNewProductChange}
            placeholder="Material"
          />
          <br />
          <h4>Stock *</h4>
          <input
            className="cajas"
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleNewProductChange}
            placeholder="Stock"
          />
          <br />
          <h4>Categoría *</h4>
          <input
            className="cajas"
            name="categoria"
            value={newProduct.categoria || ""}
            onChange={handleNewProductChange}
            placeholder="Categoría"
          />
          <br />
          <h4>Artesano *</h4>
          <select
            className="cajas"
            name="artesano"
            value={newProduct.artesano || ""}
            onChange={handleNewProductChange}
          >
            <option value="">Seleccione un artesano</option>
            {artesanos.map((artesano) => (
              <option key={artesano.id} value={artesano.id}>
                {artesano.nombre}
              </option>
            ))}
          </select>
          <br />
          <h4>Estado *</h4>
          <select
            className="seleccion"
            name="estado"
            value={newProduct.estado}
            onChange={handleNewProductChange}
          >
            <option value="publicado">Publicado</option>
            <option value="no_publicado">No Publicado</option>
          </select>
          <br />

          <div className="acciones-formulario">
          <button  onClick={handleNewProductSubmit}>
            ✎ Agregar Producto
          </button>
          <button onClick={() => setIsAddingProduct(false)}>
            Cerrar
          </button>
          </div>

        </div>
        </div>
      )}

      {isImageEditing && (
        <div className="modal-backdrop">
        <div className="modal-content">
          <h2>Paso 2: Agregar Imágenes</h2>
          <p>Selelecione 5 fotografias</p>

          <div className="contenedor-subir-imagen">

          <input
            type="file"
            multiple
            onChange={(event) => handleImageUpload(newProductId, event)}
          />
          <br />
          </div>
          <div className="acciones-formulario">
          <button  onClick={() => setIsImageEditing(false)}>
          🖫 Guardar Imagenes
          </button>
           <button type="button" onClick={() => setIsImageEditing(false)}>✖ Cancelar</button>


        </div>
        </div>
        </div>
      )}

      {isEditing && (
        <div className="modal-backdrop">
        <div className="modal-content">
          <h2>Editar Producto</h2>
          <br />
          <h4>Nombre *</h4>
          <input
            className="cajas"
            name="nombre"
            value={producto?.nombre || ""}
            onChange={handleDataChange}
            placeholder="Nombre"
          />
          <br />
          <h4>Precio *</h4>
          <input
            className="cajas"
            type="text"
            name="precio"
            value={producto?.precio || ""}
            onChange={handleDataChange}
            placeholder="Precio"
          />
          <br />
          <h4>Descripción</h4>
          <input
            className="cajas"
            name="descripcion"
            value={producto?.descripcion || ""}
            onChange={handleDataChange}
            placeholder="Descripción"
          />
          <br />
          <h4>Material *</h4>
          <input
            className="cajas"
            name="material"
            value={producto?.material || ""}
            onChange={handleDataChange}
            placeholder="Material"
          />
          <br />
          <h4>Stock *</h4>
          <input
            className="cajas"
            type="number"
            name="stock"
            value={producto?.stock || ""}
            onChange={handleDataChange}
            placeholder="Stock"
          />
          <br />
          <h4>Categoría *</h4>
          <input
            className="cajas"
            name="categoria"
            value={producto?.categoria || ""}
            onChange={handleDataChange}
            placeholder="Categoría"
          />
          <br />
          <h4>Artesano *</h4>
          <select
            className="cajas"
            name="artesano"
            value={producto?.artesano || ""}
            onChange={handleDataChange}
          >
            <option value="">Seleccione un artesano</option>
            {artesanos.map((artesano) => (
              <option key={artesano.id} value={artesano.id}>
                {artesano.nombre}
              </option>
            ))}
          </select>
          <br />
          <h4>Estado *</h4>
          <select
            className="seleccion"
            name="estado"
            value={producto?.estado || ""}
            onChange={handleDataChange}
          >
            <option value="publicado">Publicado</option>
            <option value="no_publicado">No Publicado</option>
          </select>
          <br />

          <div className="acciones-formulario">
          <button  onClick={handleDataSubmit}>
            ✎ Guardar Cambios
          </button>
          <button  onClick={() => setIsEditing(false)}>
            Cerrar
          </button>
          </div>
        </div>
        </div>
        
      )}

<div className="productos-container">
  {filteredProductos.map((producto) => (
    <div className="producto-card" key={producto.id}>
      <h3>{producto.nombre}</h3>
      <p><strong>Precio:</strong> ${producto.precio}</p>
      <p><i>"{producto.descripcion}" </i></p>
      <p><strong>Material:</strong> {producto.material}</p>
      <p><strong>Stock:</strong> {producto.stock}</p>
      <p><strong>Estado:</strong> {producto.estado}</p>
      <p><strong>Categoría:</strong> {producto.categoria}</p>
      <div className="imagenes">
        {producto.fotos && producto.fotos.length > 0 ? (
          producto.fotos.map((foto, index) => (
            <img
              key={index}
              src={foto.ubicacion}
              alt={`Imagen de ${producto.nombre}`}
              style={{ width: "100px", marginRight: "5px" }}
            />
          ))
        ) : (
          "Sin imagen"
        )}
      </div>
      <div className="acciones-botones-artesanias">
        <button id="boton-editar" onClick={() => setIsEditing(true)}>✎ Editar</button>
        <button id="boton-eliminar" onClick={() => borrarProducto(producto.id)}>🗑 Borrar</button>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default PerfilProducto;
