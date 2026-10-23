import { memo, useCallback, useMemo, useState } from 'react';

const users = [
  { id: 1, name: 'Alice Johnson' },
  { id: 2, name: 'Bob Smith' },
  { id: 3, name: 'Charlie Brown' },
];

type User = {
  id: number;
  name: string;
};

type UserListProps = {
  users: User[];
  onSelect: (user: User) => void;
};

const UserList = memo(function UserList({ users, onSelect }: UserListProps) {
  // Logs whenever React renders this component.
  console.log('UserList rendered');

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <button onClick={() => onSelect(user)}>{user.name}</button>
        </li>
      ))}
    </ul>
  );
});

const App = () => {
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState('');

  console.log('App rendered');

  // Filtering runs every time App renders.
  const filteredUsers = useMemo(() => {
    console.log('Filtering users');

    return users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  // Creates a new function whenever App renders.
  const handleSelect = useCallback((user: User) => {
    console.log('Selected:', user.name);
  }, []);

  return (
    <main>
      <h1>User Dashboard</h1>

      <input type='text' placeholder='Search users...' value={search} onChange={(e) => setSearch(e.target.value)} />

      <p>Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>

      <UserList users={filteredUsers} onSelect={handleSelect} />
    </main>
  );
};

export default App;
