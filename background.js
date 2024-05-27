chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'textUtilities',
    title: 'Text Utilities',
    contexts: ['selection']
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { action, text, language } = message;

  // Define the backend URL based on the action
  let url;
  if (action === 'meaning') {
    url = 'http://localhost:5000/meaning';
  } else if (action === 'translate') {
    url = 'http://localhost:5000/translate';
  } else if (action === 'summarize') {
    url = 'http://localhost:5000/summarize';
  } else if (action === 'detect') {
    url = 'http://localhost:5000/detect';
  }

  // Make the request to the backend
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, language })
  })
    .then(response => response.json())
    .then(data => sendResponse(data.result))
    .catch(error => {
      console.error('Error:', error);
      sendResponse('Error occurred while processing the request');
    });

  return true; // Required to indicate async response
});
