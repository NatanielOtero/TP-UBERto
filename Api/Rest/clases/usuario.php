<?php

  require_once "AccesoDatos.php";
  /**
   *
   */
  class user
  {
    public $user; 
    public $estado;  
    public $nivel;
    
    
    public static function LogearUs($user,$pass)    
    {
     
      $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
      $consulta =$objetoAccesoDato->RetornarConsulta("
        SELECT user , nivel, estado
        FROM usuarios      
        WHERE user=:us AND pass =:p" );   
      $consulta->bindValue(':us',$user, PDO::PARAM_STR);    
      $consulta->bindValue(':p', $pass, PDO::PARAM_STR);     
      $consulta->execute();
      $usuario= $consulta->fetchObject('user');
        return $usuario;
    }
    public function traerTodos()
    {
      $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
      $consulta =$objetoAccesoDato->RetornarConsulta("SELECT user, nivel,estado FROM `usuarios`");
      $consulta->execute();
      //var_dump($consulta->fetchAll(PDO::FETCH_CLASS, "user"));
      return $consulta->fetchAll(PDO::FETCH_CLASS, "user");
    }
    public function altaUs()
    {
          $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
          $consulta =$objetoAccesoDato->RetornarConsulta("
          INSERT INTO `usuarios`(`user`, `pass`, `nivel`)
          VALUES('$this->user','$this->pass',$this->nivel)");
          return $consulta->execute();
         
    }    
    public function modUs()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("
        UPDATE `usuarios`
        SET `estado`= :est
        WHERE `user` = :us ");     
        $consulta->bindValue(':est',$this->estado, PDO::PARAM_INT);       
        $consulta->bindValue(':us', $this->user, PDO::PARAM_STR);
        return $consulta->execute();
    }
    /*
    public static function traerUs($id)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("SELECT `id`, `user`, `pass`, `localidad`  FROM `usuario`  WHERE id = $id");
        $consulta->execute();
        $cdBuscado= $consulta->fetchObject('user');
        return $cdBuscado;
    }
   
    public function bajaUs()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("
          DELETE FROM `usuario` 
          WHERE id=:id");
          $consulta->bindValue(':id',$this->id, PDO::PARAM_INT);
          $consulta->execute();
          return $consulta->rowCount();
    }
    public function altaUs()
    {
          $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
          $consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO `usuario`(`id`,`user`, `pass`, `localidad`) VALUES($this->id,'$this->user','$this->pass','$this->localidad')");
          $consulta->execute();
          return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }
    public function modUs()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $consulta =$objetoAccesoDato->RetornarConsulta("
          update usuario
          set user=:us,
          pass=:p,
          localidad=:l
          WHERE id=:id");
        $consulta->bindValue(':id',$this->id, PDO::PARAM_INT);
        $consulta->bindValue(':us',$this->user, PDO::PARAM_INT);
        $consulta->bindValue(':l',$this->localidad, PDO::PARAM_INT);
        $consulta->bindValue(':p', $this->pass, PDO::PARAM_STR);
        return $consulta->execute();
    }
  }*/
}
?>
