import { useState, useEffect } from 'react';
import axios from 'axios';
import Users from '../components/Users';

function Home() {
  const [users, setUsers] = useState([]);
  const [showActive, setShowActive] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const url = showActive ? '/api/users?active=yes' : '/api/users';
    const response = await axios.get(`http://localhost:8081${url}`);
    setUsers(response.data);
    // TODO : handle prefetch
  };

  return (
    <div className="container">
      <h1>Users</h1>
      <label>
        <input
          className='checkbox'
          type="checkbox"
          checked={showActive}
          onChange={() => {
            setShowActive(!showActive);
            fetchUsers();
          }}
        />
        MFA Active
      </label>
      <Users users={users} />
    </div>
  );
}

export default Home;