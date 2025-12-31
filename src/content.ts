let redirectCount = 0;
let lastRedirectTime = 0;

function shouldBlockRedirect() {
    const now = Date.now();
    if (now - lastRedirectTime < 5000) {
        redirectCount++;
    } else {
        redirectCount = 1;
    }
    lastRedirectTime = now;
    return redirectCount > 2;
}

const origAssign = window.location.assign;
(window.location as any).assign = function (url: string) {
    if (shouldBlockRedirect()) {
        console.warn("Blocked auto redirect:", url);
        return;
    }
    origAssign.call(window.location, url);
};

function findSuspiciousLinks() {
    const urls = Array.from(document.querySelectorAll("a[href]"))
        .map(a => (a as HTMLAnchorElement).href)
        .filter(href =>
        /(redirect|promo|click|track|porn|xxx)/gi.test(href)
        );

    if (urls.length > 0) {
        chrome.runtime.sendMessage({ type: "suspiciousLinks", links: urls });
    }
}

document.addEventListener("DOMContentLoaded", findSuspiciousLinks);
