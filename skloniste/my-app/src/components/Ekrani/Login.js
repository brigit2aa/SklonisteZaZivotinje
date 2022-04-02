import { Button } from 'react-bootstrap';
import { Link, Route, Router, Switch } from 'react-router-dom';
import dobroDosli from '../images/bnaslovna.png';
import login from '../css/login.css';


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
          <input type="text" />
          <br />
          <br />
          <label className='lozinka'>Lozinka: </label>
          <input type="password" />
          <br />
          <br />
          <Button className="prijava" variant="outline-dark" onClick={(e) => obradaPrijave(e)}>Prijavi se</Button>
          <br />
          {/*<Link className="linkPrijava" to="/Registracija">Registriraj se!</Link>*/}
        </div>
      </form>
    </div>
  );
}

export default Login;