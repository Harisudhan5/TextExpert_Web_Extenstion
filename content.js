document.addEventListener('mouseup', (event) => {
  chrome.storage.sync.get(['enabled', 'selectedLanguage'], ({ enabled, selectedLanguage }) => {
    if (enabled) {
      const selectedText = window.getSelection().toString().trim();
      if (selectedText) {
        showOptionsMenu(event.pageX, event.pageY, selectedText, selectedLanguage);
      } else {
        removeOptionsMenu();
      }
    }
  });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'disableExtension') {
    removeOptionsMenu();
  }
  if (message.action === 'enableExtension') {
    // Add any logic needed to enable the extension on all pages
  }
});

function showOptionsMenu(x, y, selectedText, selectedLanguage) {
  removeOptionsMenu();

  const shadowHost = document.createElement('div');
  shadowHost.id = 'text-utilities-menu';
  shadowHost.style.position = 'absolute';
  shadowHost.style.top = `${y}px`;
  shadowHost.style.left = `${x}px`;
  shadowHost.style.zIndex = '9999';

  const shadowRoot = shadowHost.attachShadow({ mode: 'closed' });
  shadowRoot.innerHTML = `
    <style>

      #menu {
        background-color: violet;
        border: 1px solid #ccc;
        padding: 10px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        font-family: Arial, sans-serif;
        font-size: 14px;
        color: black;
        width: 150px;
      }


      button {
        display: block;
        margin: 5px 0;
        width: 100%;
        background-color: white;
        color: black;
        border: 1px solid #ccc;
        cursor: pointer;
        padding: 5px;
      }
      button:disabled {
        background-color: #ddd;
        cursor: not-allowed;
      }
    </style>
    <div id="menu">
      <button id="meaning">Meaning</button>
      <button id="translate">Translate</button>
      <button id="summarize">Summarize</button>
      <button id="detect">Detect Language</button>
    </div>
  `;

  document.body.appendChild(shadowHost);

  shadowRoot.getElementById('meaning').addEventListener('click', () => handleButtonClick('meaning', selectedText, selectedLanguage, shadowRoot));
  shadowRoot.getElementById('translate').addEventListener('click', () => handleButtonClick('translate', selectedText, selectedLanguage, shadowRoot));
  shadowRoot.getElementById('summarize').addEventListener('click', () => handleButtonClick('summarize', selectedText, selectedLanguage, shadowRoot));
  shadowRoot.getElementById('detect').addEventListener('click', () => handleButtonClick('detect', selectedText, selectedLanguage, shadowRoot));
}

function removeOptionsMenu() {
  const existingMenu = document.getElementById('text-utilities-menu');
  if (existingMenu) {
    existingMenu.remove();
  }
}

function handleButtonClick(action, text, language, shadowRoot) {
  const button = shadowRoot.getElementById(action);
  button.disabled = true;
  button.textContent = 'Loading...';

  chrome.runtime.sendMessage({ action, text, language }, (response) => {
    alert(response); // Display the result in an alert box
    button.disabled = false;
    button.textContent = capitalizeFirstLetter(action.replace('_', ' '));
    removeOptionsMenu();
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
