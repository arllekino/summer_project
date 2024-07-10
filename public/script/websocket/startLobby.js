document.addEventListener('DOMContentLoaded', () => {

    const username = document.querySelector('.user-name');

    localStorage.setItem('username', username.innerHTML);
});