<?php
session_start();
$existe = file_exists('./vendor/autoload.php');
if ($existe){
    require 'facebookConfig/facebook.php';
    require './vendor/autoload.php';
} else {
    require 'facebookConfig/facebook.php';
    require '../vendor/autoload.php';
}
use Facebook\FacebookSession;
use Facebook\FacebookRedirectLoginHelper;
use Facebook\FacebookRequest;
use Facebook\FacebookResponse;
use Facebook\GraphUser;
use Facebook\GraphLocation;
use Facebook\GraphObject;
use Facebook\FacebookRequestException;
FacebookSession::setDefaultApplication($config['app_id'], $config['app_secret']);
$helper = new FacebookRedirectLoginHelper('http://localhost:8000/index.php');
try {
  $session = $helper->getSessionFromRedirect();
  if($session){      
      $_SESSION['facebook'] = $session->getToken();
      header('Location: index.php');
  }
  if(isset($_SESSION['facebook'])){
      $session = new FacebookSession($_SESSION['facebook']);
      $request = new FacebookRequest($session, 'GET', '/me?locale=en_US&fields=name,email');
      $response = $request->execute();
      $graphObjectClass = $response->getGraphObject(GraphUser::className()); 
      $facebook_user = $graphObjectClass;
  }
} catch(FacebookRequestException $ex) {
} catch(\Exception $ex) {
}

