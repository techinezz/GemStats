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
    document.getElementById("summoner_name_data").innerHTML = "Summoner's Username:"+summoner_name;

    
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
    
    // Ranked data
    const { tier: tier1, rank: rank1, wins: wins1, losses: losses1, queueType: queueType1, leaguePoints: leaguePoints1 } = rankedData[0];
    document.getElementById("summoner_ranked_data1").innerHTML = `Tier: ${tier1}, Rank: ${rank1}, Wins: ${wins1}, Losses: ${losses1}, Queue Type: ${queueType1}, LP: ${leaguePoints1}`;
    
    const { tier: tier2, rank: rank2, wins: wins2, losses: losses2, queueType: queueType2, leaguePoints: leaguePoints2 } = rankedData[1];
    document.getElementById("summoner_ranked_data2").innerHTML += `<br>Tier: ${tier2}, Rank: ${rank2}, Wins: ${wins2}, Losses: ${losses2}, Queue Type: ${queueType2}, LP: ${leaguePoints2}`;

    //Rank Image for Ranked Solo
    var rankImageElement = document.getElementById("rank_image1");
    var rankImagePath = "rankimages/" + tier1.toLowerCase() + ".png";
    rankImageElement.src = rankImagePath;

    //Rank Image for Ranked Flex
    var rankImageElement = document.getElementById("rank_image2");
    var rankImagePath = "rankimages/" + tier2.toLowerCase() + ".png";
    rankImageElement.src = rankImagePath;

    //Show rank containers
    const rankContainers = document.querySelectorAll('.rank-container');
    for (const container of rankContainers) {
        container.style.display = 'block';
    }


}
