import { info } from "../types"
import { dailySketch } from "../interfaces"
import p5 from "p5"

export const sketch:dailySketch = {
    info: {
        day: 4,
        theme: "One hand"
    },
    fps: 24,
    init: (p: p5) => {
        p.stroke(10)
        N_EYES = p.floor(p.random(eyeLim.x, eyeLim.y))

        eyes.length = 0
        for (let i = 0; i < N_EYES; i++) {
            const hei = p.random(heiLim.x, heiLim.y)
            const wid = hei * .6
            const pad = new p5.Vector(hei / 2, wid / 2)
            const pos = new p5.Vector(
                p.random(pad.x, p.width - pad.x),
                p.random(pad.y, p.width - pad.y)
            )

            eyes.push({
                pos: pos,
                size: new p5.Vector(wid, hei)
            })
        }
    },
    draw: (p: p5) => draw(p)
}

type eyeData = {
    pos: p5.Vector,
    size: p5.Vector
}

const heiLim = new p5.Vector(10, 40)

const eyeLim = new p5.Vector(8, 20)
let N_EYES = 1

const eyes: eyeData[] = []

export const draw = (p: p5) => {
    p.clear()

    for (const eye of eyes) {
        const cursor = new p5.Vector(p.mouseX - eye.pos.x, p.mouseY - eye.pos.y)
        const curDir = p5.Vector.normalize(cursor)

        for (let i = -1; i <= 1; i+=2) {
            p.fill(255)
            p.ellipse(eye.pos.x + (eye.size.x / 2 * i), eye.pos.y, eye.size.x, eye.size.y)

            p.fill(10)
            p.ellipse(
                eye.pos.x + (eye.size.x / 2 * i) + (curDir.x * (eye.size.x / 4)),
                eye.pos.y + (curDir.y * (eye.size.y / 4)),
                eye.size.x / 2,
                eye.size.y / 2
            )
        }
    }
}