document.querySelector('#create').addEventListener('click',() => {
    fetch(window.location.href + 'new', {
        method: "POST",
        body: JSON.stringify({
            itemname: document.querySelector('#item-name').value
        })
    })
})