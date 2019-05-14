const AudioContext = window.AudioContext || window.webkitAudioContext;

const DURATION_SCALE = 1000;
const FREQUENCY_SCALE = 2;

const FREQUENCY_MAX = 22100;
const FREQUENCY_MIN = 20;

const durationScale = message => message.duration / DURATION_SCALE;
const frequencyCalc = message => {
  if (message.transferSize > 0) {
    return message.transferSize / FREQUENCY_SCALE;
  }
  return message.decodedBodySize / FREQUENCY_SCALE;
};

const stats = { hits: 0, totals: 0 };
setInterval(({ hits, totals }) => {
  console.info(`${Math.round((hits/totals)*100)}% of ${totals}`)
}, 4000, stats);

const onMessageListener = (ctx) => (message, sender) => {
  stats.totals++;
  
  let frequency = frequencyCalc(message);
  if (frequency > FREQUENCY_MAX || frequency < FREQUENCY_MIN) {
    console.warn(`drop ${message.name} freq ${frequency}`);
    return;
  }

  stats.hits++;

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
};

browser
  .runtime
  .onMessage
  .addListener(onMessageListener(new AudioContext()));


