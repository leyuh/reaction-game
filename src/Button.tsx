import React from 'react';

export const Button: React.FC<{ color : string, plrsTurn: boolean, toggled: string | null }> = ({color, plrsTurn, toggled}) => {

    return (
        <div className="button" style={{"backgroundColor": (toggled == color) ? color : ""}}>
        </div>
    );
}