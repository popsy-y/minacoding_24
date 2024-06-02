import { info } from "../types"
import { dailySketch } from "../interfaces"
import p5, { Color } from "p5"

export const sketch:dailySketch = {
    info: {
        day: 2,
        theme: "Color"
    },
    fps: 60,
    init: (p: p5) => {
        // movement is based on p5 canvas coordinate
        center = new p5.Vector(p.width / 2, p.height / 2)
        // translate p5 coordinate to pixel coordinate
        // center = center.copy().mult(p.pixelDensity())
        destination = center
    },
    draw: (p: p5) => draw(p)
}

let center: p5.Vector
let destination: p5.Vector
let duration = 60
const durMax = 120
const durMin = 60
let moveStartedAt = 0

export const draw = (p: p5) => {
    if (p5.Vector.dist(center, destination) < .001) {
        duration = newDuration(durMax, durMin)
        destination = newDestination(p)

        moveStartedAt = p.frameCount
    }

    const moveRatio = (p.frameCount - moveStartedAt) / duration
    const easedRatio = quintEase(moveRatio)

    center.lerp(destination, easedRatio)

    p.background(255)

    const wid = p.width * p.pixelDensity()
    const hei = p.height * p.pixelDensity()

    p.loadPixels()

    for (let row = 0; row < wid; row++) {
        for (let col = 0; col < hei; col++) {
            const idx = 4 * ((row * wid) + col)

            const dist = p5.Vector.dist(center, new p5.Vector(col, row))

            if (dist > 255) {
                p.pixels[idx + 3] = 0
                continue
            }

            p.pixels[idx] = (p.sin(dist + p.frameCount) + 1) * 100
            p.pixels[idx + 1] = (p.sin(dist + p.frameCount + .8) + 1) * 100
            p.pixels[idx + 2] = (p.sin(dist + p.frameCount - .8) + 1) * 100
            p.pixels[idx + 3] = 255 - dist
        }
    }

    p.updatePixels()
}

const newDuration = (max: number, min: number): number => {
    return min + (Math.random() * (max - min))
}

const newDestination = (p: p5): p5.Vector => {
    return new p5.Vector(p.random(p.width), p.random(p.height))
}

const quintEase = (t: number): number => {
    const clamped = Math.min(Math.max(t, 0), 1)

    return clamped < 0.5 ? 4 * clamped * clamped * clamped : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
}