// pages/admin/productos.js
import { useEffect, useState } from 'react';

export default function AdminProductos() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', description: '', availability: 0, location: '', image: '' });

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddProduct = () => {
    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    })
      .then((res) => res.json())
      .then((product) => setProducts([...products, product]));
  };

  return (
    <div>
      <h1>Administración de Productos</h1>
      <input
        type="text"
        placeholder="Título"
        value={newProduct.title}
        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Disponibilidad"
        value={newProduct.availability}
        onChange={(e) => setNewProduct({ ...newProduct, availability: parseInt(e.target.value) })}
      />
      <input
        type="text"
        placeholder="Ubicación"
        value={newProduct.location}
        onChange={(e) => setNewProduct({ ...newProduct, location: e.target.value })}
      />
      <input
        type="text"
        placeholder="Imagen"
        value={newProduct.image}
        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
      />
      <button onClick={handleAddProduct}>Agregar Producto</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}
