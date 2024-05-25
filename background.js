chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'textUtilities',
    title: 'Text Utilities',
    contexts: ['selection']
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'disableExtension') {
    chrome.tabs.sendMessage(sender.tab.id, { action: 'disableExtension' });
  } else if (message.action === 'enableExtension') {
    chrome.tabs.sendMessage(sender.tab.id, { action: 'enableExtension' });
  } else if (['meaning', 'translate', 'summarize'].includes(message.action)) {
    fetch(`http://localhost:5000/${message.action}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message.text })
    })
      .then(response => response.json())
      .then(data => sendResponse(data.result))
      .catch(error => console.error('Error:', error));
    return true; // Required to indicate async response
  }
});
