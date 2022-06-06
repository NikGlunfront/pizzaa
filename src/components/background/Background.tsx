import React from 'react';

const Background = () => {
    const bubbles = []

    function randomInteger(min: number, max: number): string {
        // получить случайное число от (min-0.5) до (max+0.5)
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand).toString();
      }
    
    for (let i = 0; i < 30; i++) {
        bubbles.push(randomInteger(10, 30))
    }
    return (
        <div className='background'>
            <div className='bubbles'>
                {bubbles.map(num => 
                    <span style={{animationDuration: `calc(125s / ${num})`}}></span>    
                )}
            </div>
        </div>
    );
};

export default Background;