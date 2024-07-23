// pages/admin/usuarios.js
import { useEffect, useState } from 'react';

export default function AdminUsuarios() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '' });

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = () => {
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then((res) => res.json())
      .then((user) => setUsers([...users, user]));
  };

  return (
    <div>
      <h1>Administración de Usuarios</h1>
      <input
        type="text"
        placeholder="Usuario"
        value={newUser.username}
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      <button onClick={handleAddUser}>Agregar Usuario</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}
