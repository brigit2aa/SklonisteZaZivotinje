<?php
header('Content-type: text/json');
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

include 'connection.php';
include 'korisnik.php';

$sQuery = "SELECT * FROM korisnik";
$oRecord = $oConnection->query($sQuery);
$oKorisnici = array();
while($oRow=$oRecord->fetch(PDO::FETCH_BOTH)){
    $sifraKorisnika =$oRow['sifraKorisnika'];
    $imeKorisnika = $oRow['imeKorisnika'];
    $prezimeKorisnika = $oRow['prezimeKorisnika'];
    $korisnickoIme = $oRow['korisnickoIme'];
    $lozinka = $oRow['lozinka'];
    $ponovljenaLozinka = $oRow['ponovljenaLozinka'];
    $oKorisnik = new Korisnik($sifraKorisnika, $imeKorisnika, $prezimeKorisnika, $korisnickoIme, $lozinka, $ponovljenaLozinka);
    array_push($oKorisnici, $oKorisnik);
    }

    echo json_encode($oKorisnici);
?>