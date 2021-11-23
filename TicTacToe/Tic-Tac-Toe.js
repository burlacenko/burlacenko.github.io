//
// IMPORTANT: PROPS X extraction
//
// like this we get all the "PROPS" coming in
// const Square = (props) => {
//   return <button>{props.id}</button>
// };
// with "bracket notation" we can extract on the "id" we need?
// const Square = ({id}) => {
//   return <button>{id}</button>
// };
// now adding "h1" styling:

var palet = ['red', 'blue', 'green'];
var xo = ["O", "X"];

const Square = (props) => {
    console.log('Square re-rendering now.');
    const [squareBelongToPlayer, setSquareBelongToPlayer] = React.useState(null);
  
    // const palet = ['red', 'blue', 'green'];
    
    // ATTENTION to the way of using "{}" demands a "return":
    // const getRandomColor = () => {
    //   return palet[Math.floor(Math.random() * palet.length)]
    // };
    // while without the "{}" in a more simplified way, the "return" word is unnecessary:
    const getRandomColor = () => palet[Math.floor(Math.random() * palet.length)];
  
    // keep track of state of the square
    const [color, setColor] = React.useState('green');

    React.useEffect( () => {
        console.log(`useEffect showing Render ${props.id}`);
        return () => console.log(`unmounting Square ${props.id}`);
      }) 
      
    // if (squareBelongToPlayer === null) {
    //     background-color: green;
    // }

    return <button
      onClick={ (e) => {
        // e.target.style.background = "red";
        // e.target.style.background = getRandomColor();
  
        // another way now using new color state:
        //setColor(getRandomColor());
        //e.target.style.background = color;
        if (squareBelongToPlayer === null) {
            // player can claim this square:
            setSquareBelongToPlayer(props.player);
            setColor(palet[props.player]);
            e.target.style.background = palet[props.player];
            let nextPlayer = props.alertParentIveBeenClick(props.id, props.player);
            // if (nextPlayer == null) {
            //     alert(`Game is Over`)
            // }
        } else {
            if (props.player === null) {
                alert(`Game is Over`)
                } else {
                alert(`This square already belongs to ${xo[squareBelongToPlayer]}`)
                }
        }
      } }><h1>{xo[squareBelongToPlayer]}</h1>
      </button>
  };
  
  
  const Board = () => {
    console.log('Board re-rendering now.');
    // is not enough for "player" to be a variable, because even though it gets a new value
    // the shadow dom will not be "aware" and therefore will not render changes
    const [player, setPlayer] = React.useState(0);
    const [status, setStatus] = React.useState(`Player's ${xo[player]} turn`);

    const [activeSquare, setActiveSquare] = React.useState(null);

    const [gameState, setGameState] = React.useState(Array(9).fill(null));
    const [gameOver, setGameOver] = React.useState(false);

    // Note that Child (Square Component) calls this function
    // However the function has access to the player held here
    const takeTurn = (id) => {
       if (!gameOver) { 
        console.log(`The previous Board gameState ${JSON.stringify(gameState)}`);
        gameState[id] = player;
        console.log(`The NEW Board gameState ${JSON.stringify(gameState)}`);
        
        let winner = checkWinner(gameState);

        // if (winner != null) {
        //     alert(`Game is Over`)
        // }
    
       console.log(`Status of the Board = ${status}`);

        if (winner != null) {
            setGameOver(true);
            setPlayer(null);
            setStatus(`GAME OVER: Player ${xo[winner]} won !`);
            // if (winner != null) {
            //     alert(`Game is Over`)
            //     }
            return null;
            } else { 
            let nextPlayer = (player + 1) % 2;
            setGameState(gameState);
            console.log(`takeTurn from player ${player} to player ${nextPlayer}`);
            setPlayer(nextPlayer); 
            setStatus(`Player's ${xo[nextPlayer]} turn`);
            return nextPlayer;
            };
        }
    };    
    
    function renderSquare(i) {
      return (
      <Square
       id={i}
       player={player}
       alertParentIveBeenClick={alertParentIveBeenClick}>
       </Square>);
    }

    // video 16-8: my solution to the child (Square) communicate
    // to the parent (board) is a callbackfunction
    // which will set the state of "activeSquare" on the Board
    const alertParentIveBeenClick = (squareId, playerId) => {
       setActiveSquare(squareId);
       //alert(`Child Square ${squareId} communicated it has been clicked on!`);
       console.log(`Child Square ${squareId} communicated it has been clicked on by player ${playerId}!`);

       if (playerId === null) {
            alert(`Game is Over`)
            }

       // since a Square was click, we need to automatically chenge player:
       let nextPlayer = takeTurn(squareId);
       // who will be next player
       if (nextPlayer !== null) {
            return nextPlayer;
       } else {
            return null;
       }
    }

    return (
      <div
        className="game-board"
        // onClick={ e => {
        //   // the player need to be 0 or 1
        //   // through "mod"
        //   setPlayer( (player + 1) % 2  ); 
        //   status = `Player ${player}`;
        //   // setting style within the onClick event:
        //   e.target.style.backgroud = "red";
        //   e.target.style.width = 400;
        // }}
      >

        {/* conditional if TRUE only: */}
        {/* {mounted && renderSquare(0)} */}
        
        {/* Conditional (ternary) operator in javascript */}
        {/* {mounted ? renderSquare(0) : console.log('unmounting 0')} */}
        {/* {mounted ? renderSquare(1) : console.log('unmounting 1')} */}
        {/* {mounted ? renderSquare(2) : console.log('unmounting 2')} */}

        <div className="grid-row">
          {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
        </div>
        <div className="grid-row">
          {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
        </div>
        <div className="grid-row">
          {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
        </div>
        
        <div id="info">
          <h1>{status}</h1>
          <button onClick={() => {
                    let manualNextPlayer = takeTurn();
                    console.log(`Player was manually changed to ${xo[manualNextPlayer]}`);
                    }}>Change Player</button>
        </div>
      </div>
    );
  };

  const Game = () => {
    return (
      <div className="game">
        <Board></Board>
      </div>
    );
  };
  
  // ========================================
  
  ReactDOM.render(<Game/>, document.getElementById("root"));
  