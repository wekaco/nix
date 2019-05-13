console.log("nix started");

let PERFORMANCE_ENTRY_TYPE_RESOURCE = "resource";
const observer = new PerformanceObserver((list, observer) => {
  let messages = list.getEntries().map( entry => {
    return browser.runtime.sendMessage({ duration: entry.duration });
  });
});

observer.observe({ entryTypes: [ PERFORMANCE_ENTRY_TYPE_RESOURCE ] });

