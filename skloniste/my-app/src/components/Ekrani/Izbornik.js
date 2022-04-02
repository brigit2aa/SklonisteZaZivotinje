import React from 'react';
import { Link} from 'react-router-dom';

function Izbornik (){
    return(
        <div className="izbornik">
            <Link className="izbornikLink" to="/">Životinje</Link>
            <Link className="izbornikLink" to="/Udomitelji">Udomitelji</Link>
            <Link className="izbornikLink" to="/UdomljeneZivotinje">Udomljene životinje</Link>
        </div>
    );
}

export default Izbornik;