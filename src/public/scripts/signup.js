var username = document.querySelector('#username');
username.addEventListener('change', () => {
    username.ariaValueMax.replace((/[^a-zA-Z0-9_.]/gm), '')
})