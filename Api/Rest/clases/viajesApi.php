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
         
         $viaje = new viajes();
         $viaje->fecha=$fe;
         $viaje->comodidad=$co;
         $viaje->pago=$pa; 
         $viaje->latOr=$latOr;
         $viaje->latDes=$latDes;
         $viaje->lonOr=$lonOr;
         $viaje->lonDes=$lonDes;
         $viaje->user=$user;
          
                
         $objDelaRespuesta->respuesta= $respuesta = $viaje->pedirViaje();     
                      
        
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






    }

?>