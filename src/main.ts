import p5 from "p5"
import { dailySketches } from "./dailySketches"

const d = new Date()
let date = d.getDate() <= 30 ? d.getDate() : 1

export const setDate = (d: number) => {
    date = d
}

const sketch = async (p: p5) => {
    let internalDate = date
    let currentSketch = dailySketches[internalDate - 1]

    let cnv

    p.setup = async () => {
        const ui = document.getElementById('uiWrapper')
        if (ui == null) throw new Error("Element 'uiWrapper' is null!")
        const h = ui.clientHeight

        cnv = p.createCanvas(h, h)
        cnv.parent(document.getElementById("canvWrapper"))

        p.setFrameRate(currentSketch.fps)
        await currentSketch.init(p)
    }
    
    p.draw = async () => {
        if(date != internalDate){
            if (currentSketch.exit != undefined) {
                currentSketch.exit(p)
            }

            internalDate = date
            currentSketch = dailySketches[internalDate - 1]


            p.setFrameRate(currentSketch.fps)
            await currentSketch.init(p)
        }

        currentSketch.draw(p)
    }
}

new p5(sketch)
