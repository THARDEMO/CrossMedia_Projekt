<?php

    if( $request_method === 'GET')
    {
        $path = "./DB/notes_available.json";

        $solvedCrimes = get_solved_crimes( $id);

        $notes = find_relations( $solvedCrimes, $path, 'note');

        send_JSON( $notes);
    }



    send_JSON( ["message" => "Method $request_method isn't served at $entity"], 400);
?>