<?php
    require_once 'index.php';

    if( $request_method != 'POST')
    {
        send_JSON( 'Invalid Method', 405);
    }

    if( !isset( $request_data[ 'entity'])) 
    {
        send_JSON( ['message' => 'Missing Keys'], 400);   
    }

    $entity = $request_data[ 'entity'];

    $path = "./actions/$entity.php";
    if( !file_exists( $path)) 
    {
        send_JSON( ['message' => 'Entity & Relating action could not be found'], 404);
    }

    require_once "./actions/$entity.php";
?>
