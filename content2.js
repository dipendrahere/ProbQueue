
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	var response;
	if (request[0] == 'ping') {
		response=document.querySelectorAll(request[1])[0].innerHTML;
	}
	else if(request[0] == 'open'){
		console.log(request[1]);
		window.open(request[1]);
	}
	else {
		response='pinga'
	}
	sendResponse(response);
});
