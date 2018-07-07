<?php


require_once "viajes.php";

class viajesApi extends viajes{

    public function AltaViaje($request, $response, $args) {
 
         $objDelaRespuesta= new stdclass();
         $ArrayDeParametros = $request->getParsedBody();
         //var_dump($ArrayDeParametros);
         $fe= $ArrayDeParametros['fecha'];
         $co= $ArrayDeParametros['comodidad'];
         $pa= $ArrayDeParametros['pago'];
         $latOr= $ArrayDeParametros['latOr'];
         $latDes= $ArrayDeParametros['latDes'];
         $lonOr= $ArrayDeParametros['lonOr'];
         $lonDes= $ArrayDeParametros['lonDes'];
         $user= $ArrayDeParametros['user'];
         $cost= $ArrayDeParametros['costo'];
         $dist= $ArrayDeParametros['distancia'];
         
         $viaje = new viajes();
         $viaje->fecha=$fe;
         $viaje->comodidad=$co;
         $viaje->pago=$pa; 
         $viaje->latOr=$latOr;
         $viaje->latDes=$latDes;
         $viaje->lonOr=$lonOr;
         $viaje->lonDes=$lonDes;
         $viaje->user=$user;
         $viaje->costo = $cost;
         $viaje->distancia = $dist;
          
         $valido = $viaje->VerificarUser();
         if($valido)
         {
            $objDelaRespuesta->respuesta= $respuesta = $viaje->pedirViaje();   
         }
         else
         {
            $objDelaRespuesta->respuesta= $respuesta = $valido;
            $objDelaRespuesta->mensaje= $mensaje = "Usuario invalido";
         }
               
              
                      
        
         return $response->withJson($objDelaRespuesta, 200);
     } 

     public function traerViajesUs($request, $response, $args) 
    {
       
        $ArrayDeParametros = $request->getParsedBody();

        //$user= $ArrayDeParametros['user'];

        $viaje = new viajes();        
        $viajes = $viaje->viajesUs();     
                      
        
         return $response->withJson($viajes, 200);
    }
    public function BorrarViaje($request, $response, $args) 
    {
     	$ArrayDeParametros = $request->getParsedBody();
         $cod_Viaje=$ArrayDeParametros['cod_Viaje'];
         $est=$ArrayDeParametros['estado'];
     	 $viaje= new viajes();
         $viaje->cod_Viaje=$cod_Viaje;
         $viaje->estado=$est;
         $objDelaRespuesta= new stdclass();
         $objDelaRespuesta->respuesta= $respuesta = $viaje->bajaViaje();

     	
	  
         return $response->withJson($objDelaRespuesta, 200);
      	
    }
    public function ModificarViaje($request, $response, $args) 
    {
     	//$response->getBody()->write("<h1>Modificar  uno</h1>");
         $ArrayDeParametros = $request->getParsedBody();
         $objDelaRespuesta= new stdclass();
	    //var_dump($ArrayDeParametros);
	    $fe= $ArrayDeParametros['fecha'];
         $co= $ArrayDeParametros['comodidad'];
         $pa= $ArrayDeParametros['pago'];
         $latOr= $ArrayDeParametros['latOr'];
         $latDes= $ArrayDeParametros['latDes'];
         $lonOr= $ArrayDeParametros['lonOr'];
         $lonDes= $ArrayDeParametros['lonDes'];
         $id= $ArrayDeParametros['cod_Viaje'];

         
         $viaje = new viajes();
         $viaje->cod_Viaje = $id;
         $viaje->fecha=$fe;
         $viaje->comodidad=$co;
         $viaje->pago=$pa; 
         $viaje->latOr=$latOr;
         $viaje->latDes=$latDes;
         $viaje->lonOr=$lonOr;
         $viaje->lonDes=$lonDes;
             
        $objDelaRespuesta->respuesta= $respuesta = $viaje->modViaje();     
                      
        
        return $response->withJson($objDelaRespuesta, 200);
    }







    }

?>