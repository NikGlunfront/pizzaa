import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from '../../assets/black-knight.svg';
import whiteLogo from '../../assets/white-knight.svg';

export class Knight extends Figure {

	constructor(color: Colors, cell: Cell) {
        super(color, cell);

        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KNIGHT;

	}

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false
        }

        const absX = Math.abs(this.cell.x - target.x)
        const absY = Math.abs(this.cell.y - target.y)
        const difXY = [1,2]

        if (difXY.includes(absX) && difXY.includes(absY) && absX !== absY) {
            return true;
        }

        return false
    }
    
}