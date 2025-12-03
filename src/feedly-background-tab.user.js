// ==UserScript==
// @name         Feedly Background Tab
// @namespace    http://tampermonkey.net/
// @version      2025-12-03
// @description  Opens the selected article on feedly.com in a background tab
// @author       Koen Hausmans
// @match        https://feedly.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=feedly.com
// @grant        GM_openInTab
// @updateURL    https://github.com/koenhausmans/feedly-background-articles-tampermonkey/raw/refs/heads/main/src/feedly-background-tab.user.js
// @downloadURL  https://github.com/koenhausmans/feedly-background-articles-tampermonkey/raw/refs/heads/main/src/feedly-background-tab.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Query selector to find the first selected entry on the feedly feed
    const LINK_SELECTOR = "a.EntryTitleLink--selected";

    function getTargetUrl() {
        const element = document.querySelector(LINK_SELECTOR);
        return element ? element.href : null;
    }

    function openBackgroundTab() {
        const url = getTargetUrl();
        if (url) {
            GM_openInTab(url, { active: false, insert: true, setParent: true });
            console.log(`Opened in background: ${url}`);
        } else {
            console.log("No matching element found for selector: " + LINK_SELECTOR);
        }
    }

    // Hotkey (;)
    document.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === ";") {
            e.preventDefault();
            openBackgroundTab();
        }
    });
})();

