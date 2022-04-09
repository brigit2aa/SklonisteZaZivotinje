import React from "react";
import OsnovniEkran from './OsnovniEkran';
import Izbornik from './Izbornik';
import DesniDioEkrana from './DesniDioEkrana';

function GlavniEkran() {
    return (
        <div className="glavni">
            <Izbornik />
            <DesniDioEkrana />
            <OsnovniEkran />
            
        </div>
    );
}

export default GlavniEkran;