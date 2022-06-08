import React, { useEffect, useState } from 'react';
import './App.css';
import Background from './components/background/Background';
import BoardComponent from './components/BoardComponent';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';

function App() {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    const [isWhiteUnderAttack, setIsWhiteUnderAttack] = useState<boolean>(false)
    const [isBlackUnderAttack, setIsBlackUnderAttack] = useState<boolean>(false)

    

    useEffect(() => {
        restart()
    }, [])

    useEffect(() => {
        setIsWhiteUnderAttack(board.isWhiteKingUnderAttack)
        setIsBlackUnderAttack(board.isBlackKingUnderAttack)
    },[board.isWhiteKingUnderAttack, board.isBlackKingUnderAttack])

    function restart() {
        const newBoard = new Board();
        newBoard.initCell()
        newBoard.addFigures()
        setBoard(newBoard)
        setCurrentPlayer(whitePlayer)
    }
    
    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

  return (
    <div className="app">
        {/* <Background /> */}
        <BoardComponent 
            board={board} 
            setBoard={setBoard}
            swapPlayer={swapPlayer}
            currentPlayer={currentPlayer}
            isBlackUnderAtk={isBlackUnderAttack}
            isWhiteUnderAtk={isWhiteUnderAttack}
        />
        <div className='info-block'>
            <Timer 
                currentPlayer={currentPlayer}
                restart={restart}
            />
            <div className="lost-figures-row">
            <LostFigures 
                title='Потери белых:'
                figures={board.lostWhiteFigures}
            />
            <LostFigures 
                title='Потери черных:'
                figures={board.lostBlackFigures}
            />
        </div>
        </div>
    </div>
  );
}

export default App;
