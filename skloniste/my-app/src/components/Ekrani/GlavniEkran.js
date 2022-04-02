import React from "react";
import OsnovniEkran from './OsnovniEkran';
import Izbornik from './Izbornik';
import { BrowserRouter as Router } from 'react-router-dom';

function GlavniEkran() {
    return (
        <div className="glavniEkran">
            
                <Izbornik />
                <OsnovniEkran />
        </div>
    );
}

export default GlavniEkran;