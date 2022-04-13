checkForGame()
let deckID
let url = `https://deckofcardsapi.com/api/${deckID}`
// let player1Hand = []
class PlayerHand{
  constructor (code, value, img, suit) {
      this.code = code
      this.value = value
      this.img = img
      this.suit = suit
  }
  remove(){
      console.log('playing')
  }
  add(){
      console.log('LIKED')
  }
  convert(){
      console.log('sharing with friends')
  }
}

// let player1Hand = new PlayerHand('')

let p1codes = []
let p1imgs = []
let p1CardsInHand = 0
let player1Val = 0
let player1Card = ''
// let player2Hand = []
let p2codes = []
let p2imgs = []
let p2CardsInHand = 0
let player2Val = 0
let player2Card = ''

function checkForGame(){
  if (localStorage.getItem('deckID') == null) {
    getNewDeck
  }else {
    console.log(localStorage.getItem('deckID'))
  }
}

function getNewDeck(){
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    // console.log(data)
    localStorage.setItem('deckID', data.deck_id)
    deckID = data.deck_id
    dealCards()
  })
  .catch(err => {
      console.log(`error ${err}`)
  });
}

document.querySelector('#newGame').addEventListener('click', getNewDeck)
document.querySelector('#drawTwo').addEventListener('click', playCards)
document.querySelector('#dealCards').addEventListener('click', makePiles)

//split the deck in half to each player
function dealCards(){
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=52`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        let cards = data.cards
        for (i = 0; i < 52; i++){
          if (i % 2 == 0){
            player1Hand.push(cards[i])
          }else {
            player2Hand.push(cards[i])
          }
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}


//make separate decks
function makePiles(){
  for ( i = 0; i < 26; i++){
    p1codes.push(player1Hand[i].code)
  }

  for ( i = 0; i < 26; i++){
    p2codes.push(player2Hand[i].code)
  }
  pushPiles()
  showCardsInHand()
}

//push piles to decks
function pushPiles(){
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/player1/add?cards=${p1codes}`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        })
      .catch(err => {
          console.log(`error ${err}`)
      });
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/player2/add?cards=${p2codes}`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        })
      .catch(err => {
          console.log(`error ${err}`)
      });
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/player1/shuffle/`)
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/player2/shuffle/`)
}

//show player1 hand
//show player2 hand
function showCardsInHand(){
  document.querySelector('#p1NumOfCards').innerText = player1Hand.length
  document.querySelector('#p2NumOfCards').innerText = player2Hand.length 
}


//deal card from each hand to compare
function playCards(){
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/player1/draw/?count=1`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      document.querySelector('#player1').src = data.cards[0].image
      player1Val = Number(data.cards[0].value)
      player1Card = data.cards[0].code
    })
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/player2/draw/?count=1`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      document.querySelector('#player2').src = data.cards[0].image 
      player2Val = Number(data.cards[0].value)
      player2Card = data.cards[0].code
    })
    compare
}
//show winner
function compare(){
  if (player1Val == 'ACE'){
    player1Val = Number(14)
  }else if (player1Val == 'KING'){
    player1Val = Number(13)
  }else if (player1Val == 'QUEEN'){
    player1Val = Number(12)
  }else if (player1Val == 'JACK'){
    plaery1Val = Number(11)
  }
  if (player2Val == 'ACE'){
    player2Val = Number(14)
  }else if (player2Val == 'KING'){
    player2Val = Number(13)
  }else if (player2Val == 'QUEEN'){
    player2Val = Number(12)
  }else if (player2Val == 'JACK'){
    player2Val = Number(11)
  }
  if (player1Val > player2Val){
    document.querySelector('h3').innerText = 'player1Wins'
    player1Hand
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/player2/return/?cards=${player2Card}`)
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/player1/add/?cards=${player2Card}`)
  }else if (player2Val > player1Val){
    document.querySelector('h3').innerText = 'player2Wins'
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/player1/return/?cards=${player1Card}`)
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/player2/add/?cards=${player1Card}`)
  }else {
    document.querySelector('h3').innerText = 'timeForWar'
  }
}

function p1ShowList(){
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/player1/list/`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })
}
function p2ShowList(){
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/player2/list/`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
  })
}
//winner takes both cards
//if tie deal war cards
//winner takes all cards
//if player1 || player 2 cards == 0 game over
//Winner is player with cards



// function drawTwo(){
//   deckID = localStorage.getItem('deckID')

//   let url = `https://deckofcardsapi.com/api/deck/${deckID/pile/player1/draw/?count=1`


//   fetch(url)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log(data)
//         document.querySelector('#player1').src = data.cards[0].image 
//         document.querySelector('#player2').src = data.cards[1].image
//         let player1Val = convertToNum(data.cards[0].value)
//         let player2Val = convertToNum(data.cards[1].value)
//         if(player1Val > player2Val){
//           document.querySelector('h3').innerText = 'Player 1 Wins'
//           fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/player1/add/?cards=${player1Val},${player2Val}`)
//             .then(res => res.json())
//             .then(data => {
//               console.log(data)
//             })
//         }else if(player1Val < player2Val){
//           document.querySelector('h3').innerText = 'Player 2 Wins'
//           fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/player2/add/?cards=${player1Val},${player2Val}`)
//             .then(res => res.json())
//             .then(data => {
//               console.log(data)
//             })
//         }else{
//           document.querySelector('h3').innerText = 'Time for War!'
//         }

        
//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });
// }

function convertToNum(val){
  if(val === 'ACE'){
    return 14
  }else if(val === 'KING'){
    return 13
  }else if(val === 'QUEEN'){
    return 12
  }else if(val === 'JACK'){
    return 11
  }else{
    return Number(val)
  }
}

