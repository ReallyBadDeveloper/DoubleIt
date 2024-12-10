async function getData() {
    var splitURL = window.location.href.split('/')
    document.querySelector('.card').innerText = splitURL[splitURL.length-1]
    const url = "/api/v1/thread/" + splitURL[splitURL.length-1];
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error.message);
        return;
    }
}

document.querySelector('.card').innerText = await getData()