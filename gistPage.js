var settings = null;
var gistArray = [];
var gistFinalArr = [];
var gistFav = [];

function Gist(link, description) {
  this.link = link;
  this.description = description;
}

function getGists() {
  var url = 'https://api.github.com/gists';
  var page = document.getElementsByName('pages')[0].value;
  for ( var i = 0; i < page; i++ ) {
    var httpReq = new XMLHttpRequest();
    if( !httpReq ) 
      throw 'Unable to initiate HTTP Request!'; 
    httpReq.onreadystatechange = function() {
      if ( httpReq.readyState === 4 ) {
	    if ( httpReq.status === 200 ) {
	      var httpParse = JSON.parse(this.responseText);
		  for ( var key in httpParse ) {
		    gistArray.push(httpParse[key]);
		  }
		  //this code correctly isolates the language from the Gists, however
		  //I was not able to properly filter the Gist array using it.
		  /*for ( var i = 0; i < gistArray.length; i++ ) { 
		    var filesObj = gistArray[i].files;
		      for ( var j in filesObj ) {
		        var innerObjLanguage = filesObj[j].language;
			    for (var k=0; k < 4; k++ ) {
			      if( document.getElementsByName('languages')[k].checked ) {
			        if ( document.getElementsByName('languages')[k].value == innerObjLanguage ) {
                      gistFinalArr.push(gistArray[i]);
				    }
	              }
                }	
		      }
		  }*/
		} 
		creatGistList(gistArray);
	 }
	}
  }
	url += '?pages=' + page
    httpReq.open('GET', url);
    httpReq.send();
}

window.onload = function() {
  var list = localStorage.getItem('gistList');
  if( list === null ) {
    list = {'gists':[]};
	localStorage.setItem('gistList', JSON.stringify(list));
  }
  else {
    list = JSON.parse(localStorage.getItem('gistList'));
  }
  displayFav();
}

function creatGistList(array) {
  var list = document.getElementById('gist-list');
  var ul = document.createElement('ul');
  for ( var i = 0; i < array.length; i++ ) {
    var item = document.createElement('li');
	if ( array[i].description === null || array[i].description.length === 0 ) {
	 var divURL = document.createElement('div');
	 divURL.innerHTML = '<a href="'+ array[i].url + '">' + "No Description" + '</a>';
	 item.appendChild(divURL);
	}
	else {
	 var divURL = document.createElement('div')
	 divURL.innerHTML = '<a href="'+ array[i].url + '">' + array[i].description + '</a>';
	 item.appendChild(divURL);
	}
	this.favorite = document.createElement('button');
	this.favorite.innerHTML = "Add to Favorites";
	this.favorite.onclick = function() {
	  localStorage.setItem('gistList', JSON.stringify(this.parentNode.textContent));
	  this.parentNode.style.display='none';
	  displayFav();
	}
	 item.appendChild(favorite);
	 ul.appendChild(item);
	 list.appendChild(ul);
  }
  return list;
}

function displayFav() {
  var list = document.getElementById('display');
  var ul = document.createElement('ul');
  for ( var key in localStorage ) {
    var item = document.createElement('li');
	item.innerHTML = localStorage[key];
	this.deleteButton = document.createElement('button');
	this.deleteButton.innerHTML = "Remove from Favorites";
	this.deleteButton.onclick = function() {
	  this.parentNode.style.display='none';//thank you brian lamere on canvas discussion board
	  localStorage.clear();
	  displayFav();
	}
	item.appendChild(deleteButton);
	ul.appendChild(item);
	list.appendChild(ul);
  }
  return list; 
}

/*function addGist(url, description) {
  for( var i = 0; i < array.length; i++ ) {
    if ( array[i].description === null || array[i].description.length === 0 ) { 
      var g = Gist(array[i].url, 'No Description');
	  gists.push(g);
	}
	else {
	  var g = Gist('hello', 'world');
	  gists.push(g);
	
  }
}*/
    