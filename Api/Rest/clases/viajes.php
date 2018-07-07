<?php

  require_once "AccesoDatos.php";
  require_once "usuario.php";

  class viajes{

    public $cod_Viaje;
    public $fecha;
    public $comodidad;
    public $pago;
    public $latOr;
    public $lonOr;
    public $latDes;
    public $lonDes;
    public $user;
    public $costo;
    public $distancia;
    public $respondio;
   
    
    public function VerificarUser()    
    {
     
      $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
      $consulta =$objetoAccesoDato->RetornarConsulta("
        SELECT user , nivel, estado
        FROM usuarios      
        WHERE user=:us" );   
      $consulta->bindValue(':us',$this->user, PDO::PARAM_STR);  
        
      $consulta->execute();
      $usuario= $consulta->fetchObject('user');
      if($usuario->estado == 2)
      {
          return false;
      }
      else
      {
        return true;
      }
        
    }
    public function pedirViaje()
    {
          $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
          $consulta =$objetoAccesoDato->RetornarConsulta("
          INSERT INTO `viajes`(`fecha`, `comodidad`, `pago`, `latOr`, `lonOr`, `latDes`, `lonDes`,`user`,`costo`,`distancia`)
          VALUES('$this->fecha',$this->comodidad,'$this->pago',$this->latOr,$this->lonOr,$this->latDes,$this->lonDes,'$this->user',$this->costo,$this->distancia)");
          return $consulta->execute();
         
    }
    public function viajesUs()
    {

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
          $consulta =$objetoAccesoDato->RetornarConsulta("
          SELECT * FROM `viajes` ORDER BY `cod_Viaje`");
          $consulta->execute();
          return $consulta->fetchAll(PDO::FETCH_CLASS, "viajes");
          /*$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
          $consulta =$objetoAccesoDato->RetornarConsulta("
          SELECT * FROM `viajes` WHERE `user` = '$us'  AND `estado` = 1");
          $consulta->execute();
          return $consulta->fetchAll(PDO::FETCH_CLASS, "viajes");*/
         
    }
    public function bajaViaje()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("
          UPDATE `viajes`
          SET `estado`= :est
          WHERE `cod_Viaje` = :id");
          $consulta->bindValue(':id',$this->cod_Viaje, PDO::PARAM_INT);
          $consulta->bindValue(':est',$this->estado, PDO::PARAM_INT);
          return $consulta->execute();         
    }
    public function modViaje()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("
        UPDATE `viajes` SET
          `fecha`=:fe,
          `comodidad`=:com,
          `pago`=:pag,
          `latOr`=:lto,
          `lonOr`=:lno,
          `latDes`=:ltd,
          `lonDes`=:lnd 
        WHERE cod_Viaje =:id");
        $consulta->bindValue(':id',$this->cod_Viaje);
        $consulta->bindValue(':fe',$this->fecha);
        $consulta->bindValue(':com',$this->comodidad);
        $consulta->bindValue(':pag', $this->pago);
        $consulta->bindValue(':lto', $this->latOr);
        $consulta->bindValue(':lno', $this->lonOr);
        $consulta->bindValue(':ltd', $this->latDes);
        $consulta->bindValue(':lnd', $this->lonDes);
        return $consulta->execute();
    }
   

  }



?>