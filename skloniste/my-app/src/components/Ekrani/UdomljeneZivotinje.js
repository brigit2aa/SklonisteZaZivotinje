import React, { Component } from "react";
import TablicaUdomiteljeneZivotinje from '../Tablice/TablicaUdomljeneZivotinje';
import '../css/tablica.css';

class UdomljeneZivotinje extends Component {
    render() {
        return (
            <div className="tablica">
                <TablicaUdomiteljeneZivotinje />
            </div>
        )
    }
}

export default UdomljeneZivotinje;