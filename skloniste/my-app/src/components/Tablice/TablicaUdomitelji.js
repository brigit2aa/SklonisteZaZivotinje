import React, { Component } from "react";
import { Table, Button, Modal } from 'react-bootstrap';
import '../css/tablica.css';
import FavoriteIcon from '@material-ui/icons/Favorite';

class TablicaUdomitelji extends Component {
    constructor() {
        super();
        this.state = {
            udomitelji: [],
            filter: "",
            modal: false,
            zivotinjeKodUdomitelja: []
        }
    }

    dohvatiUdomitelje() {
        fetch("http://localhost/WPSP_SPJ_KonstrukcijskiZadatak/action/dohvacanjeUdomitelja.php").then(response => response.json())
            .then(response => this.setState({ udomitelji: response }))
    }

    dohvatiZivotinjeKodUdomitelja(sifraUdomitelja) {
        fetch("http://localhost/WPSP_SPJ_KonstrukcijskiZadatak/action/zivotinjaKodUdomitelja.php?sifraUdomitelja="+sifraUdomitelja).then(response => response.json())
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
                        placeholder="Pretraži udomitelje..." value={filter} onChange={this.trazilica.bind(this)} />
                    <p className="naslovUdomitelj">Udomitelji</p>
                </div>
                <div>
                    <Table responsive="sm">
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
                                                <FavoriteIcon className="gumb" onClick={()=>this.otvorModal(udomitelj.sifraUdomitelja)}></FavoriteIcon>
                                            </div>
                                            <Modal  show={this.state.modal} onHide={this.zatvoriModal} >
                                                <Modal.Header zatvoriModal>
                                                    <Modal.Title></Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body >
                                                    <div>
                                                        <div className="zaglavljeTablice">
                                                            <p className="naslovUdomljene">Životinje kod udomitelja</p>
                                                        </div>
                                                        <div>
                                                            <Table responsive="sm">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Šifra životinje</th>
                                                                        <th>Ime životinje</th>
                                                                        <th>Pasmina</th>
                                                                        <th>Starost</th>
                                                                        <th>Spol</th>
                                                                        <th>Vrsta</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {this.state.zivotinjeKodUdomitelja.map(zivotinjaKodUdomitelja => {
                                                                        return <tr>
                                                                            <td>{zivotinjaKodUdomitelja.sifraZivotinje}</td>
                                                                            <td>{zivotinjaKodUdomitelja.imeZivotinje}</td>
                                                                            <td>{zivotinjaKodUdomitelja.pasmina}</td>
                                                                            <td>{zivotinjaKodUdomitelja.starost}</td>
                                                                            <td>{zivotinjaKodUdomitelja.spol}</td>
                                                                            <td>{zivotinjaKodUdomitelja.vrsta}</td>
                                                                        </tr>
                                                                    })}
                                                                </tbody>
                                                            </Table>
                                                        </div >
                                                    </div>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="light" onClick={this.zatvoriModal}>Zatvori</Button>
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
