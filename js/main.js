checkForGame()

//  Check for an existing game ID in local storage, if none get new game ID
function checkForGame(){
  if (! localStorage.getItem('deckID')){
    getNewDeckID
  }else {
    console.log(localStorage.getItem('deckID'))
  }
}

let deckID = localStorage.getItem('deckID')
let deckarr = []
let player1Hand = []
let player2Hand = []
let warHand = []
let player1Val = 0
let player2Val = 0
let cardImage = 'https://deckofcardsapi.com/static/img/'
let url = `https://deckofcardsapi.com/api/${deckID}`

document.querySelector('#newGame').addEventListener('click', getNewDeckID)
// document.querySelector('#dealCards').addEventListener('click', drawCards)
document.querySelector('#drawTwo').addEventListener('click', playCards)
addDeckIDToDom()

function addDeckIDToDom(){
  document.querySelector('#deckID').innerText = deckID
}

function getNewDeckID(){
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data)
    localStorage.setItem('deckID', data.deck_id)
    deckID = data.deck_id
    addDeckIDToDom()
  })
  drawCards()
  // .catch(err => {
  //     console.log(`error ${err}`)
  // });
}

function drawCards(){
  document.querySelectorAll('img.war').forEach(function(toggle) {
    toggle.style.display = 'none'
  })
  // document.querySelector('#player1').src = ''
  // document.querySelector('#player2').src = ''

  deckarr = []
  player1Hand = []
  player2Hand = []
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=52`)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
        localStorage.removeItem('deck')
        console.log(data.cards)

        data.cards.forEach( obj => {
          let cards = obj
          // console.log(cards.code)
          if(!localStorage.getItem('deck')){
          localStorage.setItem('deck', cards.code)
          }else {
            let deck = localStorage.getItem('deck') + ' ; ' + cards.code
            localStorage.setItem('deck', deck)
          }
        })
        deckarr = localStorage.getItem('deck').split(' ; ')
        for (i=0; i < deckarr.length;) {
          player1Hand.push(deckarr.shift())
          player2Hand.push(deckarr.shift())         
        }
        addToPiles()

        console.log('Cards Delt')
  })
  .catch(err => {
      console.log(`error ${err}`)
  });
}

function addToPiles(){
  let p1update = (player1Hand.toString())
  // const p1Hand = player1Hand.forEach((element) => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/player1Hand/add/?cards=${p1update}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(`error ${err}`)
      })
  // })
  localStorage.setItem('player1Hand', p1update)
  let p2update = (player2Hand.toString())
  // const p2Hand = player2Hand.forEach((element) => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/player2Hand/add/?cards=${p2update}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        showCardsInHand()
      })
      .catch(err => {
        console.log(`error ${err}`)
      })
    // })
  localStorage.setItem('player2Hand', p2update)
  console.log('Piles updated')
}


function showCardsInHand(){
  //show number
  document.querySelector('#p1NumOfCards').innerText = player1Hand.length
  //show p1 cards = number
  var p1 = [];
  var img1 = `<img class='inHand' src="./img/redfixed.png" alt="">`
  for (i = 0; i < player1Hand.length; i += 1){
      p1[i] = img1
  }
  var p2 = [];
  var img2 = `<img class='inHand' src="./img/redfixed.png" alt="">`
  for (i = 0; i < player2Hand.length; i += 1){
      p2[i] = img2
  }

  document.getElementById('p1InHand').innerHTML = p1;
  document.getElementById('p2InHand').innerHTML = p2;
  //check if player1 hand empty
  if(player1Hand.length === 0){
    document.querySelector('.player1').style.display = 'none'
    alert('Player 2 Wins!')
  }
  //check if player2 hand empty
  document.querySelector('#p2NumOfCards').innerText = player2Hand.length
  if(player2Hand.length === 0){
    document.querySelector('.player2').style.display = 'none'
    alert('Player 1 Wins!')
  }
}


//deal card from each hand to compare
function playCards(){
  document.querySelectorAll('img.war').forEach(function(toggle) {
    toggle.style.display = 'none'
  })
  document.querySelector('#p1Win').style.display = 'none'
  document.querySelector('#p2Win').style.display = 'none'
  document.querySelector('#p1InHand').removeChild(document.querySelector('#p1InHand').querySelector('img'))
  document.querySelector('#p2InHand').removeChild(document.querySelector('#p2InHand').querySelector('img'))

  player1Code = player1Hand[player1Hand.length -1]
    if (player1Code.startsWith('1')){
      player1Val = 1
    }else if(player1Code.startsWith('2')){
      player1Val = 2
    }else if(player1Code.startsWith('3')){
      player1Val = 3
    }else if(player1Code.startsWith('4')){
      player1Val = 4
    }else if(player1Code.startsWith('5')){
      player1Val = 5
    }else if(player1Code.startsWith('6')){
      player1Val = 6
    }else if(player1Code.startsWith('7')){
      player1Val = 7
    }else if(player1Code.startsWith('8')){
      player1Val = 8
    }else if(player1Code.startsWith('9')){
      player1Val = 9
    }else if(player1Code.startsWith('0')){
      player1Val = 10
    }else if(player1Code.startsWith('J')){
      player1Val = 11
    }else if(player1Code.startsWith('Q')){
      player1Val = 12
    }else if(player1Code.startsWith('K')){
      player1Val = 13
    }else {
      player1Val = 14
  }
  document.querySelector('#player1').src = cardImage + player1Code + '.png'
  player2Code = player2Hand[player2Hand.length -1]
    if (player2Code.startsWith('1')){
      player2Val = 1
    }else if(player2Code.startsWith('2')){
      player2Val = 2
    }else if(player2Code.startsWith('3')){
      player2Val = 3
    }else if(player2Code.startsWith('4')){
      player2Val = 4
    }else if(player2Code.startsWith('5')){
      player2Val = 5
    }else if(player2Code.startsWith('6')){
      player2Val = 6
    }else if(player2Code.startsWith('7')){
      player2Val = 7
    }else if(player2Code.startsWith('8')){
      player2Val = 8
    }else if(player2Code.startsWith('9')){
      player2Val = 9
    }else if(player2Code.startsWith('0')){
      player2Val = 10
    }else if(player2Code.startsWith('J')){
      player2Val = 11
    }else if(player2Code.startsWith('Q')){
      player2Val = 12
    }else if(player2Code.startsWith('K')){
      player2Val = 13
    }else {
      player2Val = 14
  }
  document.querySelector('#player2').src = cardImage + player2Code + '.png'

  // fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/player1Hand/draw/?count=1`)
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data)
  //     if (data.success === true){
  //       player1Val = data.cards[0].value
  //       player1Card = data.cards[0].code
  //       document.querySelector('#player1').src = data.cards[0].image
  //       if (player1Val == 'ACE'){
  //         player1Val = 14
  //       }else if (player1Val == 'KING'){
  //         player1Val = 13
  //       }else if (player1Val == 'QUEEN'){
  //         player1Val = 12
  //       }else if (player1Val == 'JACK'){
  //         player1Val = 11
  //       }else if (typeof player1Val !== 'number'){
  //         player1Val = +player1Val
  //       }
  //     }
  //   })
  // fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/player2Hand/draw/?count=1`)
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(data)
  //     player2Val = data.cards[0].value
  //     player2Card = data.cards[0].code
  //     if (data.success === true){
  //       document.querySelector('#player2').src = data.cards[0].image 
  //       if (player2Val == 'ACE'){
  //         player2Val = 14
  //       }else if (player2Val == 'KING'){
  //         player2Val = 13
  //       }else if (player2Val == 'QUEEN'){
  //         player2Val = 12
  //       }else if (player2Val == 'JACK'){
  //         player2Val = 11
  //       }else if (typeof player2Val !== 'number'){
  //         player2Val = +player2Val
  //       }
        // compare()
    //   }
    // })
    compare()
}


// show winner
function compare(){
  document.querySelector('#drawTwo').style.display = 'inline'
  if (player1Val > player2Val){
    document.querySelector('#p1Win').style.display = 'inline'
    player1Wins()

  }else if (player2Val > player1Val){
    document.querySelector('#p2Win').style.display = 'inline'
    player2Wins()

  }else {
    document.querySelector('h3').innerText = 'timeForWar'
    document.querySelector('#drawTwo').style.display = 'none'
    if (warHand.length === 0){
    war()
    }else {
      document.querySelector('#warStart').style.display = 'inline'
      warRound1
    }
  }

}

function player1Wins(){
  if (warHand.length !== 0){
    for (i=0;i < warHand.length; ){
      player1Hand.unshift(warHand[0])
      warHand.shift()
      if (warHand.length === 0) {
        break
      }
    }
  }
  player2Hand.pop()
  player1Hand.pop()
  player1Hand.unshift(`${player2Code}`)
  player1Hand.unshift(`${player1Code}`)

    
  
    // fetch(`https://deckofcardsapi.com/api/deck/${deckID}/return/?cards=${player1Card},${player2Card}`)
    // .then(res => res.json())
    // .then(data => {
    //   console.log(data)
    // })
    // fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/player1Hand/draw/?count=2`)
    // .then(res => res.json())
    // .then(data => {
    //   console.log(data)
    // })
    // fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/player1Hand/add/?cards=${player2Card}`)
    // .then(res => res.json())
    // .then(data => {
    //   console.log(data)
    // })
    // fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/player1Hand/list`)
    // .then(res => res.json())
    // .then(data => {
    //   console.log(data)
    // })
    showCardsInHand()
}

function player2Wins(){
  if (warHand.length !== 0){
    for (i=0;i < warHand.length; ){
      player2Hand.unshift(warHand[0])
      warHand.shift()
      if (warHand.length === 0){
        break
      }
    }
  }
  player1Hand.pop()
  player2Hand.pop()
  player2Hand.unshift(`${player1Code}`)
  player2Hand.unshift(`${player2Code}`)


  // fetch(`https://deckofcardsapi.com/api/deck/${deckID}/return/?cards=${player1Card},${player2Card}`)
  // .then(res => res.json())
  // .then(data => {
  //   console.log(data)
  // })
  // fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/player2Hand/draw/?count=2`)
  // .then(res => res.json())
  // .then(data => {
  //   console.log(data)
  // })
  // fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/player2Hand/add/?cards=${player1Card}`)
  // .then(res => res.json())
  // .then(data => {
  //   console.log(data)
  // })
  // fetch(`https://deckofcardsapi.com/api/deck/${deckID}/pile/player2Hand/list`)
  // .then(res => res.json())
  // .then(data => {
  //   console.log(data)
  // })
  showCardsInHand()
}



function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function war(){
  console.log('time for war')
  player1Hand.pop()
  player2Hand.pop()
  warHand.unshift(`${player1Code}`)
  warHand.unshift(`${player2Code}`)
  document.querySelector('#warStart').style.display = 'inline'
  showCardsInHand()
}

// Round 1
document.querySelector('#warStart').addEventListener('click', warRound1)

function warRound1(){
  document.querySelector('#warStart').style.display = 'none'
  player1Code = player1Hand[player1Hand.length -1]
  player2Code = player2Hand[player2Hand.length -1]
  // sleep(1000)
  document.querySelector('#p1War1').style.display = 'inline'
  document.querySelector('#p2War1').style.display = 'inline'
  document.querySelector('#p1War1').src = cardImage + player1Code + '.png'
  document.querySelector('#p2War1').src = cardImage + player2Code + '.png'
  // sleep(1000)
  player1Hand.pop()
  player2Hand.pop()
  warHand.unshift(`${player1Code}`)
  warHand.unshift(`${player2Code}`)
  // alert(`Round ${i}`)
  document.querySelector('#warRound2').style.display = 'inline'
  showCardsInHand()
}

// Round 2
document.querySelector('#warRound2').addEventListener('click', warRound2)

function warRound2(){
  document.querySelector('#warRound2').style.display = 'none'
  player1Code = player1Hand[player1Hand.length -1]
  player2Code = player2Hand[player2Hand.length -1]
  // sleep(1000)
  document.querySelector('#p1War2').style.display = 'inline'
  document.querySelector('#p2War2').style.display = 'inline'
  document.querySelector('#p1War2').src = cardImage + player1Code + '.png'
  document.querySelector('#p2War2').src = cardImage + player2Code + '.png'
  // sleep(1000)
  player1Hand.pop()
  player2Hand.pop()
  warHand.unshift(`${player1Code}`)
  warHand.unshift(`${player2Code}`)
  // alert(`Round ${i}`)
  document.querySelector('#warRound3').style.display = 'inline'
// }
  showCardsInHand()
}

// Round 3
document.querySelector('#warRound3').addEventListener('click', warRound3)

function warRound3(){
  document.querySelector('#warRound3').style.display = 'none'
  document.querySelector('#p1InHand').removeChild(document.querySelector('#p1InHand').querySelector('img'))
  document.querySelector('#p2InHand').removeChild(document.querySelector('#p2InHand').querySelector('img'))
  player1Code = player1Hand[player1Hand.length -1]
  player2Code = player2Hand[player2Hand.length -1]
  // sleep(1000)
  document.querySelector('#p1War3').style.display = 'inline'
  document.querySelector('#p2War3').style.display = 'inline'
  document.querySelector('#p1War3').src = cardImage + player1Code + '.png'
  document.querySelector('#p2War3').src = cardImage + player2Code + '.png'
  // sleep(1000)
  player1Hand.pop()
  player2Hand.pop()
  warHand.unshift(`${player1Code}`)
  warHand.unshift(`${player2Code}`)
  // alert(`Round ${i}`)
  document.querySelector('#warFinal').style.display = 'inline'
  showCardsInHand()
}

document.querySelector('#warFinal').addEventListener('click', warFinal)

// War Final
function warFinal(){
  // 4th pair gets compared and warHand given to winner
  document.querySelector('#warFinal').style.display = 'none'
  document.querySelector('#p1InHand').removeChild(document.querySelector('#p1InHand').querySelector('img'))
  document.querySelector('#p2InHand').removeChild(document.querySelector('#p2InHand').querySelector('img'))
  player1Code = player1Hand[player1Hand.length -1]
  document.querySelector('#p1WarFinal').style.display = 'inline'
  document.querySelector('#p1WarFinal').src = cardImage + player1Code + '.png'
  player1Hand.pop()
  warHand.unshift(`${player1Code}`)
      if (player1Code.startsWith('1')){
        player1Val = 1
      }else if(player1Code.startsWith('2')){
        player1Val = 2
      }else if(player1Code.startsWith('3')){
        player1Val = 3
      }else if(player1Code.startsWith('4')){
        player1Val = 4
      }else if(player1Code.startsWith('5')){
        player1Val = 5
      }else if(player1Code.startsWith('6')){
        player1Val = 6
      }else if(player1Code.startsWith('7')){
        player1Val = 7
      }else if(player1Code.startsWith('8')){
        player1Val = 8
      }else if(player1Code.startsWith('9')){
        player1Val = 9
      }else if(player1Code.startsWith('0')){
        player1Val = 10
      }else if(player1Code.startsWith('J')){
        player1Val = 11
      }else if(player1Code.startsWith('Q')){
        player1Val = 12
      }else if(player1Code.startsWith('K')){
        player1Val = 13
      }else {
        player1Val = 14
    }
  player2Code = player2Hand[player2Hand.length -1]
  document.querySelector('#p2WarFinal').style.display = 'inline'
  document.querySelector('#p2WarFinal').src = cardImage + player2Code + '.png'  
    player2Hand.pop()
    warHand.unshift(`${player2Code}`)
      if (player2Code.startsWith('1')){
        player2Val = 1
      }else if(player2Code.startsWith('2')){
        player2Val = 2
      }else if(player2Code.startsWith('3')){
        player2Val = 3
      }else if(player2Code.startsWith('4')){
        player2Val = 4
      }else if(player2Code.startsWith('5')){
        player2Val = 5
      }else if(player2Code.startsWith('6')){
        player2Val = 6
      }else if(player2Code.startsWith('7')){
        player2Val = 7
      }else if(player2Code.startsWith('8')){
        player2Val = 8
      }else if(player2Code.startsWith('9')){
        player2Val = 9
      }else if(player2Code.startsWith('0')){
        player2Val = 10
      }else if(player2Code.startsWith('J')){
        player2Val = 11
      }else if(player2Code.startsWith('Q')){
        player2Val = 12
      }else if(player2Code.startsWith('K')){
        player2Val = 13
      }else {
        player2Val = 14
    }

    compare()
}

////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////stress relief//////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

function getDog(){
  fetch(`https://random.dog/woof.json`)
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data)
    document.querySelector('.dog').src = data.url
  })
  .catch(err => {
      console.log(`error ${err}`)
  });
}

document.querySelector('#getJoke').addEventListener('click', getJoke)

function getJoke(){
  fetch(`https://v2.jokeapi.dev/joke/Any?safe-mode`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.setup){
      document.querySelector('#joke').innerText = data.setup
      document.querySelector('#punchline').innerText = data.delivery
      }else {
        document.querySelector('#joke').innerText = data.joke
      }
    })
    timeout()
}

function timeout(){
  setTimeout(clearJoke, 10000)
}

function clearJoke() {
  document.querySelector('#joke').innerText = ''
  document.querySelector('#punchline').innerText = ''
}
