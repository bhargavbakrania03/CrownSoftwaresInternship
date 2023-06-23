const input = document.querySelector("#phone"); // input field
const output = document.querySelector("#output"); // output field
const error_msg = document.querySelector("#error-msg"); // div to display errors
const valid_msg = document.querySelector("#valid-msg"); // div displaying validity of phone number

var number, error_code;

// here, the index maps to the error code returned from getValidationError - see readme
const errorMap = [
  "Invalid number",
  "Invalid country code",
  "Too short",
  "Too long",
  "Invalid number",
];

// initialise plugin of intlTelInput library
//  provides input field to enter phone number with country code functionality

const iti = window.intlTelInput(input, {
  separateDialCode: true, // separates dial code from being fetched with the phone number
  initialCountry: "IN",
  nationalMode: true,
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js", // cdn link which allows us to use various functionalities provided by this library
});

const reset = () => {
  input.classList.remove("error");
  error_msg.innerHTML = "";
  error_msg.classList.add("hide");
  valid_msg.classList.add("hide");
};

// on blur: validate
input.addEventListener("blur", () => {
  reset();
  if (input.value.trim()) {
    // checking whether the entered number is valid or not
    if (iti.isValidNumber()) {
      valid_msg.classList.remove("hide");
      number = iti.getNumber();

      // getting country data of entered country
      console.log(iti.getSelectedCountryData());

      // getting specific country code of entered country
      console.log(iti.getSelectedCountryData().dialCode);
    } else {
      input.classList.add("error");
      error_code = iti.getValidationError();
      if (error_code === "undefined") {
      }

      // printing error
      error_msg.innerHTML = errorMap[error_code];
      error_msg.classList.remove("hide");
    }
  }
});
