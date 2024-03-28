chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'startMakingAList') {
    // Your automation logic using Puppeteer or similar tools
    // Example: Open Twitter, log in, identify non-followers, move to list, and unfollow
    const firstUser = document.querySelector("div[data-testid='UserCell']");

    console.log(window.location.href);

    const regexPattern = new RegExp('https://twitter.com/[^/]+/following');

    if (regexPattern.test(window.location.href)) {
      await actualMaal();
    }

    console.log(firstUser);
  }
});
