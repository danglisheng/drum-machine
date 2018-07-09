import React from "react";
function ControlPanel(props) {
  const powerSlider = props.power
    ? {
        float: "right"
      }
    : {
        float: "left"
      };
  const bankSlider =
    props.currentPadBank.bankId === "Heater音色包"
      ? {
          float: "left"
        }
      : {
          float: "right"
        };
  return (
    <div className="controls-container">
      <div className="control power-control clearfix">
        <p>电源开关</p>
        <div
          onClick={props.powerControl}
          className="select"
          style={
            props.power
              ? { backgroundColor: "red" }
              : { backgroundColor: "black" }
          }
        >
          <div style={powerSlider} className="inner" />
        </div>
      </div>
      <p id="display">{props.display}</p>
      <div className="volume-slider">
        <p>音量:{Math.round(props.sliderVal * 100)}</p>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={props.sliderVal}
          onChange={props.adjustVolume}
        />
      </div>
      <div className="control kit-wrapper">
        <div className="kit-wrapper-controller clearfix">
          <p>音色包</p>
          <div onClick={props.selectBank} className="select">
            <div style={bankSlider} className="inner" />
          </div>
        </div>
        <div className="kit-name">{props.currentPadBank.bankId}</div>
      </div>
    </div>
  );
}

export default ControlPanel;
