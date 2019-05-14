console.log("nix started");

//lower values mean less events captured
const maxSize = 1500;
window.performance.setResourceTimingBufferSize(maxSize);

let PERFORMANCE_ENTRY_TYPE_RESOURCE = "resource";
const observer = new PerformanceObserver((list, observer) => {
  let messages = list.getEntries().map( entry => {
    console.log(entry);
    let {
      initiatorType,
      duration,
      name,
      transferSize, // if 0 then cached
      encodedBodySize,
      decodedBodySize
    } = entry;
    return browser.runtime.sendMessage({
      initiatorType,
      duration,
      name,
      transferSize,
      encodedBodySize,
      decodedBodySize
    });
  });
});

observer.observe({ entryTypes: [ PERFORMANCE_ENTRY_TYPE_RESOURCE ] });

