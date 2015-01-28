function getGists() {
  var httpReq = new XMLHttpRequest();
  if( !httpReq ) 
    throw 'Unable to initiate HTTP Request!'; 
  var url = 'https://api.github.com/gists';
  for (var i=0; i < 5; i++ ) {
    if( document.getElementsByName('pages')[i].checked ) {
      var page = document.getElementsByName('pages')[i].value;
	}
  }	
  for (var i=0; i < 4; i++ ) {
    if( document.getElementsByName('languages')[i].checked ) {
      var lang = document.getElementsByName('languages')[i].value;
    }
  }
  console.log(url += '?' + 'language:' + lang);
    
  /*httpReq.open('GET', url);
  httpReq.send();*/
  /*(for (var i=0; i < 5; i++ ) {
    if( document.getElementsByName('pages')[i].checked ) {
      console.log(document.getElementsByName('pages')[i].value);
	}
  }	*/
 }