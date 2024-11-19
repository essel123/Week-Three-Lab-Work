function Fetch(api) {
  return new Promise((resolve, reject) => {
    const res = fetch(api);
    res
      .then(results => {
        if (!results.ok) {
          reject(()=>{
             console.log("error")
          });
        } else {
          return results.json();
        }
      })
      .then(data => resolve(data[0]));
  });
}

const phonetic = document.getElementById("phonetic");
// const Meaning = document.getElementById("Meaning");
const sourceUrls = document.getElementById("sourceUrls");
const word_ = document.getElementById("word");
const wordname = document.getElementById("wordname");

const nounMeaning = document.getElementById("noun-mean");
const synonyms = document.getElementById("synonyms");
const verbMeaning = document.getElementById("verb-mean");
const content = document.getElementById("content");
const errorMessage = document.getElementById("error-message");
const wordNotFound =  document.getElementById("word-not-found")

function wordfetch() {
  let word = word_.value;
  const api = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  Fetch(api)
    .then(data => {
      phonetic.textContent = data.phonetic;
      // Meaning.textContent = `${data.meanings[0].definitions[0].definition}`;
      wordname.textContent = data.word;
      sourceUrls.textContent = data.sourceUrls;
      sourceUrls.setAttribute("href", data.sourceUrls);
      synonyms.textContent = data.meanings[0].synonyms;

      for (let i = 0; i < data.meanings[0].definitions.length; i++) {
        const element = data.meanings[0].definitions[i];
        console.log(element);
        let meanings = document.createElement("li");
        // meanings++;
        meanings.textContent = element.definition;
        nounMeaning.appendChild(meanings);
      }
      for (let i = 0; i < data.meanings[1].definitions.length; i++) {
        const element = data.meanings[1].definitions[i];
        console.log(element);
        let meanings = document.createElement("li");
        // meanings++;
        meanings.textContent = element.definition;
        verbMeaning.appendChild(meanings);
      }

      // data.meanings[0].definitions.map(ele => console.log(ele));
    })
    .catch(err => {
      content.style.display = 'none'
      wordNotFound.style.display = 'flex'
      throw new Error(err);
      
    });
}

document.getElementById("submit").addEventListener("click", () => {
  

  if(!word_.value)
  {
    errorMessage.style.display = 'flex'
    content.style.display = "none";
    wordNotFound.style.display = 'none'

  }
  else{
    wordfetch();
    errorMessage.style.display = 'none'
    content.style.display = "flex";
    wordNotFound.style.display = 'none'
  }
});

word_.addEventListener('change',()=>{
 
document.addEventListener('keydown',(event)=>{
  if (event.key === 'Enter') {
    if(!event.target.value)
      {
      console.log("Nothing")
      }
    
  }
})
 
})


function playAudio(url){
  
  const audiio = new Audio
}

const mode = document.getElementById("mode");
mode.addEventListener("click", event => {
  if (mode.checked) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
});

