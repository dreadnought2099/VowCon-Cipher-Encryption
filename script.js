document.addEventListener("DOMContentLoaded", function () {
  const vowels = { a: 2, e: 4, i: 6, o: 8, u: 10 };
  const consonants = 5;

  // Function to shift characters for encryption/decryption
  function shift(char, shiftValue, isDecrypt = false) {
    let base =
      char >= "A" && char <= "Z" ? "A".charCodeAt(0) : "a".charCodeAt(0);
    let newCharCode;

    if (isDecrypt) {
      // Decrypt: subtract shift
      newCharCode = ((char.charCodeAt(0) - base - shiftValue + 26) % 26) + base;
    } else {
      // Encrypt: add shift
      newCharCode = ((char.charCodeAt(0) - base + shiftValue) % 26) + base;
    }

    return String.fromCharCode(newCharCode);
  }

  // Encryption function
  function vowConCipherEncryption(plaintext) {
    return plaintext.split("").map((char) => {
      let lowerChar = char.toLowerCase();
      if (vowels[lowerChar] !== undefined) {
        // Encrypt vowel: use the vowel's shift value
        return {
          char: shift(char, vowels[lowerChar]),
          shift: vowels[lowerChar],
        };
      } else if (char.match(/[a-zA-Z]/)) {
        // Encrypt consonant: use the consonant shift value
        return { char: shift(char, consonants), shift: consonants };
      }
      // Non-alphabetical characters stay unchanged
      return { char: char, shift: 0 };
    });
  }

  // Decryption function (reverse of encryption)
  function vowConCipherDecryption(encryptedText, shifts) {
    return encryptedText
      .split("")
      .map((char, index) => {
        let shiftValue = shifts[index];
        if (shiftValue !== 0) {
          // Decrypt: reverse the shift
          return shift(char, shiftValue, true);
        }
        // Non-alphabetical characters stay unchanged
        return char;
      })
      .join("");
  }

  // Track whether the current text is encrypted or not
  let isTextEncrypted = false;
  let shiftValues = []; // Store shift values used during encryption

  // Function to process text (either encrypt or decrypt based on current state)
  function processText() {
    let inputElement = document.getElementById("plaintext");
    let buttonElement = document.getElementById("processButton");

    if (!inputElement || !buttonElement) {
      console.error("Error: Input element or button not found!");
      return;
    }

    let inputText = inputElement.value;
    let processedText;

    if (isTextEncrypted) {
      // If the text is currently encrypted, decrypt it
      processedText = vowConCipherDecryption(inputText, shiftValues);
      buttonElement.textContent = "Encrypt"; // Change button text to Encrypt
      isTextEncrypted = false; // Update state
    } else {
      // If the text is not encrypted, encrypt it
      let encryptedResult = vowConCipherEncryption(inputText);
      // Extract the encrypted text and shift values
      processedText = encryptedResult.map((item) => item.char).join("");
      shiftValues = encryptedResult.map((item) => item.shift); // Store shift values
      buttonElement.textContent = "Decrypt"; // Change button text to Decrypt
      isTextEncrypted = true; // Update state
    }

    // Display the processed text back in the input field
    inputElement.value = processedText;
  }

  // Attach event listener for the button (Encrypt/Decrypt toggle)
  document
    .getElementById("processButton")
    .addEventListener("click", processText);
});
