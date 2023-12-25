console.log("스크립트 코드가 삽입된다.");

// chrome.runtime.sendMessage({ greeting: "hello" }, function (res) {
//   console.log("메시지 전달 완료");
// });

// This message listener will receive response from the background.js
chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
  // This sends response to web app
  console.log(
    "chrome.tabs.sendMessage" +
      JSON.stringify(response) +
      " sender" +
      JSON.stringify(sender)
  );

  if (response.type === "test") {
    window.postMessage(
      { type: "testReturn", response },
      window.location.origin
    );
  } else if (response.type === "test2") {
    window.postMessage(
      { type: "testReturn", response },
      window.location.origin
    );
  }

  //   if (response.type == "getAccount") {
  //     window.postMessage(
  //       { type: "UNICORN_WALLET_ACCOUNT_RETURN", response: response.address },
  //       window.location.origin
  //     );
  //   } else if (response.type == "getTx") {
  //     window.postMessage(
  //       { type: "UNICORN_WALLET_TX_RETURN", response: response },
  //       window.location.origin
  //     );
  //   }
  return true;
});

// 웹 사이트에서 메시지를 수신한다. (실제로는 클라 내부에서 실행된다.)
window.addEventListener("message", (event) => {
  // 다른쪽에서 보내는 이벤트만 수신한다.
  if (event.source !== window) {
    return;
  }

  if (event.data.type === "test") {
    console.log(event.data);

    chrome.runtime.sendMessage(
      { type: "sendTxn", data: event.data },
      function (response) {
        console.log("from background " + response);
      }
    );
  }
});

// //웹사이트로부터 메세지 수신
// window.addEventListener(
//   "message",
//   (event) => {
//     if (event.source != window) {
//       return;
//     }
//     if (event.data.type && event.data.type == "UNICORN_WALLET_SEND") {
//       chrome.runtime.sendMessage(
//         { type: "sendTxn", data: event.data },
//         function (response) {
//           console.log("from background" + response);
//         }
//       );
//     } else if (event.data.type && event.data.type == "UNICORN_WALLET_ACCOUNT") {
//       console.log("Content script received: " + event.data.type);
//       chrome.runtime.sendMessage(
//         { type: "getAccount", data: event.data },
//         function (response) {
//           console.log("from background" + response);
//         }
//       );
//     } else if (event.data.type && event.data.type == "UNICORN_WALLET_TX") {
//       console.log("Content script received: " + event.data.type);
//       chrome.runtime.sendMessage(
//         { type: "getTx", data: event.data },
//         function (response) {
//           console.log("from background" + response);
//         }
//       );
//     }
//   },
//   false
// );
