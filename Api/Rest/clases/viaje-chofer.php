<?php

  require_once "AccesoDatos.php";

  class viajeChofer{

    public $cod_Viaje;
    public $user;
    public $estado;
    public $fecha;
    public $fechaFin;
    public $comodidad;
    public $cobro;

    public function asigViaje()
    {
          $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
          $consulta =$objetoAccesoDato->RetornarConsulta("
          INSERT INTO `chof_viaje`(`cod_Viaje`, `user`,`fecha`,`cobro`)
          VALUES($this->cod_Viaje,'$this->user','$this->fecha',$this->cobro)");
          return $consulta->execute();
         
    }
    public function estadoViaje()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("
        UPDATE `viajes` SET         
          `estado`=:est 
        WHERE cod_Viaje =:id");  
        $consulta->bindValue(':id',$this->cod_Viaje);   
        $consulta->bindValue(':est',$this->estado);
        return $consulta->execute();
    }

    public function terminarViaje()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("
        UPDATE `chof_viaje` SET         
          `estado`=:est 
        WHERE cod_Viaje =:id");  
        $consulta->bindValue(':id',$this->cod_Viaje);   
        $consulta->bindValue(':est',$this->estado);
        return $consulta->execute();
    }
    public function fechaFin()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("
        UPDATE `viajes` SET         
          `fechaFin`=:est 
        WHERE cod_Viaje =:id");  
        $consulta->bindValue(':id',$this->cod_Viaje);   
        $consulta->bindValue(':est',$this->fechaFin);
        return $consulta->execute();
    }

    
    public function viajesChof()
    {

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
          $consulta =$objetoAccesoDato->RetornarConsulta("
          SELECT * FROM `chof_viaje`");
          $consulta->execute();
          return $consulta->fetchAll(PDO::FETCH_CLASS, "viajeChofer");         
         
    }

  }



?>