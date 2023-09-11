<?php
    $isPriceOption = $_GET["sort_options"] === "2";
    if($isPriceOption){
        $json = file_get_contents("./cars.json");
        $cars = json_decode($json, true)['cars'];

        usort($cars, function($a, $b){
            return $a['price'] <=> $b['price'];
        });

        $results = array();

        $i = 0;
        foreach ($cars as $car) {
            $results[$i] = $car;
            $i++;
        }

        echo json_encode($results);
    }
?>