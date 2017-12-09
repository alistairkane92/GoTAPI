var makeRequest = function(url, callback){
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', callback);
    request.send();
}

var requestComplete = function(){
    if(this.status != 200) return;

    var jsonString = this.responseText;
    var characters = JSON.parse(jsonString);

}

var app = function(){
    url = "https://anapioficeandfire.com/api/characters"
    makeRequest(url, requestComplete);

}

window.addEventListener('load', app);
