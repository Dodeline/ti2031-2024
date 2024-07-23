// components/header.js
import { useState } from 'react';

export default function Header() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Implementar lógica de autenticación aquí
  };

  return (
    <header>
      <img src="/logo.png" alt="INACAPLudi" />
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
    </header>
  );
}
