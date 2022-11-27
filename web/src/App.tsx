import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './layout/header/header';

function App() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
