
<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: text/json');
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: DELETE");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods");

include_once 'connection.php';


$data = json_decode(file_get_contents("php://input"), true);

$sifraZivotinje = $data["sifraUdomljeneZivotinje"];

try
{
  $sQuery = "DELETE FROM udomljenazivotinja WHERE sifraUdomljeneZivotinje=?"; 
  $oRecord = $oConnection->prepare($sQuery);
  $oRecord->execute([$sifraZivotinje]);
} 
catch(PDOException $pe)
{
  die("Greška: Nije moguće izvršiti $sQuery. " . $pe->getMessage());
}
echo json_encode($data); 

?>