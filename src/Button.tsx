import React, { Dispatch, SetStateAction } from 'react';

export const Button: React.FC<{ color : string, plrsTurn: boolean, toggled: string | null, setToggled: Dispatch<SetStateAction<(string | null)>>, setPlrSequence: Dispatch<SetStateAction<(string[])>>}> = ({color, plrsTurn, toggled, setToggled, setPlrSequence}) => {

    const interval = (time: number) => {
        return new Promise(r => setTimeout(r, time));
    }

    async function unToggle () {
        await interval(375);
        setToggled(null);
    }

    return (
        <div className="button" style={{"backgroundColor": (toggled == color) ? color : ""}} onClick={() => {
            if (plrsTurn) {
                setToggled(color);
                setPlrSequence((prev) => {
                    return [...prev, color];
                })
                unToggle();
            }
        }}>
            <div className="button-interior" style={{"backgroundColor": color}}></div>
        </div>
    );
}