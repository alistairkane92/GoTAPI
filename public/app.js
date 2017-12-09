var makeRequest = function(url, callback){
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', callback);
    request.send();
}

var requestCompleted = function(){
    if(this.status != 200) return;

    var jsonString = this.responseText;
    var houses = JSON.parse(jsonString);

    populateHousesDropDown(houses)

    var houseSelect = document.getElementById('house-select')

    houseSelect.addEventListener('change', function(){
        var index = houseSelect.selectedIndex;
        createHouse(index, houses);
    })
}

var populateHousesDropDown = function(houses){
    dropDown = document.getElementById('house-select');

    houses.forEach(function(house){
        var option = document.createElement('option');
        option.innerText = house.name;
        dropDown.appendChild(option);
    })

}

var createHouse = function(index, houses){

    var ul = document.getElementById("house-info");
    ul.innerHTML = "";

    var name = document.createElement('li');
    var region = document.createElement('li');
    var coatOfArms = document.createElement('li');
    var words = document.createElement('li');
    var currentLord = document.createElement('li');

    name.innerText = houses[index].name;
    region.innerText = houses[index].region;
    coatOfArms.innerText = houses[index].coatOfArms;
    words.innerText = houses[index].words;
    currentLord.innerText = houses[index].currentLord;

    ul.appendChild(name);
    ul.appendChild(region);
    ul.appendChild(coatOfArms);
    ul.appendChild(words);
    ul.appendChild(currentLord);

}

var app = function(){
    var url = "https://anapioficeandfire.com/api/houses?page=1&pageSize=50"
    makeRequest(url, requestCompleted)


}

window.addEventListener('load', app);
