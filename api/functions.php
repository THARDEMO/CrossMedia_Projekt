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

function get_solved_crimes( $user_id) 
{

    $path = './DB/solved_crimes.json';
    $solved_crimes = get_file_data( $path);

    $user_solved_crimes = [];
    foreach( $solved_crimes as $crime )
    {
        if( $crime['user_id'] != $user_id) continue;
        $user_solved_crimes[] = $crime['crime_id'];
    }

    return $user_solved_crimes;
}

function find_relations($user_relations, $path, $comparitor)
{
    $all_relations = get_file_data( $path);

    $user_available_relations = [];
    foreach( $all_relations as $relation) 
    {
        if( !in_array($relation['crime_id'], $user_relations)) continue;

        $user_available_relations[] = $relation[$comparitor . "_id"];
    }

    $all_resource = get_file_data( "./DB/$comparitor.json");

    $user_all_resources = [];
    foreach( $all_resource as $possible_resource) 
    {
        if( !in_array($possible_resource['id'], $user_available_relations)) continue;
        $user_all_resources[] = $possible_resource;
    }


    return $user_all_resources;
}
?>
