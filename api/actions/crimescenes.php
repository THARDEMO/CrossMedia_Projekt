<?php
    if( !isset( $required_to_be_true))
    {
        header( "Content-Type: application/json");
        http_response_code( 403);
        $json = json_encode(["message" => "Not allowed to access endpoint directly"]);
        echo $json;
        exit();
    }

    $path = "./DB/crimescene.json";

    if( $request_method === 'GET')
    {
        $all_crimescenes = get_file_data( $path);

        foreach( $all_crimescenes as $crimescene) 
        {
            if( $crimescene['id'] != $id) continue;
            send_JSON( $crimescene);
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

        if( isset( $request_data['crimescene_answer']))
        {
            if( !isset( $request_data['crimescene_id']))
            {
                send_JSON( ["message" => "Missing key 'crimescene_id'"], 400);
            }

            $answer = $request_data['crimescene_answer'];
            $crimescene_id = $request_data['crimescene_id'];


            $all_crimescenes = get_file_data( $path);

            foreach( $all_crimescenes as $crimescene) 
            {
                if( $crimescene['id'] != $crimescene_id) continue;

                if( $crimescene['answer'] != $answer )
                {
                    send_JSON( ["message" => "Wrong Answer: $answer"], 400);
                }

                $id_of_solved = add_solved_crime( $user_id, $crimescene_id);

                send_JSON( $id_of_solved);
            }

            send_JSON( ["message" => "Crimescene: $crimescene_id does not exist"], 404);
        }


        send_JSON( ["message" => "Working on POST"]);
    }

    send_JSON( ["message" => "Method $request_method isn't served at $entity"], 400);
?>