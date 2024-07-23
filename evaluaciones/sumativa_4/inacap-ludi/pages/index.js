import { useState, useEffect } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [USERS, setData] = useState(null)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

  // Recupera el estado de inicio de sesión del localStorage al montar el componente
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    fetch('/api/users')
    .then((res) => res.json())
    .then((data) => {
      setData(data)
    })

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
      {isLoggedIn ? (
        <>
          <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">Logout</button>
          <img className='max-h-96 w-full object-cover' src="juegos/p0001.png" />
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
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Iniciar Sesión</button>
          </form>
        </div>
      )}
    </div>
  );
}

