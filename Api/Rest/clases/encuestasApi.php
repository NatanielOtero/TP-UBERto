<?php


require_once "encuestas.php";

class encuestaApi extends encuesta{

    public function AltaEncu($request, $response, $args) 
     {
 
         $objDelaRespuesta= new stdclass();
         $ArrayDeParametros = $request->getParsedBody();
         //var_dump($ArrayDeParametros);            
         
         $encuesta = new encuesta();
         $encuesta->cod_Viaje= $ArrayDeParametros['cod_Viaje'];
         $encuesta->chofer= $ArrayDeParametros['chofer'];
         $encuesta->user= $ArrayDeParametros['user'];
         $encuesta->val1= $ArrayDeParametros['val1'];
         $encuesta->val2= $ArrayDeParametros['val2'];
         $encuesta->val3= $ArrayDeParametros['val3'];
         $encuesta->val4= $ArrayDeParametros['val4'];
         $encuesta->val5= $ArrayDeParametros['val5'];
         $encuesta->val6= $ArrayDeParametros['val6'];
         $encuesta->val7= $ArrayDeParametros['val7'];
         $encuesta->val8= $ArrayDeParametros['val8'];
         $objDelaRespuesta->respuesta= $respuesta = $encuesta->altaEncuesta();     
                      
        
         return $response->withJson($objDelaRespuesta, 200);
     } 
     public function TraerAllEnc($request, $response, $args) 
     {
          $usuarios= encuesta::traerEncuestas();
          $newresponse = $response->withJson($usuarios, 200);
         return $newresponse;
     }
}

?>