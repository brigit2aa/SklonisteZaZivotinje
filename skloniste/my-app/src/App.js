import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Ekrani/Login';
import GlavniEkran from './components/Ekrani/GlavniEkran';

function App() {
const [login, setLogin] = useState(false);

return(
  <div className='App'>
    <Router>
      {
        !login ? <Login setLogin={setLogin}/> : <GlavniEkran/>
      }
    </Router>

  </div>
);
}

export default App;
