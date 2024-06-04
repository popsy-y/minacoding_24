import { info } from "../types"
import { dailySketch } from "../interfaces"
import p5 from "p5"

import i0 from '../assets/03/p0.png';
import i1 from '../assets/03/p1.png';
import i2 from '../assets/03/p2.png';
import i3 from '../assets/03/p3.png';

export const sketch:dailySketch = {
    info: {
        day: 3,
        theme: "Image"
    },
    fps: 15,
    init: async (p: p5) => {
        images.push(await p.loadImage(i0))
        images.push(await p.loadImage(i1))
        images.push(await p.loadImage(i2))
        images.push(await p.loadImage(i3))

        // await p.loadImage()でロード待ちできていると思いきや出来ていなかったので、その場しのぎとしてスリープ
        await new Promise(res => setTimeout(res, 1000))

        refresh(p)

        dir = true
    },
    draw: (p: p5) => draw(p)
}

type imgData = {
    img: p5.Image,
    pos: p5.Vector
}

let dir: boolean
let processingLine = 0
let processingImg: p5.Image

let imagePos: p5.Vector

let images: p5.Image[] = []

export const draw = (p: p5) => {
    p.background(10, 10, 15)

    if (!processingImg) return

    processingImg.loadPixels()

    if (dir) {
        if (processingLine >= processingImg.width - 2) {
            refresh(p)
            return
        }

        for (let i = 0; i < processingImg.width; i++) {
            const cur = (processingLine * processingImg.width + i) * 4
            const nxt = ((processingLine + 1) * processingImg.width + i) * 4

            const briCur = getBri(processingImg, cur)
            const briNxt = getBri(processingImg, nxt)

            if (briCur < 76) continue

            if (briCur > briNxt) {
                doSort(cur, nxt)
            }
        }
    }else{
        if (processingLine >= processingImg.height - 2) {
            refresh(p)
            return
        }

        // for (let i = 0; i < processingImg.height; i++) {
        //     const cur = ((processingImg.width * i) + processingLine) * 4
        //     const nxt = ((processingImg.width * i) + (processingLine + 1)) * 4

        //     const briCur = getBri(processingImg, cur)
        //     const briNxt = getBri(processingImg, nxt)

        //     if (briCur < 128) continue

        //     if (briCur > briNxt) {
        //         doSort(cur, nxt)
        //     }
        // }
    }

    processingLine++

    processingImg.updatePixels()

    p.image(processingImg, imagePos.x, imagePos.y)
}

const refresh = (p: p5) => {
    let img: p5.Image

    do{
        img = getRndImg(p)
    }while(!img)

    const imgd = getFittedImage(p, img)
    processingImg = imgd.img
    imagePos = imgd.pos
    processingLine = 0
}

const getBri = (img: p5.Image, idx: number) => {
    img.loadPixels()

    const pxs = img.pixels
    return pxs[idx] + pxs[idx + 1] + pxs[idx + 2]
}

const doSort = (cur: number, nxt: number) => {
    const buf = [
        processingImg.pixels[cur], processingImg.pixels[cur + 1], processingImg.pixels[cur + 2], processingImg.pixels[cur + 3]
    ]

    // processingImg.pixels.splice(cur, 3, ...[processingImg[nxt], processingImg[nxt + 1], processingImg[nxt + 2]])
    // processingImg.pixels.splice(nxt, 3, ...buf)

    processingImg.pixels[cur] = processingImg.pixels[nxt]
    processingImg.pixels[cur + 1] = processingImg.pixels[nxt + 1]
    processingImg.pixels[cur + 2] = processingImg.pixels[nxt + 2]
    processingImg.pixels[cur + 3] = processingImg.pixels[nxt + 3]

    processingImg.pixels[nxt] = buf[0]
    processingImg.pixels[nxt + 1] = buf[1]
    processingImg.pixels[nxt + 2] = buf[2]
    processingImg.pixels[nxt + 3] = buf[3]
}

const getRndImg = (p: p5): p5.Image => {
    return images[p.floor(p.random(images.length))]
}

const getFittedImage = (p: p5, img: p5.Image): imgData => {
    img.resize(0, 0)

    // const imgLongSide = p.width > p.height ? p.width : p.height
    const isImgWidLonger = img.width >= img.height

    // const ratio = isImgWidLonger ? img.height / img.width : img.width / img.height

    // const imgW = isImgWidLonger ? imgLongSide : p.round(imgLongSide * ratio)
    // const imgH = isImgWidLonger ? p.round(imgLongSide * ratio) : imgLongSide

    console.log(img.width, img.height)
    
    if (isImgWidLonger) {
        console.log("resized")
        img.resize(p.width, 0)
    }else{
        console.log("resized")
        img.resize(0, p.height)
    }

    const px = isImgWidLonger ? 0 : (p.width - img.width) / 2
    const py = isImgWidLonger ? (p.height - img.height) / 2 : 0

    console.log(img.width, img.height)

    return {
        img: img,
        pos: new p5.Vector(px, py)
    }
}