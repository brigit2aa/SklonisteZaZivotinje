import React, { Component } from "react";
import { Table } from 'react-bootstrap';
import '../css/tablica.css';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

class TablicaZivotinje extends Component {
    constructor() {
        super();
        this.state = {
            zivotinje: [],
            sifraZivotinje: "",
            imeZivotinje: "",
            pasmina: "",
            starost: "",
            spol: "",
            vrsta: "",
            showHide: false,
        }
    }

    dohvatiZivotinje() {
        fetch("http://localhost/WPSP_SPJ_KonstrukcijskiZadatak/action/dohvacanjeZivotinje.php").then(response => response.json())
            .then(response => this.setState({ zivotinje: response }))
    }

    componentDidMount = async () => {
        this.dohvatiZivotinje();
    }

    dodajZivotinju() {
        fetch('http://localhost/WPSP_SPJ_KonstrukcijskiZadatak/action/dodavanjeZivotinje.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)

        })
        alert('Životinja ' + this.state.imeZivotinje + ' je uspješno dodana!')
        
        this.setState({
            sifraZivotinje: "",
            imeZivotinje: "",
            pasmina: "",
            starost: "",
            spol: "",
            vrsta: ""
        });
        
        this.setState({ 
            showHide: !this.state.showHide 
        });
       
        this.dohvatiZivotinje();
    }

    obrisiZivoinju(sifraZivotinje) {
        if (window.confirm("Želite li obrisati životinju?")) {
            fetch("http://localhost/WPSP_SPJ_KonstrukcijskiZadatak/action/brisanjeZivotinja.php", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "sifraZivotinje": sifraZivotinje })

            }).then((result) => {
                result.json().then((response) => {
                    alert("Životinja je obrisana!");
                    this.dohvatiZivotinje();
                })
            })

        }
    };

    render() {

        var Handlechange = e => {
            this.setState({ showHide: !this.state.showHide });
        }

        const x = this.state.showHide;

        return (
            <div >
                <div className="zaglavljeTablice">
                    <input className="trazilicaZivotinja"
                        type="text"
                        placeholder="Pretraži životinje..." />
                    <p className="naslov">Životinje</p>
                    <AddCircleIcon className="dodaj" onClick={Handlechange}>{x ? '<AddCircleIcon/>' : '<AddCircleIcon/>'}</AddCircleIcon>
                </div>
                <div>
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>Šifra{x && (<input placeholder="Šifra..." value={this.state.sifraZivotinje} onChange={(data) => { this.setState({ sifraZivotinje: data.target.value }) }}></input>)}</th>
                                <th>Ime{x && (<input placeholder="Ime..." value={this.state.imeZivotinje} onChange={(data) => { this.setState({ imeZivotinje: data.target.value }) }}></input>)}</th>
                                <th>Pasmina{x && (<input placeholder="Pasmina..." value={this.state.pasmina} onChange={(data) => { this.setState({ pasmina: data.target.value }) }}></input>)}</th>
                                <th>Starost{x && (<input placeholder="Starost..." value={this.state.starost} onChange={(data) => { this.setState({ starost: data.target.value }) }}></input>)}</th>
                                <th>Spol{x && (<input placeholder="Spol..." value={this.state.spol} onChange={(data) => { this.setState({ spol: data.target.value }) }}></input>)}</th>
                                <th>Vrsta{x && (<input placeholder="Vrsta..." value={this.state.vrsta} onChange={(data) => { this.setState({ vrsta: data.target.value }) }}></input>)}</th>
                                <th>{x ? 'Spremi' : 'Status'}{x && (<CheckCircleIcon className="spremi" onClick={() => this.dodajZivotinju()}></CheckCircleIcon>)}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.zivotinje.map(zivotinja => {
                                return <tr>
                                    <td>{zivotinja.sifraZivotinje}</td>
                                    <td>{zivotinja.imeZivotinje}</td>
                                    <td>{zivotinja.pasmina}</td>
                                    <td>{zivotinja.starost}</td>
                                    <td>{zivotinja.spol}</td>
                                    <td>{zivotinja.vrsta}</td>
                                    <td>.</td>
                                    <td><DeleteIcon className="gumb" onClick={() => this.obrisiZivoinju(zivotinja.sifraZivotinje)}></DeleteIcon></td>
                                    <td><UpdateIcon className="gumb"></UpdateIcon></td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                </div >
            </div>
        )
    }
}

export default TablicaZivotinje;