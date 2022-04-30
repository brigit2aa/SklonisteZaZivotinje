<?php
header('Content-type: text/json');
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

include 'connection.php';
include 'zivotinja.php';
include 'udomitelj.php';

$sQuery = "SELECT zivotinja.sifraZivotinje, zivotinja.imeZivotinje, zivotinja.pasmina, zivotinja.starost, zivotinja.spol, zivotinja.vrsta, udomitelj.sifraUdomitelja, udomitelj.ime, udomitelj.prezime, udomitelj.adresa, udomitelj.email, udomitelj.telMob  FROM zivotinja 
INNER JOIN udomljenazivotinja ON udomljenazivotinja.sifraUdomljeneZivotinje = zivotinja.sifraZivotinje
INNER JOIN udomitelj ON udomitelj.sifraUdomitelja = udomljenazivotinja.sifraUdomiteljaZivotinje AND udomljenazivotinja.sifraUdomljeneZivotinje = zivotinja.sifraZivotinje";

$oRecord = $oConnection->query($sQuery);
$oPoljeZivotinja = array();
while($oRow = $oRecord->fetch(PDO::FETCH_BOTH))
{ 
    $oPoljeZivotinja[] = $oRow;
}
echo json_encode($oPoljeZivotinja);
?>                                           