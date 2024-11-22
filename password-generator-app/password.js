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

const updateSliderBackground = () => {
  const value = slider.value;
  const min = slider.min;
  const max = slider.max;

  // Calculate the percentage of the range value
  const percentage = (value - min) / (max - min) * 100;

  // Set the background style dynamically
  slider.style.background = `linear-gradient(to right, #A4FFAF ${percentage}%, #18171F ${percentage}%)`;
};

// Initialize the slider background
updateSliderBackground();

slider.addEventListener("input", event => {
  updateSliderBackground();
  number.textContent = event.target.value;
});

function timeout() {
  setTimeout(() => {
    document.getElementById("error").style.display = "none";
  }, 2000);
}

const strengthBars = [
  document.getElementById("strength1"),
  document.getElementById("strength2"),
  document.getElementById("strength3"),
  document.getElementById("strength4")
];

const strengthText = document.getElementById("strength-text");

// Function to calculate password strength based on selected options and password length
const calculateStrength = () => {
  const checkedOptions = [
    option1.checked,
    option2.checked,
    option3.checked,
    option4.checked
  ];

  const selectedTypes = checkedOptions.filter(Boolean).length;
  const passwordLength = parseInt(slider.value);

  let strengthLevel = 1; // Default to "Too Weak"

  if (selectedTypes >= 2 && passwordLength >= 8) {
    strengthLevel = 2; // "Weak"
  }

  if (selectedTypes >= 3 && passwordLength >= 8) {
    strengthLevel = 3; // "Medium"
  }

  if (selectedTypes >= 4 && passwordLength >= 12) {
    strengthLevel = 4; // "Strong"
  }

  return strengthLevel;
};

class PasswordGen {
  constructor(...characterTypes) {
    [
      this.upperCaseChars,
      this.lowerCaseChars,
      this.numberChars,
      this.symbolChars
    ] = characterTypes;
  }

  generatePassword() {
    let passwordChars = "";
    let passwordLength = slider.value;

    if (option1.checked) {
      passwordChars += this.upperCaseChars;
    }
    if (option2.checked) {
      passwordChars += this.lowerCaseChars;
    }
    if (option3.checked) {
      passwordChars += this.numberChars;
    }
    if (option4.checked) {
      passwordChars += this.symbolChars;
    }

    if (!passwordChars) {
      document.getElementById("error").style.display = "flex";
      timeout();
      return;
    }

    if (slider.value === "0") {
      document.getElementById("error").textContent = "Set character length";
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

  copyPassword() {
    copy.addEventListener("click", () => {
      copied.style.display = "flex";
      setTimeout(()=>{
        copied.style.display = "none";
      }, 2000)


     
       const cd = navigator.clipboard;
       cd.writeText(genPassword)
    });
  }

 
  updateStrength() {
    const strengthLevel = calculateStrength();
    // Loop through each strength bar and update its color
    for (let i = 0; i < strengthBars.length; i++) {
      if (i < strengthLevel) {
        if (strengthLevel === 1) {
          strengthBars[i].style.backgroundColor = "#F64A4A";
        } else if (strengthLevel === 2) {
          strengthBars[i].style.backgroundColor = "#FB7C58";
        } else if (strengthLevel === 3) {
          strengthBars[i].style.backgroundColor = "#F8CD65";
        } else if (strengthLevel === 4) {
          strengthBars[i].style.backgroundColor = "#A4FFAF";
        }
      } else {
        strengthBars[i].style.backgroundColor = "transparent";
      }
    }

    switch (strengthLevel) {
      case 1:
        strengthText.innerText = "TOO WEAK!";
        break;
      case 2:
        strengthText.innerText = "WEAK";
        break;
      case 3:
        strengthText.innerText = "MEDIUM";
        break;
      case 4:
        strengthText.innerText = "STRONG";
        break;
    }
  }
}

const pass = new PasswordGen([
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "abcdefghijklmnopqrstuvwxyz",
  "0123456789",
  "!@#$%^&*()_-+=<>?/"
]);

genPasswordBtn.addEventListener("click", () => {
  pass.generatePassword();
});

pass.copyPassword()

option1.addEventListener("change", pass.updateStrength);
option2.addEventListener("change", pass.updateStrength);
option3.addEventListener("change", pass.updateStrength);
option4.addEventListener("change", pass.updateStrength);
slider.addEventListener("input", pass.updateStrength);
