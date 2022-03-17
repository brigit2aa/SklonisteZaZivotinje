<?php

class Korisnik 
{

	public $sifraKorisnika = "";
    public $imeKorisnika = "";
    public $prezimeKorisnika = "";
    public $korisnickoIme = "";
    public $lozinka= "";
    public $ponovljenaLozinka= "";
	
	function __construct($sifraKorisnika, $imeKorisnika, $prezimeKorisnika, $korisnickoIme, $lozinka, $ponovljenaLozinka)
	{
		$this->sifraKorisnika = $sifraKorisnika;
        $this->imeKorisnika = $imeKorisnika;
        $this->prezimeKorisnika = $prezimeKorisnika;
        $this->korisnickoIme = $korisnickoIme;
        $this->lozinka = $lozinka;
        $this->ponovljenaLozinka = $ponovljenaLozinka;
	}
}
?>