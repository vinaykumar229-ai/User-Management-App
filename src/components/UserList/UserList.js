import React, { useState, useEffect } from 'react';
import UserForm from '../UserForm/UserForm';
import axios from 'axios';
import './UserList.css';
import { FaTrash } from 'react-icons/fa';

function UserList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id)); // Simulate deletion
    alert(`User with ID ${id} deleted.`);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = (newUser) => {
    if (editingUser) {
      setUsers(users.map(user => (user.id === newUser.id ? newUser : user)));
      setEditingUser(null);
    } else {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
    }
  };

  return (
    <div className="user-list">
      <UserForm user={editingUser} onSave={handleSave} />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name.split(' ')[0]}</td>
              <td>{user.name.split(' ')[1] || ''}</td>
              <td>{user.email}</td>
              <td>{user.company.name}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)} className="delete-btn">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
