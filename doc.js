const userInput = document.getElementById("search-input");
const btn = document.getElementById("search-button");
let creatureName = document.getElementById("creature-name");
let creatureId = document.getElementById("creature-id");
let weight = document.getElementById("weight");
let types = document.getElementById("types")
let hpStat = document.getElementById("hp");
let attackStat = document.getElementById("attack");
let defenseStat = document.getElementById("defense");
let sAtt = document.getElementById("special-attack");
let sDef = document.getElementById("special-defense");
let speedStat = document.getElementById("speed");

const nameUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creatures"
let statUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creature/" //add the creature name or number to the end of the URL to get the stats from the API

let creatureStats = {};
let creatureNames = [];

fetch(nameUrl)
  .then((res) => res.json())
  .then((data) => {
    creatureNames = data;
  })

const test = () => {
  resetAll();
  //console.log(userInput.value);
  nameCheck(userInput.value);
  //console.log(creatureNames);
  //console.log("New stats: ", creatureStats);
  //console.log(statUrl);
  
};

const nameCheck = (input) => {
  let error = 0;
  let statUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creature/"
  //console.log(Object.values(creatureNames[0]).includes("Pyrolynx"))
  creatureNames.forEach((el) => {
    //console.log(el);
    if(Object.values(el).includes(input)) {
      //console.log("OKAY, el: ", el);
      error = 1;
      statUrl += el.name;
      fetchData(statUrl)
    } else if (parseInt(input)) {
      if (Object.values(el).includes(parseInt(input))) {
        error = 1;
        statUrl += el.name;
        fetchData(statUrl);
      }
    }
  })
  if (error === 0) {
    alert("Creature not found");
  }
}

const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    creatureStats = data;
    //console.log(creatureStats);
    creatureName.innerText = creatureStats.name.toUpperCase();
    creatureId.innerText = creatureStats.id;
    weight.innerText = creatureStats.weight;
    height.innerText = creatureStats.height;
    
    creatureStats.stats.forEach((el) => {
      //console.log(el);
      if (el.name === "special-attack") {
        sAtt.innerText = el.base_stat
      } else if (el.name === "special-defense") {
        sDef.innerText = el.base_stat;
      } else if (el.name ==="hp") {
        hpStat.innerText = el.base_stat;
      } else if (el.name === "attack") {
        attackStat.innerText = el.base_stat;
      } else if (el.name === "defense") {
        defenseStat.innerText = el.base_stat;
      } else if (el.name === "speed") {
        speedStat.innerText = el.base_stat;
      } 
    })
    if (creatureStats.types.length === 1) {
        types.innerHTML = `<span>${creatureStats.types[0].name.toUpperCase()}</span>`;
      } else if (creatureStats.types.length === 2) {
        types.innerHTML = `<span>${creatureStats.types[0].name.toUpperCase()}</span> <span>${creatureStats.types[1].name.toUpperCase()}</span>`;
      }
    console.log(creatureStats.types.length)
    console.log(creatureStats.types[0].name)
  } catch (err) {
    console.log(err);
  }
};

const resetAll = () => {
  creatureName.innerText = "Creature Name: ";
  creatureId.innerText = "Creature ID: ";
  weight.innerText = "Weight: ";
  height.innerText = "Height: ";
  types.innerText = "";
};


btn.addEventListener("click", test)
