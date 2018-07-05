<?php


require_once "chofer.php";

class choferApi extends chofer{

    public function AltaChofer($request, $response, $args) 
    {
 
         $objDelaRespuesta= new stdclass();
         $ArrayDeParametros = $request->getParsedBody();
         //var_dump($ArrayDeParametros);
         $name= $ArrayDeParametros['user'];        
         $comodidad= $ArrayDeParametros['comodidad'];    
         
         $user = new chofer();
         $user->user=$name;
         $user->comodidad=$comodidad;
              
         $objDelaRespuesta->respuesta= $respuesta = $user->altaChof();     
                      
        
         return $response->withJson($objDelaRespuesta, 200);
    }
    public function TraerAll($request, $response, $args) 
    {
        $usuarios= chofer::traerTodos();
     	$newresponse = $response->withJson($usuarios, 200);
    	return $newresponse;
    }
    public function ModificarChof($request, $response, $args) 
    {
     	//$response->getBody()->write("<h1>Modificar  uno</h1>");
     	$ArrayDeParametros = $request->getParsedBody();
	    //var_dump($ArrayDeParametros);
	    $user = new chofer();	   
	    $user->user=$ArrayDeParametros['user'];
        $user->estado=$ArrayDeParametros['estado'];       
        
        return	$resultado =$user->modCho();
       
    }
   
}

?>