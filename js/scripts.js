const APIkey =
  "9f939a8e9ff488d14f0230d016c2cf297b9fc459e9b53ffd7c3319d5f4312f1e";

const countryDropdown = document.getElementById("country-dropdown");

fetch(`https://apiv3.apifootball.com/?action=get_leagues&APIkey=` + APIkey, {
  method: "GET",
})
  .then((response) => response.json())
  .then((result) => {
    result.forEach(({ country_name, country_id }) => {
      const option = document.createElement("option");
      option.text = country_name;
      option.value = country_id;
      countryDropdown.appendChild(option);
      console.log(option.value);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

countryDropdown.addEventListener("change", () => {
  const selectedCountryId = countryDropdown.value;
  fetch(
    `https://apiv3.apifootball.com/?action=get_leagues&country_id=${selectedCountryId}&APIkey=${APIkey}`,
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
          country_logo,
          country_name,
          league_logo,
          league_name,
          league_season,
        }) => {
          const row = document.createElement("tr");
          row.innerHTML = `
      <td scope="row" class="align-middle"><img style="height: 24px;" src="${country_logo}" alt="${country_name}"></th>
      <td class="align-middle"><img style="height: 62px;" src="${league_logo}" alt="${league_name}"></td>
      <td class="align-middle">${league_name}</td>
      <td class="align-middle">${league_season}</td>
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
