function getData() {
    var splitURL = window.location.href.split('/')
    document.querySelector('.card').innerText = splitURL[splitURL.length-1]
    const url = "/api/v1/thread/" + splitURL[splitURL.length-1];
    fetch(url, { 
        method: 'GET'
      })
      .then(function(response) { return response.json(); })
      .then(function(json) {
        console.log(json)
    });
}

document.querySelector('.card').innerText = JSON.stringify(getData())