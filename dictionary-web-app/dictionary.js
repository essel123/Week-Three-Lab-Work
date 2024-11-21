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


  if (!word) {
    errorMessage.style.display = "flex";
    content.style.display = "none";
    word_.style.border = '1px solid red'
    wordNotFound.style.display = "none";
    
  }
  else{
    Fetch(api)
    .then(data => {
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
                     <p id="phonetic">${phonetic? phonetic:'N/A'}</p>
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
     
      data.meanings[0].definitions.forEach(def => {
       
        const li = document.createElement("li");

       
        li.innerHTML = `${def.definition}`;

        if (def.example) {
         li.innerHTML += `  <br/> <span> "${def.example}</span>"`;
        }
        nounMean.appendChild(li);
      });

      if (data.meanings[1].definitions) {
        data.meanings[1].definitions.forEach(def => {
         
          const li = document.createElement("li");
          li.innerHTML = `${def.definition}`;

          if (def.example) {
            li.innerHTML += `<br/> <span>"${def.example}</span>"`;
           }
          verbMean.appendChild(li);
        });
      } 

      play.addEventListener("click", () => {
        playAudio(audio_);
      });

     
      wordNotFound.style.display = "none";
      content.style.display = "flex";
      errorMessage.style.display = "none";

    })
    .catch(err => {
      console.log("erro");
      content.style.display = "none";
      errorMessage.style.display = "none";
      wordNotFound.style.display = "flex";
    });
  }
  
}

document.getElementById("submit").addEventListener("click", () => {
 wordfetch()
});

word_.addEventListener("change", () => {
  console.log('kkk')
  document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      wordfetch()
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



// Get elements
const dropdownBtn = document.getElementById("dropdown-btn");
const dropdownContent = document.getElementById("dropdown-content");
const text = document.getElementById("text");

// Add event listener for hovering (handled by CSS)
dropdownBtn.addEventListener('click', () => {
    // Toggle the dropdown visibility when clicked
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
});

// Add click event listener to each dropdown option
const fontOptions = dropdownContent.getElementsByTagName('a');
for (let option of fontOptions) {
    option.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        const selectedFont = option.getAttribute('data-font');
        
        // Update the text with the selected font
       document.body.style.fontFamily = selectedFont
        
        // Update the dropdown button text
        dropdownBtn.textContent = option.textContent;
        
        // Hide the dropdown after selection
        dropdownContent.style.display = 'none';
    });
}

// Optional: Close the dropdown if clicked outside
document.addEventListener('click', function(event) {
    if (!dropdownBtn.contains(event.target)) {
        dropdownContent.style.display = 'none';
    }
});

