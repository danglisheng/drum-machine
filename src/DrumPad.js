import React, { Component } from "react";
/* 定义按键激活样式 */
const activeStyle = {
  backgroundColor: "orange",
  boxShadow: "0 3px orange",
  marginTop: 13,
  height: 77
};

class DrumPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: {} //初始化按键样式为未激活样式
    };
    this.audio = React.createRef();
    this.playSound = this.playSound.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.activatePad = this.activatePad.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }
  handleKeyDown(e) {
    /* 若按下的键码等于触发动作的键码，则播放音乐*/
    if (e.keyCode === this.props.drumObj.keyTrigger.charCodeAt(0)) {
      this.playSound();
    }
  }
  activatePad() {
    if (this.props.power) {
      /*如果按键处于激活状态，则转为非激活态，反之亦然*/
      this.state.padStyle.marginTop === 13
        ? this.setState({
            padStyle: {}
          })
        : this.setState({
            padStyle: activeStyle
          });
    } else {
      this.state.padStyle.marginTop === 13
        ? this.setState({
            padStyle: {}
          })
        : this.setState({
            padStyle: {
              marginTop: 13,
              height: 77,
              boxShadow: "0 3px gray"
            }
          });
    }
  }
  playSound(e) {
    /*如果电源打开，则既播放音乐，又更改按键样式
     * 否则，只更改按键样式。
     */
    if (this.props.power) {
      const audio = this.audio.current;
      audio.currentTime = 0;
      audio.play();
      this.activatePad();
      setTimeout(() => this.activatePad(), 100);
      this.props.updateDisplay(this.props.drumObj.id.replace(/-/g, " "));
    } else {
    /* 改按键样式为激活状态，延时1s后，变为非激活*/
      this.activatePad();
      setTimeout(() => this.activatePad(), 100);
    }
  }
  render() {
    const {url,keyTrigger}=this.props.drumObj;
    return (
      <div
        onClick={this.playSound}
        className="drum-pad"
        style={this.state.padStyle}
        
      >
        <audio className="clip" ref={this.audio} src={url} />
        {keyTrigger}
      </div>
    );
  }
}
export default DrumPad;
