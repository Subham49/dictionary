const btn = document.getElementById("searchButton")
const result = document.getElementById("result")
const sound = document.getElementById("sound")

btn.addEventListener('click', () => {
    const inputWord = document.getElementById("word").value
    // console.log(inputWord)
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            result.innerHTML = 
            `<div class="row justify-content-center mt-5">
                <div class="col text-start"><h3 style="font-family:Lucida Handwriting, sans-serif;">${inputWord}</h3></div>
                <div class="col text-end" onclick="playSound()"> <i class="fas fa-volume-up"></i></div>
            </div>
            <div class="row justify-content-center">
                <div class="col text-start fw-light">${data[0].meanings[0].partOfSpeech+" "+data[0].phonetic}</div>
            </div>
            <div class="row justify-content-center mt-3">
                <div class="col text-start">${data[0].meanings[0].definitions[0].definition}</div>
            </div>
            <div class="row justify-content-center mt-1">
                <div class="col text-start fst-italic">${data[0].meanings[0].definitions[0].example}</div>
            </div>`
            sound.setAttribute("src", `${data[0].phonetics[0].audio}`)
        })  
        .catch((err) => {
            console.error(err)
            result.innerHTML = `
            <div class="row justify-content-center mt-5">
                <div class="col text-start"><h3 style="font-family:Lucida Handwriting, sans-serif;">${inputWord} is not a valid word</h3></div>
            </div>
            `
        });
})

function playSound() {
    // console.log(sound)
    sound.play();
}