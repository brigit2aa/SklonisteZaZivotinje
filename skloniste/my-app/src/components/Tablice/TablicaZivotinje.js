import React, { Component } from "react";
import { Button, Table } from 'react-bootstrap';
import '../css/tablica.css';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PetsIcon from '@material-ui/icons/Pets';
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
            showHideUpdate: false,
            filter: "",
            sifraZivotinjeUpdate: "",
            imeZivotinjeUpdate: "",
            pasminaUpdate: "",
            starostUpdate: "",
            spolUpdate: "",
            vrstaUpdate: "",
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
        if (window.confirm("Želite li dodati novu životinju?")) {
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
        }

        this.setState({
            showHide: !this.state.showHide,
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

    async azurirajZivotinju() {
        if (window.confirm("Želite li ažurirati životinju")) {
            fetch('http://localhost/WPSP_SPJ_KonstrukcijskiZadatak/action/azuriranjeZivotinje.php', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sifraZivotinje: this.state.sifraZivotinjeUpdate,
                    imeZivotinje: this.state.imeZivotinjeUpdate,
                    pasmina: this.state.pasminaUpdate,
                    starost: this.state.starostUpdate,
                    spol: this.state.spolUpdate,
                    vrsta: this.state.vrstaUpdate
                })
            }).then((result) => {
                result.json().then((response) => {
                    alert("Životinja je ažurirana!");
                    this.setState({
                        imeZivotinjeUpdate: "",
                        pasminaUpdate: "",
                        starostUpdate: "",
                        spolUpdate: "",
                        vrstaUpdate: ""
                    });

                    this.setState({
                        showHideUpdate: !this.state.showHideUpdate
                    });

                    this.dohvatiZivotinje();
                    
                })
            })
        }
    };

    trazilica = event => {
        this.setState({ filter: event.target.value });
    };

    render() {

        var FormaZaDodavanjeZivotinja = e => {
            this.setState({ showHide: !this.state.showHide });
        }


        const x = this.state.showHide;

        var FormaZaAzuriranjeZivotinja = zivotinja => {
            
            this.setState({ showHideUpdate: !this.state.showHideUpdate, 
                sifraZivotinjeUpdate: zivotinja.sifraZivotinje,
                imeZivotinjeUpdate: zivotinja.imeZivotinje,
                pasminaUpdate: zivotinja.pasmina,
                starostUpdate: zivotinja.starost,
                spolUpdate: zivotinja.spol,
                vrstaUpdate: zivotinja.vrsta});
        }

        const y = this.state.showHideUpdate;

        const { filter, zivotinje } = this.state;

        var PretraziPodatke = zivotinje.filter(zivotinja => {
            return zivotinja.imeZivotinje.toLowerCase().includes(filter.toLocaleLowerCase()) || zivotinja.vrsta.toLowerCase().includes(filter.toLocaleLowerCase())
        });

        return (
            <div >
                <div className="zaglavljeTablice">
                    <input className="trazilicaZivotinja"
                        type="text"
                        placeholder="Pretraži životinje..." value={filter} onChange={this.trazilica} />
                    <p className="naslov">Životinje</p>
                    <AddCircleIcon className="dodaj" onClick={FormaZaDodavanjeZivotinja}>{x ? '<AddCircleIcon/>' : '<AddCircleIcon/>'}</AddCircleIcon>
                </div>
                <div>
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>Šifra</th>
                                <th>Ime</th>
                                <th>Pasmina</th>
                                <th>Starost</th>
                                <th>Spol</th>
                                <th>Vrsta</th>
                                <th>{x || y ? 'Spremi' : 'Status'}</th>
                                <th>{x || y? '' : 'Brisanje'}</th>
                                <th>{x || y? '' : 'Ažuriranje'}</th>
                            </tr>
                            {/*Forma za dodavanje nove životinje*/}
                            <tr className="margina">
                                <td>{x && (<input placeholder="Šifra..." value={this.state.sifraZivotinje} onChange={(data) => { this.setState({ sifraZivotinje: data.target.value }) }}></input>)}</td>
                                <td>{x && (<input placeholder="Ime..." value={this.state.imeZivotinje} onChange={(data) => { this.setState({ imeZivotinje: data.target.value }) }}></input>)}</td>
                                <td>{x && (<input placeholder="Pasmina..." value={this.state.pasmina} onChange={(data) => { this.setState({ pasmina: data.target.value }) }}></input>)}</td>
                                <td>{x && (<input placeholder="Starost..." value={this.state.starost} onChange={(data) => { this.setState({ starost: data.target.value }) }}></input>)}</td>
                                <td>{x && (<input placeholder="Spol..." value={this.state.spol} onChange={(data) => { this.setState({ spol: data.target.value }) }}></input>)}</td>
                                <td>{x && (<input placeholder="Vrsta..." value={this.state.vrsta} onChange={(data) => { this.setState({ vrsta: data.target.value }) }}></input>)}</td>
                                <td><th>{x && (<CheckCircleIcon className="spremi" onClick={() => this.dodajZivotinju()}></CheckCircleIcon>)}{x &&(<CloseIcon className="odustani" onClick={FormaZaDodavanjeZivotinja}/>)}</th></td>
                            </tr>
                            {/*Forma za ažuriranje životinje*/}
                            <tr className="margina">
                                <td>{y && (<input disabled name='sifraZivotinje' value={this.state.sifraZivotinjeUpdate} onChange={(data) => { this.setState({ sifraZivotinjeUpdate: data.target.value }) }}></input>)}</td>
                                <td>{y && (<input type='text' name='imeZivotinje' value={this.state.imeZivotinjeUpdate} onChange={(data) => { this.setState({ imeZivotinjeUpdate: data.target.value }) }}></input>)}</td>
                                <td>{y && (<input type='text' name='pasmina' value={this.state.pasminaUpdate} onChange={(data) => { this.setState({ pasminaUpdate: data.target.value }) }}></input>)}</td>
                                <td>{y && (<input type='text' name='ime' value={this.state.starostUpdate} onChange={(data) => { this.setState({ starostUpdate: data.target.value }) }}></input>)}</td>
                                <td>{y && (<input type='text' name='starost' value={this.state.spolUpdate} onChange={(data) => { this.setState({ spolUpdate: data.target.value }) }}></input>)}</td>
                                <td>{y && (<input type='text' name='vrsta' value={this.state.vrstaUpdate} onChange={(data) => { this.setState({ vrstaUpdate: data.target.value }) }}></input>)}</td>
                                <td><th>{y && (<CheckCircleIcon className="spremi" onClick={() => this.azurirajZivotinju()}></CheckCircleIcon>)}{y &&(<CloseIcon className="odustani" onClick={FormaZaAzuriranjeZivotinja}/>)}</th></td>
                            </tr>
                        </thead>
                        <tbody>
                            {/*this.state.zivotinje*/PretraziPodatke.map(zivotinja => {
                                return <tr>
                                    <td>{zivotinja.sifraZivotinje}</td>
                                    <td>{zivotinja.imeZivotinje}</td>
                                    <td>{zivotinja.pasmina}</td>
                                    <td>{zivotinja.starost}</td>
                                    <td>{zivotinja.spol}</td>
                                    <td>{zivotinja.vrsta}</td>
                                    <td>{zivotinja.status ? <FavoriteIcon className="status"/> : <PetsIcon className="status"/>}</td>
                                    <td><DeleteIcon className="gumb" onClick={() => this.obrisiZivoinju(zivotinja.sifraZivotinje)}></DeleteIcon></td>
                                    <td> <UpdateIcon className="gumb" onClick={() => FormaZaAzuriranjeZivotinja(zivotinja)}></UpdateIcon></td>
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
