chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('message', message);

  if (message.action === 'startScrapingUsers') {
    chrome.tabs.executeScript(sender.tab.id, { file: 'content.js' });
  }

  if (message.action === 'startMakingAList') {
    console.log('working??');
    for (let i = 0; i < message.usersToAct.length; i++) {
      chrome.tabs.update(sender.tab.id, { url: 'https://twitter.com/BrawlKc' }, async (tab) => {
        console.log('reached here');
        await chrome.tabs.executeScript(tab.id, { code: 'somefuntion here was there', runAt: 'document_idle' }, () => {
          // console.log('injected Script createList.js');
          // chrome.tabs.sendMessage(tab.id, { action: 'startMakingAListInject' }, () => {
          //   console.log('injected script');
          // });
          console.log('workssdssss');
        });

        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
          if (info.status === 'complete' && tabId === tab.id) {
            chrome.tabs.onUpdated.removeListener(listener);
            chrome.tabs.sendMessage(tab.id, { message: { action: 'startMakingAListInject' } });
          }
        });
      });
    }
  }
});
