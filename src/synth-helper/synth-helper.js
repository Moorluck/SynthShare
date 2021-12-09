import * as Tone from 'tone'

const ToneHelper = {

    beat: 0,
    
    start: async function() {
        await Tone.start()
    },

    play: function() {
        Tone.Transport.start()
    },

    cancel: function() {
        Tone.Transport.cancel()
    },

    setTempo: function() {
        Tone.Transport.bpm = 80
    },

    createSynth : function(number, type) {
        if (Tone.context.state !== 'running') {
            Tone.context.resume();
        }
        const synthList = []
        for (let i = 0; i < number; i++) {
            const synth = new Tone.Synth({
                oscillator: {
                    type: type
                }
            }).toDestination()
            synthList.push(synth)
        }
        return synthList
    },
    
    updateLoop : function(list, synthList, mode, time) {

        if (Tone.context.state !== 'running') {
            Tone.context.resume();
        }

        for (let i = 0; i < list.length; i++) {
            console.log(list[i][this.beat]);
            if (list[i][this.beat] === 1) {
                synthList[i].triggerAttackRelease(mode[i], "16n", time) 
            }
        }

        if (this.beat < 15) {
            this.beat += 1
        }
        else {
            this.beat = 0
        }
    },

    scheduleRepeat: function(list, synthList, mode, callBack) {
        Tone.Transport.scheduleRepeat((time) => {
            this.updateLoop(list, synthList, mode, time)
            callBack()
        }, "16n")
    }
}

export default ToneHelper

