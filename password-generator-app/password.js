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
let genPassword = "";

number.textContent = slider.value;
copy.addEventListener("click", () => {
  copied.style.display = "flex";
});

function updateSliderBackground() {
  const value = slider.value;
  const min = slider.min;
  const max = slider.max;

  // Calculate the percentage of the range value
  const percentage = (value - min) / (max - min) * 100;

  // Set the background style dynamically
  slider.style.background = `linear-gradient(to right, #A4FFAF ${percentage}%, #18171F ${percentage}%)`;
}

// Initialize the slider background
updateSliderBackground();

slider.addEventListener("input", event => {
  updateSliderBackground();
  number.textContent = event.target.value;
});


function timeout(){
     
  setTimeout(() => {
    document.getElementById("error").style.display = "none";
  }, 2000);
}
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
    document.getElementById("error").style.display = "flex";
    timeout()
    return;
  }

  if (slider.value === '0') {
    document.getElementById("error").textContent = "Set character length"
    document.getElementById("error").style.display = "flex";
    timeout();
   return;
  }

 
  genPassword = "";
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * passwordChars.length);
    genPassword += passwordChars[randomIndex];
  }

  password.textContent = genPassword;
}

genPasswordBtn.addEventListener("click", () => {
  generatePassword();
});

const strengthBars = [
  document.getElementById("strength1"),
  document.getElementById("strength2"),
  document.getElementById("strength3"),
  document.getElementById("strength4")
];

// Function to update the strength based on the selected options
function updateStrength() {
  // Get the checked status of each checkbox
  const checkedOptions = [
    option1.checked,
    option2.checked,
    option3.checked,
    option4.checked
  ];

  // Count how many options are checked
  const strengthLevel = checkedOptions.filter(Boolean).length;
  const strengthText = document.getElementById("strength-text");

  // Loop through each strength bar and update its color
  for (let i = 0; i < strengthBars.length; i++) {
    // Set the background color based on the number of checked options
    if (i < strengthLevel) {
      if (strengthLevel === 1) {
        strengthBars[i].style.backgroundColor = "#F64A4A";
      } else if (strengthLevel === 2) {
        strengthBars[i].style.backgroundColor = "#FB7C58";
      } else if (strengthLevel === 3) {
        strengthBars[i].style.backgroundColor = "#F8CD65";
      } else {
        strengthBars[i].style.backgroundColor = "#A4FFAF";
      }
    } else {
      strengthBars[i].style.backgroundColor = "transparent";
    }
  }

  if (strengthLevel === 1) {
    strengthText.innerText = "TOO WEAK!";
  } else if (strengthLevel === 2) {
    strengthText.innerText = "WEAK";
  } else if (strengthLevel === 3) {
    strengthText.innerText = "MEDIUM";
  } else if (strengthLevel === 4) {
    strengthText.innerText = "STRONG";
  } else {
    strengthText.innerText = "";
  }
}

option1.addEventListener("change", updateStrength);
option2.addEventListener("change", updateStrength);
option3.addEventListener("change", updateStrength);
option4.addEventListener("change", updateStrength);

updateStrength();



