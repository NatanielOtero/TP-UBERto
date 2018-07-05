<?php

  require_once "AccesoDatos.php";

  class chofer{

    public $user;
    public $comodidad;
    
    public function altaChof()
    {
          $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
          $consulta =$objetoAccesoDato->RetornarConsulta("
          INSERT INTO `choferes`(`user`, `comodidad`)
          VALUES('$this->user',$this->comodidad)");
          return $consulta->execute();
         
    } 
    public function traerTodos()
    {
      $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
      $consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM `choferes`");
      $consulta->execute();
      //var_dump($consulta->fetchAll(PDO::FETCH_CLASS, "user"));
      return $consulta->fetchAll(PDO::FETCH_CLASS, "chofer");
    }
    public function modCho()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("
        UPDATE `choferes`
         SET `estado`= :est
         WHERE `user` = :us ");  
        $consulta->bindValue(':us', $this->user, PDO::PARAM_STR);   
        $consulta->bindValue(':est',$this->estado, PDO::PARAM_INT);      
       
        return $consulta->execute();
    }
    

  }



?>