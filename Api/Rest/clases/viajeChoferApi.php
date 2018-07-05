<?php


require_once "viaje-chofer.php";

class viajeChoferApi extends viajeChofer{

    public function AsignarViaje($request, $response, $args) 
     {
 
         $objDelaRespuesta= new stdclass();
         $ArrayDeParametros = $request->getParsedBody();
         //var_dump($ArrayDeParametros);
         $cod_Viaje= $ArrayDeParametros['cod_Viaje'];
         $chofer= $ArrayDeParametros['chofer'];             
         
         $viajeChofer = new viajeChofer();
         $viajeChofer->cod_Viaje=$cod_Viaje;
         $viajeChofer->user=$chofer;
              
         $objDelaRespuesta->respuesta= $respuesta = $viajeChofer->asigViaje();     
                      
        
         return $response->withJson($objDelaRespuesta, 200);
     } 

     public function cambiarEstadoViaje($request, $response, $args) 
    {
     	//$response->getBody()->write("<h1>Modificar  uno</h1>");
         $ArrayDeParametros = $request->getParsedBody();
         $objDelaRespuesta= new stdclass();
	    //var_dump($ArrayDeParametros);
	    $est= $ArrayDeParametros['estado'];        
        $id= $ArrayDeParametros['cod_Viaje'];

         
         $viaje = new viajeChofer();
         $viaje->cod_Viaje = $id;        
         $viaje->estado= $est;
             
        $objDelaRespuesta->respuesta= $respuesta = $viaje->estadoViaje();     
                      
        
        return $response->withJson($objDelaRespuesta, 200);
    }
    public function finViaje($request, $response, $args) 
    {
     	//$response->getBody()->write("<h1>Modificar  uno</h1>");
         $ArrayDeParametros = $request->getParsedBody();
         $objDelaRespuesta= new stdclass();
	    //var_dump($ArrayDeParametros);
	    $est= $ArrayDeParametros['estado'];        
        $id= $ArrayDeParametros['cod_Viaje'];

         
         $viaje = new viajeChofer();
         $viaje->cod_Viaje = $id;        
         $viaje->estado= $est;
             
        $objDelaRespuesta->respuesta= $respuestaUno = $viaje->terminarViaje();
        $objDelaRespuesta->respuesta= $respuestaDos = $viaje->estadoViaje();      
                      
        
        return $response->withJson($objDelaRespuesta, 200);
    }
    public function setFechaFin($request, $response, $args) 
    {
     	//$response->getBody()->write("<h1>Modificar  uno</h1>");
         $ArrayDeParametros = $request->getParsedBody();
         $objDelaRespuesta= new stdclass();
	    //var_dump($ArrayDeParametros);
	    $fechaFin= $ArrayDeParametros['fin'];        
        $id= $ArrayDeParametros['cod_Viaje'];

         
         $viaje = new viajeChofer();
         $viaje->cod_Viaje = $id;        
         $viaje->fechaFin= $fechaFin;
      
             
    
        
        return $viaje->fechaFin();
    }

 
    public function traerViajesChof($request, $response, $args) 
    {
       
        $ArrayDeParametros = $request->getParsedBody();

        //$user= $ArrayDeParametros['user'];

        $viaje = new viajeChofer();        
        $viajes = $viaje->viajesChof();     
                      
        
         return $response->withJson($viajes, 200);
    }

}

?>