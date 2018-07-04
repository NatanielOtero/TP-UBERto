<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;


require '../composer/vendor/autoload.php';
require_once './clases/AccesoDatos.php';
require_once './clases/usuarioApi.php';
require_once './clases/vehiculoApi.php';
require_once './clases/viajesApi.php';
require_once './clases/choferApi.php';
require_once './clases/viajeChoferApi.php';
require_once './clases/AutentificadorJWT.php';
require_once './clases/MWparaCORS.php';
require_once './clases/MWparaAutentificar.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;


/*

¡La primera línea es la más importante! A su vez en el modo de
desarrollo para obtener información sobre los errores
 (sin él, Slim por lo menos registrar los errores por lo que si está utilizando
  el construido en PHP webserver, entonces usted verá en la salida de la consola
  que es útil).

  La segunda línea permite al servidor web establecer el encabezado Content-Length,
  lo que hace que Slim se comporte de manera más predecible.
*/

$app = new \Slim\App(["settings" => $config]);



$app->group('/Publico', function () {

  $this->post('/Logear', \userApi::class . ':Logear');
  $this->post('/Registro', \userApi::class . ':Registro'); 


});

$app->group('/Administrador', function () {
  
  //MANEJO DE USUARIOS
  $this->get('/traer',\userApi::class . ':TraerAll');
  $this->post('/Alta', \userApi::class . ':Registro');
  //MANEJO VEHICULOS
  $this->post('/AltaVehi', \vehiculoApi::class . ':AltaVehiculo');
  //MANEJO CHOFERES
  $this->post('/AltaChofer', \choferApi::class . ':AltaChofer');
  $this->get('/traerChoferes',\choferApi::class . ':TraerAll');
  //MANEJO VIAJES
  $this->post('/AsigViaje', \viajeChoferApi::class . ':AsignarViaje');
  $this->get('/Viajes', \viajesApi::class . ':traerViajesUs');
  $this->put('/EstadoViaje',\viajeChoferApi::class . ':cambiarEstadoViaje');
  
})->add(\MWparaAutentificar::class . ':VerificarAdministrador');

$app->group('/Chofer', function () {
  
  $this->get('/ViajesChofer', \viajeChoferApi::class . ':traerViajesChof');
  $this->put('/finViaje',\viajeChoferApi::class . ':finViaje');
  
  
});

$app->group('/Usuario', function () {
  
  $this->post('/PedirViaje', \viajesApi::class . ':AltaViaje');
  $this->get('/ViajesUsuario', \viajesApi::class . ':traerViajesUs');
  $this->delete('/BorrarViaje',\viajesApi::class . ':BorrarViaje');
  $this->put('/ModViaje',\viajesApi::class . ':ModificarViaje');
  
})->add(\MWparaAutentificar::class . ':VerificarUsuario');







$app->run();
