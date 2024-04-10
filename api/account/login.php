<?php

    require_once '../index.php';

    if( $request_method != 'POST')
    {
        send_JSON(['message' => 'Invalid Method'], 405);
    }

    if( !isset( $request_data[ 'username']) || !isset( $request_data[ 'password'])) 
    {
        send_JSON( ['message' => 'Missing Keys'], 400);
    }

    $username = $request_data[ 'username'];
    $password = $request_data[ 'password'];

    $path = '../DB/users.json';
    $users_instances = get_file_data( $path);

    foreach( $users_instances as $user)
    {
        if( $user['username'] == $username && $user['password'] == hash( "sha256", $password)) {
            send_JSON( $user['id']);
        }
    }

    send_JSON( ['message' => 'Wrong Username or Password'], 404);
?>