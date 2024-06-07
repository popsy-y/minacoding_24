import { info } from "../types"
import { dailySketch } from "../interfaces"
import p5 from "p5"

export const sketch:dailySketch = {
    info: {
        day: 6,
        theme: "Morning"
    },
    fps: 15,
    init: (p: p5) => {
        for (let i = 0; i < lawnResolution; i++) {
            lawnData.push(p.random(-10, 10))
        }

        p.strokeWeight(1)
        p.stroke(90)
    },
    draw: (p: p5) => draw(p)
}

const lawnResolution = 10
const lawnData: number[] = []

const clrs = {
    sun: ['#fcf188', '#ffa647'],
    sky: ['#edba6d', '#b1d8f2'],
    lawn: ['#5d7340', '#6ec47c']
}

export const draw = (p: p5) => {
    const ratio = p.max(p.min(1 - (p.mouseY / p.height), 1), 0)

    p.background(p.lerpColor(p.color(clrs.sky[0]), p.color(clrs.sky[1]), ratio))

    drawSun(p, ratio)

    drawLawn(p, ratio)
}

const drawSun = (p: p5, ratio: number) => {
    p.fill(p.lerpColor(p.color(clrs.sun[0]), p.color(clrs.sun[1]), ratio))

    p.push()

    //sun
    const height = p.lerp(p.height - 100, 100, ratio)
    p.translate(p.width / 2, height)

    const sunSize = 40

    p.ellipse(0, 0, sunSize, sunSize)

    // beams
    const beams = 8
    const unitAng = p.TWO_PI / beams

    const size = new p5.Vector(10, (ratio + 1) * 10)

    for (let i = 0; i < beams; i++) {
        p.push()
            p.rotate(unitAng * i)
            p.translate(- size.x / 2, - size.y - (sunSize + 5))

            p.rect(0, 0, size.x, size.y)
        p.pop()
    }

    p.pop()
}

const drawLawn = (p: p5, ratio: number) => {
    p.fill(p.lerpColor(p.color(clrs.lawn[0]), p.color(clrs.lawn[1]), ratio))

    const baseHeight = p.height - 100

    p.beginShape()

    p.vertex(0, p.height)
    p.vertex(0, baseHeight)

    const unitLength = p.width / (lawnData.length + 1)
    lawnData.forEach((lw, idx) => {
        p.vertex(unitLength * idx + 1, baseHeight + lw)
    });

    p.vertex(p.width, baseHeight)
    p.vertex(p.width, p.height)
    p.vertex(0, p.height)

    p.endShape()
}