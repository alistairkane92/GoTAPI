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

var createHouse = function(index, houses){
    var ul = document.getElementById("info");
    var pie = document.getElementById("pages-chart");
    ul.innerHTML = "";
    pie.innerHTML = "";

    ul.appendChild(createLi("Name: ", houses[index].name));
    ul.appendChild(createLi("Region: ", houses[index].region));
    ul.appendChild(createLi("Coat Of Arms: ", houses[index].coatOfArms));
    ul.appendChild(createLi("Motto: ", houses[index].words));

    if(houses[index].currentLord != ""){
        makeRequest(houses[index].currentLord, addLord);
    }

}

var addLord = function(){
    if(this.status != 200) return;

    var jsonString = this.responseText;
    var lord = JSON.parse(jsonString);

    var ul = document.getElementById("info");
    ul.appendChild(createLi("Current Lord: ", lord.name));
}

var createBook = function(index, books){
    var ul = document.getElementById("info");
    ul.innerHTML = "";

    ul.appendChild(createLi("Author: " + books[index].authors));
    ul.appendChild(createLi("Publisher: " + books[index].publisher));
    ul.appendChild(createLi("Release Date: " + books[index].released));

    createPieChart(books);
}

var createPieChart = function(books){
    var pie = document.getElementById("pages-chart");
    var titleText = "Number of Pages";

    var series =[{
        name: "Pages",
        data: []
    }]

    for(var book of books){
        var newBook = {
            name: book.name,
            y: book.numberOfPages
        }

        series[0].data.push(newBook);
    }

    var container = document.createElement("div");
    var chart = new PieChart(titleText, container, series);
    pie.appendChild(container);
}


var createLi = function(label, text){
    console.log(text);
    if(text != ""){
        item = document.createElement('li');
        item.innerText = label + text;
        return item;
    }
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

    charactersURL = "/characters";
    makeRequest(url + charactersURL, characterRequest);
}

window.addEventListener('load', app);
