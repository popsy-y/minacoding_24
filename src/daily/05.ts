import { info } from "../types"
import { dailySketch } from "../interfaces"
import p5, { Color } from "p5"

export const sketch:dailySketch = {
    info: {
        day: 5,
        theme: "Many"
    },
    fps: 1,
    init: (p: p5) => {
        p.noStroke()
    },
    draw: (p: p5) => draw(p)
}

export const draw = (p: p5) => {
    p.background(p.color("#1c2433"))

    const buf = p.createGraphics(p.width, p.height)
    
    for (let j = 0; j < 20; j++){
        p.push()
        p.translate(
            p.random(p.width),
            p.random(p.height)
        )
    
        for (let i = 0; i < 10; i++) {
            drawWire(p, buf)
        }
        p.pop()
    }

    const orig = p.createGraphics(p.width, p.height)
    orig.image(buf, 0, 0)
    
    p.image(buf, 0, 0)
    buf.filter(p.BLUR, 5)
    // p.filter(p.BLUR, 3)
    p.image(orig, 0, 0)
}

const drawWire = (p: p5, buf: p5.Graphics) => {
    const vtxs: p5.Vector[] = []

    const step = 20
    const unitAng = p.PI / 4

    let pos = new p5.Vector(0, 0)

    for (let i = 0; i < p.floor(p.random(4, 30)); i++) {
        const ang = unitAng * p.floor(p.random(p.TWO_PI / unitAng))
        pos.x += step * p.cos(ang)
        pos.y += step * p.sin(ang)

        vtxs.push(pos.copy())
    }

    p.stroke(p.random() < .5 ? p.color("#31e1f5") : p.color("#f59631"))
    p.noFill()
    p.beginShape()

    for (const v of vtxs) {
        p.vertex(v.x, v.y)
    }

    p.endShape()
    p.noStroke()
}