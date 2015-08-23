function walk(rootNode)
{
    // Find all the text nodes in rootNode
    var walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_TEXT,
        null,
        false
    ),
    node;

    // Modify each text node's value
    while (node = walker.nextNode()) {
        handleText(node);
    }
}

function handleText(textNode) {
  textNode.nodeValue = replaceText(textNode.nodeValue);
}

function replaceText(v)
{


    // Trumps Hair
    v = v.replace(/\b(T|t)rump's Hair\b/g, "Chump's Dead Monkey Wig");
    v = v.replace(/\b(T|t)rumps Hair\b/g, "Chumps Dead Monkey Wig");   

    // Trump
    v = v.replace(/\b(T|t)rump\b/g, "Chump");
    v = v.replace(/\b(T|t)rumps\b/g, "Chumps"); 
    v = v.replace(/\b(T|t)rump's\b/g, "Chump's");   


 	// destroy Trump
    v = v.replace(/\b(D|d)estroy (E|e)arth\b/g, "destroy Donald Trump The Chump");
    v = v.replace(/\b(D|d)estroy (T|t)he (E|e)arth\b/g, "destroy Donald Trump The Chump");
    v = v.replace(/\b(D|d)estroy (T|t)he (W|w)orld\b/g, "destroy Donald Trump The Chump");
    v = v.replace(/\b(D|d)estroy (W|w)orld\b/g, "destroy Donald Trump The Chump");
   
   // Immigration
    v = v.replace(/\b(I|i)mmigration\b/g, "$1mmigration is good, Donald Chump is bad");
    
    
   
    return v;
}

// The callback used for the document body and title observers
function observerCallback(mutations) {
    var i;

    mutations.forEach(function(mutation) {
        for (i = 0; i < mutation.addedNodes.length; i++) {
            if (mutation.addedNodes[i].nodeType === 3) {
                // Replace the text for text nodes
                handleText(mutation.addedNodes[i]);
            } else {
                // Otherwise, find text nodes within the given node and replace text
                walk(mutation.addedNodes[i]);
            }
        }
    });
}

// Walk the doc (document) body, replace the title, and observe the body and title
function walkAndObserve(doc) {
    var docTitle = doc.getElementsByTagName('title')[0],
    observerConfig = {
        characterData: true,
        childList: true,
        subtree: true
    },
    bodyObserver, titleObserver;

    // Do the initial text replacements in the document body and title
    walk(doc.body);
    doc.title = replaceText(doc.title);

    // Observe the body so that we replace text in any added/modified nodes
    bodyObserver = new MutationObserver(observerCallback);
    bodyObserver.observe(doc.body, observerConfig);

    // Observe the title so we can handle any modifications there
    if (docTitle) {
        titleObserver = new MutationObserver(observerCallback);
        titleObserver.observe(docTitle, observerConfig);
    }
}
walkAndObserve(document);
