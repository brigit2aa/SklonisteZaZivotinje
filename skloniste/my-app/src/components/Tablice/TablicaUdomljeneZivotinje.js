import React, { Component } from "react";
import { Table } from 'react-bootstrap';
import '../css/tablica.css';

class TablicaUdomiteljeneZivotinje extends Component {
    constructor() {
        super();
        this.state = {
            udomiteljeneZivotinje: []
        }
    }

    dohvatiUomljeneZivotinje() {
        fetch("http://localhost/WPSP_SPJ_KonstrukcijskiZadatak/action/dohvacanjeUdomljeneZivotinje.php").then(response => response.json())
        .then(response => this.setState({udomiteljeneZivotinje: response}))
    }

    componentDidMount = async () => {
        this.dohvatiUomljeneZivotinje();
    }

    render() {
        return (
            <div>
                <div className="zaglavljeTablice">
                <input className="trazilicaUdomljene"
                        type="text"
                        placeholder="Pretraži udomljene životinje..." />
                    <p className="naslovUdomljene">Udomljene životinje</p>
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
                                <th>Udomitelj</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.udomiteljeneZivotinje.map(udomljenaZivotinja => {
                                return <tr>
                                    <td>{udomljenaZivotinja.sifraZivotinje}</td>
                                    <td>{udomljenaZivotinja.imeZivotinje}</td>
                                    <td>{udomljenaZivotinja.pasmina}</td>
                                    <td>{udomljenaZivotinja.starost}</td>
                                    <td>{udomljenaZivotinja.spol}</td>
                                    <td>{udomljenaZivotinja.vrsta}</td>
                                    <td>{udomljenaZivotinja.ime + " " + udomljenaZivotinja.prezime}</td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                </div >
            </div>
        )
    }
}

export default TablicaUdomiteljeneZivotinje;