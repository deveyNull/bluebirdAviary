//deleteElements('li.ThreadedConversation--loneTweet, li.ThreadedConversation');
deleteTweets('div.tweet.js-stream-tweet.js-actionable-tweet.js-profile-popup-actionable.dismissible-content.descendant.permalink-descendant-tweet');
deleteEverythingElse('li.ThreadedConversation-showMoreThreads');
deleteEverythingElse('li.ThreadedConversation-moreReplies');

function deleteEverythingElse(selector) {
    // in case the content script was injected after the page is partially loaded
    doDeleteEverything(document.querySelectorAll(selector));

    var mo = new MutationObserver(process);
    mo.observe(document, {subtree:true, childList:true});
    document.addEventListener('DOMContentLoaded', function() { mo.disconnect() });

    function process(mutations) {
        for (var i = 0; i < mutations.length; i++) {
            var nodes = mutations[i].addedNodes;
            for (var j = 0; j < nodes.length; j++) {
                var n = nodes[j];
                if (n.nodeType != 1) 
                    continue;
				
				doDeleteEverything(n.matches(selector) ? [n] : n.querySelectorAll(selector));
}}}
	function doDeleteEverything(nodes) {
		[].forEach.call(nodes, function(node) {removeEverything(node)});
		//node.remove() 
    }
	function removeEverything(node) {
		node.remove();
		}
}

function deleteTweets(selector) {
    // in case the content script was injected after the page is partially loaded
    doDelete(document.querySelectorAll(selector));

    var mo = new MutationObserver(process);
    mo.observe(document, {subtree:true, childList:true});
    document.addEventListener('DOMContentLoaded', function() { mo.disconnect() });

    function process(mutations) {
        for (var i = 0; i < mutations.length; i++) {
            var nodes = mutations[i].addedNodes;
            for (var j = 0; j < nodes.length; j++) {
                var n = nodes[j];
                if (n.nodeType != 1) 
                    continue;
				
				doDelete(n.matches(selector) ? [n] : n.querySelectorAll(selector));
        }
    }
	}
	
		
    function doDelete(nodes) {
		[].forEach.call(nodes, function(node) {remover(node)});
		//node.remove() 
    }
	function remover(node) {
		//alert(node);
		var approved = node.getAttributeNode("data-user-id").value;
		var followed = node.getAttributeNode("data-you-follow").value;
		if (followed != "true" && approved != "3307536243") {
				node.remove();

		}
		}
	
}
	
// Chrome pre-34
if (!Element.prototype.matches)
    Element.prototype.matches = Element.prototype.webkitMatchesSelector;