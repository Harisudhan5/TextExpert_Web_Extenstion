document.addEventListener('DOMContentLoaded', function () {
  const enableExtensionCheckbox = document.getElementById('toggle');

  chrome.storage.sync.get('enabled', ({ enabled }) => {
    enableExtensionCheckbox.checked = enabled;
  });

  enableExtensionCheckbox.addEventListener('change', () => {
    const enabled = enableExtensionCheckbox.checked;
    chrome.storage.sync.set({ enabled });
    chrome.runtime.sendMessage({ action: enabled ? 'enableExtension' : 'disableExtension' });
  });
});
// Function to save the selected language to Chrome storage
function saveSelectedLanguage(language) {
  chrome.storage.sync.set({ selectedLanguage: language });
}

// Function to load the selected language from Chrome storage and set it in the dropdown menu
function loadSelectedLanguage() {
  chrome.storage.sync.get('selectedLanguage', ({ selectedLanguage }) => {
    if (selectedLanguage) {
      const languageSelect = document.getElementById('language-select');
      languageSelect.value = selectedLanguage;
    }
  });
}

// Event listener for the dropdown menu change event
document.getElementById('language-select').addEventListener('change', (event) => {
  const selectedLanguage = event.target.value;
  saveSelectedLanguage(selectedLanguage);
});

// Load the selected language when the popup is opened
loadSelectedLanguage();
