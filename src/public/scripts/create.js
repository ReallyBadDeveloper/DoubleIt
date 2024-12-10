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