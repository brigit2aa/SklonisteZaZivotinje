<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: text/json');
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: DELETE");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods");

include_once 'connection.php';
include 'zivotinja.php';

$data = json_decode(file_get_contents("php://input"), true);

$sifraZivotinje = $data["sifraZivotinje"];

try
{
  $sQuery = "DELETE FROM zivotinja WHERE sifraZivotinje=?"; 
  $oRecord = $oConnection->prepare($sQuery);
  $oRecord->execute([$sifraZivotinje]);
  //echo "Životinja je uspješno obrisana. " $sifraZivotinje;
} 
catch(PDOException $pe)
{
  die("Greška: Nije moguće izvršiti $sQuery. " . $pe->getMessage());
}
echo json_encode($data); 

?>