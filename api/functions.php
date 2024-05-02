<?php

function send_JSON( $data, $status_code = 200) 
{
    header( "Content-Type: application/json");
    http_response_code( $status_code);
    $json = json_encode($data);
    echo $json;
    exit();
}

// path = ../users | name = id [ e.g ]
function create_file_JSON( $path, $name)
{
    $file = "$path/$name.json";
    
    if( file_exists( $file))
    {
        send_JSON( 'Conflict while creating file', 409);
    }

    $json = json_encode( []);
    file_put_contents( $file, $json);
}

function attempt_write($file, $data, $get_parameter_string = "", $sec = 0.5)
{
    if (isset($_SESSION["write_attempt"]) && $_SESSION["write_attempt"] == "3") { return false; }
    if (save_file_data($file, $data)) { 
        unset($_SESSION["write_attempt"]);
        return true; 
    
    }
    if (!$_SESSION["write_attempt"]) { $_SESSION["write_attempt"] = 1; }
    else {
        $_SESSION["write_attempt"] = intval($_SESSION["write_attempt"]) + 1;
    }
    $page = $_SERVER['PHP_SELF'];
    header("Refresh: $sec; url=$page$get_parameter_string");
}

function get_file_data ($file_path) 
{
    $json = file_get_contents($file_path);
    $data = json_decode($json, true);
    if (!$data) {  return false; }
    return $data;
}

function save_file_data ($file_path, $data) 
{
    $json = json_encode($data, JSON_PRETTY_PRINT);
    if (!file_put_contents($file_path, $json)) {  return false; }
    return true;
}

function validate_user( $user_id)
{
    $all_users = get_file_data( "./DB/users.json");

    foreach( $all_users as $user) 
    {
        if( $user['id'] != $user_id) continue;
        return $user_id;
    }

    send_JSON( ["message" => "Access denied User: $user_id"], 403);
}

function get_solved_crimes( $user_id) 
{

    $path = './DB/solved_crimes.json';
    $solved_crimes = get_file_data( $path);

    $user_solved_crimes = [];
    foreach( $solved_crimes as $crime )
    {
        if( $crime['user_id'] != $user_id) continue;
        $user_solved_crimes[] = $crime;
    }

    return $user_solved_crimes;
}

function add_solved_crime( $user_id, $crime_id) 
{
    $solved_crimes = get_file_data( "./DB/solved_crimes.json");

    foreach( $solved_crimes as $solved )
    {
        if( $solved['crime_id'] == $crime_id && $solved['user_id'] == $user_id)
        {
            send_JSON( ["message" => "Crime: $crime_id is already solved by User: $user_id"]);
        }

    }

    $new_solved = [
        "crime_id" => $crime_id,
        "user_id" => $user_id,
        "timestamp" => $_SERVER['REQUEST_TIME']
    ];

    $solved_crimes[] = $new_solved;
    
    if( !save_file_data( "./DB/solved_crimes.json", $solved_crimes))
    {
        send_JSON( ["message" => "Internal server error"], 500);
    }

    add_notis( $user_id, $crime_id);

    return $crime_id;

}

function add_notis( $user_id, $crime_id) 
{
    foreach( ['note', 'message'] as $entity)
    {
        $path = "./DB/{$entity}_notis.json";

        $notifications = get_file_data( $path);
        $new_notis = [
            "crime_id" => $crime_id,
            "user_id" => $user_id,
        ];
        $notifications[] = $new_notis;
        save_file_data( $path, $notifications);
    }
}

function remove_notis( $user_id, $entity) 
{
    $path = "./DB/{$entity}_notis.json";
    $notifications = get_file_data( $path);

    foreach( $notifications as $i => $notis)
    {
        if( $notis['user_id'] != $user_id) continue;
        array_splice($notifications, $i);
    }
    save_file_data( $path, $notifications);
}

function find_relations($solved_crimes, $path, $entity)
{
    $all_relations = get_file_data( $path);

    $user_available_relations = [];
    foreach( $all_relations as $relation) 
    {
        foreach( $solved_crimes as $solved_crime)
        {
            if( $relation['crime_id'] != $solved_crime['crime_id']) continue;
            $user_available_relations[] = [
                "relation_id" => $relation[$entity . "_id"],
                "timestamp" => $solved_crime['timestamp'],
            ];
        }

    }

    $all_resource = get_file_data( "./DB/$entity.json");

    $user_all_resources = [];
    foreach( $all_resource as $possible_resource) 
    {
        foreach( $user_available_relations as $user_relation)
        {
            if( $possible_resource['id'] != $user_relation['relation_id']) continue;

            $possible_resource['timestamp'] = $user_relation['timestamp'];
            $user_all_resources[] = $possible_resource;
        }
    }

    return $user_all_resources;
}

?>
