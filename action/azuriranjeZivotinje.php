<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods");

include_once 'connection.php';
include 'zivotinja.php';

$data = json_decode(file_get_contents("php://input"), true);

$sifraZivotinje = $data["sifraZivotinje"];
$imeZivotinje = $data['imeZivotinje'];
$pasmina = $data['pasmina'];
$starost = $data['starost'];
$spol = $data['spol'];
$vrsta = $data['vrsta'];

try
{
  $sQuery = "UPDATE zivotinja SET imeZivotinje=?, pasmina=?, starost=?, spol=?, vrsta=? WHERE sifraZivotinje=?";
  $oRecord = $oConnection->prepare($sQuery);
  $oRecord->execute([$imeZivotinje, $pasmina, $starost, $spol, $vrsta, $sifraZivotinje]);
  echo "Životinja je uspješno ažurirana.";
} 
catch(PDOException $pe)
{
  die("Greška: Nije moguće izvršiti $sQuery. " . $pe->getMessage());
}
echo json_encode($data);
?>