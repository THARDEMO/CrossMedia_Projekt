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

        $finalCodes = get_file_data( './DB/final_code.json');
        $solved_crimes = get_solved_crimes( $id);

        $solved_codes = [];
        foreach( $solved_crimes as $crime)
        {
            foreach( $finalCodes as $code) 
            {
                if( $code['crime_id'] != $crime['crime_id']) continue;
                $solved_codes[] = $code;
            }
        }

        send_JSON( $solved_codes);
    }

    send_JSON( ["message" => "Method $request_method isn't served at $entity"], 400);
?>