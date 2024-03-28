chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startAutomation') {
    // Your automation logic using Puppeteer or similar tools
    // Example: Open Twitter, log in, identify non-followers, move to list, and unfollow
    const firstUser = document.querySelector("div[data-testid='UserCell']");

    console.log(window.location.href);

    const regexPattern = new RegExp('https://twitter.com/[^/]+/following');

    if (regexPattern.test(window.location.href)) {
      const firstUser = document.querySelector("div[aria-label='Timeline: Following'] div[data-testid='UserCell'] > div > div:nth-child(2) > div > div > div > div:nth-child(2) > div:nth-child(2) > div");
      console.log(firstUser);
      console.log('startAutomation');
      12111212
    }

    while()

    console.log(firstUser);
  }
});

console.log('content.js');#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-13l2t4g.r-1ljd8xs.r-1phboty.r-16y2uox.r-184en5c.r-61z16t.r-11wrixw.r-1jgb5lz.r-13qz1uu.r-1ye8kvj > div > section > div > div > div:nth-child(1) > div > div > div > div > div.css-175oi2r.r-1iusvr4.r-16y2uox > div.css-175oi2r.r-1awozwy.r-18u37iz.r-1wtj0ep > div.css-175oi2r.r-1wbh5a2.r-dnmrzs.r-1ny4l3l > div > div.css-175oi2r.r-1awozwy.r-18u37iz.r-1wbh5a2 > div.css-175oi2r.r-1awozwy.r-z2wwpe.r-6koalj.r-1q142lx
