<?php


require_once "vehiculo.php";

class vehiculoApi extends vehiculo{

    public function AltaVehiculo($request, $response, $args) 
     {
 
         $objDelaRespuesta= new stdclass();
         $ArrayDeParametros = $request->getParsedBody();
         //var_dump($ArrayDeParametros);
         $patente= $ArrayDeParametros['patente'];
         $marca= $ArrayDeParametros['marca'];
         $modelo= $ArrayDeParametros['modelo'];  
         $chofer= $ArrayDeParametros['chofer'];      
         
         $vehiculo = new vehiculo();
         $vehiculo->patente=$patente;
         $vehiculo->marca=$marca;
         $vehiculo->modelo=$modelo;    
         $vehiculo->chofer=$chofer;      
         $objDelaRespuesta->respuesta= $respuesta = $vehiculo->altaVehi();     
                      
        
         return $response->withJson($objDelaRespuesta, 200);
     } 
}

?>