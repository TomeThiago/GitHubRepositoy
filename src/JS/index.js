var searchRepository = function(user) {
  return xhr = new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.github.com/users/'+user+'/repos');
    xhr.send(null);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject('Request Error');
        }
      }
    }
  });
}

var inputElement = document.querySelector('#app input')
var buttonElement = document.querySelector('#app button')
var listElement = document.querySelector('#listrepository ul');

function renderRepository() {
  listElement.innerHTML = '';
  var username = inputElement.value;

  if (!username) {
    alert("Please, enter a username!");
    return false; 
  };

  searchRepository(username)
    .then(function(response){
      var repos = response;
      for (repo of repos) {
        var repoElement = document.createElement('li');
        var repoText = document.createTextNode(repo.name+' ');

        var linkElement = document.createElement('a');
        linkElement.setAttribute('href', repo.html_url);
        var linkText = document.createTextNode('Acessar');

        linkElement.appendChild(linkText);

        repoElement.appendChild(repoText);
        repoElement.appendChild(linkElement);
        listElement.appendChild(repoElement);
      } 
    })
    .catch(function(error){
      console.warn(error);
    });
}

buttonElement.onclick = renderRepository;