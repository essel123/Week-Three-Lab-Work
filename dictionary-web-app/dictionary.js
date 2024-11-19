function Fetch(api) {
  return new Promise((resolve, reject) => {
    const res = fetch(api);
    res
      .then(results => {
        if (!results.ok) {
          reject("Error in fetching data");
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
const content = document.getElementById("content")
 

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
    .catch(err => console.log(err));
}

document.getElementById("submit").addEventListener("click", () => {
  wordfetch();
});

word_.addEventListener("change", () => {
  document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
       document.getElementById("main").removeChild( content)
           wordfetch();
        content.style.display= "flex"
    } else {
      return null;
    }
  });
});


const mode = document.getElementById("mode")
mode.addEventListener('click',(event)=>{
  console.log()
})