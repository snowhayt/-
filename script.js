const searchContainer = document.querySelector('.search-container');
const searchBox = document.querySelector('.search-box');
const searchButton = document.querySelector('.search-button');
const chatBox = document.querySelector('.chat-box');

  setTimeout(function() {
    var userMessage = document.createElement('div');
    userMessage.classList.add('user-message');
    userMessage.textContent = "안녕, 써니!";
    document.querySelector('.chat-box').appendChild(userMessage);

  
    setTimeout(function() {
      var aiMessage = document.createElement('div');
      aiMessage.classList.add('ai-message');
      aiMessage.textContent = "안녕하세요! 오늘 어떻게 도와드릴까요?";
      document.querySelector('.chat-box').appendChild(aiMessage);
    }, 1000); 
  }, 3000); 

function addMessage(className, text) {
  var message = document.createElement('div');
  message.classList.add(className);
  message.textContent = text;
  document.querySelector('.chat-box').appendChild(message);
}

document.addEventListener('DOMContentLoaded', function() {
  const voiceSearchBtn = document.getElementById('voice-search-btn');
  const searchBox = document.querySelector('.search-box');

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (typeof SpeechRecognition !== "undefined") {
    const recognition = new SpeechRecognition();
    recognition.continuous = false; 
    recognition.lang = "ko-KR"; 

    voiceSearchBtn.addEventListener("click", () => {
      recognition.start(); 
    });

    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript; 
      searchBox.value = transcript;
    };

    recognition.onerror = function(event) {
      console.error("Speech Recognition Error:", event.error);
    };
  } else {
    voiceSearchBtn.style.display = "none"; 
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
  const opacity = 1 - scrollFactor;
  const character = document.querySelector('.character');
  if (character) {
    const characterPosition = -600 * scrollFactor;
    character.style.left = `${characterPosition}px`;
    character.style.opacity = `${opacity}`;
  }

  const character2 = document.querySelector('.character2');
  if (character2) {
    const character2Position = -600 * scrollFactor;
    character2.style.right = `${character2Position}px`;
    character2.style.opacity = `${opacity}`;
  }
});

