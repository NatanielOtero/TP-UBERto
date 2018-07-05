<?php

require_once "usuario.php";
require_once "AutentificadorJWT.php";
/**
 *
 */
class userApi extends user 
{

    public function Logear($request, $response, $args) 
     {	
        $ArrayDeParametros = $request->getParsedBody();
       
       
	    $user=$ArrayDeParametros['user'];
        $pass=$ArrayDeParametros['pass'];       
        $usuario=user::LogearUs($user,$pass);

        if(!$usuario)
        {
            $objDelaRespuesta= new stdclass();
            $objDelaRespuesta->error="no se encuentra";
            $NuevaRespuesta = $response->withJson($objDelaRespuesta, 200);
        }
        else
        {     // CREO EL TOKEN
            //$NuevaRespuesta = $response->withJson($usuario, 200);   
            if($usuario->estado == 1)
            {
                $token= AutentificadorJWT::CrearToken($usuario);
                $NuevaRespuesta = $response->withJson($token,200);
            }else
            {
                $objDelaRespuesta= new stdclass();
                $objDelaRespuesta->error="baneado";
                $NuevaRespuesta = $response->withJson($objDelaRespuesta, 200);

            }
           
        }

        return $NuevaRespuesta;

     }
     public function Registro($request, $response, $args) 
     {
 
         $objDelaRespuesta= new stdclass();
         $ArrayDeParametros = $request->getParsedBody();
         //var_dump($ArrayDeParametros);
         $name= $ArrayDeParametros['user'];
         $pass= $ArrayDeParametros['pass'];
         $nivel= $ArrayDeParametros['nivel'];    
         
         $user = new user();
         $user->user=$name;
         $user->pass=$pass;
         $user->nivel=$nivel;        
         $objDelaRespuesta->respuesta= $respuesta = $user->altaUs();     
                      
        
         return $response->withJson($objDelaRespuesta, 200);
     }
     public function TraerAll($request, $response, $args) 
    {
        $usuarios= user::traerTodos();
     	$newresponse = $response->withJson($usuarios, 200);
    	return $newresponse;
    }
    public function ModificarUno($request, $response, $args) 
    {
     	//$response->getBody()->write("<h1>Modificar  uno</h1>");
     	$ArrayDeParametros = $request->getParsedBody();
	    //var_dump($ArrayDeParametros);
	    $user = new user();	   
	    $user->user=$ArrayDeParametros['user'];
        $user->estado=$ArrayDeParametros['estado'];       
        
        return	$resultado =$user->modUs();
       
    }
     /*
    public function TraerUno($request, $response, $args) 
    {
     	$id=$args['id'];
        $usuario=user::traerUs($id);

        if(!$usuario)
        {
            $objDelaRespuesta= new stdclass();
            $objDelaRespuesta->error="no se encuentra";
            $NuevaRespuesta = $response->withJson($objDelaRespuesta, 500);
        }
        else
        {
            $NuevaRespuesta = $response->withJson($usuario, 200);
        }

        return $NuevaRespuesta;
    }

    public function TraerAll($request, $response, $args) 
    {
        $usuarios= user::traerTodos();
     	$newresponse = $response->withJson($usuarios, 200);
    	return $newresponse;
    }

    public function CargarUno($request, $response, $args) 
    {

        $objDelaRespuesta= new stdclass();
        $ArrayDeParametros = $request->getParsedBody();
        var_dump($ArrayDeParametros);
        $name= $ArrayDeParametros['user'];
        $pass= $ArrayDeParametros['pass'];
        $id= $ArrayDeParametros['id'];
        $localidad = $ArrayDeParametros['localidad'];
        
        $user = new user();
        $user->user=$name;
        $user->pass=$pass;
        $user->id=$id;
        $user->localidad=$localidad;
        $user->altaUs();
       /* $archivos = $request->getUploadedFiles();
        $destino="./fotos/";
        //var_dump($archivos);
        //var_dump($archivos['foto']);
        if(isset($archivos['foto']))
        {
            $nombreAnterior=$archivos['foto']->getClientFilename();
            $extension= explode(".", $nombreAnterior)  ;
            //var_dump($nombreAnterior);
            $extension=array_reverse($extension);
            $archivos['foto']->moveTo($destino.$titulo.".".$extension[0]);
        }*/
        //$response->getBody()->write("se guardo el cd");
        /*
        $objDelaRespuesta->respuesta="Se guardo el Usuario.";
        return $response->withJson($objDelaRespuesta, 200);
    }
    
    public function BorrarUno($request, $response, $args) 
    {
     	$ArrayDeParametros = $request->getParsedBody();
     	$id=$ArrayDeParametros['id'];
     	$us= new user();
     	$us->id=$id;
     	$cantidadDeBorrados=$us->bajaUs();

     	$objDelaRespuesta= new stdclass();
	    $objDelaRespuesta->cantidad=$cantidadDeBorrados;
	    if($cantidadDeBorrados>0)
        {
            $objDelaRespuesta->resultado="algo borro!!!";
        }
        else
        {
            $objDelaRespuesta->resultado="no Borro nada!!!";
        }
	    $newResponse = $response->withJson($objDelaRespuesta, 200);
      	return $newResponse;
    }

    public function ModificarUno($request, $response, $args) 
    {
     	//$response->getBody()->write("<h1>Modificar  uno</h1>");
     	$ArrayDeParametros = $request->getParsedBody();
	    //var_dump($ArrayDeParametros);
	    $user = new user();
	    $user->id=$ArrayDeParametros['id'];
	    $user->user=$ArrayDeParametros['user'];
        $user->pass=$ArrayDeParametros['pass'];
        $user->localidad=$ArrayDeParametros['localidad'];
        $usuario=user::traerUs($user->id);
        if(!$usuario)
        {
            $objDelaRespuesta= new stdclass();
            $objDelaRespuesta->error="No se encuentra";
           return $response->withJson($objDelaRespuesta, 500);
        }
        else
        {
           	$resultado =$user->modUs();
            $objDelaRespuesta= new stdclass();		
          
                $objDelaRespuesta->respuesta=$resultado; 
                $objDelaRespuesta->resultado="Modifico";   
        }
		return $response->withJson($objDelaRespuesta, 200);
    }*/
}
?>
