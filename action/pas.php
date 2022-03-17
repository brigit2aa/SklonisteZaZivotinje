<?php

include_once 'zivotinja.php'

class Pas extends Zivotinja
{
	public $status = "";
	
	function __construct($sifraZivotinje, $imeZivotinje, $pasmina, $starost, $spol, $vrsta, $status)
	{
		$this->status = $status;
	}
}
?>