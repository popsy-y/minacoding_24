import { theme, themes } from "./assets/themes";
import { setDate } from "./main";

const uiWrap = document.getElementById('uiWrapper')
const list = document.getElementById('themeList')

const listElems: HTMLLIElement[] = []

if (list == null) {
    throw new Error("Element '#themeList' is null!")
}

themes.forEach((theme, idx) => {
    const parent = document.createElement('li')
    parent.classList.add('themeListElem')
    if (idx + 1 == new Date().getDate()) parent.classList.add('activeTheme')

    parent.addEventListener(('click'), () => {
        setDate(idx + 1)
        refreshActivation(idx)
    })
    
    const thm = document.createElement('p')
    thm.classList.add('themeListTxt')

    const dsc = document.createElement('span')
    dsc.classList.add('themeListDesc')

    thm.textContent = (idx + 1) + ': ' + theme.theme
    dsc.textContent = theme.desc

    parent.appendChild(thm)
    parent.appendChild(dsc)

    list.appendChild(parent)

    listElems.push(parent)
})

const refreshActivation = (tidx: number) => {
    listElems.forEach((el, idx) => {
        if (idx == tidx) {
            el.classList.add('activeTheme')
            return
        }

        if(idx != tidx && el.classList.contains('activeTheme')){
            el.classList.remove('activeTheme')
            return
        }
    })
}