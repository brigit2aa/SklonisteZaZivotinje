<?php

class Zivotinja
{
	public $sifraZivotinje = "";
	public $imeZivotinje = "";
	public $pasmina = "";
	public $starost = "";
	public $spol = "";
	public $vrsta = "";
	public $status = "";
	
	public function __construct($sifraZivotinje, $imeZivotinje, $pasmina, $starost, $spol, $vrsta, $status)
	{
		$this->sifraZivotinje = $sifraZivotinje;
		$this->imeZivotinje = $imeZivotinje;
		$this->pasmina = $pasmina;
		$this->starost = $starost;
		$this->spol = $spol;
		$this->vrsta = $vrsta;
		$this->status = $status;
	}
}
?>          