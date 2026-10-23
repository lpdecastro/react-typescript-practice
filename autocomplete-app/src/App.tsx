import { useEffect, useState } from 'react';
import './App.css';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

type UserResponse = {
  users: User[];
};

const App = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    // No API call if the search is empty.
    if (!query.trim() || !showSuggestions) {
      setUsers([]);
      setLoading(false);
      setError('');
      return;
    }

    // Abort previous requests when the search changes.
    const controller = new AbortController();

    // Show loading immediately while waiting for debounce.
    setLoading(true);
    setError('');
    setUsers([]);

    // Wait 300ms after the user stops typing.
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`https://dummyjson.com/users/search?q=${encodeURIComponent(query.trim())}`);

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data: UserResponse = await response.json();

        setUsers(data.users);
      } catch (error) {
        if (!controller.signal.aborted) {
          setError('Something went wrong. Please try again.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 300);

    // Clean up the timer and request when query changes.
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, showSuggestions]);

  function handleSelect(user: User) {
    setQuery(`${user.firstName} ${user.lastName}`);
    setShowSuggestions(false);
    setUsers([]);
  }

  return (
    <div className='container'>
      <h2>Search Users</h2>

      <div className='autocomplete'>
        <input
          type='text'
          placeholder='Search for a user...'
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
        />

        {showSuggestions && query.trim() && (
          <div className='suggestions'>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className='error'>{error}</p>
            ) : users.length === 0 ? (
              <p>No users found.</p>
            ) : (
              <ul>
                {users.map((user) => (
                  <li key={user.id} onClick={() => handleSelect(user)}>
                    <strong>
                      {user.firstName} {user.lastName}
                    </strong>{' '}
                    <span>{user.email}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
