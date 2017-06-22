<?php

header('Content-type: application/json');

/**
 * For the retrieving of data the get is checked for region because this is neccesairy
 * Switch to load the correct data
 * Retrieve data and edit this if this is neccesairy
 * Saving Champions in session because these do not change frequently to lower the number of api requests
 */

if(isset($_GET['region'])){
  $region = $_GET['region'];
}else{
  exit;
}
session_start();

$root = 'https://'.$region.'.api.riotgames.com/';
$result = '';
$api_key = 'api_key=9dea654d-b93d-4cc1-b423-2bfaa2bc7361';
switch (true) {
  case isset($_GET['summoner']):
    $summoner = $_GET['summoner'];
    $result = file_get_contents($root . 'lol/summoner/v3/summoners/by-name/'.$summoner.'?'.$api_key);
    break;
  case isset($_GET['matchId']):
    $result = json_decode(file_get_contents($root . 'lol/match/v3/matches/'.$_GET['matchId'].'?'.$api_key));

    foreach($result->participants as $participant){
        $participant->championId = $_SESSION['champions'][$participant->championId];
    }
    $result = json_encode($result);
    break;
  case isset($_GET['id']):
    $id = $_GET['id'];
    $index = 'beginIndex='.$_GET['beginIndex'] .'&endIndex='.$_GET['endIndex'];
    $region = preg_replace('/[0-9]+/', '', $_GET['region']);
    $url = $root . 'lol/match/v3/matchlists/by-account/'.$id.'/recent?'.$api_key;
    $matches = json_decode(file_get_contents($url));
    $champs = [];

    if(!isset($_SESSION['champions'])){
      $myChampionsArray = [];

      $champions = json_decode(file_get_contents($root . 'lol/static-data/v3/champions?locale=en_US&dataById=false&'.$api_key));

      foreach($champions->data as $champion){
        $myChampionsArray[$champion->id]['id'] = $champion->id;
        $myChampionsArray[$champion->id]['name'] = $champion->name;
        $myChampionsArray[$champion->id]['key'] = $champion->key;
        $myChampionsArray[$champion->id]['title'] = $champion->title;
      }
      $_SESSION['champions'] = $myChampionsArray;
    }
    foreach($matches->matches as $key => $match){
      $champ_id = $match->champion;
      $match->champion = [];
      $match->champion['id'] = $champ_id;
      $match->champion['name'] = $_SESSION['champions'][$champ_id]['name'];
      $match->champion['key'] = $_SESSION['champions'][$champ_id]['key'];
      $match->champion['title'] = $_SESSION['champions'][$champ_id]['title'];
    }



    $result = json_encode($matches);
    break;

  default:

    break;
}

echo $result;
