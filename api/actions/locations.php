<?php
    if( !isset( $required_to_be_true))
    {
        header( "Content-Type: application/json");
        http_response_code( 403);
        $json = json_encode(["message" => "Not allowed to access endpoint directly"]);
        echo $json;
        exit();
    }
    

    $path = "./DB/crimescene_locations.json";

    if( $request_method !== 'GET')
    {
        send_JSON( ["message" => "Method $request_method isn't served at $entity"], 400);
    }

    $all_locations = get_file_data( $path);
    $solved_crimes = get_solved_crimes( $id);

    send_JSON( [
        "locations" => $all_locations,
        "user_solved" => $solved_crimes,
    ]);

?>