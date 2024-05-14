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

  let items = [];

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.msg === 'usersCollectingCompleted') {
      //  To do something

      document.querySelector('#randomScroller h2').textContent =
        'Selecting a winner... Total Users:' + request.data.length;

      console.log({ data: request.data });

      items = request.data;
      // Append items to the scroller
      items.forEach((item) => {
        const div = document.createElement('div');
        div.className = 'item';
        div.textContent = item;
        scroller.appendChild(div);
      });

      // Duplicate the items to make it wrap-around smoothly
      items.forEach((item) => {
        const div = document.createElement('div');
        div.className = 'item';
        div.textContent = item;
        scroller.appendChild(div);
      });
    }
  });

  document.getElementById('startScroller').addEventListener('click', function () {
    let currentLeft = 0;
    const initialSpeed = 420; // Initial speed
    let speed = initialSpeed;
    const containerWidth = scroller.parentElement.offsetWidth;
    const selectedIndex = Math.floor(Math.random() * items.length);
    const selectedItem = document.querySelectorAll('.item')[selectedIndex];
    const targetLeft = -selectedItem.offsetLeft + (containerWidth - selectedItem.offsetWidth) / 2;

    scroller.style.transition = 'none';
    scroller.style.left = `${currentLeft}px`;

    const startTime = performance.now();

    function animate() {
      const currentTime = performance.now();
      const elapsedTime = currentTime - startTime;
      const deceleration = initialSpeed / 1000; // Deceleration rate per millisecond

      currentLeft -= speed;
      speed -= deceleration; // Gradually decrease speed

      scroller.style.left = `${currentLeft}px`;

      if (currentLeft < -scroller.scrollWidth / 2) {
        currentLeft += scroller.scrollWidth / 2;
      }

      if (elapsedTime < 6900) {
        // Scroll for 3 seconds
        requestAnimationFrame(animate);
      } else {
        scroller.style.transition = 'left 0.5s ease-in-out'; // Add transition for smooth stopping
        scroller.style.left = `${targetLeft}px`;
        selectedItem.style.backgroundColor = '#28a745'; // Highlight the chosen item
        // alert(`Selected: ${selectedItem.textContent}`);
        document.querySelector('#randomScroller h2').textContent = `Winner: ${selectedItem.textContent}`;
        document.querySelector(
          '#randomScroller .winner'
        ).innerHTML += `<a href="https://twitter.com/${selectedItem.textContent}" target="_blank">Visit Profile</a>`;
      }
    }

    requestAnimationFrame(animate);
  });
});
