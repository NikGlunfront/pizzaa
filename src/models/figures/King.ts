import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from '../../assets/black-king.svg';
import whiteLogo from '../../assets/white-king.svg';

export class King extends Figure {

	constructor(color: Colors, cell: Cell) {
        super(color, cell);

        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;

	}

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false
        }

        const isAbsX = Math.abs(this.cell.x - target.x) < 2
        const isAbsY = Math.abs(this.cell.y - target.y) < 2
        
        if (isAbsX && isAbsY) {
            return true;
        }

        return false;
    }
    
}