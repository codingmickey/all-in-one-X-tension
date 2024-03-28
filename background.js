chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('message', message);
  if (message.action === 'startAutomation') {
    chrome.tabs.executeScript(sender.tab.id, { file: 'content.js' });
  }
});
