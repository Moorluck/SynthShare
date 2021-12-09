import * as Tone from 'tone'

const ToneHelper = {
    resume: function() {
        Tone.context.resume()
    },
    
    start: async function() {
        await Tone.start()
    },

    createSynth : function(list) {
        if (Tone.context.state !== 'running') {
            Tone.context.resume();
        }
        console.log(list)
        Tone.start()
        const synthList = []
        for (const element of list) {
            const synth = new Tone.Synth({
                oscillator: {
                    type: "fatsine"
                }
            }).toDestination()
            synthList.push(synth)
        }
        return synthList
    },
    
    updateLoop : function(list, synthList) {
    
        if (Tone.context.state !== 'running') {
            Tone.context.resume();
        }

        for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < list[0].length; j++) {
                if (list[i][j] === 1) {
                    console.log("trigger !" + i +" " + j)
                }
            }
        }
    }
}

export default ToneHelper

