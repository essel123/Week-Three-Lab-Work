function Fetch(api) {
  return new Promise((resolve, reject) => {
    const res = fetch(api);
    res
      .then(results => {
        if (!results.ok) {
          reject(() => {
            return "error";
          });
        } else {
          return results.json();
        }
      })
      .then(data => resolve(data[0]));
  });
}

// const phonetic = document.getElementById("phonetic");
// const sourceUrls = document.getElementById("sourceUrls");
// const wordname = document.getElementById("wordname");
// const nounMeaning = document.getElementById("noun-mean");
// const synonyms = document.getElementById("synonyms");
// const verbMeaning = document.getElementById("verb-mean");
const content = document.getElementById("content");
const errorMessage = document.getElementById("error-message");
const wordNotFound = document.getElementById("word-not-found");
const word_ = document.getElementById("word");

function wordfetch() {
  let word = word_.value;
  const api = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  Fetch(api)
    .then(data => {
      // phonetic.textContent = data.phonetic;
      // Meaning.textContent = `${data.meanings[0].definitions[0].definition}`;
      // wordname.textContent = data.word;
      // sourceUrls.textContent = data.sourceUrls;
      // sourceUrls.setAttribute("href", data.sourceUrls);
      // synonyms.textContent = data.meanings[0].synonyms;

      let { word, sourceUrls } = data;
      let audio_;
      let phonetic;
      const synonyms_ = data.meanings[0].synonyms;

      for (const { text: pho, audio: aud } of data.phonetics) {
        if (aud != "") {
          audio_ = aud;
          phonetic = pho;
        }
      }

      console.log(synonyms_);

      content.innerHTML = `<div class="word">
                  <div>
                     <h1 id="wordname">${word}</h1>
                     <p id="phonetic">${phonetic}</p>
                  </div>
                 
                     <img  id="play" class="play" src="./assets/images/icon-play.svg" alt="play sound">
                 
               </div>
               <div class="noun">
                  <p>noun</p>
                  <div class="line">

                  </div>
               </div>
               <div class="meaning">
                  <p>Meaning</p>
                  <ul id="noun-mean">

                  </ul>
               </div>
               <p class="synonyms">Synonyms<span id="synonyms">${synonyms_}</span></p>
               <div class="verb">
                  <p>verb</p>
                  <div class="line">

                  </div>
               </div>
               <div class="meaning">
                  <p>Meaning</p>
                  <ul id="verb-mean">

                  </ul>
                   <div class="example">
                      <p id="example"></p>
                   </div>
               </div>

               <div class="line"></div>
               <div class="source-links">
                  <p>Source</p>
                  <div class="link">
                     <a id="sourceUrls"
                        href="${sourceUrls}"
                        target="_blank">${sourceUrls}</a>
                     <img src="./assets/images/icon-new-window.svg" alt>
                  </div>
               </div>`;

      const play = document.getElementById("play");
      const nounMean = document.getElementById("noun-mean");
      const verbMean = document.getElementById("verb-mean");
      const example = document.getElementById("example");
      data.meanings[0].definitions.forEach(def => {
        // Create a list item for each definition
        const li = document.createElement("li");

        // Add the definition text
        li.innerHTML = `${def.definition}`;
        nounMean.appendChild(li);
      });


      if(data.meanings[1].definitions){
        data.meanings[1].definitions.forEach(def => {
          // Create a list item for each definition
          const li = document.createElement("li");
  
          // Add the definition text
          li.innerHTML = `${def.definition}`;
  
          // Add an example if it exists
          if (def.example) {
            example.textContent = `"${def.example}"`;
          }
  
          // Append the list item to the <ul>
          verbMean.appendChild(li);
        });
  
      }
      else{

      }

      
      play.addEventListener("click", () => {
        playAudio(audio_);
      });

      // for (let i = 0; i < data.meanings[0].definitions.length; i++) {
      //   const element = data.meanings[0].definitions[i];
      //   // console.log(element);
      //   let meanings = document.createElement("li");
      //   // meanings++;
      //   meanings.textContent = element.definition;
      //   nounMeaning.appendChild(meanings);
      // }
      // for (let i = 0; i < data.meanings[1].definitions.length; i++) {
      //   const element = data.meanings[1].definitions[i];
      //   // console.log(element);
      //   let meanings = document.createElement("li");
      //   // meanings++;
      //   meanings.textContent = element.definition;
      // const play =  document.getElementById("play")

      //   verbMeaning.appendChild(meanings);
      wordNotFound.style.display = "none";
      content.style.display = "flex";
      errorMessage.style.display = "none";
      // }

      // data.meanings[0].definitions.map(ele => console.log(ele));
    })
    .catch(err => {
      console.log("erro");
      content.style.display = "none";
      errorMessage.style.display = "none";
      wordNotFound.style.display = "flex";
    });
}

document.getElementById("submit").addEventListener("click", () => {
  if (!word_.value) {
    errorMessage.style.display = "flex";
    content.style.display = "none";
    wordNotFound.style.display = "none";
  } else {
    wordfetch();
  }
});

word_.addEventListener("change", () => {
  document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      if (!event.target.value) {
        console.log("Nothing");
      }
    }
  });
});

function playAudio(url) {
  const audio = new Audio(url);
  audio.play();
}

const mode = document.getElementById("mode");
mode.addEventListener("click", event => {
  if (mode.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});
