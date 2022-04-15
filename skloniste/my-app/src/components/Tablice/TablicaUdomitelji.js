import React, { Component } from "react";
import { Table } from 'react-bootstrap';
import '../css/tablica.css';

class TablicaUdomitelji extends Component {
    constructor() {
        super();
        this.state = {
            udomitelji: [],
            filter: ""
        }
    }

    dohvatiUdomitelje() {
        fetch("http://localhost/WPSP_SPJ_KonstrukcijskiZadatak/action/dohvacanjeUdomitelja.php").then(response => response.json())
            .then(response => this.setState({ udomitelji: response }))
    }

    componentDidMount = async () => {
        this.dohvatiUdomitelje();
    }

    trazilica = event => {
        this.setState({ filter: event.target.value });
    };

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
