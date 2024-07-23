import { useState, useEffect } from 'react';

// Datos de ejemplo para autenticación
const USERS = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Recupera el estado de inicio de sesión del localStorage al montar el componente
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      const fetchProducts = async () => {
        try {
          console.log('Fetching...');
          const response = await fetch('/api/products'); // La URL de tu API
          console.log('Done...');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts(); // Llama a la función para obtener productos
    }
  }, []);

  // Función para manejar el inicio de sesión
  const handleLogin = (e) => {
    e.preventDefault();

    // Verificar credenciales en el frontend
    const user = USERS.find(u => u.username === username && u.password === password);

    if (user) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      alert('Invalid username or password');
    }
  };

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...existingProduct, quantity: existingProduct.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <div className="container mx-auto p-4">
        <img src="juegos/p0001.png"/>
        {isLoggedIn ? (
        <>
          <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">Logout</button>
          <h2 className="text-xl mt-4">Catálogo de Productos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {loading ? <p>Loading...</p> : error ? <p>Error: {error}</p> : (
              products.map(product => (
                <div key={product.id} className="border p-4">
                  <h3 className="text-lg">{product.title}</h3>
                  <p>{product.description}</p>
                  <img src={`/juegos/${product.image}`} alt={product.title} className="w-full h-auto" />
                  <button onClick={() => addToCart(product)} className="mt-2 bg-blue-500 text-white p-2 rounded">Add to Cart</button>
                </div>
              ))
            )}
          </div>
          <div className="mt-6">
            <h3 className="text-lg">Carrito</h3>
            {cart.length === 0 ? (
              <p>El carrito está vacío</p>
            ) : (
              <ul>
                {cart.map(item => (
                  <li key={item.id} className="border p-2 mb-2">
                    {item.title} - Cantidad: {item.quantity}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : (
        <div>
          <h2 className="text-xl">Iniciar sesión</h2>
          <form onSubmit={handleLogin} className="mt-4">
            <div className="mb-4">
              <label htmlFor="username" className="block">Nombre de usuario:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block">Contraseña:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 w-full"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Iniciar sesión</button>
          </form>
        </div>
      )}
    </div>
  );
}

