<?php

    if( $request_method === 'GET')
    {
        $path = "./DB/crimescene.json";
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
        send_JSON( ["message" => "Working on POST"]);
    }

    send_JSON( ["message" => "Method $request_method isn't served at $entity"], 400);
?>