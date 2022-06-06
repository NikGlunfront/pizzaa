import React, { FC, useEffect, useState } from 'react';
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';
import CellComponent from './CellComponent';

interface BoardComponentProps {
    board: Board;
    setBoard: (board: Board) => void;
    swapPlayer: () => void;
    currentPlayer: Player | null;
    isWhiteUnderAtk: boolean;
    isBlackUnderAtk: boolean;
}

const BoardComponent: FC<BoardComponentProps> = ({board, setBoard, currentPlayer, swapPlayer, isBlackUnderAtk, isWhiteUnderAtk}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell)
            swapPlayer()
            setSelectedCell(null)
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell)
            }
        }
    }

    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    function highlightCells() {
        board.highlightCells(selectedCell)
        updateBoard()
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }


    return (
        <div>
            <h3>Текущий игрок: {currentPlayer?.color === Colors.WHITE ? 'Белый' : 'Черный'}</h3>
            {isWhiteUnderAtk && <h3>Белому игроку поставлен "Шах"</h3>}
            {isBlackUnderAtk && <h3>Темному игроку поставлен "Шах"</h3>}
            <div className='board'>
                {board.cells.map((row, index) => 
                    <React.Fragment key={index}>
                        {row.map(cell => 
                            <CellComponent 
                                click={click}
                                cell={cell}
                                key={cell.id}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            />
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default BoardComponent;