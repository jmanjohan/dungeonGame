const tileTypeConstants = {
    room: 1,
    hallway: 2,
    stairwell: 3,
    door: 4,
    chest: 5
}
const c = tileTypeConstants

//weapon obejcts

var stick = {
    "name": "Stick",
    "itemType": "weapon",
    "power": 0
}

var shortSword = {
    "name": "Short Sword",
    "itemType": "weapon",
    "power": 9
}

//clothes objects

var dirtyTShirt = {
    "name": "Dirty T-Shirt",
    "itemType": "clothes",
    "armor": 0,
    "agility": 0
}

var leatherArmor = {
    "name": "Leather Armor",
    "itemType": "clothes",
    "armor": 3,
    "agility": 0,
}

var rustyArmor = {
    "name": "Rusty Armor",
    "itemType": "clothes",
    "armor":10,
    "agility":-2,
}

//other item objects

var floorKey = {
    "name": "Floor Key",
    "itemType": "key",
    "display": "This key will help to open a single door."
}

var floorMap = {
    "name": "Floor Map",
    "itemType": "map",
    "display": "Hit the map button to see the areas of the map which you have explored thus far."
}

//map objects

var map = [
    [{tileType: 1, chest: 0, visited: false}, {tileType: 2, chest: 0, visited: false}, {tileType: 1, chest: 0, visited: false}, {tileType: 2, chest: 0, visited: false}, {tileType: 5, chest: floorKey, visited: false}],
    [{tileType: 3, chest: 0, visited: false}, {tileType: 0, chest: 0, visited: false}, {tileType: 3, chest: 0, visited: false}, {tileType: 0, chest: 0, visited: false}, {tileType: 0, chest: 0, visited: false}],
    [{tileType: 1, chest: 0, visited: false}, {tileType: 2, chest: 0, visited: false}, {tileType: 1, chest: 0, visited: false}, {tileType: 2, chest: 0,  visited: false}, {tileType: 5, chest: shortSword, visited: false}],
    [{tileType: 3, chest: 0, visited: false}, {tileType: 0, chest: 0, visited: false}, {tileType: 0, chest: 0, visited: false}, {tileType: 0, chest: 0, visited: false}, {tileType: 3, chest: 0, visited: false}],
    [{tileType: 5, chest: floorMap, visited: false}, {tileType: 0, chest: 0, visited: false}, {tileType: 5, chest: rustyArmor, visited: false}, {tileType: 4, chest: 0, visited: false}, {tileType: 5, chest: leatherArmor, visited: false}]
];

//character objects

var mainCharacterBaseStats = {
        "hp": 100,
        "armor": 0,
        "agility": 10,
        "power": 1
}

var mainCharacter = {
    "name": charName,
    "hp": mainCharacterBaseStats.hp,
    "armor": mainCharacterBaseStats.armor,
    "agility": mainCharacterBaseStats.agility,
    "power": mainCharacterBaseStats.power
}

//variables

var inventory = [dirtyTShirt, stick];
var invenNum;
var mapNum;
var mapNumTwo;
var log = [];
var inventoryWindowOpened = false;
var alertWindowOpened = false;
var mapWindowOpened = false;
var position = {row: 0, col: 0};
var charName = "Name Yoself";
var gameWindow = document.getElementById("gameWindow");
var gameMenu = document.getElementById("gameMenu");
var gameText = document.getElementById("gameTextWindow");
var gameInput = document.getElementById("gameInputWindow");
var submitNameInput = document.getElementById("submitCharName");
var enterNameInput = document.getElementById("enterCharName");
var modalInventoryWindow = document.getElementById("modalInventoryWindow");
var modalAlertWindow = document.getElementById("modalAlertWindow");
var modalAlertInnerText = document.getElementById("modalAlertInnerText");
var tileCurrent;
var tileUp;
var tileRight;
var tileDown;
var tileLeft;
var clothesCurrent = "Dirty T-Shirt";
var weaponCurrent = "Stick";
var inventoryCharName = document.getElementById("inventoryCharacterName");
var inventoryCharHP = document.getElementById("inventoryCharacterHP");
var inventoryCharArmor = document.getElementById("inventoryCharacterArmor");
var inventoryCharAgility = document.getElementById("inventoryCharacterAgility");
var inventoryCharPower = document.getElementById("inventoryCharacterPower");
var inventorySelectDiv = document.getElementById("inventorySelectDiv");
var inventorySelectClothes = document.createElement('select');
var selectClothesCurrent = document.createElement('option');
var inventorySelectWeapon = document.createElement('select');
var selectWeaponCurrent = document.createElement('option');
var selectClothesTitle = document.createElement('h2');
var selectWeaponTitle = document.createElement('h2');
var modalInventoryText = document.getElementById("modalInventoryText");
var inventoryDisplayDiv = document.getElementById("inventoryDisplayDiv");
var inventoryMapButton = document.createElement('input');
var modalInventoryCenterDiv = document.getElementById("modalInventoryCenterDiv");
var modalMapWindow = document.getElementById("modalMapWindow");
var modalMapRow;
var modalMapTile;
var modalMapCloseButton;
var gameTextHallways;
var gameTextStairwells;
var gameTextChest;

function buildMenu() {
    //build game log
    var gameMenuLog = document.createElement('div');
    gameMenuLog.setAttribute("id", "gameMenuLog");
    gameMenuLog.setAttribute("class", "menuBox");
    var gameLogTitle = document.createElement('h2');
    gameLogTitle.innerText = "LOG";
    var gameLogText = document.createElement('div');
    gameLogText.setAttribute("id", "gameLogText");
    gameLogText.setAttribute("class", "menuSubBox menuSubBoxText");
    gameMenuLog.appendChild(gameLogTitle);
    gameMenuLog.appendChild(gameLogText);
    //build inventory
    var gameMenuInventory = document.createElement('div');
    gameMenuInventory.setAttribute("id", "gameMenuInventory");
    gameMenuInventory.setAttribute("class", "menuBox");
    var inventoryTitle = document.createElement('h2');
    inventoryTitle.innerText = "INVENTORY";
    inventoryTitle.setAttribute("onclick", 'toggleInventory();');
    inventoryTitle.setAttribute("id", "gameMenuInventoryTitle")
    var inventoryText = document.createElement('div');
    inventoryText.setAttribute("id", "inventoryText");
    inventoryText.setAttribute("class", "menuSubBox menuSubBoxText");
    gameMenuInventory.appendChild(inventoryTitle);
    gameMenuInventory.appendChild(inventoryText);
    //build map
    var gameMenuMap = document.createElement('div');
    gameMenuMap.setAttribute("id", "gameMenuMap");
    gameMenuMap.setAttribute("class", "menuBox");
    var mapTitle = document.createElement('h2');
    mapTitle.innerText = "MAP";
    var mapWindow = document.createElement('div');
    mapWindow.setAttribute("id", "mapWindow");
    mapWindow.setAttribute("class", "menuSubBox");
    var tileNum;
    var tile;
    for (tileNum = 1; tileNum < 10; tileNum++) {
        tile = document.createElement('div');
        tile.setAttribute("id", "mapTile" + tileNum);
        tile.setAttribute("class", "mapTile");
        mapWindow.appendChild(tile);
    }
    gameMenuMap.appendChild(mapTitle);
    gameMenuMap.appendChild(mapWindow);
    //assemble menu
    gameMenu.innerHTML = "";
    gameMenu.append(gameMenuLog);
    gameMenu.append(gameMenuInventory);
    gameMenu.append(gameMenuMap);
    tileCurrent = document.getElementById("mapTile5");
    tileUp = document.getElementById("mapTile2");
    tileRight = document.getElementById("mapTile6");
    tileDown = document.getElementById("mapTile8");
    tileLeft = document.getElementById("mapTile4");
    //print Inventory
    printInventory();
}

function printGameLog(newLogItem) {
    log.push(newLogItem);
    gameLogText.innerHTML = "";
    var logNum;
    var logListItem;
    for (logNum = 0; logNum < log.length; logNum++) {
        gameLogListItem = document.createElement('li');
        gameLogListItem.innerText = log[logNum];
        gameLogText.prepend(gameLogListItem);
    }
}

function printInventory() {
    inventoryText.innerHTML = "";
    var inventoryListItem;
    for (invenNum = 0; invenNum < inventory.length; invenNum++) {
        inventoryListItem = document.createElement('li');
        inventoryListItem.innerText = inventory[invenNum].name;
        inventoryText.append(inventoryListItem);
    }
}

function submitName() {
    charName = document.getElementById("enterCharName").value;
    printGameLog("Hello " + charName);
}

function isPartOfMap(row, col) {
    if (row >= 0 && row < map.length && col >= 0 && col < map[0].length) {
        return true;
    } else {
        return false;
    }  
}

function unlockDoor() {
    var keyPosition = inventory.indexOf(floorKey);
    inventory.splice(keyPosition, 1);
    printInventory();
    printAlert("The door is open!");
}

function moveUp(hallwayTileType) {
    if (!(inventoryWindowOpened) && !(alertWindowOpened)) {
        switch (hallwayTileType) {
            case c.stairwell:
                (map[position.row - 1][position.col]).visited = true;    
                dungeonMap(position.row - 2, position.col);
                printGameLog("You went upstairs.");
                break;
            case c.door:
                if (inventory.includes(floorKey)) {
                    unlockDoor();
                    (map[position.row - 1][position.col]).tileType = c.stairwell;
                    (map[position.row - 1][position.col]).visited = true;
                    dungeonMap(position.row - 2, position.col);
                    printGameLog("You went upstairs.");
                } else {
                    printGameLog("The door is locked.");
                }
                break;
            }
    }
   
}
function moveRight(hallwayTileType) {
    if (!(inventoryWindowOpened) && !(alertWindowOpened)) {
        switch (hallwayTileType) {
            case c.hallway:
                (map[position.row][position.col + 1]).visited = true;
                dungeonMap(position.row, position.col + 2);
                printGameLog("You went right.");
                break;
            case c.door:
                if (inventory.includes(floorKey)) {
                    unlockDoor();
                    (map[position.row][position.col + 1]).tileType = c.hallway;
                    (map[position.row][position.col + 1]).visited = true;
                    dungeonMap(position.row, position.col + 2);
                    printGameLog("You went right.");
                } else {
                    printGameLog("The door is locked.");
                }
                break;
            }
    } 
}
function moveDown(hallwayTileType) {
    if (!(inventoryWindowOpened) && !(alertWindowOpened)) {
        switch (hallwayTileType) {
            case c.stairwell:
                (map[position.row + 1][position.col]).visited = true;
                dungeonMap(position.row + 2, position.col);
                printGameLog("You went downstairs.");
                break;
            case c.door:
                if (inventory.includes(floorKey)) {
                    unlockDoor();
                    (map[position.row + 1][position.col]).tileType = c.stairwell;
                    (map[position.row + 1][position.col]).visited = true;
                    dungeonMap(position.row + 2, position.col);
                    printGameLog("You went downstairs.");
                } else {
                    printGameLog("The door is locked.");
                }
                break;
            }
    }
    
}
function moveLeft(hallwayTileType) {
    if (!(inventoryWindowOpened) && !(alertWindowOpened)) {
        switch (hallwayTileType) {
            case c.hallway:
                (map[position.row][position.col - 1]).visited = true;
                dungeonMap(position.row, position.col - 2);
                printGameLog("You went left.");
                break;
            case c.door:
                if (inventory.includes(floorKey)) {
                    unlockDoor();
                    (map[position.row][position.col - 1]).tileType = c.hallway;
                    (map[position.row][position.col - 1]).visited = true;
                    dungeonMap(position.row, position.col - 2);
                    printGameLog("You went left.");
                } else {
                    printGameLog("The door is locked.");
                }
                break;
            }
    }
}

function drawMap(row, col) {
    tileCurrent.innerHTML = "<img id='tileCurrentImg' src='Images/" + (map[row][col]).tileType + ".png' onclick='openChest(" + position.row + ", "+ position.col + ")' />";
    //lookUp
    if (isPartOfMap(row - 1, col) && (map[row - 1][col]).tileType !== 0) {
        tileUp.innerHTML = "<img id='hallwayTileUp' class ='hallwayTile' src='Images/" + (map[row - 1][col]).tileType + ".png' onclick='moveUp(" + (map[row - 1][col]).tileType + ");' />";
    }
    if (!isPartOfMap(row - 1, col) || (map[row - 1][col]).tileType === 0) {
        tileUp.innerHTML = "<img src='Images/fog.png' />";
    }
    //lookRight
    if (isPartOfMap(row, col + 1) && (map[row][col + 1]).tileType !== 0) {
        tileRight.innerHTML = "<img id='hallwayTileRight' class ='hallwayTile' src='Images/" + (map[row][col + 1]).tileType + ".png' onclick='moveRight(" + (map[row][col + 1]).tileType + ");' />";
    }
    if (!isPartOfMap(row, col + 1) || (map[row][col + 1]).tileType === 0) {
        tileRight.innerHTML = "<img src='Images/fog.png' />";
    }
    //lookDown
    if (isPartOfMap(row + 1, col) && (map[row + 1][col]).tileType !== 0) {
        tileDown.innerHTML = "<img id='hallwayTileDown' class ='hallwayTile' src='Images/" + (map[row + 1][col]).tileType + ".png' onclick='moveDown(" + (map[row + 1][col]).tileType + ");' />";
    }
    if (!isPartOfMap(row + 1, col) || (map[row + 1][col]).tileType === 0) {
        tileDown.innerHTML = "<img src='Images/fog.png' />";
    }
    //lookLeft
    if (isPartOfMap(row, col - 1) && (map[row][col - 1]).tileType !== 0) {
        tileLeft.innerHTML = "<img id='hallwayTileLeft' class ='hallwayTile' src='Images/" + (map[row][col - 1]).tileType + ".png' onclick='moveLeft(" + (map[row][col - 1]).tileType + ");' />";
    }
    if (!isPartOfMap(row, col - 1) || (map[row][col - 1]).tileType === 0) {
        tileLeft.innerHTML = "<img src='Images/fog.png' />";
    }
}

function printAlert(newAlert) {
    modalAlertWindow.style.display = "block";
    modalAlertInnerText.innerText = newAlert;
    alertWindowOpened = true;
}
function closeAlert() {
    modalAlertWindow.style.display = "none";
    alertWindowOpened = false;
}

function buildMapWindow() {
    modalMapWindow.innerHTML = "";
    for (mapNum = 0; mapNum < map.length; mapNum++) {
        modalMapRow = document.createElement('div');
        modalMapRow.setAttribute("id", "row" + mapNum + "")
        modalMapWindow.appendChild(modalMapRow);
        for (mapNum2 = 0; mapNum2 < (map[mapNum]).length; mapNum2++) {
            if (map[mapNum][mapNum2].visited) {
                modalMapTile = document.createElement('span');
                modalMapTile.setAttribute("class", "modalMapTile");
                modalMapTile.innerHTML = "<img id='mapRow" + mapNum + "Col" + mapNum2 + "' src='Images/" + map[mapNum][mapNum2].tileType + ".png' />";
                modalMapRow.appendChild(modalMapTile);
            } else {
                modalMapTile = document.createElement('span');
                modalMapTile.setAttribute("class", "modalMapFog");
                modalMapTile.innerHTML = "<img id='mapRow" + mapNum + "Col" + mapNum2 + "' src='Images/0.png' />";
                modalMapRow.appendChild(modalMapTile);
            }
        }
    }
    modalMapCloseButton = document.createElement('input');
    modalMapCloseButton.setAttribute("type", "button");
    modalMapCloseButton.setAttribute("value", "X");
    modalMapCloseButton.setAttribute("class", "closeButton");
    modalMapCloseButton.setAttribute("onclick", "toggleMap();");
    modalMapWindow.appendChild(modalMapCloseButton);
}

function toggleMap() {
    if(mapWindowOpened) {
        modalMapWindow.style.display = "none";
        mapWindowOpened = false;
    } else {
        modalMapWindow.style.display = "block";
        buildMapWindow();
        mapWindowOpened = true;
    }
}

function displayItem(displayItemInput) {
    for (invenNum = 0; invenNum < inventory.length; invenNum++) {
        if (inventory[invenNum].name == displayItemInput) {
            if (inventory[invenNum].itemType == "weapon") {
                inventoryDisplayDiv.innerHTML = "<p>" + inventory[invenNum].name + "</p><p>Power:" + inventory[invenNum].power + "</p>";
            } else if (inventory[invenNum].itemType == "clothes") {
                inventoryDisplayDiv.innerHTML = "<p>" + inventory[invenNum].name + "</p><p>Armor:" + inventory[invenNum].armor + "</p><p>Agility:" + inventory[invenNum].agility + "</p>";
            } else {
                inventoryDisplayDiv.innerText = inventory[invenNum].display;
            }
        }
    }
}

function equipClothes() {
    clothesCurrent = inventorySelectClothes.value;
    displayItem(clothesCurrent);
    for (invenNum = 0; invenNum < inventory.length; invenNum++) {
        if ((inventory[invenNum]).name == clothesCurrent) {
            mainCharacter.armor = mainCharacterBaseStats.armor + inventory[invenNum].armor;
            mainCharacter.agility = mainCharacterBaseStats.agility + inventory[invenNum].agility;
        }
    }
    buildInventoryWindow();
}
function equipWeapon(){
    weaponCurrent = inventorySelectWeapon.value;
    displayItem(weaponCurrent);
    for (invenNum = 0; invenNum < inventory.length; invenNum++) {
        if ((inventory[invenNum]).name == weaponCurrent) {
            mainCharacter.power = mainCharacterBaseStats.power + inventory[invenNum].power;
        }
    }
    buildInventoryWindow();
}

function buildInventoryWindow() {
    //Output name and current character stats
    inventoryCharName.innerText = charName;
    inventoryCharHP.innerText = "HP: " + mainCharacter.hp;
    inventoryCharArmor.innerText = "Armor: " + mainCharacter.armor;
    inventoryCharAgility.innerText = "Agility: " + mainCharacter.agility;
    inventoryCharPower.innerText = "Power: " + mainCharacter.power;
    //Clear selects
    inventorySelectClothes.innerHTML = "";
    inventorySelectWeapon.innerHTML = "";
    //Build select for clothes based on inventory
    selectClothesCurrent.innerText = clothesCurrent;
    inventorySelectClothes.appendChild(selectClothesCurrent);
    for (invenNum = 0; invenNum < inventory.length; invenNum++) {
        if ((inventory[invenNum]).itemType == "clothes" && inventory[invenNum].name !== clothesCurrent) {
            var clothesSelectOption = document.createElement('option');
            clothesSelectOption.innerText = inventory[invenNum].name;
            inventorySelectClothes.appendChild(clothesSelectOption);
        }
    }
    inventorySelectClothes.setAttribute("onchange", 'equipClothes();');
    //Build select for weapons based on inventory
    selectWeaponCurrent.innerText = weaponCurrent;
    inventorySelectWeapon.appendChild(selectWeaponCurrent);
    for (invenNum = 0; invenNum < inventory.length; invenNum++) {
        if ((inventory[invenNum]).itemType == "weapon" && inventory[invenNum].name !== weaponCurrent) {
            var weaponSelectOption = document.createElement('option');
            weaponSelectOption.innerText = inventory[invenNum].name;
            inventorySelectWeapon.appendChild(weaponSelectOption);
        }
    }
    inventorySelectWeapon.setAttribute("onchange", 'equipWeapon();');
    //create select titles
    selectWeaponTitle.innerText = "Equip Weapon";
    selectClothesTitle.innerText = "Equip Clothes";
    //populate select div
    inventorySelectDiv.appendChild(selectWeaponTitle);
    inventorySelectDiv.appendChild(inventorySelectWeapon);
    inventorySelectDiv.appendChild(selectClothesTitle);
    inventorySelectDiv.appendChild(inventorySelectClothes);
    //populate text div
    modalInventoryText.innerHTML="";
    var modalInventoryListItem;
    for (invenNum = 0; invenNum < inventory.length; invenNum++) {
        modalInventoryListItem = document.createElement('li');
        modalInventoryListItem.innerText = inventory[invenNum].name;
        modalInventoryListItem.setAttribute("onclick", 'displayItem("' + (inventory[invenNum].name) + '");');
        modalInventoryText.append(modalInventoryListItem);
    }
    //create map button
    if (inventory.includes(floorMap)) {
        inventoryMapButton.setAttribute("type", "button");
        inventoryMapButton.setAttribute("value", "Floor Map");
        inventoryMapButton.setAttribute("onclick", 'toggleMap();')
        modalInventoryCenterDiv.append(inventoryMapButton);
    }
}

function toggleInventory() {
    if (inventoryWindowOpened) {
        modalInventoryWindow.style.display = "none";
        inventoryWindowOpened = false;
    } else {
        modalInventoryWindow.style.display = "block";
        buildInventoryWindow();
        inventoryWindowOpened = true;
    }
}

function openChest(row, col) {
    if ((map[row][col]).chest !== 0) {
        var item = (map[row][col]).chest;
        inventory.push(item);
        printInventory();
        printAlert("You found " + item.name);
        printGameLog("You opened the chest!");
        (map[row][col]).tileType = c.room;
        (map[row][col]).chest = 0;
        drawMap(row, col);
    } else {
        printGameLog("Nothing here...");
    }
}

document.onkeydown = function hotkeys(e) {
    switch (e.keyCode) {
    case 27:
        if (inventoryWindowOpened && !mapWindowOpened) {
            toggleInventory();
        }
        if (alertWindowOpened) {
            closeAlert();
        }
        if (mapWindowOpened) {
            toggleMap();
        }
        break;
    case 37:
        document.getElementById("hallwayTileLeft").click();
        break;
    case 38:
        document.getElementById("hallwayTileUp").click();
        break;
    case 39:
        document.getElementById("hallwayTileRight").click();
        break;
    case 40:
        document.getElementById("hallwayTileDown").click();
        break;
    case 73:
        if (!(document.activeElement.id == "enterCharName")) {
            toggleInventory();
        }
        break;
    case 77:
        if (inventory.includes(floorMap)) {
            toggleMap();
        }
        break;
    case 79:
        if (alertWindowOpened) {
            closeAlert();
        }
        else if (!(inventoryWindowOpened) && !(alertWindowOpened)) {
            openChest(position.row, position.col);
        }
        break;
    }
};

function writeHallways(row, col) {
    gameTextHallways = document.createElement('p');
    if (isPartOfMap(row, col - 1) && isPartOfMap(row, col + 1) && (map[row][col - 1]).tileType === c.hallway && (map[row][col + 1]).tileType === c.hallway) {
        gameTextHallways.innerText = "There are hallways leading left and right.";
    } else if (isPartOfMap(row, col - 1) && (map[row][col - 1]).tileType === c.hallway) {
        gameTextHallways.innerText = "There is a hallway leading to the left.";
    } else if (isPartOfMap(row, col + 1) && (map[row][col + 1]).tileType === c.hallway) {
        gameTextHallways.innerText = "There is a hallway leading to the right.";
    }
    if ((isPartOfMap(row, col - 1) && (map[row][col - 1]).tileType === c.hallway) || (isPartOfMap(row, col + 1) && (map[row][col + 1]).tileType === c.hallway)) {
        gameText.append(gameTextHallways);
    }
}

function writeStairwells(row, col) {
    gameTextStairwells = document.createElement('p');
    if (isPartOfMap(row + 1, col) && isPartOfMap(row - 1, col) && (map[row + 1][col]).tileType === 3 && (map[row - 1][col]).tileType === c.stairwell) {
        gameTextStairwells.innerText = "There are stairwells leading upstairs and downstairs.";
    } else if (isPartOfMap(row + 1, col) && (map[row + 1][col]).tileType === c.stairwell) {
        gameTextStairwells.innerText = "There is a stairwell leading downstairs.";
    } else if (isPartOfMap(row - 1, col) && (map[row - 1][col]).tileType === c.stairwell) {
        gameTextStairwells.innerText = "There is a stairwell leading upstairs.";
    }
    if ((isPartOfMap(row + 1, col) && (map[row + 1][col]).tileType === c.stairwell) || (isPartOfMap(row - 1, col) && (map[row - 1][col]).tileType === c.stairwell)) {
        gameText.append(gameTextStairwells);
    }
}

function writeChests(row, col) {
    gameTextChest = document.createElement('p');
    if ((map[row][col]).tileType === c.chest) {
        gameTextChest.innerText = "There is a chest in the room."
        gameText.append(gameTextChest);
    }
}

function writeGameText(row, col) {
    gameText.innerText = "";
    gameText.setAttribute("id", "gameTextWindowTwo");
    gameInput.innerHTML = "";
    gameInput.style.display = "none";
    writeHallways(row, col);
    writeStairwells(row, col);
    writeChests(row, col);
    //writeRoomText(row, col);
}

function dungeonMap(row, col) {
    position.row = row;
    position.col = col;
    (map[row][col]).visited = true;
    drawMap(position.row, position.col);
    writeGameText(position.row, position.col);
}

//OUTDATED CODE

//Variables below moved into buildMenu();
//var gameLogText = document.getElementById("gameLogText");
//var inventoryText = document.getElementById("inventoryText");
//var tileCurrent = document.getElementById("mapTile5");
//var tileUp = document.getElementById("mapTile2");
//var tileRight = document.getElementById("mapTile6");
//var tileDown = document.getElementById("mapTile8");
//var tileLeft = document.getElementById("mapTile4");

/*
//want to retain game state rather than simply print log
function printGameLog(newLogItem) {
    var gameLogListItem = document.createElement('li');
    gameLogListItem.innerText = newLogItem;
    gameLogText.prepend(gameLogListItem);
}
*/

/*
//Used for movement w/ old map
function isHallway(row, col) {
    if ((map[row][col]).tileType == 2 || (map[row][col]).tileType == 3)
        return true;
    else
        return false;
}
*/

/*
//old map with updated move functions
function drawMap(row, col) {
    tileCurrent.innerHTML = "<img src='Images/" + (map[row][col]).tileType + ".png' />";
    //lookUp
    if (isPartOfMap(row - 1, col) && ((map[row - 1][col]).tileType === 3 || (map[row - 1][col]).tileType === 4)) {
        tileUp.innerHTML = "<img id='hallwayTileUp' class ='hallwayTile' src='Images/" + (map[row - 1][col]).tileType + ".png' onclick='moveUp(" + (map[row - 1][col]).tileType + ");' />";
    }
    if (!isPartOfMap(row - 1, col) || ((map[row - 1][col]).tileType !== 3 && (map[row - 1][col]).tileType !== 4)) {
        tileUp.innerHTML = "<img src='Images/fog.png' />";
    }
    //lookRight
    if (isPartOfMap(row, col + 1) && ((map[row][col + 1]).tileType === 2 || (map[row][col + 1]).tileType === 4)) {
        tileRight.innerHTML = "<img id='hallwayTileRight' class ='hallwayTile' src='Images/" + (map[row][col + 1]).tileType + ".png' onclick='moveRight(" + (map[row][col + 1]).tileType + ");' />";
    }
    if (!isPartOfMap(row, col + 1) || ((map[row][col + 1]).tileType !== 2 && (map[row][col + 1]).tileType !== 4)) {
        tileRight.innerHTML = "<img src='Images/fog.png' />";
    }
    //lookDown
    if (isPartOfMap(row + 1, col) && ((map[row + 1][col]).tileType === 3 || (map[row + 1][col]).tileType === 4)) {
        tileDown.innerHTML = "<img id='hallwayTileDown' class ='hallwayTile' src='Images/" + (map[row + 1][col]).tileType + ".png' onclick='moveDown(" + (map[row + 1][col]).tileType + ");' />";
    }
    if (!isPartOfMap(row + 1, col) || ((map[row + 1][col]).tileType !== 3 && (map[row + 1][col]).tileType !== 4)) {
        tileDown.innerHTML = "<img src='Images/fog.png' />";
    }
    //lookLeft
    if (isPartOfMap(row, col - 1) && ((map[row][col - 1]).tileType === 2 || (map[row][col - 1]).tileType === 4)) {
        tileLeft.innerHTML = "<img id='hallwayTileLeft' class ='hallwayTile' src='Images/" + (map[row][col - 1]).tileType + ".png' onclick='moveLeft(" + (map[row][col - 1]).tileType + ");' />";
    }
    if (!isPartOfMap(row, col - 1) || ((map[row][col - 1]).tileType !== 2 && (map[row][col - 1]).tileType !== 4)) {
        tileLeft.innerHTML = "<img src='Images/fog.png' />";
    }
}
//Old map and static move function
function drawMap(row, col) {
    tileCurrent.innerHTML = "<img src='Images/" + (map[row][col]).tileType + ".png' />";
    //lookUp
    // if (isPartOfMap(row-1, col) && isHallway(row-1, col)) {
    if (isPartOfMap(row - 1, col) && (map[row - 1][col]).tileType === 3) {
        // draw whatever it is in maptile2
        //$("#mapTile2").prepend("<img src='" + (map[row-1][col]).tileType + ".png' />")
        //tileUp.innerHTML = "<img src='Images/" + (map[row-1][col]).tileType + ".png' onclick='dungeonMap(" + (row-2) + ", " + col + ");' />";
        //tileUp.innerHTML = "<img src='Images/" + (map[row - 1][col]).tileType + ".png' onclick='moveUp(" + row + ");' />";
        tileUp.innerHTML = "<img id='hallwayTileUp' class ='hallwayTile' src='Images/" + (map[row - 1][col]).tileType + ".png' onclick='dungeonMap(" + (row - 2) + ", " + col + ");printGameLog(\"Moved Up\");' />";
    }
    if (!isPartOfMap(row - 1, col) || (map[row - 1][col]).tileType !== 3) {
        tileUp.innerHTML = "<img src='Images/fog.png' />";
    }
    //lookRight
    if (isPartOfMap(row, col + 1) && (map[row][col + 1]).tileType === 2) {
        tileRight.innerHTML = "<img id='hallwayTileRight' class='hallwayTile' src='Images/" + (map[row][col + 1]).tileType + ".png' onclick='dungeonMap(" + row + ", " + (col + 2) + ");printGameLog(\"Moved Right\");' />";
    }
    if (!isPartOfMap(row, col + 1) || ((map[row][col + 1]).tileType !== 2 && (map[row][col + 1]).tileType !== 4)) {
        tileRight.innerHTML = "<img src='Images/fog.png' />";
    }
    //lookDown
    if (isPartOfMap(row + 1, col) && (map[row + 1][col]).tileType === 3) {
        tileDown.innerHTML = "<img id='hallwayTileDown' class='hallwayTile' src='Images/" + (map[row + 1][col]).tileType + ".png' onclick='dungeonMap(" + (row + 2) + ", " + col + ");printGameLog(\"Moved Down\");' />";
    }
    if (!isPartOfMap(row + 1, col) || (map[row + 1][col]).tileType !== 3) {
        tileDown.innerHTML = "<img src='Images/fog.png' />";
    }
    //lookLeft
    if (isPartOfMap(row, col - 1) && (map[row][col - 1]).tileType === 2) {
        tileLeft.innerHTML = "<img id='hallwayTileLeft' class='hallwayTile' src='Images/" + (map[row][col - 1]).tileType + ".png' onclick='dungeonMap(" + row + ", " + (col - 2) + ");printGameLog(\"Moved Left\");' />";
    }
    if (!isPartOfMap(row, col - 1) || (map[row][col - 1]).tileType !== 2) {
        tileLeft.innerHTML = "<img src='Images/fog.png' />";
    }
}
*/

/*
//changed to toggleInventory
function openInventory() {
    modalInventoryWindow.style.display = "block";
}
function closeInventory() {
    modalInventoryWindow.style.display = "none";
}
*/