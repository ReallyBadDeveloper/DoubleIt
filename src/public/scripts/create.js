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
    var fileReader = new FileReader()
    document.querySelector('.select-img').replaceChildren()
    fileReader.onload = (e) => {
        var prevImg = document.createElement('img')
        prevImg.classList.add('img-prev')
        document.querySelector('.select-img').appendChild(prevImg)
        document.querySelector('.img-prev').style.display = 'block'
        document.querySelector('.img-prev').src = e.target.result
        document.querySelector('.img-prev').style.borderRadius = '5px'
    }
    fileReader.readAsDataURL(imgInput.files[0])
})