window.addEventListener('scroll', function() {
  var scrollPosition = window.scrollY;
  var searchContainer = document.querySelector('.search-container');
  var maxTop = window.innerHeight - searchContainer.offsetHeight;
  var newTop = Math.min(500 + scrollPosition * 3, maxTop);
  searchContainer.style.top = newTop + 'px';
});

document.querySelector('.search-button').addEventListener('click', function() {
  var searchBox = document.querySelector('.search-box');
  var chatBox = document.querySelector('.chat-box');

  if (searchBox.value.trim() !== '') {
   
    var userDiv = document.createElement('div');
    userDiv.classList.add('user-message');
    userDiv.textContent = searchBox.value;
    chatBox.appendChild(userDiv);

   
    var aiDiv = document.createElement('div');
    aiDiv.classList.add('ai-message');
    
    aiDiv.textContent = "써니: " + searchBox.value;
    chatBox.appendChild(aiDiv);

    
    searchBox.value = '';

    
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});
