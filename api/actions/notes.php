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

        $path = "./DB/notes_available.json";

        $solvedCrimes = get_solved_crimes( $id);

        $notes = find_relations( $solvedCrimes, $path, 'note');
        remove_notis( $id, 'note');


        send_JSON( $notes);
    }


    send_JSON( ["message" => "Method $request_method isn't served at $entity"], 400);
?>