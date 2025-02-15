import { Outlet } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Outlet/>
      </div>
    </AuthProvider>
  );
}

export default App;
