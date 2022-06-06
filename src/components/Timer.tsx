import React, { FC, useEffect, useRef, useState } from 'react';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
    const [whiteTimer, setWhiteTimer] = useState<number>(300)
    const [blackTimer, setBlackTimer] = useState<number>(300)

    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTimer()
    }, [currentPlayer])

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    function decrementBlackTimer() {
        if (blackTimer > 0) {
            setBlackTimer(prev => prev - 1)
        } else {
            setBlackTimer(0)
        }
    }

    function decrementWhiteTimer() {
        if (blackTimer > 0) {
            setWhiteTimer(prev => prev - 1)
        } else {
            setWhiteTimer(0)
        }
    }

    function restartGame() {
        restart()
        setWhiteTimer(300)
        setBlackTimer(300)
    }

    return (
        <div className='timer'>
            <button onClick={restartGame}>Начать заново</button>
            <div className='timer-colors'>
                <h2>Ход темных - {blackTimer}с</h2>
                <h2>Ход белых - {whiteTimer}с</h2>
            </div>
        </div>
    );
};

export default Timer;