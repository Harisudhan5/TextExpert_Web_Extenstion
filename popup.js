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
