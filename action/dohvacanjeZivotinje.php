<?php
header('Content-type: text/json');
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

include 'connection.php';
include 'zivotinja.php';
include 'pas.php';
include 'macka.php';

//$sQuery = "SELECT * FROM zivotinja";
$sQuery = "SELECT * FROM zivotinja LEFT JOIN udomljenazivotinja ON zivotinja.sifraZivotinje = udomljenazivotinja.sifraUdomljeneZivotinje";
$oRecord = $oConnection->query($sQuery);
$oZivotinje = array();
while ($oRow = $oRecord->fetch(PDO::FETCH_BOTH)){
    $status;
    if($oRow ["sifraUdomljeneZivotinje"] != null)
    {
        $status = true;
    }
    else{
        $status = false;
    }
    $sifraZivotinje = $oRow['sifraZivotinje'];
    $imeZivotinje = $oRow['imeZivotinje'];
    $pasmina = $oRow['pasmina'];
    $starost = $oRow['starost'];
    $spol = $oRow['spol'];
    $vrsta = $oRow['vrsta'];

    $oZivotinja = new Zivotinja($sifraZivotinje, $imeZivotinje, $pasmina, $starost, $spol, $vrsta, $status);
    array_push($oZivotinje, $oZivotinja);
}
echo json_encode($oZivotinje);
