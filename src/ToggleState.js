import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import {GAME_STATE} from './GameState.js';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import './ToggleState.css';

function ToggleGameState({gameState, setGameState, setSize, setTotalTime}) {
  
  const [buttonText, setButtonText] = useState("Start a new game!");
  const [startTime, setStartTime] = useState(0);
  let deltaTime;

  function updateGameState(endTime) {
    
    if (gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) {
      setStartTime(Date.now());
      setGameState(GAME_STATE.IN_PROGRESS);
      setButtonText("End game :(");
    } else if (gameState === GAME_STATE.IN_PROGRESS) {
      deltaTime = (endTime - startTime)/ 1000.0;
      setTotalTime(deltaTime); 
      setGameState(GAME_STATE.ENDED);
      setButtonText("Start a new game");
    }
  }
  
  const handleChange = (event) => {
    setSize(event.target.value);
  };
  
  return (
    <div className="Toggle-game-state">
      <Button variant="outlined" onClick={() => updateGameState(Date.now())}>
        {buttonText}
      </Button>

      { (gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED)  &&
        <div className="Input-select-size">
        <FormControl>
       
        <Select
          labelId="sizelabel"
          id="sizemenu"
        
       
          onChange={handleChange}>
            
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
       
        </Select>
        <FormHelperText>Set Grid Size</FormHelperText>
        </FormControl>
       
       </div>
      }
    </div>
  );
}

export default ToggleGameState;