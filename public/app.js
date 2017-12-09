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
}

var populateHousesDropDown = function(houses){
    dropDown = document.getElementById('house-select');

    houses.forEach(function(house){
        var option = document.createElement('option');
        option.innerText = house.name;
        dropDown.appendChild(option);
    })

}
// var houseRequest = function(){
//
//     var jsonString = this.responseText;
//     var houses = JSON.parse(jsonString);
//
//     createHouse(houses);
// }

// var createHouse = function(houses){
//     var ul = document.getElementById("names");
//
//     var houseli = document.createElement('li')
//     houseli.innerText = house.name
//
//     var members = house.swornMembers;
//     console.log(members);
//     members.forEach(function(member){
//         var memberli = document.createElement('li')
//         memberli.innerText = member.name;
//         houseli.appendChild(memberli);
//     })
//
//     ul.appendChild(houseli);
// }

var app = function(){
    var url = "https://anapioficeandfire.com/api/houses"
    makeRequest(url, requestCompleted)

    // var houseSelect = document.getElementById('#house-select')
    //
    // houseSelect.addEventListener('change', function(){
    //     var index = houseSelect.selectedIndex;
    //     makeRequest(url + index, houseRequest);
    // })
}

window.addEventListener('load', app);
