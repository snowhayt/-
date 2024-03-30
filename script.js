// Querying the DOM for required elements only once
const searchContainer = document.querySelector('.search-container');
const searchBox = document.querySelector('.search-box');
const searchButton = document.querySelector('.search-button');
const chatBox = document.querySelector('.chat-box');

// Simulate user message after 1 second
  setTimeout(function() {
    // Add user message
    var userMessage = document.createElement('div');
    userMessage.classList.add('user-message');
    userMessage.textContent = "안녕, 써니!";
    document.querySelector('.chat-box').appendChild(userMessage);

    // Simulate AI response after another 1 second delay
    setTimeout(function() {
      // Add AI message
      var aiMessage = document.createElement('div');
      aiMessage.classList.add('ai-message');
      aiMessage.textContent = "안녕하세요! 오늘 어떻게 도와드릴까요?";
      document.querySelector('.chat-box').appendChild(aiMessage);
    }, 1000); // Adjust delay as needed
  }, 3000); // Adjust delay as needed

function addMessage(className, text) {
  var message = document.createElement('div');
  message.classList.add(className);
  message.textContent = text;
  document.querySelector('.chat-box').appendChild(message);
}

document.addEventListener('DOMContentLoaded', function() {
  // Setup for voice-to-text
  const voiceSearchBtn = document.getElementById('voice-search-btn');
  const searchBox = document.querySelector('.search-box');

  // Check for SpeechRecognition support
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (typeof SpeechRecognition !== "undefined") {
    const recognition = new SpeechRecognition();
    recognition.continuous = false; // Stop after a single result
    recognition.lang = "ko-KR"; // Set language

    voiceSearchBtn.addEventListener("click", () => {
      recognition.start(); // Start speech recognition
    });

    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript; // Get transcribed text
      searchBox.value = transcript; // Place the text in the search box
      // Removed automatic sending, allowing the user to send it manually
    };

    recognition.onerror = function(event) {
      console.error("Speech Recognition Error:", event.error);
    };
  } else {
    voiceSearchBtn.style.display = "none"; // Hide button if not supported
  }
});

function setPosition() {
  let scrollPosition = window.scrollY;
  let maxTop = window.innerHeight - searchContainer.offsetHeight;
  let newTop = Math.min(500 + scrollPosition * 3, maxTop);
  searchContainer.style.top = `${newTop}px`;
}

function toggleSearchButton() {
  searchButton.disabled = searchBox.value.trim() === '';
}

function handleSearchAction() {
  if (searchBox.value.trim() !== '') {
    let userDiv = document.createElement('div');
    userDiv.className = 'user-message';
    userDiv.textContent = searchBox.value;
    chatBox.appendChild(userDiv);

    let aiDiv = document.createElement('div');
    aiDiv.className = 'ai-message';
    aiDiv.textContent = "써니: " + searchBox.value;
    chatBox.appendChild(aiDiv);

    searchBox.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
    resetScrollbarVisibility();
  }
}

let fadeTimeout;
function setScrollbarVisibility(visible) {
  chatBox.classList.toggle('no-scrollbar', !visible);
}

function resetScrollbarVisibility() {
  clearTimeout(fadeTimeout);
  setScrollbarVisibility(true);
  fadeTimeout = setTimeout(() => setScrollbarVisibility(false), 1500);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  setPosition();
  resetScrollbarVisibility();
});

window.addEventListener('scroll', setPosition);
searchBox.addEventListener('blur', toggleSearchButton);
searchBox.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !searchButton.disabled) {
    e.preventDefault();
    handleSearchAction();
  }
});
searchButton.addEventListener('click', handleSearchAction);
chatBox.addEventListener('scroll', resetScrollbarVisibility);

window.addEventListener('scroll', function() {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  const scrollFactor = currentScroll / scrollHeight;

  // Common calculations for fading effect based on scroll position.
  const opacity = 1 - scrollFactor;

  // For character (moving horizontally from the left)
  const character = document.querySelector('.character');
  if (character) {
    const characterPosition = -600 * scrollFactor; // Calculate leftward movement
    character.style.left = `${characterPosition}px`; // Apply movement
    character.style.opacity = `${opacity}`; // Apply fading
  }


  const character2 = document.querySelector('.character2');
  if (character2) {
    const character2Position = -600 * scrollFactor;
    character2.style.right = `${character2Position}px`;
    character2.style.opacity = `${opacity}`; // Apply fading in sync with character1
  }
});

