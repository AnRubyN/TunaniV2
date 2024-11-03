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

  if (loading) return <div id="cargando"></div>;
  if (error || cooperativaError) return <p>Error al cargar: {error || cooperativaError}</p>;

  if (!producto) {
    return <div>No se ha encontrado la información del producto.</div>;
  }

  return (
    <div>
      <button onClick={toggleAddProductModal}>
        {isAddingProduct ? "Cancelar" : "Agregar Producto"}
      </button>

      {isAddingProduct && (
        <div className="modal">
          <h2>Paso 1: Agrega los detalles de tu producto</h2><br/>
          <h4>Nombre *</h4>
          <input className="cajas" name="nombre" value={newProduct.nombre} onChange={handleNewProductChange} placeholder="Nombre" /><br/>
          <h4>Precio *</h4>
          <input className="cajas" type="text" name="precio" value={newProduct.precio} onChange={handleNewProductChange} placeholder="Precio" /><br/>
          <h4>Descripción</h4>
          <input className="cajas" name="descripcion" value={newProduct.descripcion} onChange={handleNewProductChange} placeholder="Descripción" /><br/>
          <h4>Material *</h4>
          <input className="cajas" name="material" value={newProduct.material} onChange={handleNewProductChange} placeholder="Material" /><br/>
          <h4>Stock *</h4>
          <input className="cajas" type="number" name="stock" value={newProduct.stock} onChange={handleNewProductChange} placeholder="Stock" /><br/>
          <h4>Categoría *</h4>
          <input className="cajas" name="categoria" value={newProduct.categoria || ""} onChange={handleNewProductChange} placeholder="Categoría" /><br/>
          <h4>Artesano *</h4>
          <select className="cajas" name="artesano" value={newProduct.artesano || ""} onChange={handleNewProductChange}>
            <option value="">Seleccione un artesano</option>
            {artesanos.map((artesano) => (
              <option key={artesano.id} value={artesano.id}>{artesano.nombre}</option>
            ))}
          </select><br/>
          <h4>Estado *</h4>
          <select className="seleccion" name="estado" value={newProduct.estado} onChange={handleNewProductChange}>
            <option value="publicado">Publicado</option>
            <option value="no_publicado">No Publicado</option>
          </select><br/>
          <button className="botones" onClick={handleNewProductSubmit}>
            ✎ Agregar Producto
          </button>
        </div>
      )}

{isImageEditing && (
        <div className="modal">
          <h2>Paso 2: Agregar Imágenes</h2>
          <input
            type="file"
            multiple
            onChange={(event) => handleImageUpload(newProductId, event)}
          /><br/>
          <button className="botones" onClick={() => setIsImageEditing(false)}>
            Subir Imágenes
          </button>
        </div>
      )}

{isEditing && (
        <div className="modal">
          <h2>Editar Producto</h2><br/>
          <h4>Nombre *</h4>
          <input className="cajas" name="nombre" value={producto?.nombre || ""} onChange={handleDataChange} placeholder="Nombre" /><br/>
          <h4>Precio *</h4>
          <input className="cajas" type="text" name="precio" value={producto?.precio || ""} onChange={handleDataChange} placeholder="Precio" /><br/>
          <h4>Descripción</h4>
          <input className="cajas" name="descripcion" value={producto?.descripcion || ""} onChange={handleDataChange} placeholder="Descripción" /><br/>
          <h4>Material *</h4>
          <input className="cajas" name="material" value={producto?.material || ""} onChange={handleDataChange} placeholder="Material" /><br/>
          <h4>Stock *</h4>
          <input className="cajas" type="number" name="stock" value={producto?.stock || ""} onChange={handleDataChange} placeholder="Stock" /><br/>
          <h4>Categoría *</h4>
          <input className="cajas" name="categoria" value={producto?.categoria || ""} onChange={handleDataChange} placeholder="Categoría" /><br/>
          <h4>Artesano *</h4>
          <select className="cajas" name="artesano" value={producto?.artesano || ""} onChange={handleDataChange}>
            <option value="">Seleccione un artesano</option>
            {artesanos.map((artesano) => (
              <option key={artesano.id} value={artesano.id}>{artesano.nombre}</option>
            ))}
          </select><br/>
          <h4>Estado *</h4>
          <select className="seleccion" name="estado" value={producto?.estado || ""} onChange={handleDataChange}>
            <option value="publicado">Publicado</option>
            <option value="no_publicado">No Publicado</option>
          </select><br/>
          <button className="botones" onClick={handleDataSubmit}>
            ✎ Guardar Cambios
          </button>
          <button className="botones" onClick={() => setIsEditing(false)}>
            Cerrar
          </button>
        </div>
      )}

      <table border="1">
        <thead>
          <tr>
            <th onClick={() => handleSort("nombre")}>Nombre</th>
            <th onClick={() => handleSort("precio")}>Precio</th>
            <th onClick={() => handleSort("descripcion")}>Descripción</th>
            <th onClick={() => handleSort("material")}>Material</th>
            <th onClick={() => handleSort("stock")}>Stock</th>
            <th onClick={() => handleSort("estado")}>Estado</th>
            <th onClick={() => handleSort("categoria")}>Categoría</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.precio}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.material}</td>
              <td>{producto.stock}</td>
              <td>{producto.estado}</td>
              <td>{producto.categoria}</td>
              <td>
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
              </td>
              <td>
                <button className="botones" onClick={() => setIsEditing(true)}>✎ Editar</button>
                <button className="botones" onClick={() => borrarProducto(producto.id)}>🗑 Borrar</button>
                 {/* Input de archivo oculto y botón para abrir el explorador de archivos */}
              <input
                type="file"
                multiple
                style={{ display: "none" }}
                ref={(el) => (fileInputRefs.current[producto.id] = el)} // Referenciar el input por producto
                onChange={(event) => handleImageUploadEdited(producto.id, event)}
              />
                <button
                className="botones"
                onClick={() => fileInputRefs.current[producto.id]?.click()} // Hacer clic en el input usando el ref
              >
                🖼 Subir Imágenes
              </button>
                            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PerfilProducto;
