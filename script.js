document.addEventListener("DOMContentLoaded", function() {
    function vowConCipherEncryption(plaintext) {
        const vowels = { 'a': 2, 'e': 4, 'i': 6, 'o': 8, 'u': 10 };
        const consonants = 5;

        function shift(char, shift) {
            let base = char >= 'A' && char <= 'Z' ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
            let newCharCode = ((char.charCodeAt(0) - base + shift) % 26) + base;
            return String.fromCharCode(newCharCode);
        }

        return plaintext.split('').map(char => {
            let lowerChar = char.toLowerCase();
            if (vowels[lowerChar] !== undefined) {
                return shift(char, vowels[lowerChar]);
            } else if (char.match(/[a-zA-Z]/)) {
                return shift(char, consonants);
            }
            return char;
        }).join('');
    }

    function encryptText() {
        let inputElement = document.getElementById("plaintext");

        if (!inputElement) {
            console.error("Error: Input element not found!");
            return;
        }

        let inputText = inputElement.value;
        let encryptedText = vowConCipherEncryption(inputText);
        document.getElementById("output").textContent = encryptedText;
    }

    // Attach event listener after DOM loads
    document.getElementById("encryptButton").addEventListener("click", encryptText);
});
