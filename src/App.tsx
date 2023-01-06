import React, { useEffect, useState } from 'react';
import { Button } from './Button';

const App: React.FC = () => {

  const buttonColors: string[] = ["red", "yellow", "green", "blue"];

  const [plrsTurn, setPlrsTurn] = useState<boolean>(false);
  const [sequence, setSequence] = useState<string[]>([]);
  const [plrSequence, setPlrSequence] = useState<string[]>([]);
  const [toggled, setToggled] = useState<string | null>(null);

  useEffect(() => {
    if (!plrsTurn) {
      toggleSequence();
    }
  }, [plrsTurn])

  const toggleSequence = (): void => {

    for (let i = 0; i < sequence.length; i++) {
      setToggled(sequence[i]);
      setTimeout(function() {
        setToggled(null);
      }, 1000)
    }

    let random = buttonColors[Math.floor(Math.random()*buttonColors.length)];

    setToggled(random);
    setTimeout(function() {
      setToggled(null);
    }, 1000)

    setSequence((prev: string[]) => {
      return [...prev, random];
    })
    setPlrsTurn(true);
  }

  return (
    <div id="app">
      {buttonColors.map((val: string, i : number) => {
        return <Button
          color={val}
          plrsTurn={plrsTurn}
          toggled={toggled}
          key={i}/>
      })}
    </div>
  );
}

export default App;
