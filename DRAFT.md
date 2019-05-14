#DRAFT
Quick notes.

##Next actions
- Stop sound when closing tab
- Clear entries after time / maxSize for buffer as sesitivity argument.
  Initialize the runtime with give value from background. On change of sensitivy value update content-scripts (?). 
  Sensitivity is maxSize of buffer and interval of flush.
- Frequency barriers. 
- ADSR utilizing breakdown found in performance entry.
- Utilize periodic waves to create unique osc for each domain/path or name.

##Resources
###Periodic waves
- [wave-tables repository](https://github.com/mohayonao/wave-tables)
- [BaseAudioContext.createPeriodicWave](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createPeriodicWave)
- [Using Fourier Transforms with the Web Audio API](https://www.sitepoint.com/using-fourier-transforms-web-audio-api/)
