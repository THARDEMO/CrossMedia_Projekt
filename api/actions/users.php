<?php

    if( $request_method === 'GET')
    {

        $path = "./DB/users.json";
        $users = get_file_data( $path);

        $filtered_users = [];
        
        foreach( $users as $user) 
        {
            if( $id && $user["id"] != $id) continue;
            if( $user["id"] === null) continue;
        
            unset( $user["password"]);
            $filtered_users[] = $user;
        }  

        send_JSON( $filtered_users);

    }

    send_JSON( ["message" => "Method $request_method isn't served at $entity"], 400);
?>