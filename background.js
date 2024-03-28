chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('message', message);
  if (message.action === 'startScrapingUsers') {
    chrome.tabs.executeScript(sender.tab.id, { file: 'content.js' });
  } else if (message.action === 'startMakingAList') {
    chrome.tabs.update(sender.tab.id, { url: 'https://twitter.com/i/lists/create' });
    chrome.tabs.executeScript(sender.tab.id, { file: 'createList.js' });
  }
});
