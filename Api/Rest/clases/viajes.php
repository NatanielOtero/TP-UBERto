<?php

  require_once "AccesoDatos.php";

  class viajes{

    
    public $fecha;
    public $comodidad;
    public $pago;
    public $latOr;
    public $lonOr;
    public $latDes;
    public $lonDes;
    public $user;
    

    public function pedirViaje()
    {
          $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
          $consulta =$objetoAccesoDato->RetornarConsulta("
          INSERT INTO `viajes`(`fecha`, `comodidad`, `pago`, `latOr`, `lonOr`, `latDes`, `lonDes`,`user`)
          VALUES('$this->fecha',$this->comodidad,'$this->pago',$this->latOr,$this->lonOr,$this->latDes,$this->lonDes,'$this->user')");
          return $consulta->execute();
         
    }
    public function viajesUs()
    {

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
          $consulta =$objetoAccesoDato->RetornarConsulta("
          SELECT * FROM `viajes`");
          $consulta->execute();
          return $consulta->fetchAll(PDO::FETCH_CLASS, "viajes");
          /*$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
          $consulta =$objetoAccesoDato->RetornarConsulta("
          SELECT * FROM `viajes` WHERE `user` = '$us'  AND `estado` = 1");
          $consulta->execute();
          return $consulta->fetchAll(PDO::FETCH_CLASS, "viajes");*/
         
    }

  }



?>