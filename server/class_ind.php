<?php

class Ind{

    private $indHost;
    public function __construct(){
        $this->indHost = "https://oap.ind.nl/oap/api/desks/";
    }

    public function FormatResponse($response){
        $formatedResponse =  json_decode(str_replace(")]}',\n", "", $response), true);

        if($formatedResponse['status'] == 'OK'){
            return $formatedResponse;
        } else {
            http_response_code(500);
            return $formatedResponse;
        }
    }

    public function GetDesks($requestPayload){
        $productType = $requestPayload['productType'];

        $url = "$this->indHost?productKey=$productType";
        $curl = curl_init();
        $headers = array(
            'Content-Type: application/json',
            'oap-locale: en'
        );

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        

        $result = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);
        $response = array();

        if($err){
            $response["status"] = "ERROR";
            $response["error"] = $err;
            return $response;
        } else {
            return $this->FormatResponse($result);
        }
    }

    public function GetIndSlots($requestPayload){
        $desk = $requestPayload['desk'];
        $productType = $requestPayload['productType'];
        $persons = $requestPayload['persons'];

        $url = "$this->indHost$desk/slots/?productKey=$productType&persons=$persons";

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_POSTFIELDS => "",
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_SSL_VERIFYPEER => 0,
        ));

        $result = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);

        $response = array();

        if($err){
            $response["status"] = "ERROR";
            $response["error"] = $err;
            return $response;
        } else {
            return $this->FormatResponse($result);
        }
    }

    public function BlockIndSlot($requestPayload){
        $desk = $requestPayload['desk'];
        $payloadData = $requestPayload['payload'];
        $key = $payloadData['key'];

        $url = "$this->indHost$desk/slots/$key";
        $headers = array(
            'Content-Type: application/json',
            'Accept: application/json'
        );

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payloadData));

        $result = curl_exec($ch);
        $err = curl_error($ch);
        curl_close($ch);

        $response = array();

        if($err){
            $response["status"] = "ERROR";
            $response["error"] = $err;
            return $response;
        } else {
            return $this->FormatResponse($result);
        }
    }

    public function ReserveIndSlot($requestPayload){
        $desk = $requestPayload['desk'];
        $payloadData = $requestPayload['payload'];

        $url = "$this->indHost$desk/appointments";
        $headers = array(
            'Content-Type: application/json',
            'Accept: application/json'
        );

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payloadData));

        $result = curl_exec($ch);
        $err = curl_error($ch);
        curl_close($ch);

        echo $result;

        $response = array();

        if($err){
            $response["status"] = "ERROR";
            $response["error"] = $err;
            return $response;
        } else {
            return $this->FormatResponse($result);
        }
    }
}
