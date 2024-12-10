var dataURI;

document.querySelector('#create').addEventListener('click',() => {
    if (dataURI == null || document.querySelector('#item-name').value == '') {
        console.error('Could not create thread because some form elements are blank.')
        return;
    }
    fetch(window.location.href + '/new', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            itemname: document.querySelector('#item-name').value,
            itemimage: dataURI
        })
    })
})

var imgInput = document.querySelector('#img-select')
imgInput.addEventListener('change', (event) => {
    var fileReader = new FileReader()
    document.querySelector('.select-img').replaceChildren()
    fileReader.onload = (e) => {
        dataURI = e.target.result
        var prevImg = document.createElement('img')
        prevImg.classList.add('img-prev')
        document.querySelector('.select-img').appendChild(prevImg)
        document.querySelector('.img-prev').style.display = 'block'
        document.querySelector('.img-prev').src = dataURI
        document.querySelector('.img-prev').style.borderRadius = '5px'
        document.querySelector('.img-prev').width = "200"
    }
    fileReader.readAsDataURL(imgInput.files[0])
})