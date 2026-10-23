import { useEffect, useState } from 'react';
import type { User } from './types/User';
import UserCard from './components/UserCard';

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers() {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data: User[] = await response.json();

        setUsers(data);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }
        setError('Unable to load users');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchUsers();

    return () => controller.abort();
  }, []);

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase().trim();

    return user.name.toLowerCase().includes(searchText) || user.email.toLowerCase().includes(searchText);
  });

  return (
    <div>
      <h1>Users</h1>

      <input
        type='text'
        className='search-input'
        placeholder='Search users...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {!loading && !error && <p>{filteredUsers.length} users found</p>}

      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
      )}
    </div>
  );
};

export default App;
