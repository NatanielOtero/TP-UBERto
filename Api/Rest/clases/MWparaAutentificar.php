<?php

require_once "AutentificadorJWT.php";
require_once "usuario.php";
require_once "usuarioApi.php";

class MWparaAutentificar
{
 /**
   * @api {any} /MWparaAutenticar/  Verificar Usuario
   * @apiVersion 0.1.0
   * @apiName VerificarUsuario
   * @apiGroup MIDDLEWARE
   * @apiDescription  Por medio de este MiddleWare verifico las credeciales antes de ingresar al correspondiente metodo 
   *
   * @apiParam {ServerRequestInterface} request  El objeto REQUEST.
 * @apiParam {ResponseInterface} response El objeto RESPONSE.
 * @apiParam {Callable} next  The next middleware callable.
   *
   * @apiExample Como usarlo:
   *    ->add(\MWparaAutenticar::class . ':VerificarUsuario')
   */
   ///LOGIN SIN MIDDLEWARE
   /**/ 
   public function getToken()
   {
		$token = null;
		$headers = apache_request_headers();
		$headers = $headers['Authorization'];
		if (!empty($headers)) {
			if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
				$token = $matches[1];
			}
		}	
		return $token;
   }  

	public function VerificarAdministrador($request, $response, $next)
	{
		$objDelaRespuesta  = new stdclass();
		$objDelaRespuesta->respuesta="";
		$user="";
		$nivel=0;

	
			$token = $this->getToken();			
			if($token == null)
			{
				$objDelaRespuesta->respuesta="Solo usuarios registrados";
				$objDelaRespuesta->token=$token;
				$respuesta = $response->withJson($objDelaRespuesta, 200); 
				return $respuesta;	
			}
			else
			{
				try
				{
					AutentificadorJWT::verificarToken($token);				
					$objDelaRespuesta->esValido=true;  
					
				}
				catch (Exception $e) {   
					
											
					$objDelaRespuesta->respuesta=$e->getMessage();
					$objDelaRespuesta->esValido=false;
					$respuesta = $response->withJson($objDelaRespuesta, 200); 
					return $respuesta;			

				}

				if($objDelaRespuesta->esValido)
				{
					$payload=AutentificadorJWT::ObtenerData($token);
					if($payload->nivel==1)
					{	
						
						//si es administrador pasa
						$response = $next($request, $response);
						return $response;
					}		           	
					else
					{	
						$objDelaRespuesta->respuesta="Solo administradores";
						$objDelaRespuesta->tienePermiso=false;
						$respuesta = $response->withJson($objDelaRespuesta, 200); 
						return $respuesta;			
					}
					
				}
				else
				{
					$objDelaRespuesta->respuesta= "Error, solo usarios registrados";
					$objDelaRespuesta->esValido=false;
					$respuesta = $response->withJson($objDelaRespuesta, 200); 
					return $respuesta;
					
				}
			}		
		
	}
	public function VerificarChofer($request, $response, $next)
	{
		$objDelaRespuesta  = new stdclass();
		$objDelaRespuesta->respuesta="";
		$user="";
		$nivel=0;

			$token = $this->getToken();			
			if($token == null)
			{
				$objDelaRespuesta->respuesta="Solo usuarios registrados";
				$objDelaRespuesta->token=$token;
				$respuesta = $response->withJson($objDelaRespuesta, 200); 
				return $respuesta;	
			}
			else
			{
				try
				{
					AutentificadorJWT::verificarToken($token);				
					$objDelaRespuesta->esValido=true;  
					
				}
				catch (Exception $e) {   
					
											
					$objDelaRespuesta->respuesta=$e->getMessage();
					$objDelaRespuesta->esValido=false;
					$objDelaRespuesta->tienePermiso=false;
					$respuesta = $response->withJson($objDelaRespuesta, 200); 
					return $respuesta;			

				}

				if($objDelaRespuesta->esValido)
				{
					$payload=AutentificadorJWT::ObtenerData($token);
					if($payload->nivel==1 || $payload->nivel==2)
					{	
						
						//si es administrador pasa
						$response = $next($request, $response);
						return $response;
					}		           	
					else
					{	
						$objDelaRespuesta->respuesta="Solo administradores o choferes";
						$objDelaRespuesta->tienePermiso=false;
						$respuesta = $response->withJson($objDelaRespuesta, 200); 
						return $respuesta;			
					}
					
				}
				else
				{
					$objDelaRespuesta->respuesta= "Error, solo usarios registrados";
					$objDelaRespuesta->esValido=false;
					$objDelaRespuesta->tienePermiso=false;
					$respuesta = $response->withJson($objDelaRespuesta, 200); 
					return $respuesta;
					
				}
			}		
		
	}
	public function VerificarUsuario($request, $response, $next)
	{
		$objDelaRespuesta  = new stdclass();
		$objDelaRespuesta->respuesta="";
		$user="";
		$nivel=0;

			$token = $this->getToken();			
			if($token == null)
			{
				$objDelaRespuesta->respuesta="Solo usuarios registrados";
				$objDelaRespuesta->token=$token;
				$respuesta = $response->withJson($objDelaRespuesta, 200); 
				return $respuesta;	
			}
			else
			{
				try
				{
					AutentificadorJWT::verificarToken($token);				
					$objDelaRespuesta->esValido=true;  
					
				}
				catch (Exception $e) {   
					
											
					$objDelaRespuesta->respuesta=$e->getMessage();
					$objDelaRespuesta->esValido=false;
					$respuesta = $response->withJson($objDelaRespuesta, 200); 
					return $respuesta;			

				}

				if($objDelaRespuesta->esValido)
				{
					$payload=AutentificadorJWT::ObtenerData($token);
					if($payload->nivel==1 || $payload->nivel==3)
					{	
						
						//si es administrador pasa
						$response = $next($request, $response);
						return $response;
					}		           	
					else
					{	
						$objDelaRespuesta->respuesta="Solo administradores o usuarios";
						$objDelaRespuesta->tienePermiso=false;
						$respuesta = $response->withJson($objDelaRespuesta, 200); 
						return $respuesta;			
					}
					
				}
				else
				{
					$objDelaRespuesta->respuesta= "Error, solo usarios registrados";
					$objDelaRespuesta->esValido=false;
					$respuesta = $response->withJson($objDelaRespuesta, 200); 
					return $respuesta;
					
				}
			}		
		
	}


	
	

	
  
	/*public function VerificarUsuario($request, $response, $next) {

	
		$objDelaRespuesta= new stdclass();
		$objDelaRespuesta->respuesta="";
		$user="";
		$nivel=0;		
		$parsedBody="";
		$objDelaRespuesta->esValido=true; 
		//$usuario = new usuario;
		$usuarios = [];

		if($request->isGet())
		{
		// $response->getBody()->write('<p>NO necesita credenciales para los get </p>');
			 
			$response = $next($request, $response);
		}
		else
		{
			
			$arrayConToken = $request->getHeader('token');	
			if($arrayConToken == null)
			{
				$objDelaRespuesta->respuesta="Solo usuarios registrados";
				$response->withJson($objDelaRespuesta, 401); 
				return $response; 			
			}				
			else
			{
				$token=$arrayConToken[0];
			}			

			$parsedBody = $request->getParsedBody();
						
			$user = $parsedBody['user'];			

			try 
			{
				
				AutentificadorJWT::verificarToken($token);				
				$objDelaRespuesta->esValido=true;      
			}
			catch (Exception $e) {   
				
										
				$objDelaRespuesta->excepcion=$e->getMessage();
				$objDelaRespuesta->esValido=false;     
			}

			if($objDelaRespuesta->esValido)
			{						
				if($request->isPost())
				{		
					// el post sirve para todos los logeados			    
					$response = $next($request, $response);
				}
				else
				{
					$payload=AutentificadorJWT::ObtenerData($token);
					//var_dump($payload);
					// DELETE,PUT y DELETE sirve para todos los logeados y admin
					if($payload->nivel==1)
					{
						$response = $next($request, $response);
					}		           	
					else
					{	
						$objDelaRespuesta->respuesta="Solo administradores";
					}
				}		          
			}    
			else
			{
				//   $response->getBody()->write('<p>no tenes habilitado el ingreso</p>');
				$objDelaRespuesta->respuesta="Solo usuarios registrados";
				$objDelaRespuesta->elToken=$token;

			}  
			//return var_dump($token);
		}		  
		if($objDelaRespuesta->respuesta!="")
		{
			$nueva=$response->withJson($objDelaRespuesta, 401);  
			return $nueva;
		}
		  
		 //$response->getBody()->write('<p>vuelvo del verificador de credenciales</p>');
		 return $response;   
	}*/
}
?>