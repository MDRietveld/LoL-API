<?php

header('Content-type: application/json');



if(isset($_GET['region'])){
  $region = $_GET['region'];
}

$root = 'https://'.$region.'.api.riotgames.com/';
$result = '';

switch (true) {
  case isset($_GET['summoner']):
    $summoner = $_GET['summoner'];
    $result = file_get_contents($root . 'lol/summoner/v3/summoners/by-name/'.$summoner.'?api_key=9dea654d-b93d-4cc1-b423-2bfaa2bc7361');
    break;
  case isset($_GET['id']):
    $id = $_GET['id'];
    $region = preg_replace('/[0-9]+/', '', $_GET['region']);
    $result = file_get_contents('https://'.$region.'.api.riotgames.com/api/lol/'.$region.'/v2.2/matchlist/by-summoner/'.$id.'?api_key=9dea654d-b93d-4cc1-b423-2bfaa2bc7361');
    break;

  default:
    # code...
    break;
}


// https://euw1.api.riotgames.com/api/lol/EUW/v2.2/matchlist/by-summoner/19647714?api_key=9dea654d-b93d-4cc1-b423-2bfaa2bc7361

// $result = file_get_contents($root . 'api/lol/EUW/v2.2/matchlist/by-summoner/19647714?api_key=9dea654d-b93d-4cc1-b423-2bfaa2bc7361');
// $result = file_get_contents('https://euw1.api.riotgames.com/lol/summoner/v3/summoners/by-name/NoDayMercy?api_key=9dea654d-b93d-4cc1-b423-2bfaa2bc7361');

echo $result;
