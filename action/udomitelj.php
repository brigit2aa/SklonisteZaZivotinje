<?php

class Udomitelj 
{
	public $sifraUdomitelja = "";
	public $ime = "";
	public $prezime = "";
	public $adresa = "";
	public $email = "";
	public $telMob = ""; 

	function __construct($sifraUdomitelja, $ime, $prezime, $adresa, $email, $telMob)
	{
		$this->sifraUdomitelja = $sifraUdomitelja;
		$this->ime = $ime;
		$this->prezime = $prezime;
		$this->adresa = $adresa;
		$this->email = $email;
		$this->telMob = $telMob;
	}
}
?>