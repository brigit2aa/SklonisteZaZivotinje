import React from 'react';
import {Link} from 'react-router-dom';
import '../css/izbornik.css';
import logoSklonista from '../images/blogo.png';

function Izbornik (){
    return(
        <div className="izbornik">
            <div className="logo">
            <img className='logoSklonista' src={logoSklonista} />
            </div>
            <Link className="izbornikLink" to="/">Životinje</Link>
            <Link className="izbornikLink" to="/Udomitelji">Udomitelji</Link>
            <Link className="izbornikLink" to="/UdomljeneZivotinje">Udomljene životinje</Link>

            
        </div>
        
    );
}

export default Izbornik;