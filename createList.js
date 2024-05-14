chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  // wait for the webapge to load
  if (message.action === 'startMakingAListInject') {
    console.log({ message, text: `div[aria-label="Following ${message.usersToAct[message.index]}"]` });

    // wait until the div[aria-label="Following @${message.username}"] appears
    const interval = setInterval(() => {
      const followingButton = document.querySelector(
        `div[aria-label="Following ${message.usersToAct[message.index]}"]`
      );
      console.log('followingButton', followingButton);
      if (followingButton) {
        clearInterval(interval);
        followingButton.click();

        const secondInterval = setInterval(() => {
          const confirmationSheetConfirm = document.querySelector('div[data-testid="confirmationSheetConfirm"]');
          console.log('confirmationSheetConfirm', confirmationSheetConfirm);
          if (confirmationSheetConfirm) {
            clearInterval(secondInterval);
            confirmationSheetConfirm.click();

            const thirdInterval = setInterval(() => {
              const userActions = document.querySelector('div[data-testid="userActions"]');
              console.log('userActions', userActions);
              if (userActions) {
                clearInterval(thirdInterval);
                userActions.click();

                const fourthInterval = setInterval(() => {
                  const addMember = document.querySelector('a[href="/i/lists/add_member"]');
                  console.log('addMember', addMember);
                  if (addMember) {
                    clearInterval(fourthInterval);
                    addMember.click();

                    const fifthInterval = setInterval(() => {
                      const listCell = document.querySelectorAll(
                        'div[data-testid="listCell"] > div > div > div:nth-child(2) > div > div > div > div > span'
                      );
                      console.log('listCell', listCell);
                      if (listCell.length !== 0) {
                        clearInterval(fifthInterval);
                        listCell.forEach((element) => {
                          if (element.innerText === "Didn't follow back RIP") {
                            element.click();
                          }
                        });

                        const sixthInterval = setInterval(() => {
                          const saveButton = document.querySelector(
                            'div[aria-labelledby="modal-header"] > div > div > div > div > div  div > div  > div > div > div:nth-child(3) > div'
                          );
                          console.log('saveButton', saveButton);
                          if (saveButton) {
                            clearInterval(sixthInterval);
                            saveButton.click();

                            chrome.runtime.sendMessage({
                              action: 'startMakingAList',
                              usersToAct: message.usersToAct,
                              index: message.index + 1
                            });
                          }
                        }, 20);
                      }
                    }, 20);
                  }
                }, 20);
              }
            }, 20);
          }
        }, 20);
      }
    }, 20);
  }

  // document.querySelector('div[data-testid="confirmationSheetConfirm"]').click();

  // // Adding to the list
  // document.querySelector('div[data-testid="userActions"]').click();
  // document.querySelector('a[href="/i/lists/add_member"]').click();
  // document
  //   .querySelectorAll('div[data-testid="listCell"] > div > div > div:nth-child(2) > div > div > div > div > span')
  //   .forEach((element) => {
  //     if (element.innerText === "Didn't follow back RIP") {
  //       element.click();
  //     }
  //   });

  // // Click on save
  // document
  //   .querySelector(
  //     'div[aria-labelledby="modal-header"] > div > div > div > div > div  div > div  > div > div > div:nth-child(3) > div'
  //   )
  //   .click();
  // * RIGHT CODE

  // anyway to check from the chrome extension if the page is loaded or not?

  // console.log('CREATELISTS.js', message);
  // // if (message.action === 'startMakingAListInject') {
  // console.log('Should I start making a list?');

  // // Unfollowing
  // document.querySelector(`div[aria-label="Following @${message.username}"]`).click();
  // document.querySelector('div[data-testid="confirmationSheetConfirm"]').click();

  // // Adding to the list
  // document.querySelector('div[data-testid="userActions"]').click();
  // document.querySelector('a[href="/i/lists/add_member"]').click();
  // document
  //   .querySelectorAll('div[data-testid="listCell"] > div > div > div:nth-child(2) > div > div > div > div > span')
  //   .forEach((element) => {
  //     if (element.innerText === "Didn't follow back RIP") {
  //       element.click();
  //     }
  //   });

  // // Click on save
  // document
  //   .querySelector(
  //     'div[aria-labelledby="modal-header"] > div > div > div > div > div  div > div  > div > div > div:nth-child(3) > div'
  //   )
  //   .click();
  // // }
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
