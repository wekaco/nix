const AudioContext = window.AudioContext || window.webkitAudioContext;

const DURATION_SCALE = 1000;
const FREQUENCY_SCALE = 2;

const durationScale = message => message.duration / DURATION_SCALE;
const frequencyCalc = message => {
  if (message.transferSize > 0) {
    return message.transferSize / FREQUENCY_SCALE;
  }
  return message.decodedBodySize / FREQUENCY_SCALE;
};

const onMessageListener = (ctx) => (message, sender) => {
  let frequency = frequencyCalc(message);
  let options = {
    type: 'sine',
    detune: 0,
    frequency
  };

  let osc = new OscillatorNode(ctx, options);
  osc.connect(ctx.destination);
  osc.start();

  let duration = durationScale(message);
  let endTime = ctx.currentTime + duration;
  osc.stop(endTime);
  console.log(message.name, options.frequency, duration);
};

browser
  .runtime
  .onMessage
  .addListener(onMessageListener(new AudioContext()));


