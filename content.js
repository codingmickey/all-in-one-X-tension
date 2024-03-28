chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'startScrapingUsers') {
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

async function actualMaal() {
  const firstUser = document.querySelector(
    "div[aria-label='Timeline: Following'] div[data-testid='UserCell'] > div > div:nth-child(2) > div > div > div > div:nth-child(2) > div:nth-child(2) > div"
  );
  console.log(firstUser);
  console.log('startAutomation');

  // If null then doesn't follow back
  // Find all the Saaps hisssss
  const allSaanps = await scrollToBottomAndCollect();
  console.log(allSaanps);

  // Create a list to store our saanps
  // For creating lists
  // Didn't followback RIP 👿
  chrome.runtime.sendMessage(startMakingAList);
}

// Not collecting pokemons but saanps
async function scrollToBottomAndCollect() {
  let previousHeight = 0;
  let currentHeight = -1;

  // Logic to collect items
  const theseProfilesDontFollowBack = [];
  const allProfiles = [];

  while (previousHeight !== currentHeight) {
    const { tempTheseProfilesDontFollowBack, tempAllProfiles } = await collectUserNames();
    theseProfilesDontFollowBack.push(...tempTheseProfilesDontFollowBack);
    allProfiles.push(...tempAllProfiles);
    previousHeight = currentHeight;
    window.scrollTo(0, document.body.scrollHeight);

    // This cute little hack worked for waiting just a second to load the profile from below
    // Even on a laggy internet connection in a train :D
    // Can be also improved but nvm for now
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for new content to load (adjust delay as needed)
    currentHeight = document.body.scrollHeight;
  }

  // Removing the duplicates
  const actualTheseProfilesDontFollowBack = [...new Set(theseProfilesDontFollowBack)];
  const actualAllProfiles = [...new Set(allProfiles)];

  console.log({ actualAllProfiles, actualTheseProfilesDontFollowBack });

  return actualTheseProfilesDontFollowBack;
}

// Utility function to collect at each step of loading to the bottom of the screen
// Theses mfking comments are written by myself in train and NOT an AI :(
async function collectUserNames() {
  // Logic to collect items
  const tempTheseProfilesDontFollowBack = [];
  const tempAllProfiles = [];

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
      tempTheseProfilesDontFollowBack.push(userName);
    }
    tempAllProfiles.push(userName);
  });

  console.log(tempAllProfiles);

  return { tempTheseProfilesDontFollowBack, tempAllProfiles };
}
