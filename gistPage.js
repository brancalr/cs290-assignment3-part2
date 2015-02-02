var settings = null;
var gistArray = [];
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
		    /*for ( var i = 0; i < 4; i++ ) {
		      if ( !document.getElementsByName('languages')[i].checked ) {
		        gistArray.push(httpParse[key]);
			  }
			}*/
		    //else {
		      /*var filesObj = httpParse[key].files;
		      for ( var j in filesObj ) {
		        var innerObjLanguage = filesObj[j].language;
			    for (var i=0; i < 4; i++ ) {
			      if( document.getElementsByName('languages')[i].checked ) {
			        if ( document.getElementsByName('languages')[i].value == innerObjLanguage ) {
                      gistArray.push(httpParse[i]);
				    }
	              }
                }	
		      }*/
			//}
	      }	
		}
		  console.log(creatGistList(gistArray));
	 }
	}
  }
	url += '?pages=' + page
    httpReq.open('GET', url);
    httpReq.send();
}

window.onload = function() {
  settings = localStorage.getItem('gistList');
  if( settings === null ) {
    settings = {'gists':[]};
	localStorage.setItem('gistList', JSON.stringify(settings));
  }
  else {
    settings = JSON.parse(localStorage.getItem('gistList'));
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
     var divButton = document.createElement('div');
	 divButton.innerHTML = '<input type="button" onclick="saveGist();displayFav()" value="Add to Favorites">';
	 item.appendChild(divButton);
	 //var g = new Gist(array[i].url, array[i].description);
	 //sessionStorage.setItem('gistList', JSON.stringify(g));
	}
	else {
	 var divURL = document.createElement('div')
	 divURL.innerHTML = '<a href="'+ array[i].url + '">' + array[i].description + '</a>';
	 item.appendChild(divURL);
	 var divButton = document.createElement('div');
	 divButton.innerHTML = '<input type="button" onclick="saveGist();displayFav()" value="Add to Favorites">';
	 item.appendChild(divButton);
	}
	 ul.appendChild(item);
	 list.appendChild(ul);
  }
  return list;
}

function displayFav() {
  var list = document.getElementById('display');
  var ul = document.createElement('ul');
  for ( var i = 0; i < gistFav.length; i++ ) {
    var item = document.createElement('li');
	item.innerHTML = gistFav[i].url;
	ul.appendChild(item);
	list.appendChild(ul);
  }
  return list; 
}

function saveGist() {
  //var save = JSON.parse(document.getElementsByID('gist-list').childNodes[3]);
  //this.sess = JSON.parse(sessionStorage.getItem('gistList'));
  //localStorage.setItem('gistList', JSON.stringify(sess));
  for ( var i = 0; i < gistArray.length; i++ ) {
    gistFav.push(gistArray[i]);
	console.log(gistFav[i]);
  }
 // var save = JSON.parse(gistFav);
  //localStorage.setItem('gistList', JSON.stringify(save));
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
    