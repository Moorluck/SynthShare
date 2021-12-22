import * as Tone from 'tone'
import Effect from './effect'
import Mode from './mode'



const ToneHelper = {

    beat: 0,
    list: [],
    synthList: [],
    mode: Mode.C.major,
    type: "sine",
    effect: Effect.none,
    
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

    createSynth : function(number) {
        if (Tone.context.state !== 'running') {
            Tone.context.resume();
        }
        const synthList = []
        for (let i = 0; i < number; i++) {
            const synth = new Tone.Synth({
                oscillator: {
                    type: this.type,
                    volume: -12
                }
            }).toDestination()
            synthList.push(synth)
        }
        return synthList
    },

    changeSynth: function() {
        if (this.effect === "reverb") {
            const reverb = new Tone.Reverb(4).toDestination()
            for (let i = 0; i < this.synthList.length; i++) {
                this.synthList[i].disconnect()
                this.synthList[i] = new Tone.Synth({
                    oscillator: {
                        type: this.type,
                        volume: -12
                    }
                }).connect(reverb).toDestination()
            }
        }

        else {
            console.log("hello")
            for (let i = 0; i < this.synthList.length; i++) {
                this.synthList[i].disconnect()
                this.synthList[i] = new Tone.Synth({
                    oscillator: {
                        type: this.type,
                        volume: -12
                    }
                }).toDestination()
            }
        }
        
    },
    
    updateLoop : function(time) {

        if (Tone.context.state !== 'running') {
            Tone.context.resume();
        }

        for (let i = this.list.length - 1; i >= 0; i--) {
            if (this.list[i][this.beat] === 1) {
                this.synthList[i].triggerAttackRelease(this.mode[(this.list.length - 1) - i], "16n", time) 
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

