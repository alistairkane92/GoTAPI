var makeRequest = function(url, callback){
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', callback);
    request.send();
}

var characterRequest = function(){
    if(this.status != 200) return;

    var jsonString = this.responseText;
    var characters = JSON.parse(jsonString);

}

var housesRequest = function(){
    if(this.status != 200) return;

    var jsonString = this.responseText;
    var houses = JSON.parse(jsonString);

    var houseSelect = document.getElementById('house-select')
    populateDropDown(houses, houseSelect);
    addSelectListener(houseSelect, createHouse, houses);
}

var booksRequest = function(){
    if(this.status != 200) return;

    var jsonString = this.responseText;
    var books = JSON.parse(jsonString);

    bookSelect = document.getElementById('book-select')
    populateDropDown(books, bookSelect);
    addSelectListener(bookSelect, createBook, books);
}

var populateDropDown = function(items, element){
    items.forEach(function(item){
        var option = document.createElement('option');
        option.innerText = item.name;
        element.appendChild(option);
    })
}

var checkNull = function(element){
    if(element.length > 1){
        return false
    } else {
        return true;
    }
}

var createHouse = function(index, houses){
    var ul = document.getElementById("info");
    ul.innerHTML = "";

    if (!checkNull(houses[index].name)){
        ul.appendChild(createLi("Name: " + houses[index].name));
    }

    if (!checkNull(houses[index].region)){
        ul.appendChild(createLi("Region: " + houses[index].region));
    }

    if (!checkNull(houses[index].coatOfArms)){
        ul.appendChild(createLi("Coat Of Arms: " + houses[index].coatOfArms));
    }

    if (!checkNull(houses[index].words)){
        ul.appendChild(createLi("Motto: " + houses[index].words));
    }

    if (!checkNull(houses[index].currentLord)){
        "Current Lord: " + makeRequest(houses[index].currentLord, getName);
    }

}

var getName = function(){
    if(this.status != 200) return;

    var jsonString = this.responseText;
    var obj = JSON.parse(jsonString);
    var li = createLi("Current Lord: " + obj.name)
    var ul = document.getElementById("info");
    ul.appendChild(li)

}

var createBook = function(index, books){
    var ul = document.getElementById("info");
    ul.innerHTML = "";

    ul.appendChild(createLi("Author: " + books[index].authors));
    ul.appendChild(createLi("Publisher: " + books[index].publisher));
    ul.appendChild(createLi("Release Date: " + books[index].released));
}

var createLi = function(text){
    item =  document.createElement('li');
    item.innerText = text;
    return item;
}

var addSelectListener = function(element, callback, items){
    element.addEventListener('change', function(){
        var index = element.selectedIndex;
        callback(index, items);
    })
}

var app = function(){
    housesUrl = "/houses?page=1&pageSize=50";
    var url = "https://anapioficeandfire.com/api";
    makeRequest(url + housesUrl, housesRequest);

    bookUrl = "/books";
    makeRequest(url + bookUrl, booksRequest);

}

window.addEventListener('load', app);
