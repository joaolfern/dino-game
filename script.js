const dino = document.querySelector('.dino')
const background = document.querySelector('.background')
const score = document.querySelector('.score')

let dificulty = 6000
let isJumping = false
let counter = 0
let position = 0

function handleKeyUp(e) {
    if (e.keyCode == 32) {
        jump()
    }
}

function jump() {
    if (isJumping)
        return

    isJumping = true
    let upInterval = setInterval(() => {
        if (position >= 200) {
            clearInterval(upInterval)
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval)
                    setTimeout(() => {
                        isJumping = false
                    }, 20)
                }
                else {
                    position -= 20
                    dino.style.bottom = position + 'px'
                }
            }, 30)
        } else {
            position += 20
            dino.style.bottom = position + 'px'
        }
    }, 20)
}

function writeScore() {
    score.textContent = counter
}


function createCactus() {
    const cactus = document.createElement('div')
    let cactusPosition = 1000
    let randomTime = Math.random() * dificulty

    cactus.classList.add('cactus')
    cactus.style.left = 1000 + 'px'
    background.appendChild(cactus)

    function removeCactus() {
        background.removeChild(cactus)
        counter += 1
        writeScore()
        clearInterval(leftInterval)
    }

    let leftInterval = setInterval(() => {
        if (cactusPosition <= -60) {
            if (dificulty > 3000)
                dificulty -= 100
            removeCactus()
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            document.body.innerHTML = `<h1>Score ${counter}</h1>`
        } else {
            cactus.style.left = cactusPosition + 'px'
            cactusPosition -= 10
        }
    }, 20)

    setTimeout(createCactus, randomTime)

}

writeScore()
createCactus()

document.addEventListener('keyup', handleKeyUp)