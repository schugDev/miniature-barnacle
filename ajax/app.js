document.getElementById('input').addEventListener('click', function (e){
    // create xhr object
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './data.txt', true);
    xhr.onload = function (){
        if (this.status === 200) {
            const res = document.createElement('div');
            res.className = 'row';
            res.innerText = this.responseText;
            res.style.textAlign = 'center';
            document.body.appendChild(res);

        }
    }

    xhr.send();
    e.preventDefault();
});