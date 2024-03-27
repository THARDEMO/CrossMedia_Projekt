<?php

    require_once 'index.php';

    if( $request_method != 'GET')
    {
        send_JSON( 'Invalid Method', 405);
    }

    if( !isset( $_GET[ 'username']) || !isset( $_GET[ 'password'])) 
    {
        send_JSON( 'Missing Keys', 400);
    }

    $username = $_GET[ 'username'];
    $password = $_GET[ 'password'];

    $path = './DB/users.json';
    $users_instances = get_file_data( $path);

    foreach( $users_instances as $user)
    {
        if( $user['username'] == $username && $user['password'] == $password) {
            send_JSON( $user['id']);
        }
    }

    send_JSON( 'Wrong Username or Password', 404);
?>