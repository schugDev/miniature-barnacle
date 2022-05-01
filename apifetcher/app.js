document.getElementById('get-jokes').addEventListener('click', getJokes);

function getJokes(e) {
    let numberOfJokes = document.getElementById('number').value;

    const baseUrl = 'https://api.icndb.com/jokes/random/';
    const fullUrl = baseUrl + numberOfJokes;

    const xhr = new XMLHttpRequest();

    xhr.open('GET', fullUrl, true);
    xhr.onload = function () {
        if (this.status === 200){
            let jokes = JSON.parse(this.responseText);
            const jokesRes = document.getElementById('jokes');
            jokes.value.forEach(element => {
                console.log(element.joke);
                const newLi = document.createElement('li');
                newLi.innerText = element.joke;
                jokesRes.appendChild(newLi);
            });
            
        }
    }

    xhr.send();
    e.preventDefault();
}
