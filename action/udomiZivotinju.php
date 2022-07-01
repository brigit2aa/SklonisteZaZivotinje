<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods");

include_once 'connection.php';


$data = json_decode(file_get_contents("php://input"), true);

$sifraUdomljeneZivotinje = $data['sifraUdomljeneZivotinje'];
$sifraUdomiteljaZivotinje = $data['sifraUdomiteljaZivotinje'];
 
try
{
  $sQuery = "INSERT INTO udomljenazivotinja (sifraUdomljeneZivotinje, sifraUdomiteljaZivotinje) VALUES (?,?)";
  $oRecord = $oConnection->prepare($sQuery);
  $oRecord->execute([$sifraUdomljeneZivotinje, $sifraUdomiteljaZivotinje]);
  echo "Životinja je uspješno udomljena";
} 
catch(PDOException $pe)
{
  die("Greška: Nije moguće izvršiti $sQuery. " . $pe->getMessage());
}
?>