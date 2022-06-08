import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { Figure, FigureNames } from "./figures/Figure";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";

export class Board {
    cells: Cell[][] = []
    lostWhiteFigures: Figure[] = []
    lostBlackFigures: Figure[] = []
    isWhiteKingUnderAttack:boolean = false
    isBlackKingUnderAttack:boolean = false


    public initCell() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 !== 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null)) // Черные ячейки
                } else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null)) // Белые ячейки
                }
            }

            this.cells.push(row)
        }
    }

    public getCell(x: number, y: number) {
        return this.cells[y][x]
    }

    public highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i]
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.available = !!selectedCell?.figure?.canMove(target)
                
            }          
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board()
        newBoard.lostBlackFigures = this.lostBlackFigures
        newBoard.lostWhiteFigures = this.lostWhiteFigures
        newBoard.isBlackKingUnderAttack = this.isBlackKingUnderAttack
        newBoard.isWhiteKingUnderAttack = this.isWhiteKingUnderAttack
        newBoard.cells = this.cells
        newBoard.cells.forEach(x => x.forEach(y => y.board = newBoard))
        return newBoard;
    }

    private addPawns() {
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.BLACK, this.getCell(i, 1) )     
            new Pawn(Colors.WHITE, this.getCell(i, 6) )     
        }
    }
    private addKings() {
        new King(Colors.BLACK, this.getCell(4, 0) )     
        new King(Colors.WHITE, this.getCell(4, 7) ) 
    }
    private addQueens() {
        new Queen(Colors.BLACK, this.getCell(3, 0) )     
        new Queen(Colors.WHITE, this.getCell(3, 7) ) 
    }
    private addKnights() {
        new Knight(Colors.BLACK, this.getCell(1, 0) )     
        new Knight(Colors.BLACK, this.getCell(6, 0) ) 
        new Knight(Colors.WHITE, this.getCell(1, 7) )     
        new Knight(Colors.WHITE, this.getCell(6, 7) ) 
    }
    private addBishops() {
        new Bishop(Colors.BLACK, this.getCell(2, 0) )     
        new Bishop(Colors.BLACK, this.getCell(5, 0) ) 
        new Bishop(Colors.WHITE, this.getCell(2, 7) )     
        new Bishop(Colors.WHITE, this.getCell(5, 7) ) 
    }
    private addRooks() {
        new Rook(Colors.BLACK, this.getCell(0, 0) )     
        new Rook(Colors.BLACK, this.getCell(7, 0) ) 
        new Rook(Colors.WHITE, this.getCell(0, 7) )     
        new Rook(Colors.WHITE, this.getCell(7, 7) ) 
    }

    // public addFischerFigures() {} если другая расстановка и тд.

    public addFigures() {
        this.addBishops()
        this.addKings()
        this.addKnights()
        this.addPawns()
        this.addQueens()
        this.addRooks()
    }

    private getBlackKingCell() {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];

            for (let j = 0; j < row.length; j++) {
                let cell = this.cells[i][j];
                if (
                    cell.figure?.name === FigureNames.KING &&
                    cell.figure.color === Colors.BLACK
                ) {
                    return this.getCell(cell.x, cell.y);
                }
            }
        }

        return this.getCell(0, 0);
    }

    private getWhiteKingCell(): Cell {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];

            for (let j = 0; j < row.length; j++) {
                let cell = this.cells[i][j];
                if (
                    cell.figure?.name === FigureNames.KING &&
                    cell.figure.color === Colors.WHITE
                ) {
                    return this.getCell(cell.x, cell.y);
                }
            }
        }

        return this.getCell(0, 0);
    }

    private setBlackUnderAttack(isTrue: boolean) {
        this.isBlackKingUnderAttack = isTrue;
    }

    private setWhiteUnderAttack(isTrue: boolean) {
        this.isWhiteKingUnderAttack = isTrue;
    }

    public checkIsKingUnderAttack(current: Cell) {
        if (current.figure?.color === Colors.WHITE) {
            const currentBlackKingPosition: Cell = this.getBlackKingCell();
                this.setBlackUnderAttack(current.figure.canMove(currentBlackKingPosition));
                console.log(this.isBlackKingUnderAttack)
        }

        if (current.figure?.color === Colors.BLACK) {
            const currentWhiteKingPosition: Cell = this.getWhiteKingCell();
            this.setWhiteUnderAttack(current.figure.canMove(currentWhiteKingPosition));
                console.log(this.isWhiteKingUnderAttack)
        }
    }
    
}