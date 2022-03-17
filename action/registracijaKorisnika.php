<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods");

include_once 'connection.php';
include 'korisnik.php';

$data = json_decode(file_get_contents("php://input"), true);

$sifraKorisnika =$data['sifraKorisnika'];
$imeKorisnika = $data['imeKorisnika'];
$prezimeKorisnika = $data['prezimeKorisnika'];
$korisnickoIme = $data['korisnickoIme'];
$lozinka = $data['lozinka'];
$ponovljenaLozinka = $data['ponovljenaLozinka'];

try
{
  $sQuery = "INSERT INTO korisnik (sifraKorisnika, imeKorisnika, prezimeKorisnika, korisnickoIme, lozinka, ponovljenaLozinka)
  VALUES (?, ?, ?, ?, ?, ?, ?)";
  $oRecord = $oConnection->prepare($sQuery);
  $oRecord->execute([$sifraKorisnika, $imeKorisnika, $prezimeKorisnika, $korisnickoIme, $lozinka, $ponovljenaLozinka]);
  echo "Korisnik je uspješno dodan.";
} 
catch(PDOException $pe)
{
  die("Greška: Nije moguće izvršiti $sQuery. " . $pe->getMessage());
}
echo json_encode($data);
?>