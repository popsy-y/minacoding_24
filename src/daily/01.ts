import { info } from "../types"
import { dailySketch } from "../interfaces"
import p5 from "p5"

export const sketch:dailySketch = {
    info: {
        day: 0,
        theme: "some theme"
    },
    fps: 60,
    init: (p: p5) => {console.log("hoge");p.noStroke()},
    draw: (p: p5) => draw(p)
}

const palette = [
    {
        bg: "#252427",
        shp: "#f8f7f9"
    },
    {
        bg: "#ff5300",
        shp: "#ffffff"
    },
    {
        bg: "#191414",
        shp: "#1ed760"
    },
    {
        bg: "#fa3b53",
        shp: "#ffffff"
    },
    {
        bg: "#3711b3",
        shp: "#ffffff"
    }
]

let paletteIdx = 0

type vertData = {
    minus: boolean,
    ofst: number
}

const rad = 100

const maxOfst = 20
const cycleLength = 20
let verts: vertData[] = []

const N_V_max = 100
const N_V_min = 10

let N_V = 10

export const draw = (p: p5) => {
    if (verts.length == 0) refreshVerts(p)

    p.background(p.color(palette[paletteIdx].bg))
    p.fill(p.color(palette[paletteIdx].shp))

    p.translate(p.width / 2, p.height / 2)

    if (p.frameCount % cycleLength == 0) {
        refreshVerts(p)
    }

    const t = quintEase((p.frameCount % cycleLength) / cycleLength)

    const unitAng = p.TWO_PI / verts.length


    p.beginShape()

    verts.forEach((v, idx) => {
        putVert(p, v, idx, unitAng, t)
    })

    putVert(p, verts[0], 0, unitAng, t)

    p.endShape()
}

const putVert = (p: p5, v: vertData, idx: number, unitAng: number, t: number) => {
    const vertAng = unitAng * idx

    let vOfst = v.ofst * t
    if (v.minus) vOfst = vOfst *= -1
    
    const vRad = rad + vOfst

    p.vertex(vRad * p.cos(vertAng), vRad * p.sin(vertAng))
}

const refreshVerts = (p: p5) => {
    N_V = p.ceil(p.random(N_V_min, N_V_max))

    verts.length = 0;

    for (let i = 0; i < N_V; i++) {
        verts.push({
            minus: p.random() > 0,
            ofst: p.random(-maxOfst, maxOfst)
        })
    }

    let nextIdx = 0

    do{
        nextIdx = p.floor(p.random(palette.length))
    }while(nextIdx == paletteIdx)

    paletteIdx = nextIdx
}

const quintEase = (t: number): number => {
    const clamped = Math.min(Math.max(t, 0), 1)

    return 1 - Math.pow(1 - clamped, 5)
}