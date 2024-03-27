document.querySelector('.send-button').addEventListener('click', function() {
  var input = document.querySelector('.chat-input');
  var messages = document.querySelector('.messages');
  if(input.value.trim() !== '') {
    var messageDiv = document.createElement('div');
    messageDiv.textContent = input.value;
    messages.appendChild(messageDiv);
    input.value = '';
  }
});
