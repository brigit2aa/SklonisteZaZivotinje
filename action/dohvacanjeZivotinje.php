<?php
header('Content-type: text/json');
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

include 'connection.php';
include 'zivotinja.php';

$sQuery = "SELECT * FROM zivotinja";
$oRecord = $oConnection->query($sQuery);
$oZivotinje = array();
while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)){
    $sifraZivotinje = $oRow['sifraZivotinje'];
    $imeZivotinje = $oRow['imeZivotinje'];
    $pasmina = $oRow['pasmina'];
    $starost = $oRow['starost'];
    $spol = $oRow['spol'];
    $vrsta = $oRow['vrsta'];

    $oZivotinja = new Zivotinja($sifraZivotinje, $imeZivotinje, $pasmina, $starost, $spol, $vrsta);
    array_push($oZivotinje, $oZivotinja);
}
echo json_encode($oZivotinje);
