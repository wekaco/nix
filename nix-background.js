const AudioContext = window.AudioContext || window.webkitAudioContext;

const durationScale = message => message.duration / 100;
const frequencyCalc = message => {
  if (message.transferSize > 0) {
    return message.transferSize;
  }
  return message.decodedBodySize;
};

const onMessageListener = (ctx) => (message, sender) => {
  let options = {
    type: 'sine',
    detune: 0,
    frequency: frequencyCalc(message)
  };
  let osc = new OscillatorNode(ctx, options);
  osc.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + durationScale(message));
  console.log(message.name);
};

browser
  .runtime
  .onMessage
  .addListener(onMessageListener(new AudioContext()));


