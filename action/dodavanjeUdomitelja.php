<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods");

include_once 'connection.php';
include 'udomitelj.php';

$data = json_decode(file_get_contents("php://input"), true);

$sifraUdomitelja = $data['sifraUdomitelja'];
$ime = $data['ime'];
$prezime = $data['prezime'];
$adresa = $data['adresa'];
$email = $data['email'];
$telMob = $data['telMob'];
 
try
{
  $sQuery = "INSERT INTO udomitelj (sifraUdomitelja, ime, prezime, adresa, email, telMob)
  VALUES (?, ?, ?, ?, ?, ?)";
  $oRecord = $oConnection->prepare($sQuery);
  $oRecord->execute([$sifraUdomitelja, $ime, $prezime, $adresa, $email, $telMob]);
  echo "Udomitelj je uspješno dodan.";
} 
catch(PDOException $pe)
{
  die("Greška: Nije moguće izvršiti $sQuery. " . $pe->getMessage());
}
echo json_encode($data);
?>