<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    http_response_code(200);
    require_once 'class_ind.php';
    $classInd = new Ind();

    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, true);

    $action = $input['action'];
    $data = $input['data'];

    if ($action === "getDesks") {
        echo json_encode($classInd->GetDesks($data));
    }

    if ($action === "getSlots") {
        echo json_encode($classInd->GetIndSlots($data));
    }

    if($action === "blockSlot"){
        echo json_encode($classInd->BlockIndSlot($data));
    }

    if($action === "reserveSlot"){
        echo json_encode($classInd->BlockIndSlot($data));
    }

} else {
    $response = array();
    http_response_code(500);
    $response["status"] = "ERROR";
    $response["errorCode"] = "INVALID_REQUEST";
    echo json_encode($response);
}
