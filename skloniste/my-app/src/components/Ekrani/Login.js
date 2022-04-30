import { Button } from 'react-bootstrap';
import { Link, Route, Router, Switch } from 'react-router-dom';
import dobroDosli from '../images/bnaslovna.png';
import '../css/login.css';

function Login(props) {

  const obradaPrijave = (e) => {
    e.preventDefault();
    props.setLogin(true);
    alert("Uspješno ste se prijavili!");
  }
  return (
    <div className="container-prijava">

      <img className="dobroDosli" src={dobroDosli} />

      <form action="" method="">
        <div className="form-group">
          <label>Korisničko ime: </label>
          <input type="text" className='razmak'/>
          <br />
          <br />
          <label  className='lozinka'>Lozinka: </label>
          <input type="password" className='razmak'/>
          <br />
          <br />
          <Button className="prijava" variant="light" onClick={(e) => obradaPrijave(e)}>Prijavi se</Button>
          <br />
          <Link className="linkPrijava" to="/Registracija">Kreiraj novi korisnički račun</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;