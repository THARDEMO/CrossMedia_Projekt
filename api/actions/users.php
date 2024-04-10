<?php

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

?>