<?php
    require_once 'index.php';

    if( $request_method != 'GET')
    {
        send_JSON( ['message' => 'Invalid Method'], 405);
    }

    if( !isset( $_GET[ 'entity'])) 
    {
        send_JSON( ['message' => 'Missing Keys'], 400);
    }

    $entity = $_GET[ 'entity'];
    $id = false;

    $type_id = 'id';
    if( isset( $_GET['id'])) $id = $_GET['id'];

    $path = "./actions/$entity.php";
    if( !file_exists( $path)) 
    {
        send_JSON( ['message' => 'Entity & Relating action could not be found'], 404);
    }
     
    require_once "./actions/$entity.php";

?>