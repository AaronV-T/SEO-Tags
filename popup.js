//Script injected into popup window.

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action && request.action == "displayTags" && request.tags) {
    message.innerText = request.tags;
	document.getElementById('tipDiv').style.display = "inline";
  }
});

window.onload = onWindowLoad();

function onWindowLoad() {

  var message = document.getElementById('message'); //Get the message div on popup.html.

  chrome.tabs.executeScript(null, {
    file: "getTags.js"
  }, function() {
    if (chrome.runtime.lastError) { // If there was an error injecting the script. (You can't inject into any chrome:// URL)
		console.log("Error injecting script: " + chrome.runtime.lastError.message);
		if (message)
			message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}


