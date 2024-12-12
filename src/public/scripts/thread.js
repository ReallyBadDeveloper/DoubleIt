async function getThreadData() {
    var splitURL = window.location.href.split('/')
    const url = "/api/v1/thread/" + splitURL[splitURL.length-1];
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        document.querySelector('#name').innerText = `${json.count} ${json.itemname}${json.count == 1 ? '' : 's'}`
        var prevImg = document.querySelector('.img-prev')
        prevImg.src = json.image
        prevImg.style.borderRadius = '5px'
        document.querySelector('title').innerHTML = `${json.itemname} - DoubleIt`
    } catch (error) {
        console.error(error.message);
        return;
    }
}

getThreadData()