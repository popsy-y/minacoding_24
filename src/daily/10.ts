import { info } from "../types"
import { dailySketch } from "../interfaces"
import p5 from "p5"

export const sketch:dailySketch = {
    info: {
        day: 10,
        theme: "Screen Saver"
    },
    fps: 60,
    init: (p: p5) => {
        p.noStroke()
        p.background(10, 15, 20)
        pos.x = p.width / 2
        pos.y = p.height / 2
    },
    draw: (p: p5) => draw(p)
}

const turnLength = 20
let turnStartedAt = 0
let dir = 0
let dirCurrent = 0
let dirNext = 1

const speed = 2

const pos: p5.Vector = new p5.Vector()

const eyePos = new p5.Vector(3, 5)

const padding = 10

export const draw = (p: p5) => {
    p.background(10, 15, 20, 20)

    if (p.frameCount - turnStartedAt > turnLength) {
        // refresh dir
        if (p.random() < .05 || pos.x < padding || pos.x > p.width - padding || pos.y < padding || pos.y > p.height - padding) {
            dirRefresh(p)
        }
    }

    if(pos.x < -20 || pos.x > p.width + 20 || pos.y < -20 || pos.y > p.height + 20){
        pos.x = pos.y = p.width / 2
    }

    if (dirCurrent != dirNext) {
        const ratio = quintEase((p.frameCount - turnStartedAt) / turnLength)

        dir = p.lerp(dirCurrent, dirNext, ratio)

        if (p.frameCount - turnStartedAt > turnLength) {
            dir = dirNext
            dirCurrent = dirNext
        }
    }

    const ang = dir * p.HALF_PI

    pos.add(Math.cos(ang) * speed, Math.sin(ang) * speed)
    
    p.push()
    p.translate(pos.x, pos.y)
    p.rotate(ang)

    p.fill(230)
    p.ellipse(0, 0  , 20)

    p.rotate(p.HALF_PI)

    for (let i = -1; i <= 1; i+=2) {
        p.fill(230)
        p.ellipse(eyePos.x * i, -eyePos.y, 5, 5)
        
        p.fill(30)
        p.ellipse(eyePos.x * i, -eyePos.y, 2, 2)
    }
    p.pop()
}

const dirRefresh = (p: p5) => {
    dirNext = getNewDir(dirCurrent)
    turnStartedAt = p.frameCount
}

const getNewDir = (current: number): number => {
    let nd = 0

    do{
        nd = Math.floor(Math.random() * 4)
    }while (nd == dirCurrent || nd == current + 2 || nd == current - 2)

    return nd
}

const quintEase = (t: number): number => {
    const clamped = Math.min(Math.max(t, 0), 1)

    return 1 - Math.pow(1 - clamped, 5)
}