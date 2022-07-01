<?php
$host = 'localhost';
$dbname = 'pin_skloniste';
$username = 'root';
$password = '';

try
{
    $oConnection = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $oConnection->exec("set names utf8");
}
catch (PDOException $pe)
{
	die("Povezivanje s bazom podataka nije uspjelo $dbname :" . $pe->getMessage());
}



?>
