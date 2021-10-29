//      REACT JS 

const PROJECTNAME = "mnk17arts' Drum Machine";

const bank1 =  [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const bank2 = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }
  // PLAY SOUND
  playSound() {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    //sound.volume = this.props.vol
    sound.play();
    const txt = this.props.clipId.replace(/-/g, ' ');
    console.log(txt);
    this.props.Display(txt);
  }
  render() {
    return (
      <div
        className='drum-pad'
        id={this.props.clipId}
        onClick={this.playSound}
        >
        <audio
          className='clip'
          id={this.props.keyTrigger}
          src={this.props.clip}
        />
        {this.props.keyTrigger}
      </div>
    );
  }
}

class PadBank extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let padBank;
    if (this.props.power) {
      padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
        return (
          <DrumPad
            bank={this.props.currentPadBank}
            clip={padBankArr[i].url}
            clipId={padBankArr[i].id}
            keyCode={padBankArr[i].keyCode}
            keyTrigger={padBankArr[i].keyTrigger}
            power={this.props.power}
            Display={this.props.Display}
            vol = {this.props.clipVolume}
          />
        );
      });
    } else {
      padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
        return (
          <DrumPad
            bank={this.props.currentPadBank}
            clip='#'
            clipId={padBankArr[i].id}
            keyCode={padBankArr[i].keyCode}
            keyTrigger={padBankArr[i].keyTrigger}
            power={this.props.power}
            Display={this.props.Display}
            vol = {this.props.clipVolume}
          />
        );
      });
    }
    return <div className='pad-bank'>{padBank}</div>;
  }
}

class Mnk17arts extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      displaytxt : "mnk17arts",
      bankB : true,
      powerB : true,
      volValue : 0.5
    }
    this.handleBankClick = this.handleBankClick.bind(this);
    this.handlePowerClick = this.handlePowerClick.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
    this.displayClipName = this.displayClipName.bind(this);

  }
  // BANK ONE OR TWO
  handleBankClick(){
    if(this.state.powerB){
    this.setState({
      bankB : !this.state.bankB,
      displaytxt : this.state.bankB?"Piano Kit":"Heater Kit"
          });
      setTimeout(() => this.clearDisplay(), 1000);
    }
  }
  // POWER ON OR OFF
  handlePowerClick(){
    this.setState({
      powerB : !this.state.powerB,
      displaytxt : this.state.powerB?"Power Off":"Power On"      
    });
    setTimeout(() => this.clearDisplay(), 1000);
  }
  // VOLUME CONTROL
  adjustVolume(e) {
    if (this.state.powerB) {
      this.setState({
        volValue: e.target.value,
        displaytxt: 'Volume: ' + Math.round(e.target.value * 100)
      });
      setTimeout(() => this.clearDisplay(), 1000);
    }
  }
  // CLEAR DISPLAY
  clearDisplay() {
    this.setState({
      displaytxt: String.fromCharCode(160)
    });
  }
  // DISPLAY TEXT
  displayClipName(e) {
    if (this.state.powerB) {
      this.setState({
        displaytxt: e
      });
      setTimeout(() => this.clearDisplay(), 1500);
    }
  }

  
  render(){
    const bank = this.state.bankB ? bank1 : bank2;
    const powerS = this.state.powerB ? {float: 'right'}:{float: 'left'};
    const bankS = this.state.bankB ? {float: 'right'}:{float: 'left'};
    {const clips = [].slice.call(document.getElementsByClassName('clip'));
clips.forEach(sound => {
  sound.volume = this.state.volValue;
});}
    return(
      <div id="drum-machine" className="boxs">
        <div className="box box1">
        <PadBank
          clipVolume={this.state.valVolume}
          currentPadBank={bank}
          power={this.state.powerB}
          Display={this.displayClipName}
        />
        </div>
        <div className="box box2">
          <div id="display" className="">{this.state.displaytxt}</div>
          <div id="controls">
            <div className='control'>
            <p>Power <i className="fa fa-power-off"/></p>
            <div className='select' onClick={this.handlePowerClick}>
              <div className='inner' style={powerS} />
            </div>
          </div>
            <div className='control'>
            <p>Bank <i className="fa fa-exchange"/></p>
            <div className='select' onClick={this.handleBankClick}>
              <div className='inner' style={bankS} />
            </div>
          </div>
          </div>
          <div id="volume">
            <input
              max='1'
              min='0'
              onChange={this.adjustVolume}
              step='0.05'
              type='range'
              value={this.state.volValue}
              />
          </div>
        </div>
      </div>
    )
  }
}


ReactDOM.render(<Mnk17arts/>,document.getElementById('i-app'));