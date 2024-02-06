import Layout from './Layout.jsx';
import { useState } from 'react';
import Login from 'pages/Login.jsx';
import './css/index.css';

function App() {
  const [token, setToken] = useState();
  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
