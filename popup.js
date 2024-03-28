var bkg = chrome.extension.getBackgroundPage();
bkg.console.log('foo');

document.getElementById('startAutomation').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    bkg.console.log('tabs', tabs);

    const regexPattern = new RegExp('https://twitter.com/[^/]+/following');

    if (regexPattern.test(tabs[0].url)) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'startScrapingUsers' });
      const firstUser = document.querySelector("div[data-testid='UserCell']");
      console.log(firstUser);
      console.log('startAutomation');

      chrome.tabs.update(tabs[0].id, { url: 'https://' });
    }
  });
});
