import { Button, Modal, InputGroup, FormControl} from 'react-bootstrap';
import { Link, Route, Router, Switch } from 'react-router-dom';
import React, { Component, useEffect, useState } from "react";
import dobroDosli from '../images/bnaslovna2.png';
import '../css/login.css';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      korisnik: [],
      modal: false,
      imeKorisnika: "",
      prezimeKorisnika: "",
      korisnickoIme: "",
      loznika:""
    };
    this.onChange = this.onChange.bind(this);
  }

  registrirajKorisnika() {
    if (window.confirm("Želite li se registrirati?")) {
           
            fetch('http://localhost/WPSP_SPJ_KonstrukcijskiZadatak/action/registracijaKorisnika.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)

            })}
            alert('Korisnik je uspješno dodan!')

            this.setState({
                imeKorisnika: "",
                prezimeKorisnika: "",
                korisnickoIme: "",
                loznika: "",
            });
        this.setState({
            modal: !this.state.modal,
        });
}


  obradaPrijave = (e ) => {
    fetch("http://localhost/WPSP_SPJ_KonstrukcijskiZadatak/action/dohvacanjeKorisnika.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                   
                })

            }).then(response => response.json()).then(response => this.setState({korisnik: response}))

   e.preventDefault();
            this.props.setLogin(true);
            alert("Uspješno ste se prijavili!");
}

onChange(e){
  this.setState({[e.target.name]: e.target.value});
}


otvoriModal = () => this.setState({ modal: true });


zatvoriModal = () => this.setState({ modal: false });
 
render(){
  return (

    <div className="container-prijava">
      <div className='lijevoIme'><img className="dobroDosli" src={dobroDosli} /></div>
    
      <form action="" method="">
        <div className="form-group">
          {/*<input placeholder='Korisničko ime' type="text" className='razmak'/>*/}
          <InputGroup size="sm" className="mb-3"><FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" name='korisnickoIme' placeholder='Korisničko ime' onChange={this.onChange}/></InputGroup>
          {/*<input placeholder='Lozinka' type="password" className='razmak'/>*/}
          <InputGroup size="sm" className="mb-3"><FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" name='lozinka' placeholder='Lozinka' onChange={this.onChange}/></InputGroup>
          <Button className="prijava" size="sm" variant="light" onClick={(e) => this.obradaPrijave(e)}>Prijavi se</Button>
          <>
          <Button className="registracija" size="sm" variant="light" onClick={() =>this.otvoriModal()}>Registriraj se</Button>

          <Modal className='modalDolje' show={this.state.modal} onHide={this.zatvoriModal}>
        <Modal.Header zatvoriModal className="zaglavljeRegistracije">
        <p className="registracijaNaslov">Registriraj se</p>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input placeholder='Ime' className='registracijaInput' value={this.state.imeKorisnika} onChange={(data) => { this.setState({ imeKorisnika: data.target.value }) }}/>
        <input placeholder='Prezime' className='registracijaInput1' value={this.state.prezimeKorisnika} onChange={(data) => { this.setState({ prezimeKorisnika: data.target.value }) }}/>
        <br />
        <input placeholder='Korisničko ime' className='registracijaInput2' value={this.state.korisnickoIme} onChange={(data) => { this.setState({ korisnickoIme: data.target.value }) }}/>
        <br />
        <input placeholder='Nova lozinka' className='registracijaInput2' value={this.state.loznika} onChange={(data) => { this.setState({ loznika: data.target.value }) }}/>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="light" onClick={this.zatvoriModal}><CloseIcon className="gumb"/>Odustani</Button>
          <Button size="sm" variant="light" onClick={() => this.registrirajKorisnika()}><CheckCircleIcon className="gumb"/>Registriraj se</Button>
        </Modal.Footer>
      </Modal>
      </>
        </div>
      </form>
  </div>

  );
    }
}

export default Login;
