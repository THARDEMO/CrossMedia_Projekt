<?php

    if( $request_method === 'GET')
    {
        $path = "./DB/messages_available.json";

        $solvedCrimes = get_solved_crimes( $id);
    
        $messages = find_relations( $solvedCrimes, $path, 'message');

        send_JSON( $messages);
    }





    send_JSON( ["message" => "Method $request_method isn't served at $entity"], 400);
?>