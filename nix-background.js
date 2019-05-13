let r = new Map();

function onBeforeRequest(details) {
  r.set(details.requestId, performance.now());
  console.log(`onBeforeRequest ${details.requestId}`);
}
function onCompleted(details) {
  if(r.has(details.requestId)) {
    console.log(performance.now());
    let duration = performance.now() - r.get(details.requestId);
    console.log(`Completed ${details.requestId}: ${duration}`);
  }
}
var filter = {
  urls:
  ["<all_urls>"]
};


/**browser.webRequest.onBeforeRequest.addListener(
  onBeforeRequest,
  filter
);
browser.webRequest.onBeforeRequest.addListener(
  onCompleted,
  filter
);**/

browser.runtime.onMessage.addListener(console.log);
