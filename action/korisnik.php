<?php

class Korisnik 
{

    public $imeKorisnika = "";
    public $prezimeKorisnika = "";
    public $korisnickoIme = "";
    public $lozinka= "";
	
	public function __construct($imeKorisnika, $prezimeKorisnika, $korisnickoIme, $lozinka)
	{
        $this->imeKorisnika = $imeKorisnika;
        $this->prezimeKorisnika = $prezimeKorisnika;
        $this->korisnickoIme = $korisnickoIme;
        $this->lozinka = $lozinka;
	}
}
?>