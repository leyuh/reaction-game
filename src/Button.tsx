import React from 'react';

export const Button: React.FC<{ color : string }> = ({color}) => {
    return (
        <div className="button">
            {color}
        </div>
    );
}