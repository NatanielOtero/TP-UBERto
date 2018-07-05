<?php

  require_once "AccesoDatos.php";

  class vehiculo{

    public $patente;
    public $marca;
    public $modelo;
    public $chofer;

    public function altaVehi()
    {
          $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
          $consulta =$objetoAccesoDato->RetornarConsulta("
          INSERT INTO `vehiculos`(`patente`, `marca`, `modelo`,`chofer`)
          VALUES('$this->patente','$this->marca','$this->modelo','$this->chofer')");
          return $consulta->execute();
         
    }

  }



?>