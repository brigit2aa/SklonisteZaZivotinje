import React, { Component } from "react";
import TablicaUdomitelji from '../Tablice/TablicaUdomitelji';
import '../css/tablica.css';

class Udomitelji extends Component {
    render() {
        return (
            <div className="tablica">
                <TablicaUdomitelji />
            </div>
        )
    }
}

export default Udomitelji;