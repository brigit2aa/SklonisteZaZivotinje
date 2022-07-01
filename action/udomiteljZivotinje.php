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

$sifraZivotinje = $_GET['sifraZivotinje'];

//Prikazuje udomitelja od životinje 

try
{
  $sQuery = "SELECT * FROM udomljenazivotinja INNER JOIN udomitelj ON udomitelj.sifraUdomitelja = udomljenazivotinja.sifraUdomiteljaZivotinje WHERE udomljenazivotinja.sifraUdomljeneZivotinje = ?"; 
  $oRecord = $oConnection->prepare($sQuery);
  $oRecord->execute([$sifraZivotinje]);
  $oPoljeUdomiteljZivotinje = [];
while($oRow = $oRecord->fetch(PDO::FETCH_BOTH))
{  
     $oPoljeUdomiteljZivotinje[]= $oRow;  
}
if($oPoljeUdomiteljZivotinje == null){$emptyArray = [];
	echo json_encode($emptyArray);
}
else{
  echo json_encode($oPoljeUdomiteljZivotinje);
}

} 

catch(PDOException $pe)
{
  die("Greška: Nije moguće izvršiti $sQuery. " . $pe->getMessage());
}
?>
