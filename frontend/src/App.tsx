// App.tsx
import { useState } from 'react';
import axios from 'axios';

interface Commit {
  sha: string;
  message: string;
}

function App() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCommits = () => {
    setLoading(true);
    axios.get<Commit[]>('http://localhost:3000/commits')
      .then((response) => {
        setCommits(response.data);
        setError(null);
      })
      .catch((error) => {
        setError('Error fetching data: ' + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <h1>Git Commit History App</h1>
      <button onClick={fetchCommits}>Fetch Commits</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <ul>
          {commits.map((commit) => (
            <li key={commit.sha}>{commit.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
