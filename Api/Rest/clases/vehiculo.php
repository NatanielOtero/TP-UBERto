<?php

  require_once "AccesoDatos.php";

  class vehiculo{

    public $patente;
    public $marca;
    public $modelo;

    public function altaVehi()
    {
          $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
          $consulta =$objetoAccesoDato->RetornarConsulta("
          INSERT INTO `vehiculos`(`patente`, `marca`, `modelo`)
          VALUES('$this->patente','$this->marca','$this->modelo')");
          return $consulta->execute();
         
    }

  }



?>