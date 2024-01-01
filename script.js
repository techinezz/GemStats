var API_key = "RGAPI-ebea38e4-16a8-469c-a4c3-c8aabdf43c06";
var server_url = "";
var summoner_name = "";
var RegionName = "";
const Regions = ['br1.api.riotgames.com','eun1.api.riotgames.com','	euw1.api.riotgames.com','jp1.api.riotgames.com',
'kr.api.riotgames.com','la1.api.riotgames.com','la2.api.riotgames.com','na1.api.riotgames.com','oc1.api.riotgames.com',
'tr1.api.riotgames.com','ru.api.riotgames.com','ph2.api.riotgames.com','sg2.api.riotgames.com','th2.api.riotgames.com',
'tw2.api.riotgames.com','vn2.api.riotgames.com']

function chooseRegion() {
    RegionNumber = document.getElementById("choose_region").value;
    server_url = Regions[RegionNumber];

}

function Search_summoner() {
    summoner_name = document.getElementById("summoner_name").value;
    console.log(summoner_name);
    chooseRegion();
    data();
}


async function data() {
    var summonerNameUrl = "/lol/summoner/v4/summoners/by-name/"+summoner_name;
    var fullSummonerNameUrl = "https://"+server_url+summonerNameUrl+"?api_key="+API_key;
    console.log(fullSummonerNameUrl);
    const dataSummoner_1 = await fetch(fullSummonerNameUrl);
    const dataSummoner_Full = await dataSummoner_1.json();
    console.log(dataSummoner_Full);
    

    //Summoner's Name
    summoner_name = dataSummoner_Full.name;
    document.getElementById("summoner_name_data").innerHTML = "<h3>Summoner's Username:</h3> "+summoner_name;

    
    //Summoner's Level
    var summoner_Level = dataSummoner_Full.summonerLevel;
    console.log(summoner_Level);
    document.getElementById("summonerlevel_data").innerHTML = summoner_name+"'s level is: "+summoner_Level;

    //Summoner's Profile Picture
    var profile_pic_number = dataSummoner_Full.profileIconId;
    var profile_pic_url = "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/"+profile_pic_number+".png";
    document.getElementById("summonerprofile_picture").src = profile_pic_url;

    // Fetch ranked data
    var rankedDataUrl = "/lol/league/v4/entries/by-summoner/"+dataSummoner_Full.id;
    var fullRankedDataUrl = "https://"+server_url+rankedDataUrl+"?api_key="+API_key;
    const rankedDataResponse = await fetch(fullRankedDataUrl);
    const rankedData = await rankedDataResponse.json();
    console.log(rankedData);
    
    // Clear existing data
    for (let i = 1; i <= 2; i++) {
        document.getElementById("summoner_ranked_data" + i).innerHTML = '';
        document.getElementById("rank_image" + i).innerHTML = ''; // Clear rank images
    }

    // Determine the start index based on the number of ranks
    let startIndex = rankedData.length === 3 ? 1 : 0;

 // Iterate over rankedData
for (let i = startIndex; i < rankedData.length; i++) {
    const { tier, rank, wins, losses, leaguePoints } = rankedData[i];

    // Create a new div element for each rank
    let div = document.createElement('div');
    div.innerHTML = `Tier: ${tier}, Rank: ${rank}, LP: ${leaguePoints}, Wins: ${wins}, Losses: ${losses}`;

    // Append the new div element to the summoner_ranked_data element
    document.getElementById("summoner_ranked_data" + (i - startIndex + 1)).appendChild(div);

    // Create a new img element for each rank
    let img = document.createElement('img');
    var rankImagePath = "rankimages/" + tier + ".png";
    img.src = rankImagePath + "?time=" + new Date().getTime();

    // Append the new img element to the rank_image element
    document.getElementById("rank_image" + (i - startIndex + 1)).appendChild(img);
}
}
    



