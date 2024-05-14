chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('message', message);

  if (message.action === 'startScrapingUsers') {
    chrome.tabs.executeScript(sender.tab.id, { file: 'content.js' });
  }

  if (message.action === 'startMakingAList') {
    console.log('working??');
    // for (let i = 0; i < 2; i++) {
    if (message.index !== message.usersToAct.length) {
      chrome.tabs.update(
        sender.tab.id,
        { url: `https://twitter.com/${message.usersToAct[message.index]}` },
        async (tab) => {
          // console.log('reached here');
          // await chrome.tabs.executeScript(tab.id, { code: 'somefuntion here was there', runAt: 'document_idle' }, () => {
          //   // console.log('injected Script createList.js');
          //   // chrome.tabs.sendMessage(tab.id, { action: 'startMakingAListInject' }, () => {
          //   //   console.log('injected script');
          //   // });
          //   console.log('workssdssss');
          // });

          chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
            if (info.status === 'complete' && tabId === tab.id) {
              chrome.tabs.onUpdated.removeListener(listener);
              chrome.tabs.sendMessage(tab.id, {
                action: 'startMakingAListInject',
                usersToAct: message.usersToAct,
                index: message.index
              });
            }
          });
        }
      );
    }
    // }
  }

  if (message.action === 'openNewTab') {
    chrome.tabs.create({ url: `${message.url}/retweets` }, (tab) => {
      chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
        if (info.status === 'complete' && tabId === tab.id) {
          chrome.tabs.onUpdated.removeListener(listener);
          chrome.tabs.sendMessage(
            tab.id,
            {
              action: 'startCollectingUsers'
            },
            (response) => {
              console.log(response);
              console.log({ someUsers: response });
              sendResponse({ message: 'Users collected successfully', response });

              chrome.runtime.sendMessage({
                msg: 'usersCollectingCompleted',
                data: response
              });
            }
          );
        }
      });
    });
  }
});
