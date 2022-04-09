import React, { Component } from "react";
import TablicaZivotinje from '../Tablice/TablicaZivotinje';
import '../css/tablica.css';
import maca from '../images/maca.bmp';

class Zivotinje extends Component {
    render() {
        return (
                <div className="tablica">
                    <TablicaZivotinje />
                </div>
        )
    }
}

export default Zivotinje;
