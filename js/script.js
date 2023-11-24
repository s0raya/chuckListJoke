const fetchJoke = document.getElementById('fetchJoke');
const jokeList = document.getElementById('jokeList');
const removeJokes = document.getElementById('removeJokes');


//Una función para renderizar la lista de chistes en el DOM

document.addEventListener("DOMContentLoaded", function(event) {
    let jokesArr = loadJokesLocalStorage();
    if (!jokesArr) {
        return;
    }
    for (let i=0; i < jokesArr.length; i++) {
        let li = document.createElement("li");
        li.className = `jokeid-${i}`;
        li.innerHTML =`<p>${jokesArr[i]}</p>
        <button class="borrarChiste" data-id="${i}">Borrar chiste</button>`
        jokeList.appendChild(li);   
    }
    const borrarChistes = document.querySelectorAll('.borrarChiste');

    borrarChistes.forEach(borrarChiste => {
        borrarChiste.addEventListener('click', () => {  
            let id = borrarChiste.dataset.id;
            let arr = JSON.parse(localStorage.getItem('chuckNorrisJokes'));
            arr.splice(id, 1);
            saveJokesLocalStorage(arr);
            location.reload();
        });
    });
});

removeJokes.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});

//Manejador de click en el botón "Obtener Chiste"
//Una función para obtener un chiste de Chuck Norris desde la API

fetchJoke.addEventListener('click', () => {
fetch("https://api.chucknorris.io/jokes/random")
    .then ((response) => {
        if (!response.ok) {
            throw new Error('La solicitud no se pudo procesar');
        }
        return response.json()
    })
    .then ((data) => {
        let {value} = data;
        let arr = [...loadJokesLocalStorage(), value];
        saveJokesLocalStorage(arr);
    })
    .catch((error)=>{
        console.error(error);
    })
});

//Una función para guardar la lista de chistes en localStorage
function saveJokesLocalStorage(arr) {
    localStorage.setItem('chuckNorrisJokes', JSON.stringify(arr));
}

//Una función para cargar la lista de chistes desde localStorage
function loadJokesLocalStorage() {
    const savedJokes = localStorage.getItem('chuckNorrisJokes');
    return savedJokes ? JSON.parse(savedJokes) : [];
}
