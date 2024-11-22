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
      .then(data => data.map(dt => resolve(dt)));
  });
}

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
    word_.style.border = "2px solid red";
    wordNotFound.style.display = "none";
  } else {
   
    Fetch(api)
      .then(data => {
        let audio_;
        let phonetic;

        for (const { text: pho, audio: aud } of data.phonetics) {
          if (aud != "" && aud) {
            audio_ = aud;
            phonetic = pho;
            
          }
        
        }
        content.innerHTML = " <div class='loader-center'> <div class='loader'></div></div>";

        setTimeout(() => {
          let word = `  <br> <br><div class="word">
        <div>
           <h1 id="wordname">${data.word}</h1>
           <br>
           <p id="phonetic">${phonetic}</p>
        </div>

           <img  id="play" class="play" src="./assets/images/icon-play.svg" alt="play sound">

     </div>`;
         
          content.innerHTML = word;
          data.meanings.map(meaning => {
            content.innerHTML += ` <br> <br> <div class="noun">
              <p>${meaning.partOfSpeech}</p>
              <div class="line" />
            </div>
            <br>
            `;

            content.innerHTML += ` <br><br><div class ='meaning'>
             <p>Meaning</p></div> <br>`

            meaning.definitions.map(def => {
              if (def.definition) {
                content.innerHTML += `
                  <ul id="">
                     <li>${def.definition} <br/><span>${def.example?`"${def.example}"`:''}</span></li>
                    </ul>
                `;
              }
            });
    
             content.innerHTML += ` <p class="synonyms">Synonyms <span id="synonyms">${meaning.synonyms || 'N/A'}</span></p>`
           
          });

          content.innerHTML += ` <br><br><div class="line"></div>
          <br>
                 <div class="source-links">
                    <p>Source</p>
                    <div class="link">
                       <a id="sourceUrls"
                          href="${data.sourceUrls}"
                          target="_blank">${data.sourceUrls}</a>
                       <img src="./assets/images/icon-new-window.svg" alt>
                    </div>
                 </div>`
          const play = document.getElementById("play");

          play.addEventListener("click", () => {
            const audio= new Audio(audio_);
            audio.play();
          });

        }, 2000);

        
        content.style.display = "flex";
        errorMessage.style.display = "none";
        wordNotFound.style.display = "none";
      })
      .catch(err => {
        console.log(err);
        content.style.display = "none";
        errorMessage.style.display = "none";
        wordNotFound.style.display = "flex";
      });
  }
}

document.getElementById("submit").addEventListener("click", () => {
  wordfetch();
});

document.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    wordfetch();
    
word_.addEventListener("change", (event) => {
  if (!event.target.value) {
        console.log(err);
        content.style.display = "none";
        errorMessage.style.display = "flex";
        wordNotFound.style.display = "none";
  }else{
    wordfetch();
  }

  
});

  }
});


const mode = document.getElementById("mode");
mode.addEventListener("click", event => {
  if (mode.checked) {
    document.body.classList.add("dark");
    document.getElementById('moon').style.stroke = '#A445ED'
  } else {
    document.body.classList.remove("dark");
    document.getElementById('moon').style.stroke = '#838383'
  }
});

// Get elements
const dropdownBtn = document.getElementById("dropdown-btn");
const dropdownContent = document.getElementById("dropdown-content");
const text = document.getElementById("text");

// Add event listener for hovering (handled by CSS)
dropdownBtn.addEventListener("click", () => {
  // Toggle the dropdown visibility when clicked
  dropdownContent.style.display =
    dropdownContent.style.display === "block" ? "none" : "block";
});

// Add click event listener to each dropdown option
const fontOptions = dropdownContent.getElementsByTagName("a");
for (let option of fontOptions) {
  option.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default link behavior
    const selectedFont = option.getAttribute("data-font");

    // Update the text with the selected font
    document.body.style.fontFamily = selectedFont;

    // Update the dropdown button text
    dropdownBtn.textContent = option.textContent;

    // Hide the dropdown after selection
    dropdownContent.style.display = "none";
  });
}

// Optional: Close the dropdown if clicked outside
document.addEventListener("click", function(event) {
  if (!dropdownBtn.contains(event.target)) {
    dropdownContent.style.display = "none";
  }
});
