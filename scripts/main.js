document.querySelector('#sign-up-btn').addEventListener('click', function() {
    document.querySelector('#register-box').removeAttribute('class');
    document.querySelector('#login-box').classList.add('hidden-element')
});
document.querySelector('#sign-in-btn2').addEventListener('click', function() {
    document.querySelector('#login-box').removeAttribute('class');
    document.querySelector('#register-box').classList.add('hidden-element')
});
document.querySelector('#sign-in-btn1').addEventListener('click', function() {
    console.log('hi')
});
/*async function registerUser() {
    const url = '/users';
    const answer = await fetch(url);
    const data = await answer.json();
    return data
}*/