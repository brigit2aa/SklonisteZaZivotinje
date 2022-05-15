import React, { Component } from "react";
import { Table, Button, Modal } from 'react-bootstrap';
import '../css/tablica.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SearchIcon from '@material-ui/icons/Search';

class TablicaUdomitelji extends Component {
    constructor() {
        super();
        this.state = {
            udomitelji: [],
            filter: "",
            modal: false,
            modalBezZivotinja: false,
            zivotinjeKodUdomitelja: []
        }
    }

    dohvatiUdomitelje() {
        fetch("http://localhost/WPSP_SPJ_KonstrukcijskiZadatak/action/dohvacanjeUdomitelja.php").then(response => response.json())
            .then(response => this.setState({ udomitelji: response }))
    }

    dohvatiZivotinjeKodUdomitelja(sifraUdomitelja) {
        fetch("http://localhost/WPSP_SPJ_KonstrukcijskiZadatak/action/zivotinjaKodUdomitelja.php?sifraUdomitelja=" + sifraUdomitelja).then(response => response.json())
            .then(response => this.setState({ zivotinjeKodUdomitelja: response }))
    }

    componentDidMount = async () => {
        this.dohvatiUdomitelje();
        this.dohvatiZivotinjeKodUdomitelja();
    }

    trazilica = event => {
        this.setState({ filter: event.target.value });
    };

    otvorModal = (sifraUdomitelja) => {
        this.setState({ modal: true });
        this.dohvatiZivotinjeKodUdomitelja(sifraUdomitelja);

    }

    zatvoriModal = () => this.setState({ modal: false });


    otvoriModalBezZivotinje = () => {
        this.setState({ modalBezZivotinja: true });
    }

    zatvoriModalBezZivotinje = () => this.setState({ modalBezZivotinja: false });

    render() {

        const { filter, udomitelji } = this.state;

        var PretraziPodatke = udomitelji.filter(udomitelj => {
            /*return Object.keys(udomitelj).some(key => udomitelj[key].toLowerCase().includes(filter.toLowerCase())) Tražilica za po svim pojmovima u tablici*/
            return udomitelj.ime.toLowerCase().includes(filter.toLocaleLowerCase()) || udomitelj.prezime.toLowerCase().includes(filter.toLocaleLowerCase())//Tražilica za  samo po imenu i prezimenu

        });


        return (
            <div>
                <div className="zaglavljeTablice">
                    <input className="trazilicaUdomitelj"
                        type="text"
                        placeholder="Pretraži udomitelje..." value={filter} onChange={this.trazilica.bind(this)}/><SearchIcon className="gumb"/>
                    <p className="naslovUdomitelj">Udomitelji</p>
                </div>
                <div>
                    <Table responsive="xl">
                        <thead>
                            <tr>
                                <th>Šifra</th>
                                <th>Ime</th>
                                <th>Prezime</th>
                                <th>Adresa</th>
                                <th>E-mail</th>
                                <th>Tel/Mob</th>
                                <th>Udomljena životinja</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/*this.state.udomitelji*/PretraziPodatke.map(udomitelj => {
                                return <tr>
                                    <td>{udomitelj.sifraUdomitelja}</td>
                                    <td>{udomitelj.ime}</td>
                                    <td>{udomitelj.prezime}</td>
                                    <td>{udomitelj.adresa}</td>
                                    <td>{udomitelj.email}</td>
                                    <td>{udomitelj.telMob}</td>
                                    <td>
                                        <>
                                            <div>
                                               {udomitelj.status ? <Button className="gumbSirina" size="sm" variant="light" onClick={() => this.otvorModal(udomitelj.sifraUdomitelja)}><FavoriteIcon className="gumb" /></Button> : <Button className="gumbSirina" size="sm" variant="light" onClick={() => this.otvoriModalBezZivotinje()}><FavoriteBorderIcon className="gumb" /></Button>}
                                            </div>
                                            {/*Modal sa popisom životinja koje su kod udomitelja*/}
                                            <Modal show={this.state.modal} onHide={this.zatvoriModal} >
                                                <Modal.Header zatvoriModal className="zaglavljeTablice">
                                                    <p className="zivotinjaKodUdomitelja">Životinja od udomitelja</p>
                                                    <Modal.Title> </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body >
                                                    <div>
                                                        <div>
                                                            {this.state.zivotinjeKodUdomitelja.map(zivotinjaKodUdomitelja => {
                                                                return <ul>
                                                                    <ol>___________________________________________________________</ol>
                                                                    <ol>Šifra životinje: {zivotinjaKodUdomitelja.sifraZivotinje}</ol>
                                                                    <ol>Ime životinje: {zivotinjaKodUdomitelja.imeZivotinje}</ol>
                                                                    <ol>Pasmina: {zivotinjaKodUdomitelja.pasmina}</ol>
                                                                    <ol>Starost: {zivotinjaKodUdomitelja.starost}</ol>
                                                                    <ol>Spol: {zivotinjaKodUdomitelja.spol}</ol>
                                                                    <ol>Vrsta: {zivotinjaKodUdomitelja.vrsta}</ol>
                                                                    <ol>___________________________________________________________</ol>
                                                                </ul>
                                                            })}
                                                        </div >
                                                    </div>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button size="sm" variant="light" onClick={this.zatvoriModal}><CloseIcon className="gumb"/></Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </>
                                        <>
                                        {/*Modal koji prikazuje tekst poruke "Udomitelj nema udomljenih životinja!"*/}
                                        <Modal show={this.state.modalBezZivotinja} onHide={this.zatvoriModalBezZivotinje} >
                                                <Modal.Header zatvoriModalBezZivotinje className="zaglavljeTablice">
                                                    <p className="zivotinjaKodUdomitelja">Životinja od udomitelja</p>
                                                    <Modal.Title> </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body >
                                                    <div>
                                                        <div>
                                                            <p className="bezZivotinje">___________________________________________________________</p>
                                                            <p className="bezZivotinjeText">Udomitelj nema udomljenih životinja!</p>
                                                            <p className="bezZivotinje">___________________________________________________________</p>
                                                        </div >
                                                    </div>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button size="sm" variant="light" onClick={this.zatvoriModalBezZivotinje}><CloseIcon className="gumb"/></Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                </div >
            </div>
        )
    }
}

export default TablicaUdomitelji;
