chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	var response;
	if(request[0] == 'open'){
		console.log(request[1]);
		chrome.tabs.create({url:request[1]});
	}
	else {
		response='pinga'
	}
	sendResponse(response);
});
