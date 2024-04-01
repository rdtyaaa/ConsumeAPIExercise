const APIkey =
  "ab9d4fd895dfbd6aa1c8238b7109fa13bdf85ddbd7b27e95d29f3070039450f8";

const countryDropdown = document.getElementById("country-dropdown");
const leagueDropdown = document.getElementById("league-dropdown");

fetch(`https://apiv3.apifootball.com/?action=get_leagues&APIkey=${APIkey}`, {
  method: "GET",
})
  .then((response) => response.json())
  .then((result) => {
    result.forEach(({ league_name, league_id, country_name }) => {
      const option = document.createElement("option");
      option.text = `${league_name} (${country_name})`;
      option.value = league_id;
      leagueDropdown.appendChild(option);
      console.log(option.value);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

leagueDropdown.addEventListener("change", () => {
  const selectedLeagueId = leagueDropdown.value;
  fetch(
    `https://apiv3.apifootball.com/?action=get_standings&league_id=${selectedLeagueId}&APIkey=${APIkey}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((result) => {
      const tableContent = document.getElementById("table-content");
      tableContent.innerHTML = "";

      result.forEach(
        ({
          overall_league_position,
          team_name,
          overall_league_W,
          overall_league_D,
          overall_league_L,
          overall_league_GF,
          overall_league_GA,
          overall_league_PTS,
        }) => {
          const row = document.createElement("tr");
          row.innerHTML = `
      <td class="align-middle">${overall_league_position}</td>
      <td class="align-middle">${team_name}</td>
      <td class="align-middle">${overall_league_W}</td>
      <td class="align-middle">${overall_league_D}</td>
      <td class="align-middle">${overall_league_L}</td>
      <td class="align-middle">${overall_league_GF}</td>
      <td class="align-middle">${overall_league_GA}</td>
      <td class="align-middle">${overall_league_PTS}</td>
    `;
          tableContent.appendChild(row);
        }
      );
    })
    .catch((error) => {
      console.error("Error fetching leagues:", error);
    });
});

function search() {
  const searchValue = document.getElementById("player-search-input").value;

  fetch(
    `https://apiv3.apifootball.com/?action=get_players&player_name=${searchValue}&APIkey=${APIkey}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((result) => {
      result = result[0];
      const playerName = document.getElementById("player-name");
      const playerTeam = document.getElementById("player-team");
      const playerImg = document.getElementById("player-img");
      const playerNum = document.getElementById("player-num");
      const playerPos = document.getElementById("player-pos");
      const playerAge = document.getElementById("player-age");
      const playerBirth = document.getElementById("player-birth");
      const playerGoals = document.getElementById("player-g");
      const playerAssists = document.getElementById("player-a");

      playerName.innerHTML = result.player_name;
      playerTeam.innerHTML = result.team_name;
      playerImg.innerHTML = `<img src="${result.player_image}" alt="${result.player_name}">`;
      playerNum.innerHTML = result.player_number;
      playerPos.innerHTML = result.player_type;
      playerAge.innerHTML = result.player_age;
      playerBirth.innerHTML = result.player_birthdate;
      playerGoals.innerHTML = result.player_goals;
      playerAssists.innerHTML = result.player_assists;
    })
    .catch((error) => console.error("Error fetching data:", error));
}
