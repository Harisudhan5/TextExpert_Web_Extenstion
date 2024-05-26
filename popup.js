// Function to save the selected language to Chrome storage
function saveSelectedLanguage(language) {
  chrome.storage.sync.set({ selectedLanguage: language });
}

// Function to load the selected language from Chrome storage and set it in the dropdown menu
function loadSelectedLanguage() {
  chrome.storage.sync.get('selectedLanguage', ({ selectedLanguage }) => {
    const languageSelect = document.getElementById('language-select');
    if (selectedLanguage) {
      languageSelect.value = selectedLanguage;
    } else {
      // Set default language to English
      languageSelect.value = "English";
      // Save the default language to Chrome storage
      saveSelectedLanguage("English");
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
