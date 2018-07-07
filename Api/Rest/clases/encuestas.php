<?php

  require_once "AccesoDatos.php";

  class encuesta{

   public  $cod_Viaje;
   public  $chofer;
   public  $user;
   public  $val1;
   public  $val2;
   public  $val3;
   public  $val4;
   public  $val5;
   public  $val6;
   public  $val7;
   public  $val8;

   public function responder(){
    $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
    $consulta =$objetoAccesoDato->RetornarConsulta("
    UPDATE `viajes` SET `respondio`=:resp WHERE `cod_Viaje` = :id");
    $consulta->bindValue(':id',$this->cod_Viaje);
    $consulta->bindValue(':resp',2);   
    return $consulta->execute();
   }

    public function altaEncuesta()
    {
         

          $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
          $consulta =$objetoAccesoDato->RetornarConsulta("
          INSERT INTO `encuesta`(`cod_Viaje`, `chofer`, `user`, `val1`, `val2`, `val3`, `val4`, `val5`, `val6`, `val7`, `val8`) 
          VALUES ($this->cod_Viaje,'$this->chofer','$this->user',$this->val1,$this->val2,$this->val3,$this->val4,$this->val5,$this->val6,$this->val7,$this->val8)");
          $var2 = $consulta->execute();

          if($var2)
          {
            $var1 = $this->responder();
          }else
          {
              return false;
          }

          if($var1 && $var2)
          {
              return true;
          }
          else{
              return false;
          }
         
    }
    public function traerEncuestas()
    {
      $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
      $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM `encuesta`");
      $consulta->execute();
      //var_dump($consulta->fetchAll(PDO::FETCH_CLASS, "user"));
      return $consulta->fetchAll(PDO::FETCH_CLASS, "encuesta");
    }

  }



?>