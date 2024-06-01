import p5 from "p5"
import { dailySketches } from "./dailySketches"

let date = 1

export const setDate = (d: number) => {
    date = d
}

const sketch = (p: p5) => {
    let internalDate = date

    let cnv

    p.setup = () => {
        const ui = document.getElementById('uiWrapper')
        if (ui == null) throw new Error("Element 'uiWrapper' is null!")
        const h = ui.clientHeight

        cnv = p.createCanvas(h, h)
        cnv.parent(document.getElementById("canvWrapper"))

        p.setFrameRate(dailySketches[internalDate - 1].fps)
        dailySketches[internalDate - 1].init(p)
    }
    
    p.draw = () => {
        if(date != internalDate){
            internalDate = date
            p.setFrameRate(dailySketches[internalDate - 1].fps)
            dailySketches[internalDate - 1].init(p)
        }

        dailySketches[internalDate - 1].draw(p)
    }
}

new p5(sketch)
