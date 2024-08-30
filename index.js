let deckId
let computerScore = 0
let myScore = 0
let drawn = false
let drawRound = 0
let deckCount = 0
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const clearBtn = document.getElementById("clearBtn")
const header = document.getElementById("header")
const computerSlot = document.getElementById("slot1")
const mySlot = document.getElementById("slot2")
const remainingText = document.getElementById("remaining")
const computerScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("my-score")


clearBtn.addEventListener('click', function(){
    deckId
    computerScore = 0
    myScore = 0
    drawn = false
    drawRound = 0
    drawCardBtn.classList.add('disabled')
    remainingText.textContent = `Remaining cards: ${data.remaining}, Draw: ${drawRound}, Deck: ${deckCount}`

    cardsContainer.children[0].innerHTML = `
        <h3 id="computer-score">Computer score: ${computerScore}</h3>
        <img src=${data.cards[0].image} class="card" />
    `

    cardsContainer.children[1].innerHTML = `
        <img src=${data.cards[1].image} class="card" />
        <h3 id="my-score">My score: ${myScore}</h3>
    `
})
 

function resultRender(vauleParam){
    if (vauleParam === 'None'){
        winnerText = 'War!'
    }

    if (vauleParam){
        myScoreEl.textContent = `My Score: ${myScore}`
        mySlot.classList.add('won')
        winnerText = "You win!"
    }
    else{
        computerSlot.classList.add('won')
        computerScoreEl.textContent = `Computer Score: ${computerScore}`
        winnerText = "Computer wins!"
    }

    header.textContent = winnerText
}


function determineCardWinner(card1, card2) {
    drawn = true
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    
    if (card1ValueIndex > card2ValueIndex) {
        computerScore += 1
        return false
    } else if (card1ValueIndex < card2ValueIndex) {
        myScore += 1
        return true
    }
    else{
        return 'None'
    }
}


function drawCard(){
    drawn = true
    drawRound += 1
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            drawn = true
            if (drawn) {
                drawCardBtn.classList.remove('disabled')
            }
            resultRender(determineCardWinner(data.cards[0], data.cards[1]))
 
            remainingText.textContent = `Remaining cards: ${data.remaining}, Draw: ${drawRound}, Deck:${deckCount}`

            cardsContainer.children[0].innerHTML = `
                <h3 id="computer-score">Computer score: ${computerScore}</h3>
                <img src=${data.cards[0].image} class="card" />
            `

            cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
                <h3 id="my-score">My score: ${myScore}</h3>
            ` 
            
            if (data.remaining === 0) {
                drawn = false
                remainingText.classList.add('gameOver')
                remainingText.textContent = 'Round Over :('
                drawCardBtn.classList.add('disabled')
                
                if (computerScore > myScore) {
                    header.textContent = "The computer won the round!"
                } else if (myScore > computerScore) {
                    header.textContent = "You won the round!"
                } else {
                    header.textContent = "It's a tie game!"
                }
            }
        })
}

function handleClick() {
    drawn = true
    deckCount += 1
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            remainingText.textContent = `Remaining cards: ${data.remaining}, Deck: ${deckCount}`
            deckId = data.deck_id
        })

    if (drawn){
        drawCardBtn.classList.remove('disabled')
    }
    header.textContent = "Deck is refreshed!"
    if (remainingText.classList.contains('gameOver')){
        remainingText.classList.remove('gameOver')
    }
}

newDeckBtn.addEventListener("click", handleClick)

drawCardBtn.addEventListener("click", drawCard)



 
