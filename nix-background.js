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




const drop = ((delay) => {
  const stats = { miss: { low: 0, high: 0 }, totals: 0 };
  const dump = (s) => {
    let hits = s.totals - (s.miss.low + s.miss.high)
    return `${Math.round((hits/s.totals)*100)}% of ${s.totals}.Missed: ${s.miss.low}/${s.miss.high}`;
  };

  setInterval((info) => console.log(dump(info)), delay, stats);
  return (frequency) => {
    stats.totals++;
    if (frequency > FREQUENCY_MAX) {
      stats.miss.high++;
      return true;
    }
    if (frequency < FREQUENCY_MIN) {
      stats.miss.low++;
      return true;
    }
    return false;
  };
})(4000);


const onMessageListener = (ctx) => (message, sender) => {

  let frequency = frequencyCalc(message);
  if (drop(frequency)) {
    console.log(`drop ${message.name} freq ${frequency}`);
    return;
  }

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


