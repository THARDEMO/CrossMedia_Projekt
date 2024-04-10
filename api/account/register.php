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

    $unavailable_ids = [];
    foreach( $users_instances as $user) 
    {
        $unavailable_ids[] = $user['id'];
    }

    $condition = false; 
    while( empty($condition))
    {
        $generated_array = array_rand( [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 8);
        $id = implode($generated_array); 
    
        if( in_array( $id, $unavailable_ids)) 
        {
            continue;
        }

        $condition = true;
    }

    $pw_hash = hash( "sha256", $password);

    $newUser = [
        "id" => $id,
        "username" => $username,
        "password" => $pw_hash,
    ];

    $users_instances[] = $newUser;

    if( !attempt_write( $path, $users_instances))
    {
        send_JSON( ['message' => 'Error during registration', 500]);
    }
  
    send_JSON( ['message' => "Registration complete $username, continue to Login"]);

?>