chrome.runtime.onInstalled.addListener(() => {
    console.log("Redirect-Guard installed");
});

//listen for suspicious data from content script
chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg.type === "suspiciousLinks") {
        const tabId = sender.tab?.id;
        if (tabId !== undefined) {
        //store them for the popup to read
        chrome.storage.local.set({ [`links_${tabId}`]: msg.links });
        }
    }
});
