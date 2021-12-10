import * as Tone from 'tone'
import Mode from './mode'

const ToneHelper = {

    beat: 0,
    list: [],
    synthList: [],
    mode: Mode.C.major,
    
    start: async function() {
        await Tone.start()
    },

    play: function() {
        Tone.Transport.start()
    },

    cancel: function() {
        Tone.Transport.cancel()
    },

    setTempo: function(tempo) {
        Tone.Transport.bpm.value = tempo
    },

    createSynth : function(number, type) {
        if (Tone.context.state !== 'running') {
            Tone.context.resume();
        }
        const synthList = []
        for (let i = 0; i < number; i++) {
            const synth = new Tone.Synth({
                oscillator: {
                    type: type,
                    volume: -12
                }
            }).toDestination()
            synthList.push(synth)
        }
        return synthList
    },
    
    updateLoop : function(time) {

        if (Tone.context.state !== 'running') {
            Tone.context.resume();
        }

        for (let i = 0; i < this.list.length; i++) {
            console.log(this.list[i][this.beat]);
            if (this.list[i][this.beat] === 1) {
                this.synthList[i].triggerAttackRelease(this.mode[i], "16n", time) 
            }
        }

        if (this.beat < 15) {
            this.beat += 1
        }
        else {
            this.beat = 0
        }
    },

    scheduleRepeat: function(callBack) {
        Tone.Transport.scheduleRepeat((time) => {
            callBack(time)
        }, "16n")
    }
}

export default ToneHelper

