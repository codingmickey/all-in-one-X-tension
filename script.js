document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.content');

  tabs.forEach((tab) => {
    tab.addEventListener('click', function () {
      // Remove 'active' class from all tabs and content
      tabs.forEach((t) => t.classList.remove('active'));
      contents.forEach((c) => c.classList.remove('active'));

      console.log(tab.getAttribute('data-target'));

      // Add 'active' class to the clicked tab and corresponding content
      tab.classList.add('active');
      document.getElementById(tab.getAttribute('data-target')).classList.add('active');
    });
  });

  // Handle form submission
  const tweetUrlInput = document.getElementById('tweetUrl');
  tweetUrlInput.addEventListener('input', function () {
    if (tweetUrlInput.validity.patternMismatch) {
      tweetUrlInput.setCustomValidity('Please enter a valid Twitter or X URL.');
    } else {
      tweetUrlInput.setCustomValidity('');
    }
  });

  document.getElementById('giveawayForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const tweetUrl = tweetUrlInput.value;
    const interactionType = document.querySelector('input[name="interactionType"]:checked').value;
    console.log(`Tweet URL: ${tweetUrl}`);
    console.log(`Interaction Type: ${interactionType}`);
    // Add your form submission logic here

    chrome.runtime.sendMessage(
      null,
      {
        action: 'openNewTab',
        url: tweetUrl,
        interactionType
      },
      null,
      (response) => {
        console.log(response);
        console.log('IN SCRIPT.js');
        console.log({ response }, 'in script.js');
      }
    );
  });

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.msg === 'usersCollectingCompleted') {
      //  To do something

      document.getElementById('result').textContent = JSON.stringify(request.data, null, 2);

      console.log({ data: request.data });
    }
  });
});
