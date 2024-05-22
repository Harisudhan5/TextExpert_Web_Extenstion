document.addEventListener('DOMContentLoaded', function() {
    chrome.runtime.sendMessage({ type: 'getEnabledState' }, (response) => {
      document.getElementById('toggle').checked = response.enabled;
    });
  
    document.getElementById('toggle').addEventListener('change', function() {
      const isEnabled = this.checked;
      chrome.storage.local.set({ enabled: isEnabled });
    });
  });
  