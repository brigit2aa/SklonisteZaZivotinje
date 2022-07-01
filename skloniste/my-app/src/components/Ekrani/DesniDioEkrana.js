import React, { Component } from 'react';
import maca from '../images/maca.bmp';

class DesniDioEkrana extends Component {
    render() {
        return (
            <div>
                <img className='maca' src={maca} />
            </div>
        );
    }
}

export default DesniDioEkrana;