import p5 from "p5"
import { info } from "./types"

export interface dailySketch {
    info: info,
    fps: number,
    init(p: p5): void,
    draw(p: p5): void
}