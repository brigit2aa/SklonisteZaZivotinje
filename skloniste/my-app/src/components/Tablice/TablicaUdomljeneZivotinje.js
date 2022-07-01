import React, { Component } from "react";
import { Table, Button } from 'react-bootstrap';
import '../css/tablica.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';

class TablicaUdomiteljeneZivotinje extends Component {
    constructor() {
        super();
        this.state = {
            udomiteljeneZivotinje: [],
            filter: ""
        }
    }

    dohvatiUomljeneZivotinje() {
        fetch("http://localhost/WPSP_SPJ_KonstrukcijskiZadatak/action/dohvacanjeUdomljeneZivotinje.php").then(response => response.json())
        .then(response => this.setState({udomiteljeneZivotinje: response}))
    }

    componentDidMount = async () => {
        this.dohvatiUomljeneZivotinje();
    }

    trazilica = event => {
        this.setState({ filter: event.target.value });
    };

    vratiZivotinjuUskloniste(sifraZivotinje) {
        if (window.confirm("Želite li vratiti životinju?")) {
            fetch("http://localhost/WPSP_SPJ_KonstrukcijskiZadatak/action/vratiZivotinju.php", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "sifraUdomljeneZivotinje": sifraZivotinje })

            }).then((result) => {
                result.json().then((response) => {
                    alert("Životinja je vračena u sklonište!");
                    this.dohvatiUomljeneZivotinje();
                })
            })

        }
    };

    render() {
        const { filter, udomiteljeneZivotinje } = this.state;

        var PretraziPodatke = udomiteljeneZivotinje.filter(udomljenaZivotinja => {
            return udomljenaZivotinja.imeZivotinje.toLowerCase().includes(filter.toLocaleLowerCase()) || udomljenaZivotinja.ime.toLowerCase().includes(filter.toLocaleLowerCase()) || udomljenaZivotinja.prezime.toLowerCase().includes(filter.toLocaleLowerCase())//Tražilica za po imenu zivotinje, imenu ili prezimenu udomitelja

        });

        return (
            <div>
                <div className="zaglavljeTablice">
                <input className="trazilicaUdomljene"
                        type="text"
                        placeholder="Pretraži udomljene životinje..." value={filter} onChange={this.trazilica}/><SearchIcon className="gumb"/>
                    <p className="naslovUdomljene">Udomljene životinje</p>
                </div>
                <div>
                    <Table responsive="xl">
                        <thead>
                            <tr>
                                <th>Šifra životinje</th>
                                <th>Ime životinje</th>
                                <th>Pasmina</th>
                                <th>Starost</th>
                                <th>Spol</th>
                                <th>Vrsta</th>
                                <th>Udomitelj</th>
                                <th>Vrati životinju</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/*this.state.udomiteljeneZivotinje*/PretraziPodatke.map(udomljenaZivotinja => {
                                return <tr>
                                    <td>{udomljenaZivotinja.sifraZivotinje}</td>
                                    <td>{udomljenaZivotinja.imeZivotinje}</td>
                                    <td>{udomljenaZivotinja.pasmina}</td>
                                    <td>{udomljenaZivotinja.starost}</td>
                                    <td>{udomljenaZivotinja.spol}</td>
                                    <td>{udomljenaZivotinja.vrsta}</td>
                                    <td>{udomljenaZivotinja.ime + " " + udomljenaZivotinja.prezime}</td>
                                    <td><Button  className="gumbSirina" size="sm" variant="light" onClick={()=>this.vratiZivotinjuUskloniste(udomljenaZivotinja.sifraZivotinje)}><FavoriteTwoToneIcon className="gumb" /></Button></td>
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