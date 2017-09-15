chrome.contextMenus.create({
	id: "nyaa-download",
	title: "選択範囲のNyaa Torrentをダウンロード",
	contexts: ["selection"],
	onclick: function (info, tab) {
		chrome.tabs.sendMessage(tab.id, {}, function (data) {
			if(data !== undefined) {
				data.forEach(function (v) {
					chrome.downloads.download({
						url: "https://nyaa.si/download/" + v + ".torrent"
					});
				});
			}
		});
	}
});