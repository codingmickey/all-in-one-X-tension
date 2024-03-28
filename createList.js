chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  console.log('CREATELISTS.js', message);
  if (message.action === 'startMakingAListInject') {
    console.log('Should I start making a list?');
  }
});

console.log('Create Listsssss');
// input[name="name"]
// input[type="checkbox"]

// One answer
// var evt = document.createEvent('MouseEvents');
// evt.initMouseEvent('mousedown', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
// const targetedNode = document.querySelector("input[name='name']").dispatchEvent(evt);

// * For unfollowing
// aria-label="Following @BrawlKc"
// div[aria-label="FOllwing @username"]
// document.querySelectorAll('.tab-button')[0].dispatchEvent(evt);
// Then
// div[data-testid="confirmationSheetConfirm"]
//
// Adding to the list
// div[data-testid="userActions"]
// a[href="/i/lists/add_member"]
// div[data-testid="listCell"] > div > div > div:nth-child(2) > div > div > div > div
// document.querySelector('div[data-testid="listCell"] > div > div > div:nth-child(2) > div > div > div > div > span')
// Click on save
// * div[aria-labelledby="modal-header"] > div > div > div > div > div  div > div  > div > div > div:nth-child(3) > div

// Second answer
// const targetNode = document.querySelector("input[name='name']");

// triggerMouseEvent(targetNode, 'mousedown');
// // triggerMouseEvent(targetNode, 'click');
// triggerMouseEvent(targetNode, 'mouseup');

// function triggerMouseEvent(node, eventType) {
//   var clickEvent = document.createEvent('MouseEvents');
//   clickEvent.initEvent(eventType, true, true);
//   node.dispatchEvent(clickEvent);
// }
