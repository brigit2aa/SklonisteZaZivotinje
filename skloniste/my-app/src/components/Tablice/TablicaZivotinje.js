import React, { Component } from "react";
import { Button, Table, Modal } from 'react-bootstrap';
import '../css/tablica.css';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SearchIcon from '@material-ui/icons/Search';

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
            modal: false,
            modalUdomljavanje: false,
            udomiteljiZivotinja: [],
            udomitelji: [],
            showHideUdomitelj: false,
            sifraUdomitelja: "",
            ime: "",
            prezime: "",
            adresa: "",
            email: "",
            telMob: "",
            filterUdomitelja: ""
        }
    }

    dohvatiZivotinje() {
        fetch("http://localhost/WPSP_SPJ_KonstrukcijskiZadatak/action/dohvacanjeZivotinje.php").then(response => response.json())
            .then(response => this.setState({ zivotinje: response }))
    }

    dohvatiUdomiteljaZivotinje(sifraZivotinje) {
        fetch("http://localhost/WPSP_SPJ_KonstrukcijskiZadatak/action/udomiteljZivotinje.php?sifraZivotinje=" + sifraZivotinje).then(response => response.json())
            .then(response => this.setState({ udomiteljiZivotinja: response }))
    }

    dohvatiUdomitelje() {
        fetch("http://localhost/WPSP_SPJ_KonstrukcijskiZadatak/action/dohvacanjeUdomitelja.php").then(response =>
            response.json()).then(response => this.setState({ udomitelji: response }))
    }

    componentDidMount = async () => {
        this.dohvatiZivotinje();
        this.dohvatiUdomiteljaZivotinje();
        this.dohvatiUdomitelje();
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

    dodajUdomitelja() {
        if (window.confirm("Želite li dodati novog udomitelja?")) {
            fetch('http://localhost/WPSP_SPJ_KonstrukcijskiZadatak/action/dodavanjeUdomitelja.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)

            })
            alert('Udomitelj ' + this.state.ime + ' je uspješno dodan!')

            this.setState({
                sifraUdomitelja: "",
                ime: "",
                prezime: "",
                adresa: "",
                email: "",
                telMob: ""
            });
        }
        this.setState({
            showHideUdomitelj: !this.state.showHideUdomitelj,
        });

        this.dohvatiUdomitelje();
    }

    udomiZivotinju(sifraOsobe) {
        if (window.confirm("Želite li udomiti životinju?")) {
            fetch("http://localhost/WPSP_SPJ_KonstrukcijskiZadatak/action/udomiiZivotinju.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sifraUdomljeneZivotinje: this.props.sifraZivotinje,
                    sifraUdomiteljaZivotinje: sifraOsobe
                })

            }).then((result) => {
                result.json().then((response) => {
                    alert("Životinja je udomljena!");
                    this.dohvatiZivotinje();
                })
            })

        }
    };
    trazilica = event => {
        this.setState({ filter: event.target.value });
    };

    trazilicaUdimtelja = event => {
        this.setState({ filterUdomitelja: event.target.value });
    };

    //Modal za prikaz udomitelja životinje
    otvorModalZaUdomljene = (sifraZivotinje) => {
        this.setState({ modal: true });
        this.dohvatiUdomiteljaZivotinje(sifraZivotinje);
    }
    //Zatvaranje modala s prikazom udomitelja životinje
    zatvoriModal = () => this.setState({ modal: false });

    //Modal za prikaz forme za dodavanje udomitelja i udomljavanje
    otvorModalZaUdomljavanje = () => this.setState({ modalUdomljavanje: true });

    //Zatvaranje modala s formom za dodavanje udomitelja i udomljavanje
    zatvoriModalUdomljavanje = () => this.setState({ modalUdomljavanje: false });

    render() {
        //Prikaz forme za dodavanje životinje
        var FormaZaDodavanjeZivotinja = e => {
            this.setState({ showHide: !this.state.showHide });
        }

        const x = this.state.showHide;

        //Prikaz forme za ažuriranje životinje
        var FormaZaAzuriranjeZivotinja = zivotinja => {

            this.setState({
                showHideUpdate: !this.state.showHideUpdate,
                sifraZivotinjeUpdate: zivotinja.sifraZivotinje,
                imeZivotinjeUpdate: zivotinja.imeZivotinje,
                pasminaUpdate: zivotinja.pasmina,
                starostUpdate: zivotinja.starost,
                spolUpdate: zivotinja.spol,
                vrstaUpdate: zivotinja.vrsta
            });
        }

        const y = this.state.showHideUpdate;

        //Prikaz forme za dodavanje udomitelja
        var FormaZaDodavanjeUdomitelja = e => {
            this.state({ showHideUdomitelj: !this.state.showHideUdomitelj });
        }

        const z = this.state.showHideUdomitelj;

        //Tražilica životinja
        const { filter, zivotinje } = this.state;

        var PretraziPodatke = zivotinje.filter(zivotinja => {
            return zivotinja.imeZivotinje.toLowerCase().includes(filter.toLocaleLowerCase()) || zivotinja.vrsta.toLowerCase().includes(filter.toLocaleLowerCase())
        });

        //Tražilica udomitelja
        const { filterUdomitelja, udomitelji } = this.state;

        var PretraziPodatkeUdomitelja = udomitelji.filter(udomitelj => {
            return udomitelj.ime.toLowerCase().includes(filterUdomitelja.toLocaleLowerCase()) || udomitelj.prezime.toLowerCase().includes(filterUdomitelja.toLocaleLowerCase())
        });

        return (
            <div >
                <div className="zaglavljeTablice">
                    <input className="trazilicaZivotinja"
                        type="text"
                        placeholder="Pretraži životinje..." value={filter} onChange={this.trazilica}/><SearchIcon className="gumb"/>
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
                                <th>{x || y ? '' : 'Brisanje'}</th>
                                <th>{x || y ? '' : 'Ažuriranje'}</th>
                            </tr>
                            {/*Forma za dodavanje nove životinje*/}
                            <tr className="margina">
                                <td>{x && (<input placeholder="Šifra..." value={this.state.sifraZivotinje} onChange={(data) => { this.setState({ sifraZivotinje: data.target.value }) }}></input>)}</td>
                                <td>{x && (<input placeholder="Ime..." value={this.state.imeZivotinje} onChange={(data) => { this.setState({ imeZivotinje: data.target.value }) }}></input>)}</td>
                                <td>{x && (<input placeholder="Pasmina..." value={this.state.pasmina} onChange={(data) => { this.setState({ pasmina: data.target.value }) }}></input>)}</td>
                                <td>{x && (<input placeholder="Starost..." value={this.state.starost} onChange={(data) => { this.setState({ starost: data.target.value }) }}></input>)}</td>
                                <td>{x && (<input placeholder="Spol..." value={this.state.spol} onChange={(data) => { this.setState({ spol: data.target.value }) }}></input>)}</td>
                                <td>{x && (<input placeholder="Vrsta..." value={this.state.vrsta} onChange={(data) => { this.setState({ vrsta: data.target.value }) }}></input>)}</td>
                                <td><th>{x && (<Button className="gumbSirina" size="sm" variant="light" onClick={() => this.dodajZivotinju()}><CheckCircleIcon className="gumb" /></Button>)}{x && (<Button className="gumbSirina" size="sm" variant="light" onClick={FormaZaDodavanjeZivotinja}><CloseIcon className="gumb" /></Button>)}</th></td>
                            </tr>
                            {/*Forma za ažuriranje životinje*/}
                            <tr className="margina">
                                <td>{y && (<input disabled name='sifraZivotinje' value={this.state.sifraZivotinjeUpdate} onChange={(data) => { this.setState({ sifraZivotinjeUpdate: data.target.value }) }}></input>)}</td>
                                <td>{y && (<input type='text' name='imeZivotinje' value={this.state.imeZivotinjeUpdate} onChange={(data) => { this.setState({ imeZivotinjeUpdate: data.target.value }) }}></input>)}</td>
                                <td>{y && (<input type='text' name='pasmina' value={this.state.pasminaUpdate} onChange={(data) => { this.setState({ pasminaUpdate: data.target.value }) }}></input>)}</td>
                                <td>{y && (<input type='text' name='ime' value={this.state.starostUpdate} onChange={(data) => { this.setState({ starostUpdate: data.target.value }) }}></input>)}</td>
                                <td>{y && (<input type='text' name='starost' value={this.state.spolUpdate} onChange={(data) => { this.setState({ spolUpdate: data.target.value }) }}></input>)}</td>
                                <td>{y && (<input type='text' name='vrsta' value={this.state.vrstaUpdate} onChange={(data) => { this.setState({ vrstaUpdate: data.target.value }) }}></input>)}</td>
                                <td><th>{y && (<Button className="gumbSirina" size="sm" variant="light" onClick={() => this.azurirajZivotinju()}><CheckCircleIcon className="gumb" /></Button>)}{y && (<Button className="gumbSirina" size="sm" variant="light" onClick={FormaZaAzuriranjeZivotinja}><CloseIcon className="gumb" /></Button>)}</th></td>
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
                                    <td> <> <div> {zivotinja.status ? <Button size="sm" className="gumbSirina" variant="light" onClick={() => this.otvorModalZaUdomljene(zivotinja.sifraZivotinje)}><FavoriteIcon className="status" /></Button> : <Button size="sm" variant="light" onClick={() => this.otvorModalZaUdomljavanje()} >Ud<FavoriteBorderIcon className="status" />mi</Button>}</div>
                                        {/*Modal prikazuje udomitelja od životinje*/}
                                        <Modal show={this.state.modal} onHide={this.zatvoriModal}>
                                            <Modal.Header zatvoriModal className="zaglavljeTablice">
                                                <p className="zivotinjaKodUdomitelja">Udomitelj od životinje</p>
                                                <Modal.Title></Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <div>
                                                    <div>
                                                        {this.state.udomiteljiZivotinja.map(udomiteljZivotinje => {
                                                            return <ul>
                                                                <ol>___________________________________________________________</ol>
                                                                <ol>Šifra: {udomiteljZivotinje.sifraUdomitelja}</ol>
                                                                <ol>Ime: {udomiteljZivotinje.ime}</ol>
                                                                <ol>Prezime: {udomiteljZivotinje.prezime}</ol>
                                                                <ol>Adresa: {udomiteljZivotinje.adresa}</ol>
                                                                <ol>E-mail: {udomiteljZivotinje.email}</ol>
                                                                <ol>Tel/Mob: {udomiteljZivotinje.telMob}</ol>
                                                                <ol>___________________________________________________________</ol>
                                                            </ul>
                                                        })}
                                                    </div >
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="light" size="sm" onClick={this.zatvoriModal}><CloseIcon className="gumb" /></Button>
                                            </Modal.Footer>
                                        </Modal>
                                        {/*Modal prikazuje formu za udomljavanje životinje i dodavanje udomitelja*/}
                                        <Modal size="xl" show={this.state.modalUdomljavanje} onHide={this.zatvoriModalUdomljavanje}>
                                            <Modal.Header zatvoriModal className="zaglavljeTablice">
                                                <p className="naslovUdomi">Udomi životinju</p>
                                                <Modal.Title id="example-modal-sizes-title-xl"></Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <div>
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
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr className="margina">
                                                                    <td><input placeholder="Šifra..." value={this.state.sifraUdomitelja} onChange={(data) => { this.setState({ sifraUdomitelja: data.target.value }) }}></input></td>
                                                                    <td><input placeholder="Ime..." value={this.state.ime} onChange={(data) => { this.setState({ ime: data.target.value }) }}></input></td>
                                                                    <td><input placeholder="Prezime..." value={this.state.prezime} onChange={(data) => { this.setState({ prezime: data.target.value }) }}></input></td>
                                                                    <td><input placeholder="Adresa..." value={this.state.adresa} onChange={(data) => { this.setState({ adresa: data.target.value }) }}></input></td>
                                                                    <td><input placeholder="E-mail..." value={this.state.email} onChange={(data) => { this.setState({ email: data.target.value }) }}></input></td>
                                                                    <td><input placeholder="Tel/Mob..." value={this.state.telMob} onChange={(data) => { this.setState({ telMob: data.target.value }) }}></input></td>
                                                                    <td><Button size="sm" variant="light" onClick={() => this.dodajUdomitelja()}><AddCircleIcon className="gumb" />Dodaj</Button></td>
                                                                </tr>
                                                                {/*this.state.udomitelji*/PretraziPodatkeUdomitelja.map(udomitelj => {
                                                                    return <tr>
                                                                        <td>{udomitelj.sifraUdomitelja}</td>
                                                                        <td>{udomitelj.ime}</td>
                                                                        <td>{udomitelj.prezime}</td>
                                                                        <td>{udomitelj.adresa}</td>
                                                                        <td>{udomitelj.email}</td>
                                                                        <td>{udomitelj.telMob}</td>
                                                                        <td><Button variant="light" size="sm" onClick={() => this.state.udomiZivotinju(udomitelj.sifraUdomiteljaZivotinje)}> Ud<FavoriteBorderIcon className="gumb" />mi</Button></td>
                                                                    </tr>
                                                                })}
                                                            </tbody>
                                                        </Table>
                                                    </div >
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <input className="trazilicaZivotinja" type="text" placeholder="Pretraži udomitelje..." value={filterUdomitelja} onChange={this.trazilicaUdimtelja}/><SearchIcon className="gumb"/>
                                                <Button variant="light" size="sm" onClick={this.zatvoriModalUdomljavanje}><CloseIcon className="gumb" /></Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </></td>
                                    <td><Button className="gumbSirina" size="sm" variant="light" onClick={() => this.obrisiZivoinju(zivotinja.sifraZivotinje)}><DeleteIcon className="gumb" ></DeleteIcon></Button></td>
                                    <td> <Button className="gumbSirina" size="sm" variant="light" onClick={() => FormaZaAzuriranjeZivotinja(zivotinja)}><UpdateIcon className="gumb" ></UpdateIcon></Button></td>
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
