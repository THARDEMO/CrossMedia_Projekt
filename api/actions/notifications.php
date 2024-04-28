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

        $nr_notis = [];
        foreach( ['note', 'message'] as $entity)
        {
            $path = "./DB/{$entity}_notis.json";
            $notifications = get_file_data( $path);

            $nr_notis[$entity] = [];

            foreach( $notifications as $notis)
            {
                if( $notis["user_id"] !== $id) continue;
                $nr_notis[$entity][] = $notis;
            }
        }

        send_JSON( $nr_notis);
    }

    send_JSON( ["message" => "Method $request_method isn't served at $entity"], 400);
?>
