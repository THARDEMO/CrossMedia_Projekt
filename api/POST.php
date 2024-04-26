<?php
    require_once 'index.php';

    if( $request_method != 'POST')
    {
        send_JSON( 'Invalid Method', 405);
    }

    if( !isset( $request_data[ 'entity']) || !isset( $request_data['user_id'])) 
    {
        send_JSON( ['message' => 'Missing Obligatory Keys'], 400);   
    }

    $entity = $request_data[ 'entity'];
    $user_id = $request_data[ 'user_id'];


    validate_user( $user_id);
    // $all_users = get_file_data( "./DB/users.json");

    // foreach( $all_users as $user) 
    // {
        // if( $user['id'] === $user_id)
        // {
            $path = "./actions/$entity.php";
            if( !file_exists( $path)) 
            {
                send_JSON( ['message' => 'Entity & Relating action could not be found'], 404);
            }
        
            require_once "./actions/$entity.php";
        // }
    // }   

    send_JSON( ["message" => "Access denied"], 403);

?>
