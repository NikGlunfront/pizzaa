import React, { FC } from 'react';
import { Cell } from '../models/Cell';

interface CellProps {
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void;
}

const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
    return (
        <div
            className={['cell', cell.color, selected && cell.figure?.logo ? "selected" : '', cell.figure?.logo ? "with-figure" : "", cell.available && cell.figure ? 'to-eat' : ''].join(' ')}
            onClick={() => click(cell)}
        >
            {cell.figure?.logo && <img src={cell.figure.logo} alt='fig' />}
            {!cell.figure && cell.available && <div className='available'></div>}
        </div>
    );
};

export default CellComponent;