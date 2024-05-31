import p5 from "p5"
import { dailySketches } from "./dailySketches"

let date = 1

const sketch = (p: p5) => {
    let internalDate = date

    let cnv

    p.setup = () => {
        cnv = p.createCanvas(800, 800)
        cnv.mousePressed(() => {date = date == 2 ? 1 : 2})

        p.setFrameRate(dailySketches[internalDate - 1].fps)
    }
    
    p.draw = () => {
        if(date != internalDate){
            internalDate = date
            p.setFrameRate(dailySketches[internalDate - 1].fps)
        }

        dailySketches[0].func(p)
    }
    
}

new p5(sketch)
