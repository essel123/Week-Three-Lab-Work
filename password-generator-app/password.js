const copy = document.getElementById("copy");
const copied = document.getElementById("copied");
const password = document.getElementById("password");
const genPasswordBtn = document.getElementById("btn");
const slider = document.getElementById("slider");
const number = document.getElementById("number");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");
const showVisual = document.getElementById("show-visual");

number.textContent = slider.value;
copy.addEventListener("click", () => {
  copied.style.display = "flex";
});

function sliderVal() {
  let value = slider.value;
  console.log(value);
}

slider.addEventListener("input", event => {
  number.textContent = event.target.value;
});



function generatePassword() {
  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_-+=<>?/";

  let passwordChars = "";
  let passwordLength = slider.value;

  if (option1.checked) {
    passwordChars += upperCaseChars;
  }
  if (option2.checked) {
    passwordChars += lowerCaseChars;
  }
  if (option3.checked) {
    passwordChars += numberChars;
  }
  if (option4.checked) {
    passwordChars += symbolChars;
  }

  if (!passwordChars) {
    alert("Please select at least one character type for the password.");
    return;
  }
  let genPassword = "";

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * passwordChars.length);
    genPassword += passwordChars[randomIndex];
  }

 
  password.textContent = genPassword;

}

function handleCheckboxClick(event) {
  const checkbox = event.target;
  const isChecked = checkbox.checked;
  if (checkbox.id === "option1") {
  } else if (checkbox.id === "option2") {
  } else if (checkbox.id === "option3") {
    if (check === false) {
    }
  } else if (checkbox.id === "option4") {
    if (check === false) {
    }
  }
}


function strength() {
  for (let i = 0; i < 4; i++) {
    const li = document.createElement("div");
    li.className = "visual";
    showVisual.append(li);
  }
}

strength()
option1.addEventListener('click', handleCheckboxClick);
option2.addEventListener('click', handleCheckboxClick);
option3.addEventListener('click', handleCheckboxClick);
option4.addEventListener('click', handleCheckboxClick);

genPasswordBtn.addEventListener("click", () => {
  password.textContent =""
  generatePassword();
   
});

