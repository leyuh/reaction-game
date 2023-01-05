import React, { useState } from 'react';
import { Button } from './Button';

const App: React.FC = () => {

  const buttonColors: string[] = ["red", "yellow", "green", "blue"];

  const [level, setLvl] = useState<number>(1);
  const [plrsTurn, setPlrsTurn] = useState<boolean>(false);

  return (
    <div className="App">
      {buttonColors.map((val: string, i : number) => {
        return <Button color={val} key={i}/>
      })}
    </div>
  );
}

export default App;
