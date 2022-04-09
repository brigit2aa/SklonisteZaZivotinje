import React from 'react';
import {Routes, Route } from 'react-router-dom';
import Udomitelji from './Udomitelji';
import UdomljeneZivotinje from './UdomljeneZivotinje';
import Zivotinje from './Zivotinje';

function OsnovniEkran() {
    return (
        <div className="osnovniEkran">

                <Routes>
                    <Route exact path="/Udomitelji" element={<Udomitelji />} />
                    <Route exact path="/UdomljeneZivotinje" element={<UdomljeneZivotinje />} />
                    <Route exact path="/" element={<Zivotinje />} />
                </Routes>
        </div>
    );
}

export default OsnovniEkran;
