<?php
header('Content-type: text/json');
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

include 'connection.php';
include 'udomitelj.php';

$sQuery = "SELECT * FROM udomitelj";
$oRecord = $oConnection->query($sQuery);
$oUdomitelji = array();
while($oRow=$oRecord->fetch(PDO::FETCH_BOTH)){
    $sifraUdomitelja = $oRow['sifraUdomitelja'];
    $ime = $oRow['ime'];
    $prezime = $oRow['prezime'];
    $adresa = $oRow['adresa'];
    $email = $oRow['email'];
    $telMob = $oRow['telMob'];
    $oUdomitelj = new Udomitelj($sifraUdomitelja, $ime, $prezime, $adresa, $email, $telMob);
    array_push($oUdomitelji, $oUdomitelj);
    }
    
    echo json_encode($oUdomitelji);
?>