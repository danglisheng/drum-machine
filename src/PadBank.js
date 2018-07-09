import React from 'react';
import DrumPad from './DrumPad';
function PadBank(props) {
  const padBank = props.currentPadBank.map((drumObj) => {
          return (
            <DrumPad
              key={drumObj.id}
              drumObj={drumObj}
              updateDisplay={props.updateDisplay}
              power={props.power}
            />
          );
        });
  return <div className="pad-bank">{padBank}</div>;
}
export default PadBank;
