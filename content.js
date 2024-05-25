document.addEventListener('mouseup', (event) => {
    chrome.storage.sync.get('enabled', ({ enabled }) => {
      if (enabled) {
        const selectedText = window.getSelection().toString().trim();
        if (selectedText) {
          showOptionsMenu(event.pageX, event.pageY, selectedText);
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
  
  function showOptionsMenu(x, y, selectedText) {
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
          width: 200px;
        }
        #menu h3 {
          margin-top: 0;
        }
        #menu p {
          margin: 0;
          font-style: normal;
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
      </div>
    `;
  
    document.body.appendChild(shadowHost);
  
    shadowRoot.getElementById('meaning').addEventListener('click', () => handleButtonClick('meaning', selectedText, shadowRoot));
    shadowRoot.getElementById('translate').addEventListener('click', () => handleButtonClick('translate', selectedText, shadowRoot));
    shadowRoot.getElementById('summarize').addEventListener('click', () => handleButtonClick('summarize', selectedText, shadowRoot));
  }
  
  function removeOptionsMenu() {
    const existingMenu = document.getElementById('text-utilities-menu');
    if (existingMenu) {
      existingMenu.remove();
    }
  }
  
  function handleButtonClick(action, text, shadowRoot) {
    const button = shadowRoot.getElementById(action);
    button.disabled = true;
    button.textContent = 'Loading...';
  
    // Retrieve the selected language from Chrome storage
    chrome.storage.sync.get('selectedLanguage', ({ selectedLanguage }) => {
      // Include the selected language in the request
      chrome.runtime.sendMessage({ action, text, language: selectedLanguage }, (response) => {
        alert(response); // Customize to show the result in a better way.
        button.disabled = false;
        button.textContent = capitalizeFirstLetter(action);
        removeOptionsMenu();
      });
    });
  }
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  