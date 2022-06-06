import React, { FC } from 'react';
import { Figure } from '../models/figures/Figure';

interface LostFiguresProps {
    title: string,
    figures: Figure[]
}

const LostFigures: FC<LostFiguresProps> = ({figures, title}) => {
    return (
        <div className='lost'>
            <h3>{title}</h3>
            <div className="lost__figures">
                {figures.map(figure =>
                    <div className='lost-figure'
                        key={figure.id}
                    >
                        {figure.name} {figure.logo && <img src={figure.logo} alt='fig' />}
                    </div>    
                )}
            </div>
        </div>
    );
};

export default LostFigures;