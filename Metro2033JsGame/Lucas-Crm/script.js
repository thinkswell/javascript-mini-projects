"use strict";

//class pour les batiment pouvant etre construit
class ListBuildings {
  /**
   *
   * @param {string} name
   * @param {number} level
   * @param {number} buildingMoneyCost
   * @param {number} buildingRockCost
   * @param {number} buildingWoodCost
   * @param {string} type
   *
   *
   */
  constructor(
    name,
    level,
    buildingMoneyCost,
    buildingRockCost,
    buildingWoodCost,
    type,
    desc
  ) {
    this.name = name;
    this.level = level;
    this.buildingMoneyCost = buildingMoneyCost;
    this.buildingRockCost = buildingRockCost;
    this.buildingWoodCost = buildingWoodCost;
    this.type = type;
    this.desc = desc;
  }
}
// class pour mes batiments
class MyBuilding {
  /**
   *
   * @param {string} name
   * @param {number} level
   * @param {number} buildingUpgradeMoneyCost
   * @param {number} buildingUpgradeWoodCost
   * @param {number} buildingUpgradeRockCost
   * @param {number} production
   * @param {string} productionName
   * @param {string} type
   * @param {string} id
   *
   *
   */
  constructor(
    name,
    level = 1,
    buildingUpgradeMoneyCost = 0,
    buildingUpgradeWoodCost = 0,
    buildingUpgradeRockCost = 0,
    production = 0,
    productionName,
    type,
    id,
    desc
  ) {
    this.name = name;
    this.level = level;
    this.buildingUpgradeMoneyCost = buildingUpgradeMoneyCost;
    this.buildingUpgradeWoodCost = buildingUpgradeWoodCost;
    this.buildingUpgradeRockCost = buildingUpgradeRockCost;
    this.production = production;
    this.productionName = productionName;
    this.type = type;
    this.id = id;
    this.desc = desc;
  }
}
//class Resource
class Ressource {
  /**
   *
   * @param {string} name
   * @param {string} rarity
   * @param {number} number
   * @param {string} description
   *
   *
   */
  constructor(name, rarity, number, description) {
    this.name = name;
    this.rarity = rarity;
    this.number = number;
    this.description = description;
  }
}
//class Marchand
class Marchand {
  /**
   *
   * @param {String} name
   * @param {String} type
   * @param {String} desc
   * @param {String} rarity
   * @param {String} marketInventory
   *
   *
   */
  constructor(name, type, desc, rarity, marketInventory) {
    this.name = name;
    this.type = type;
    this.desc = desc;
    this.rarity = rarity;
    this.marketInventory = marketInventory;
  }
}
//class inventaire des marchand
class MarketInventory {
  constructor(
    name,
    item1,
    numberItem1,
    item2,
    numberItem2,
    item3,
    numberItem3
  ) {
    this.name = name;
    this.item1 = item1;
    this.numberItem1 = numberItem1;
    this.item2 = item2;
    this.numberItem2 = numberItem2;
    this.item3 = item3;
    this.numberItem3 = numberItem3;
  }
}
//class item
class MarketItem {
  /**
   *
   * @param {string} name
   * @param {number} price
   * @param {string} desc
   * @param {string} rarity
   *
   */
  constructor(name, price, desc, type) {
    this.name = name;
    this.price = price;
    this.desc = desc;
    this.type = type;
  }
}

//creation des items

const MarketWood = new MarketItem(
  "Wood",
  3,
  "du bois vous en avez besoin...",
  "wood"
);

const MarketRock = new MarketItem(
  "Pierre",
  2,
  "les roches vous en avez besoin...",
  "rock"
);

const MarketFood = new MarketItem(
  "Nourriture",
  3,
  "la nourriture c'est important",
  "food"
);

const MarketFuel = new MarketItem(
  "Energie",
  5,
  "vous en aurez besoin pour certain batiments c'est sur!",
  "fuel"
);

const MarketMetal = new MarketItem(
  "Métal",
  5,
  "on a jamais assez de ressource",
  "metal"
);

const MarketAmmo = new MarketItem(
  "Munitions",
  4,
  "comment se defendre sans munition",
  "ammo"
);

const MarketHealthPack = new MarketItem(
  "Soins",
  2,
  "toujours utile en exploration ou pour soigner les habitants",
  "healthPack"
);

const MarketProtection = new MarketItem(
  "Protection",
  100,
  "permet de se proteger pendant une semaine contre les crises",
  "protection"
);
//creation MarketInventory

const marketInventory1 = new MarketInventory(
  "marketInventory1",
  MarketMetal,
  50,
  MarketAmmo,
  50,
  MarketMetal,
  50
);

const marketInventory2 = new MarketInventory(
  "marketInventory2",
  MarketHealthPack,
  20,
  MarketFood,
  100,
  MarketFuel,
  20
);

const marketInventory3 = new MarketInventory(
  "marketInventory3",
  MarketWood,
  30,
  MarketRock,
  60,
  MarketWood,
  60
);

const marketInventory4 = new MarketInventory(
  "marketInventory4",
  MarketWood,
  30,
  MarketRock,
  60,
  MarketMetal,
  40
);

const marketInventory5 = new MarketInventory(
  "marketInventory5",
  MarketAmmo,
  120,
  MarketHealthPack,
  100,
  MarketProtection,
  150
);

//creation des marchand
const marchand1 = new Marchand(
  "Marchand de Ferraille",
  "marchand",
  "ce marchand possede du metal a un prix interessant",
  "uncommon",
  marketInventory1
);

const marchand2 = new Marchand(
  "L'Échoppe du Dernier Espoir",
  "marchand",
  "ce marchand peut vous etre trés utile",
  "rare",
  marketInventory2
);

const marchand3 = new Marchand(
  "Le Caravanier Solitaire",
  "marchand",
  "un marchand qui solitaire qui possede des produit interressant...",
  "common",
  marketInventory3
);

const marchand4 = new Marchand(
  "La Boutique des Ruines",
  "marchand",
  "un marchand qui fait equipe avec d'autres marchand une sorte d'entreprise des souterrain",
  "common",
  marketInventory4
);

const marchand5 = new Marchand(
  "Empereur des Marchés Désolés",
  "marchand",
  "un marchand legendaire ne ratez pas cette opportuniter",
  "legendary",
  marketInventory5
);

//creation des items pour le market

//Creation des variables ressource
const food = new Ressource(
  "food",
  "common",
  1000,
  "tu en as besoin pour ta station"
);
const fuel = new Ressource(
  "fuel",
  "uncommon",
  300,
  "tu en a besoin pour faire fonctionner certain batiment"
);
const money = new Ressource(
  "money",
  "common",
  500,
  "tu as a besoin vraiment..."
);
const metal = new Ressource(
  "metal",
  "uncommon",
  50,
  "il en faut pour certain batiment ou armes"
);
const wood = new Ressource(
  "wood",
  "uncommon",
  100,
  "tu en as besoin pour faire fonctionner certain batiment"
);
const rock = new Ressource(
  "rock",
  "uncommon",
  300,
  "tu en as besoin pour faire fonctionner certain batiment"
);
const resident = new Ressource(
  "resident",
  "common",
  50,
  "il sont utile pour la ville"
);

let ammo = 2000;
let healthPack = 100;

let marchands = [
  marchand1,
  marchand1,
  marchand1,
  marchand1,
  marchand1,
  marchand2,
  marchand2,
  marchand3,
  marchand3,
  marchand3,
  marchand4,
  marchand4,
  marchand4,
  marchand5,
];
let myActualMarchand = marchands[Math.floor(Math.random() * marchands.length)];

let actionPerDay = 5;

let handlePowerOutageCount = 0;
let handleIllnessCount = 0;

let myActualBuilding = [];
let buildingList = [];
let marketInventoryList = [];
marketInventoryList.push(
  marketInventory1,
  marketInventory2,
  marketInventory3,
  marketInventory4,
  marketInventory5
);
let marchandList = [];
marchandList.push(marchand1, marchand2, marchand3, marchand4, marchand5);
let MarketItemList = [];
MarketItemList.push(
  MarketWood,
  MarketRock,
  MarketFood,
  MarketFuel,
  MarketMetal,
  MarketAmmo,
  MarketHealthPack,
  MarketProtection
);

let farmCount = 0;
let mineCount = 0;
let shelterCount = 0;

let currentDays = 1;

//recuperer mon html
//recuperer les span dans les li
let liFood = document.getElementById("foodInfo");
let liWood = document.getElementById("woodInfo");
let liRock = document.getElementById("rockInfo");
let liMetal = document.getElementById("metalInfo");
let liMoney = document.getElementById("moneyInfo");
let liResident = document.getElementById("residentInfo");
let liFuel = document.getElementById("fuelInfo");
let daysInfo = document.getElementById("daysInfo");
let liActionRemaining = document.getElementById("actionRemaining");
//btn
let btnBuildFarm = document.getElementById("btnBuildFarm");
let btnBuildMine = document.getElementById("btnBuildMine");
let btnBuildShelter = document.getElementById("btnBuildShelter");
let btnNextDay = document.getElementById("btnNextDay");
//modal
let modal = document.getElementById("myModal");
let btnModalMarchand = document.getElementById("openModalBtn");
let span = document.getElementsByClassName("close")[0];

const buildFarm = new ListBuildings(
  "farm",
  1,
  100,
  25,
  50,
  "farm",
  "une ferme donne de la nourriture"
);

const buildMine = new ListBuildings(
  "mine",
  1,
  100,
  50,
  15,
  "mine",
  "une mine qui donne de la pierre"
);

const buildShelter = new ListBuildings(
  "shelter",
  1,
  100,
  50,
  50,
  "shelter",
  "un foyer pour les resident"
);

//----------------------------------------------------------------

//ajouter les attributs pour le lancement des fonctions
btnBuildFarm.addEventListener("click", function () {
  btnBuildFarmFunction(buildFarm);
});
btnBuildMine.addEventListener("click", function () {
  btnBuildMineFunction(buildMine);
});
btnBuildShelter.addEventListener("click", function () {
  btnBuildShelterFunction(buildShelter);
});
btnNextDay.addEventListener("click", nextDays);
btnModalMarchand.onclick = function () {
  modal.style.display = "block";
  market();
};
span.onclick = function () {
  modal.style.display = "none";
  removeModalItem();
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    removeModalItem();
  }
};

//affichage des ressource dans le li
liFood.innerHTML = `${food.number}`;
liWood.innerHTML = `${wood.number}`;
liRock.innerHTML = `${rock.number}`;
liMetal.innerHTML = `${metal.number}`;
liMoney.innerHTML = `${money.number}`;
liResident.innerHTML = `${resident.number}`;
liFuel.innerHTML = `${fuel.number}`;
liActionRemaining.innerHTML = `${actionPerDay}`;
daysInfo.innerHTML = `${currentDays}`;

//-----------------------function--------------------------------------------------------

//fonction pour cree un batiment "farm"
function btnBuildFarmFunction(farm) {
  //timestamp

  //fin ts

  let thisBuild = farm;
  if (ressourceNeedBuildIf(thisBuild, 0) && farmCount < 5 && actionPerDay > 0) {
    //MAJ des ressource pour la creation du batiment
    ressourceNeedBuildIf(0, thisBuild);
    // ressourceUpdateBuild(thisBuild);
    actionPerDay -= 1;
    farmCount += 1;

    //creation du nouveau batimnet avec la class MyBuilding
    const farm = new MyBuilding(
      "farm",
      1,
      125,
      75,
      50,
      30,
      "nourriture",
      "farm",
      `farmCount${farmCount}`,
      "ce batiment vous donne raporte de la nourriture a chaque tour"
    );
    //mettre le nouveau batiment dans le tableau myActualBuilding
    myActualBuilding.push(farm);
    //creation de la variable pour faire fonctionner la function letCreateForCard(idForDiv)
    let idForDiv = `farmCount${farmCount}`;
    //lancement de la fonction pour cree les card en fonction du batiment
    letCreateForCard(idForDiv);
    //MAJ des ressources dans l'html
    updateResourcesUI();
  } else {
    console.log("bon...");
  }

  //ts

  //fin ts
}
//fonction pour cree un batiment "mine"
function btnBuildMineFunction(mine) {
  let thisBuild = mine;
  if (
    ressourceNeedBuildIf(thisBuild, 0) &&
    mineCount < 5 &&
    actionPerDay >= 0
  ) {
    //MAJ des ressource pour la creation du batiment
    ressourceNeedBuildIf(0, thisBuild);
    actionPerDay -= 1;
    mineCount += 1;
    //creation du nouveau batimnet avec la class MyBuilding
    const mine = new MyBuilding(
      "mine",
      1,
      125,
      20,
      75,
      30,
      "pierre",
      "mine",
      `mineCount${mineCount}`,
      "ce batiment vous raporte de la pierre a chaque tour"
    );
    //mettre le nouveau batiment dans le tableau myActualBuilding
    myActualBuilding.push(mine);
    //creation de la variable pour faire fonctionner la function letCreateForCard(idForDiv)
    let idForDiv = `mineCount${mineCount}`;
    //lancement de la fonction pour cree les card en fonction du batiment
    letCreateForCard(idForDiv);
    //MAJ des ressources dasn l'html
    updateResourcesUI();
  } else {
    console.log("bon...");
  }
}
//fonction pour cree un batiment "shelter" le batiment permet de gerer les resident
function btnBuildShelterFunction(build) {
  let thisBuild = build;
  if (
    ressourceNeedBuildIf(thisBuild, 0) &&
    shelterCount < 5 &&
    actionPerDay >= 0
  ) {
    //MAJ des ressource pour la creation du batiment
    ressourceNeedBuildIf(0, thisBuild);
    shelterCount += 1;
    actionPerDay -= 1;
    //creation du nouveau batimnet avec la class MyBuilding
    const shelter = new MyBuilding(
      "shelter",
      1,
      125,
      20,
      75,
      10,
      "resident",
      "shelter",
      `shelterCount${shelterCount}`,
      "ce batiment vous donne de l'argent et augmente vos resident a chaque tour"
    );
    //mettre le nouveau batiment dans le tableau myActualBuilding
    myActualBuilding.push(shelter);
    //creation de la variable pour faire fonctionner la function letCreateForCard(idForDiv)
    let idForDiv = `shelterCount${shelterCount}`;
    //lancement de la fonction pour cree les card en fonction du batiment
    letCreateForCard(idForDiv);
    //MAJ des ressources dans l'html
    updateResourcesUI();
  } else {
    console.log("bon...");
  }
}
//fonction qui se fiat appeller dans les fonction "cree un batiment" permet de gerer l'html pour avoir l'affichage voulue
function letCreateForCard(idForDiv) {
  //creation des variables pour l'html
  let mainDivCards = document.getElementById("mainDivCards");
  let divCard = document.createElement("div");
  let divCardHeader = document.createElement("div");
  let nameCard = document.createElement("h3");
  let divCardBody = document.createElement("div");
  let paragraphDivDesc = document.createElement("p");
  let paragraphUpdateCost = document.createElement("p");
  let btnUpgrade = document.createElement("button");

  //ajout des attribut && du text
  //"idForDiv" est egal a l'id du batiment
  divCard.classList.add("card");
  divCard.setAttribute("id", idForDiv);
  divCardHeader.classList.add("card-header");
  btnUpgrade.textContent = "Upgrade";
  btnUpgrade.setAttribute("id", idForDiv);
  btnUpgrade.classList.add("upgrade-button");
  btnUpgrade.addEventListener("click", btnUpgradeFunction);

  //insertion dans l'html
  mainDivCards.appendChild(divCard);
  divCard.appendChild(divCardHeader);
  divCardHeader.appendChild(nameCard);
  divCardBody.appendChild(paragraphDivDesc);
  divCard.appendChild(divCardBody);
  divCardBody.appendChild(paragraphUpdateCost);
  divCardBody.appendChild(btnUpgrade);

  //boucle for pour pouvoir mettre le niveau et la description en fonction du batiment
  for (let i = 0; i < myActualBuilding.length; i++) {
    if (myActualBuilding[i].id == idForDiv) {
      console.log(`${myActualBuilding[i].id}`);
      nameCard.textContent = `${myActualBuilding[i].name} lvl ${myActualBuilding[i].level}`;
      paragraphDivDesc.innerHTML = `${myActualBuilding[i].desc}<br> ${myActualBuilding[i].production} de ${myActualBuilding[i].productionName} par jour`;
      paragraphUpdateCost.textContent = `ressource nescessaire pour l'amelioration : Money : ${myActualBuilding[i].buildingUpgradeMoneyCost} - 
      wood : ${myActualBuilding[i].buildingUpgradeWoodCost} - 
      rock : ${myActualBuilding[i].buildingUpgradeRockCost}`;
    } else {
      console.log("hummm.....");
    }
  }
}
//fonction qui se fait appeler permet de mettre a jour l'html des ressource dispo
function updateResourcesUI() {
  liFood.innerHTML = `${food.number}`;
  liWood.innerHTML = `${wood.number}`;
  liRock.innerHTML = `${rock.number}`;
  liMetal.innerHTML = `${metal.number}`;
  liMoney.innerHTML = `${money.number}`;
  liResident.innerHTML = `${resident.number}`;
  liFuel.innerHTML = `${fuel.number}`;
  liActionRemaining.innerHTML = `${actionPerDay}`;
  daysInfo.innerHTML = `${currentDays}`;
}
//fonction pour ameliorer le niveaux d'un batiment precis
//TODO METTRE A JOUR LES UPGRADECOST -FONCTION A OPTIMISEE
function btnUpgradeFunction() {
  console.log(this);

  //boucle pour recuperer le bon batiment et les condition pour ameliorer le batiment
  for (let i = 0; i < myActualBuilding.length; i++) {
    if (
      this.id == myActualBuilding[i].id &&
      money.number >= myActualBuilding[i].buildingUpgradeMoneyCost &&
      wood.number >= myActualBuilding[i].buildingUpgradeWoodCost &&
      rock.number >= myActualBuilding[i].buildingUpgradeRockCost &&
      actionPerDay > 0
    ) {
      console.log("ok pour upgrade");
      //augmente le niveau
      myActualBuilding[i].level++;
      //MAJ des ressource
      money.number -= myActualBuilding[i].buildingUpgradeMoneyCost;
      wood.number -= myActualBuilding[i].buildingUpgradeWoodCost;
      rock.number -= myActualBuilding[i].buildingUpgradeRockCost;
      actionPerDay -= 1;
      //augmentation du cout d'amelioration
      myActualBuilding[i].buildingUpgradeMoneyCost = parseInt(
        myActualBuilding[i].buildingUpgradeMoneyCost * 1.25
      );
      myActualBuilding[i].buildingUpgradeWoodCost = parseInt(
        myActualBuilding[i].buildingUpgradeWoodCost * 1.25
      );
      myActualBuilding[i].buildingUpgradeRockCost = parseInt(
        myActualBuilding[i].buildingUpgradeRockCost * 1.25
      );

      myActualBuilding[i].production = parseInt(
        myActualBuilding[i].production * 1.35
      );

      //creation de currentCardId pour mettre a jour la card de CE batiment
      let currentCardId = myActualBuilding[i].id;
      //appel de la fonction pour MAJ de la card
      updateCurrentCard(currentCardId);
      //MAJ des ressource
      updateResourcesUI();
    } else {
      console.log("t'es pauvre ou sa marche pas");
    }
  }
}
// fonction qui se fait appeller pour mettre a jour l'html des card lors de l'amelioration
function updateCurrentCard(currentCardId) {
  console.log(currentCardId);
  //permet de toruver le batiment avec l'id strictement egal a currentCardId dans le tableau myActualBuilding
  let building = myActualBuilding.find(
    (building) => building.id === currentCardId
  );
  if (building) {
    //si il a trouve on recupere l'html a mettre a jour et on le met a jour
    let nameCard = document.querySelector(`#${currentCardId} h3`);
    let paragraphDivDesc = document.querySelector(`#${currentCardId} p`);
    let paragraphUpdateCost = document.querySelector(
      `#${currentCardId} p:nth-child(2)`
    );

    nameCard.textContent = `${building.name} lvl ${building.level}`;
    paragraphDivDesc.textContent = `${building.desc}`;
    paragraphUpdateCost.textContent = `ressource nescessaire pour ameliorariont : Money : ${building.buildingUpgradeMoneyCost} - 
    wood : ${building.buildingUpgradeWoodCost} - 
    rock : ${building.buildingUpgradeRockCost}`;
    paragraphDivDesc.innerHTML = `${building.desc} <br> 
    ${building.production} de ${building.productionName} par jour`;
  }
}
//fonction pour verifier si le joueur a les ressource necessaire pour construire le batiment voulue et enlever les ressource
function ressourceNeedBuildIf(build, buildRessource) {
  //permet de verifier les ressource
  if (build != 0) {
    return (
      money.number >= build.buildingMoneyCost &&
      wood.number >= build.buildingWoodCost &&
      rock.number >= build.buildingRockCost
    );
  }
  // permet de mettre a jour les ressource
  if (buildRessource != 0) {
    money.number -= buildRessource.buildingMoneyCost;
    wood.number -= buildRessource.buildingWoodCost;
    rock.number -= buildRessource.buildingRockCost;
  }
}
//fonction pour passer le jour suivant et MAJ les ressource
function nextDays() {
  //permet de mettre a jour les ressource lors d'un nouveau jours
  for (let building of myActualBuilding) {
    if (building.type == "farm") {
      food.number += building.production;
      console.log("food");
    }
    if (building.type == "mine") {
      rock.number += building.production;
      console.log("rock");
    }
    if (building.type == "shelter") {
      resident.number += building.production;
      console.log("shelter");
    }
  }

  money.number += parseInt(resident.number / 3);
  food.number -= parseInt(resident.number / 5);
  actionPerDay = 5;
  currentDays += 1;
  updateResourcesUI();
}
//fonction pour afficher les marchand
function market() {
  console.log(myActualMarchand.name);
  let modalMarchandName = document.querySelector("#modalMarchandName");
  let divItemJs = document.querySelector("#itemJs");

  modalMarchandName.textContent = myActualMarchand.name;

  for (let i = 1; i <= 3; i++) {
    let item = myActualMarchand.marketInventory["item" + i];
    let numberItem = myActualMarchand.marketInventory["numberItem" + i];
    console.log(item.desc);

    let modalItem = document.createElement("div");
    let modalItemH5 = document.createElement("h5");
    let modalItemP = document.createElement("p");
    let modalItemButton = document.createElement("button");

    modalItem.classList.add("item");
    modalItemH5.textContent = `${item.name} - ${numberItem}`;
    modalItemP.textContent = item.desc;
    modalItemButton.classList.add("buyBtn");
    modalItemButton.addEventListener("click", () => {
      buyMarket(item, numberItem);
    });
    modalItemButton.textContent = "Buy";

    divItemJs.append(modalItem);
    divItemJs.append(modalItemH5);
    divItemJs.append(modalItemP);
    divItemJs.append(modalItemButton);
  }
}
//fonction pour acheter un item
function buyMarket(item, numberItem) {
  console.log(item);
  console.log(numberItem);
  let price = item.price * numberItem;

  console.log(price);
  if (money.number >= price) {
    console.log("ok buy");
    money.number -= price;
    let itemToIncrease = wichItem(item.type);
    console.log(itemToIncrease.number + "avant");
    itemToIncrease.number += numberItem;
    console.log(itemToIncrease.number + "apres");
    updateResourcesUI();
  } else {
    console.log("t'es pauvre");
  }
}
//fonction pour recuperer l'item en fonction de son type
function wichItem(item) {
  switch (item) {
    case "wood":
      return wood;
      break;
    case "rock":
      return rock;
      break;
    case "food":
      return food;
      break;
    case "fuel":
      return fuel;
      break;
    case "metal":
      return metal;
      break;
    case "ammo":
      return ammo;
      break;
    case "healthPack":
      return healthPack;
      break;
    default:
      console.log("hummm...");
  }
}
//fonction pour le modal
function removeModalItem() {
  let modalContent = document.querySelector("#itemJs");
  while (modalContent.firstChild) {
    modalContent.removeChild(modalContent.firstChild);
  }
}
