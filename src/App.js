import React, { Component } from "react";
import "./App.css";
import PadBank from "./PadBank";
import ControlPanel from "./ControlPanel"
const bankOne = [
  {
    keyTrigger: "Q",
    id: "Heater-1",
    url: "./drums/Heater-1.mp3"
  },
  {
    keyTrigger: "W",
    id: "Heater-2",
    url: "./drums/Heater-2.mp3"
  },
  {
    keyTrigger: "E",
    id: "Heater-3",
    url: "./drums/Heater-3.mp3"
  },
  {
    
    keyTrigger: "A",
    id: "Heater-4",
    url: "./drums/Heater-4_1.mp3"
  },
  {
    
    keyTrigger: "S",
    id: "击掌声",
    url: "./drums/Heater-6.mp3"
  },
  {
    
    keyTrigger: "D",
    id: "开击踩镲",
    url: "./drums/Dsc_Oh.mp3"
  },
  {
    
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "./drums/Kick_n_Hat.mp3"
  },
  {
    
    keyTrigger: "X",
    id: "踢蹬声",
    url: "./drums/RP4_KICK_1.mp3"
  },
  {
    
    keyTrigger: "C",
    id: "闭击踩镲",
    url: "./drums/Cev_H2.mp3"
  }
];
bankOne.bankId = "Heater音色包";
const bankTwo = [
  {
    keyTrigger: "Q",
    id: "和弦-1",
    url: "./drums/Chord_1.mp3"
  },
  {
    keyTrigger: "W",
    id: "和弦-2",
    url: "./drums/Chord_2.mp3"
  },
  {
    keyTrigger: "E",
    id: "和弦-3",
    url: "./drums/Chord_3.mp3"
  },
  {
    keyTrigger: "A",
    id: "铁沙铃",
    url: "./drums/Give_us_a_light.mp3"
  },
  {
    keyTrigger: "S",
    id: "开击踩镲",
    url: "./drums/Dry_Ohh.mp3"
  },
  {
    keyTrigger: "D",
    id: "闭击踩镲",
    url: "./drums/Bld_H1.mp3"
  },
  {
    keyTrigger: "Z",
    id: "猛踢声",
    url: "./drums/punchy_kick_1.mp3"
  },
  {
    keyTrigger: "X",
    id: "侧击声",
    url: "./drums/side_stick_1.mp3"
  },
  {
    keyTrigger: "C",
    id: "军鼓",
    url: "./drums/Brk_Snr.mp3"
  }
];
bankTwo.bankId = "圆润钢琴声音色包";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      display: "电子鼓已开启", 
      currentPadBank: bankOne,
      sliderVal: 0.3
    };
    this.displayClipName = this.displayClipName.bind(this);
    this.selectBank = this.selectBank.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
    this.powerControl = this.powerControl.bind(this);
  }
  powerControl() {
    /* 若开机状态按了电源按钮，则关机,清空显示*/
    if(this.state.power){
      this.setState({
      power: false,
      display: String.fromCharCode(160) //显示空格
      });
    }
    else {
      this.setState({
      power: true,
      display: "电子鼓已开启"
      });
    }
    
  }
  /*切换音色包*/
  selectBank() {
    /* 电源打开才能切换音色包*/
    if (this.state.power) {
      this.state.currentPadBank.bankId === "Heater音色包"
        ? this.setState({
            currentPadBank: bankTwo,
          })
        : this.setState({
            currentPadBank: bankOne,
          });
    }
  }
  /* 显示正在播放的音乐片段名*/
  displayClipName(name) {
   this.setState({
        display: name
      });
  }
  adjustVolume(e) {
    /*电源开启才能调整音量*/
    if (this.state.power) {
      this.setState({
        sliderVal: e.target.value,
       });
      }
  }
  
  render() {
    
    
    {
      const clips = [].slice.call(document.getElementsByClassName("clip"));
      clips.forEach(audio => {
        audio.volume = this.state.sliderVal;
      });
    }
    return (
      <div id="drum-machine" className="inner-container">
        <PadBank
          power={this.state.power}
          updateDisplay={this.displayClipName}
          clipVolume={this.state.sliderVal}
          currentPadBank={this.state.currentPadBank}
        />
        <ControlPanel 
          powerControl={this.powerControl}
          power={this.state.power}
          currentPadBank={this.state.currentPadBank}
          display={this.state.display}
          sliderVal={this.state.sliderVal}
          adjustVolume={this.adjustVolume}
          selectBank={this.selectBank}
        />


        
      </div>
    );
  }
}
export default App;
