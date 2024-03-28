chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'startAutomation') {
    // Your automation logic using Puppeteer or similar tools
    // Example: Open Twitter, log in, identify non-followers, move to list, and unfollow
    const firstUser = document.querySelector("div[data-testid='UserCell']");

    console.log(window.location.href);

    const regexPattern = new RegExp('https://twitter.com/[^/]+/following');

    // For creating lists https://twitter.com/i/lists/create
    // Didn't followback RIP 👿

    if (regexPattern.test(window.location.href)) {
      await actualMaal();
    }

    console.log(firstUser);
  }
});

async function scrollToBottom() {
  let previousHeight = 0;
  let currentHeight = -1;

  while (previousHeight !== currentHeight) {
    previousHeight = currentHeight;
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait for new content to load (adjust delay as needed)
    currentHeight = document.body.scrollHeight;
  }
}

// Function to collect items from the page
async function collectItems() {
  // Scroll to the bottom of the page
  await scrollToBottom();

  // Logic to collect items
  const theseProfilesDontFollowBack = [];
  const allProfiles = [];
  const allFollowingAccounts = document.querySelectorAll(
    "div[aria-label='Timeline: Following'] div[data-testid='UserCell']"
  ); // Adjust selector based on your HTML structure

  allFollowingAccounts.forEach((user) => {
    console.log(user);
    const doesFollowBack = user.querySelector(
      'div > div:nth-child(2) > div > div > div > div:nth-child(2) > div:nth-child(2) > div'
    );
    // @gamer_2402
    const userName = user.querySelector(
      'div > div:nth-child(2) > div > div > div > div:nth-child(2) > div > a > div > div > span'
    ).innerText;

    if (!doesFollowBack) {
      theseProfilesDontFollowBack.push(userName);
    }
    allProfiles.push(userName);
  });

  console.log(allProfiles);

  return theseProfilesDontFollowBack;
}

async function actualMaal() {
  const firstUser = document.querySelector(
    "div[aria-label='Timeline: Following'] div[data-testid='UserCell'] > div > div:nth-child(2) > div > div > div > div:nth-child(2) > div:nth-child(2) > div"
  );
  console.log(firstUser);
  console.log('startAutomation');
  // If null then doesn't follow back
  const allSaanps = await collectItems();
  console.log(allSaanps);
}
