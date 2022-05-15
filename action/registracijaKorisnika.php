<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods");

include_once 'connection.php';
include 'korisnik.php';

$data = json_decode(file_get_contents("php://input"), true);

$imeKorisnika = $data['imeKorisnika'];
$prezimeKorisnika = $data['prezimeKorisnika'];
$korisnickoIme = $data['korisnickoIme'];
$lozinka = $data['lozinka'];

try
{
  $sQuery = "INSERT INTO korisnik (imeKorisnika, prezimeKorisnika, korisnickoIme, lozinka)
  VALUES (?, ?, ?, ?)";
  $oRecord = $oConnection->prepare($sQuery);
  $oRecord->execute([$imeKorisnika, $prezimeKorisnika, $korisnickoIme, $lozinka]);
  echo "Korisnik je uspješno dodan.";
} 
catch(PDOException $pe)
{
  die("Greška: Nije moguće izvršiti $sQuery. " . $pe->getMessage());
}
echo json_encode($data);
?>