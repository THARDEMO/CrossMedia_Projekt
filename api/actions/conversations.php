<?php
    if( !isset( $required_to_be_true))
    {
        header( "Content-Type: application/json");
        http_response_code( 403);
        $json = json_encode(["message" => "Not allowed to access endpoint directly"]);
        echo $json;
        exit();
    }

    if( $request_method === 'GET')
    {
        if( !$id) send_JSON( ["message" => "Param id is required"], 400);
        validate_user( $id);
        
        $conversations = get_file_data( './DB/conversations.json');

        send_JSON( $conversations);
    }


    send_JSON( ["message" => "Method $request_method isn't served at $entity"], 400);
?>