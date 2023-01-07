import React, { useEffect, useState } from 'react';
import { Button } from './Button';

const App: React.FC = () => {

  const buttonColors: string[] = ["red", "yellow", "green", "blue"];

  const [plrsTurn, setPlrsTurn] = useState<boolean>(false);
  const [sequence, setSequence] = useState<string[]>([]);
  const [plrSequence, setPlrSequence] = useState<string[]>([]);
  const [toggled, setToggled] = useState<string | null>(null);
  const [lvl, setLvl] = useState<number>(1);

  async function colorApp (color: string) {
    let app: (HTMLElement | null) = document.getElementById("app")
    if (app != null) {
      
      app.style.backgroundColor = color;
      await interval(375);
      app.style.backgroundColor = "white";
    }
  
  }

  const interval = (time: number) => {
    return new Promise(r => setTimeout(r, time));
  }

  async function loopThroughSequence (seq: string[], newVal: string) {
    await interval(1250);
    for (let i = 0; i < seq.length; i++) {
      setToggled(seq[i]);
      await interval(375);
      setToggled(null);
      await interval(375);
    }

    setSequence((prev: string[]) => {
      return [...prev, newVal];
    })
    setPlrsTurn(true);
  }

  // when player's turn is over, toggle next sequence
  useEffect(() => {
    if (!plrsTurn) {
      toggleSequence();
    }
  }, [plrsTurn])

  // when plr sequence updates, check if it is equal to sequence. if so, next round
  useEffect(() => {
    if (plrSequence.length > 0) {
      let equal: boolean = true;
      if (plrSequence.length != sequence.length) {
        equal = false;
      }
      if (equal) {
        for (let i = 0; i < sequence.length; i++) {
          if (sequence[i] != plrSequence[i]) {
            equal = false;
          }
        }
      }

      if (equal) {
        console.log("correct!");
        setLvl((prev) => {
          return prev + 1;
        });
        colorApp("green");
        setPlrsTurn(false);
      } else {
        let equal: boolean = true;
        for (let i = 0; i < plrSequence.length; i++) {
          if (plrSequence[i] != sequence[i]) {
            equal = false;
          }
        }
        if (!equal) {
          console.log("incorrect!");
          setLvl(1);
          colorApp("red");
          setSequence([]);
          setPlrsTurn(false);
        }
      }
    }
  }, [plrSequence])

  const toggleSequence = (): void => {

    setPlrSequence([]);

    let random = buttonColors[Math.floor(Math.random()*buttonColors.length)];
    let tempSeq = [...sequence, random];
    console.log(tempSeq);

    loopThroughSequence(tempSeq, random);
  }

  return (
    <div id="app">
      <h1 id="score">{lvl}</h1>
      {buttonColors.map((val: string, i : number) => {
        return <Button
          color={val}
          plrsTurn={plrsTurn}
          toggled={toggled}
          setToggled={setToggled}
          setPlrSequence={setPlrSequence}
          key={i}/>
      })}
    </div>
  );
}

export default App;
