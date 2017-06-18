<?php

header('Content-type: application/json');


if(isset($_GET['summoner'])){
  $summoner = $_GET['summoner'];
}
if(isset($_GET['region'])){
  $region = $_GET['region'];
}

$root = 'https://'.$region.'.api.riotgames.com/';
// https://euw1.api.riotgames.com/api/lol/EUW/v2.2/matchlist/by-summoner/19647714?api_key=9dea654d-b93d-4cc1-b423-2bfaa2bc7361
$result = file_get_contents($root . 'lol/summoner/v3/summoners/by-name/'.$summoner.'?api_key=9dea654d-b93d-4cc1-b423-2bfaa2bc7361');
// $result = file_get_contents($root . 'api/lol/EUW/v2.2/matchlist/by-summoner/19647714?api_key=9dea654d-b93d-4cc1-b423-2bfaa2bc7361');
// $result = file_get_contents('https://euw1.api.riotgames.com/lol/summoner/v3/summoners/by-name/NoDayMercy?api_key=9dea654d-b93d-4cc1-b423-2bfaa2bc7361');

echo $result;
