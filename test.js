document.getElementById("testButton").addEventListener("click", (e) => {
  console.log("event testjs");

  // to background
  chrome.runtime.sendMessage(
    { type: "test", data: "test in code" },
    function (response) {
      console.log("from background" + response);
    }
  );
});

chrome.storage.local.get(["key"]).then((result) => {
  console.log("Value currently is " + JSON.stringify(result.key));
  document.getElementById("text").innerHTML = JSON.stringify(result.key);

  // 안 된다
  //   window.postMessage({ type: "testReturn", key: "1" });
  //   chrome.tabs.sendMessage(0, result.key, function (response) {});

  //   chrome.tabs.sendMessage(.tab.id, data, function (response) {});
});
