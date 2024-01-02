var API_key = "RGAPI-3c0d038b-a945-4591-9dec-5bcad2f36793";
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
    document.getElementById("summoner_name_data").innerHTML = "<h3>Summoner's Username:</h3> <span class='summonerName'>" + summoner_name + "</span>";

    //Summoner's Level
    var summoner_Level = dataSummoner_Full.summonerLevel;
    console.log(summoner_Level);
    document.getElementById("summonerlevel_data").innerHTML = "Account level is: <span class='summonerLevel'>" + summoner_Level + "</span>";

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
    const { queueType, tier, rank, wins, losses, leaguePoints } = rankedData[i];

    // Calculate win percentage
    const totalGames = wins + losses;
    const winPercentage = (wins / totalGames) * 100;

    // Determine the container to update based on the queueType
    let containerIndex;
    if (queueType === 'RANKED_SOLO_5x5') {
        containerIndex = 1;
    } else {
        containerIndex = 2;
    }

// Create a new div element for each rank
let div = document.createElement('div');
div.innerHTML = `<div class="tier">${tier}</div>
                 <div class="rank">Rank: ${rank}</div>
                 <div class="lp">LP: ${leaguePoints}</div>
                 <div class="wins">Wins: ${wins}</div>
                 <div class="losses">Losses: ${losses}</div>
                 <div class="winPercentage">Win Percentage: ${winPercentage.toFixed(2)}%</div>`;

    // Append the new div element to the summoner_ranked_data element
    document.getElementById("summoner_ranked_data" + containerIndex).appendChild(div);

    // Create a new img element for each rank
    let img = document.createElement('img');
    var rankImagePath = "rankimages/" + tier + ".png";
    img.src = rankImagePath + "?time=" + new Date().getTime();

    // Append the new img element to the rank_image element
    document.getElementById("rank_image" + containerIndex).appendChild(img);
    
    document.getElementById("summoner_name_data").style.display = 'block';
    document.getElementById("summonerlevel_data").style.display = 'flex';
    document.getElementById("summonerprofile_picture").style.display = 'flex';
    for (let i = 1; i <= 2; i++) {
        document.getElementById("summoner_ranked_data" + i).style.display = 'flex';
        document.getElementById("rank_image" + i).style.display = 'flex';
    }

    document.querySelector('.summonerInfo-container').style.display = 'flex';
    document.getElementById("rank-container1").style.display = 'flex';
    document.getElementById("rank-container2").style.display = 'flex';

}
    // Add class to summoner_name_data
    document.getElementById("summoner_name_data").classList.add("summonerName");

    // Add class to summonerlevel_data
    document.getElementById("summonerlevel_Level").classList.add("sommonerLevel");
}
    



