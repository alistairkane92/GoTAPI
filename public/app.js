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

    ul.appendChild(createLi("Name: " + houses[index].name));
    ul.appendChild(createLi("Region: " + houses[index].region));
    ul.appendChild(createLi("Coat Of Arms: " + houses[index].coatOfArms));
    ul.appendChild(createLi("Motto: " + houses[index].words));
    ul.appendChild(createLi("Current Lord: " + houses[index].currentLord));
}

var createLi = function(text){
    item =  document.createElement('li');
    item.innerText = text;
    return item;
}

var app = function(){
    var url = "https://anapioficeandfire.com/api/houses?page=1&pageSize=50"
    makeRequest(url, requestCompleted)


}

window.addEventListener('load', app);
