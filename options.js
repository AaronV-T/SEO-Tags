document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);


// Loads options from chrome.storage
function restore_options() {
  chrome.storage.sync.get({
    // Set defaults.
	titleEnabled: true,
    metaDescEnabled: true,
	h1Enabled: true,
	h2Enabled: false,
	wmtEnabled: true,
	gaEnabled: true,
	ypaEnabled: false,
	imgAltEnabled: false
  }, function(items) {
    document.getElementById('titleEnable').checked = items.titleEnabled;
    document.getElementById('metaDescEnable').checked = items.metaDescEnabled;
	document.getElementById('h1Enable').checked = items.h1Enabled;
	document.getElementById('h2Enable').checked = items.h2Enabled;
	document.getElementById('wmtEnable').checked = items.wmtEnabled;
	document.getElementById('gaEnable').checked = items.gaEnabled;
	document.getElementById('ypaEnable').checked = items.ypaEnabled;
	document.getElementById('imgAltEnable').checked = items.imgAltEnabled;
	document.getElementById('mainDiv').style.display = "inline";
	document.getElementById('loadingDiv').style.display = "none";
  });
}


// Saves options to chrome.storage
function save_options() {
  var title = document.getElementById('titleEnable').checked;
  var metaDesc = document.getElementById('metaDescEnable').checked;
  var h1 = document.getElementById('h1Enable').checked;
  var h2 = document.getElementById('h2Enable').checked;
  var wmt = document.getElementById('wmtEnable').checked;
  var ga = document.getElementById('gaEnable').checked;
  var ypa = document.getElementById('ypaEnable').checked;
  var imgAlt = document.getElementById('imgAltEnable').checked;
  
  chrome.storage.sync.set({
    titleEnabled: title,
    metaDescEnabled: metaDesc,
	h1Enabled: h1,
	h2Enabled: h2,
	wmtEnabled: wmt,
	gaEnabled: ga,
	ypaEnabled: ypa,
	imgAltEnabled: imgAlt
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}


