<?php
include_once 'connection.php';
include_once 'zivotinja.php';

class Macka extends Zivotinja
{
	public $status = "";

	public function __construct($sifraZivotinje, $imeZivotinje, $pasmina, $starost, $spol, $vrsta, $status)
	{
		$this->status = $status;
		parent::__construct($sifraZivotinje, $imeZivotinje, $pasmina, $starost, $spol, $vrsta);

	}
}
?>