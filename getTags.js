//Injected into pages by popup.js

chrome.storage.sync.get({ //Load options from storage and call the function to find and send the tag information.
		//Set defaults.
		titleEnabled: true,
		metaDescEnabled: true,
		h1Enabled: true,
		h2Enabled: false,
		wmtEnabled: true,
		gaEnabled: true,
		ypaEnabled: false,
		imgAltEnabled: false
	}, function(items) {
		sendTags(items.titleEnabled, items.metaDescEnabled, items.h1Enabled, items.h2Enabled, items.wmtEnabled, items.gaEnabled, items.ypaEnabled, items.imgAltEnabled);
	});

	
function sendTags(findTitle, findMetaDesc, findH1, findH2, findWMT, findGA, findYPA, findImgAlt) {
	var foundElements = "";
	var typesNotFound = "";

	//Title elements.
	if (findTitle) {
		var titleElements = document.getElementsByTagName("title");
		if (titleElements.length > 0 ){
			foundElements += "Title Elements:\n";
			for (i = 0; i < titleElements.length; i++) 
				foundElements += titleElements[i].outerHTML + '\n';
		}
		else 
			typesNotFound += "Title\n";
	}

	
	//Meta description elements.
	if (findMetaDesc) {
		var metaDescElements = getAllMetaElementsWithAttribute("description");
		if (metaDescElements.length > 0 ){
			foundElements += "\nMeta Description Elements:\n";		
			for (i = 0; i < metaDescElements.length; i++) 
				foundElements += metaDescElements[i].outerHTML + '\n';
		}
		else 
			typesNotFound += "Meta Description\n";
	}
	
	
	//H1 elements.
	if (findH1) {
		var h1Elements = document.getElementsByTagName("h1");
		if (h1Elements.length > 0 ){
			foundElements += "\nH1 Elements:\n";
			for (i = 0; i < h1Elements.length; i++) 
				foundElements += h1Elements[i].outerHTML + '\n';
		}
		else 
			typesNotFound += "H1\n";
	}
	
	//H2 elements.
	if (findH2) {
		var h2Elements = document.getElementsByTagName("h2");
		if (h2Elements.length > 0 ){
			foundElements += "\nH2 Elements:\n";
			for (i = 0; i < h2Elements.length; i++) 
				foundElements += h2Elements[i].outerHTML + '\n';
		}
		else 
			typesNotFound += "H2\n";
	}

	//Google Webmaster Tools verification elements.
	if (findWMT) {
		var googleWMTElements = getAllMetaElementsWithAttribute("google-site-verification");
		if (googleWMTElements.length > 0 ){
			foundElements += "\nGoogle Webmaster Tools Elements:\n";	
			for (i = 0; i < googleWMTElements.length; i++) 
				foundElements += googleWMTElements[i].outerHTML + '\n';
		}
		else 
			typesNotFound += "Google Webmaster Tools\n";
	}
	
	//Google Analytics scripts.
	if (findGA) {
		var googleAnalyticsElements = getAllGoogleAnalyticsScripts();
		if (googleAnalyticsElements.length > 0 ){
			foundElements += "\nGoogle Analytics Scripts:\n";
			for (i = 0; i < googleAnalyticsElements.length; i++) 
				foundElements += googleAnalyticsElements[i].outerHTML + '\n';
		}
		else 
			typesNotFound += "Google Analytics\n";
	}
	
	//YellowPages Analytics scripts.
	if (findYPA) {
		var yellowPagesAnalyticsElements = getAllYellowPagesAnalyticsScripts();
		if (yellowPagesAnalyticsElements.length > 0 ){
			foundElements += "\nYellowPages Analytics Scripts:\n";
			for (i = 0; i < yellowPagesAnalyticsElements.length; i++) 
				foundElements += yellowPagesAnalyticsElements[i].outerHTML + '\n';
		}
		else 
			typesNotFound += "YellowPages Analytics\n";
	}
	
	
	//Images with alt attributes
	if (findImgAlt) {
		var imagesWithAltAttributes = getAllImagesWithAltAttributes();
		if (imagesWithAltAttributes.length > 0 ){
			foundElements += "\nImages With Alt Attributes:\n"
			for (i = 0; i < imagesWithAltAttributes.length; i++) 
				foundElements += imagesWithAltAttributes[i].outerHTML + '\n';
		}
		else 
			typesNotFound += "Images with Alt Attributes\n";
	}
	
	
	var sendMessage = foundElements;
	if (typesNotFound.length > 0) {
		sendMessage	+= "\n\nElement Types Not Found:\n" + typesNotFound;
	}
	
	
	chrome.runtime.sendMessage({ action: "displayTags", tags: sendMessage });
};

//getAllGoogleAnalyticsScripts: Finds every script on the site that has is used for Google Analytics, returns everything found as an array of strings.
function getAllGoogleAnalyticsScripts() {
	var matchingElements = [];
	var scriptElements = document.getElementsByTagName("script");
	
	for (i = 0; i < scriptElements.length; i++) { //Loop through every element in the array and check for our key phrases. If found, add the element to matchingElements.
		if (scriptElements[i].innerHTML.toLowerCase().indexOf("google") > -1 && scriptElements[i].innerHTML.toLowerCase().indexOf("analytics") > -1 && scriptElements[i].innerHTML.toLowerCase().indexOf("ua-") > -1)
			matchingElements.push(scriptElements[i]);
	}
		
	return matchingElements;
}

//getAllImagesWithAltAttributes: Finds every img tag on the site that has an "alt" attribute, returns everything found as an array of strings.
function getAllImagesWithAltAttributes() {
	var matchingElements = [];
	var imgElements = document.getElementsByTagName("img");
	
	for (i = 0; i < imgElements.length; i++) { //Loop through every element in the array and check for the "alt"" attribute. If found, add the element to matchingElements.
		if (imgElements[i].getAttribute("alt"))
			matchingElements.push(imgElements[i]);
	}
		
	return matchingElements;
}

//getAllMetaElementsWithAttribute: Takes an attribute, finds every meta tag on the site that has an "name" which matches the parameter, returns everything found as an array of strings.
function getAllMetaElementsWithAttribute(attribute) {
	var matchingElements = [];
	var metaElements = document.getElementsByTagName("meta");
	
	for (var i = 0; i < metaElements.length; i++) { //Loop through every element in the array and check for the "name" attribute and that it matches our parameter. If found, add the element to matchingElements.
		if (metaElements[i].getAttribute("name") && metaElements[i].getAttribute("name").toLowerCase() == attribute)
			matchingElements.push(metaElements[i]);
	}
	
	return matchingElements;
}

//getAllYellowPagesAnalyticsScripts: Finds every script on the site that has is used for YellowPages Analytics, returns everything found as an array of strings.
function getAllYellowPagesAnalyticsScripts() {
	var matchingElements = [];
	var scriptElements = document.getElementsByTagName("script");
	
	for (i = 0; i < scriptElements.length; i++) { //Loop through every element in the array and check for our key phrases. If found, add the element to matchingElements.
		if (scriptElements[i].outerHTML.indexOf("yellowpages") > -1 && scriptElements[i].outerHTML.indexOf("ypa.mid") > -1)
			matchingElements.push(scriptElements[i]);
	}
		
	return matchingElements;
}


