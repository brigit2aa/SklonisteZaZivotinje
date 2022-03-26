<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: text/json');
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods");


include 'connection.php';
include 'zivotinja.php';
include 'udomitelj.php';

$sifraUdomitelja = $_GET['sifraUdomitelja'];

try
{
  $sQuery = "SELECT * FROM udomljenazivotinja INNER JOIN zivotinja ON zivotinja.sifraZivotinje = udomljenazivotinja.sifraUdomljeneZivotinje WHERE udomljenazivotinja.sifraUdomitelja = ?"; 
  $oRecord = $oConnection->prepare($sQuery);
  $oRecord->execute([$sifraUdomitelja]);
  $oPoljeZivotinjaKodUdomitelja = [];
while($oRow = $oRecord->fetch(PDO::FETCH_BOTH))
{  
     $oPoljeZivotinjaKodUdomitelja[]= $oRow;  
}
if($oPoljeZivotinjaKodUdomitelja == null){$emptyArray = [];
	echo json_encode($emptyArray);
}
else{
  echo json_encode($oPoljeZivotinjaKodUdomitelja);
}

} 

catch(PDOException $pe)
{
  die("Greška: Nije moguće izvršiti $sQuery. " . $pe->getMessage());
}

?>