chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get('enabled', (data) => {
      if (data.enabled === undefined) {
        chrome.storage.local.set({ enabled: false });
      }
    });
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'getEnabledState') {
      chrome.storage.local.get('enabled', (data) => {
        sendResponse({ enabled: data.enabled });
      });
      return true;  // Will respond asynchronously.
    }
  });
  