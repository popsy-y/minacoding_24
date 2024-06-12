import { info } from "../types"
import { dailySketch } from "../interfaces"
import p5 from "p5"

export const sketch:dailySketch = {
    info: {
        day: 11,
        theme: "Capture Image"
    },
    fps: 15,
    init: () => {},
    draw: (p: p5) => draw(p)
}

export const draw = (p: p5) => {
    p.background(255, 255, 255, 100)
    
    for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
        p.rect(
            p.random(-10, p.width + 10),
            p.random(-10, p.height + 10),
            p.random(p.width / 10, p.width / 3),
            p.random(p.height / 10, p.height / 3)
        )
    }

    p.text("not yet comming...", 10, 10)
}