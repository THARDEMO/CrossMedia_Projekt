<?php

    $path = "./DB/crimescene.json";

    if( $request_method === 'GET')
    {
        $all_crimescenes = get_file_data( $path);

        foreach( $all_crimescenes as $crimescene) 
        {
            if( $crimescene["id"] != $id) continue;
            send_JSON( [$crimescene]);
        }

        send_JSON( ["message" => "CrimeScene with id: $id does not exist"], 404);
    }

    if( $request_method === 'POST')
    {
        if( isset( $request_data['key_code']))
        {
            $code = $request_data['key_code'];
            $all_crimescenes = get_file_data( $path);

            foreach( $all_crimescenes as $crimescene) 
            {
                if( $crimescene['key_code'] != $code) continue;
                send_JSON( ["crime_id" => $crimescene['id']]);
            }

            send_JSON( ['message' => 'No matching crimescene was found'], 404);
        }


        send_JSON( ["message" => "Working on POST"]);
    }

    send_JSON( ["message" => "Method $request_method isn't served at $entity"], 400);
?>