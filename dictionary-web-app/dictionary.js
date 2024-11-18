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

const Meaning = document.getElementById("Meaning");
const sourceUrls = document.getElementById("sourceUrls");
const word_ = document.getElementById("word");

function wordfetch() {
  let word = word_.value;
  const api = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  Fetch(api)
    .then(data => {
      console.log(data);
      phonetic.textContent = `${data.phonetic}`;
      Meaning.textContent = `${data.meanings[0].definitions[0].definition}`;
      sourceUrls.textContent = `${data.sourceUrls}`;
      sourceUrls.setAttribute("href", `${data.sourceUrls}`);
    })
    .catch(err => console.log(err));
}

document.getElementById("submit").addEventListener("click", () => {
  wordfetch();
});

document.getElementById("word").addEventListener("change", () => {
  document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      wordfetch();
    } else {
      return null;
    }
  });
});
