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

var imgInput = document.querySelector('#img-select')
imgInput.addEventListener('change', (event) => {
    document.querySelector('.select-img').replaceChildren()
    document.querySelector('.select-img').style.background = URL.createObjectURL(imgInput.files[0])
})