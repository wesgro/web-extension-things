import browser from "webextension-polyfill";
let polling = false;
const CACHE_ENTRY = "cache-entry";
async function startPolling() {
    let data: any;
    data = await browser.storage.sync.get([CACHE_ENTRY]);
    if (Object.keys(data).length === 0) {
        console.log("polling for fresh data");
        const response = await fetch("https://api.github.com/users/wesgro");
        data = await response.json();
        await browser.storage.sync.set({ [CACHE_ENTRY]: data });
    } else {
        console.log("pulling from cache!");
    }
    await browser.notifications.create("tests" + new Date().getTime(), {
        type: "basic",
        iconUrl: "/icon-128.png",
        title: "Test Messages",
        message: "You are awesome!",
        priority: 2,
    });
    console.log({ data });
    setTimeout(startPolling, 20000);
}

function setupPolling() {
    if (!polling) {
        polling = true;
        startPolling();
    }
}
function init() {
    browser.runtime.onInstalled.addListener(() => {
        setupPolling();
    });

    browser.management.onEnabled.addListener(() => {
        setupPolling();
    });
    browser.runtime.onMessage.addListener((message) => {
        if (message.popupMounted) {
            setupPolling();
        }
    });
}
init();
