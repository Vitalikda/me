// Concat the mailto
function sendEmail() { window.open('mai' + 'lto:hi' + '@' + 'vitaly' + '.im?' + 'body=Please take a moment to write a short email. '); }

// Type  words
class TypeWords {
  constructor(txtElement, words, wait) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current Index of Words
    const current = this.wordIndex % this.words.length;
    // Get full text of Current
    const fullTxt = this.words[current];

    // Check if Deleting 
    if (this.isDeleting) {
      // Remove character 
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add character
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert Txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 200;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is completed
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at the end
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to the next word
      this.wordIndex++;
      // Pause before new word
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init on Animation End
const loading = document.querySelector('.loading');
loading.addEventListener('animationend', init);
// Init app
function init() {
  const txtElement = document.querySelector('.cart-txt');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWords 
  new TypeWords(txtElement, words, wait);
}