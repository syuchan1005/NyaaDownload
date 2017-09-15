var checkReg = /https?:\/\/nyaa.si\/view\/(\d+)/;
chrome.runtime.onMessage.addListener(function (req, sender, res) {
	res(getNyaaURLIDs());
});

function getNyaaURLIDs() {
	var selection = window.getSelection();
	var idList = getChildrenR(selection.getRangeAt(0).commonAncestorContainer, 'a')
		.filter(function (t) {
			return selection.containsNode(t);
		})
		.map(function (t) {
			var exec = checkReg.exec(t.href);
			if(exec !== null) return exec[1];
			else return undefined;
		});
	return idList;
}

function getChildrenR(root, filterTag) {
	filterTag = filterTag.toUpperCase();
	var nodes = [];
	root.childNodes.forEach(function (v) {
		console.log(v);
		if (v.tagName === filterTag) nodes.push(v);
		else nodes = nodes.concat(getChildrenR(v, filterTag));
	});
	return nodes;
}
