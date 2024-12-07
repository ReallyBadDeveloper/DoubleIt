document.querySelector('#create').addEventListener('click',() => {
    fetch(window.location.href + '/new', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            itemname: document.querySelector('#item-name').value
        })
    })
})