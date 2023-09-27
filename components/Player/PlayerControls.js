import React,{useState,useRef,forwardRef} from "react";
import Link from "next/link";
import { Grid, IconButton } from "@mui/material";
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
  const controlsWrapper =  {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "row",
    color: '#ccc',
    zIndex: 1,
    margin: '0px 0%',
    padding: '10px',
  }

  const bottomIcons = {
    color: "#ccc",
    bottom: '45%',
    left:'25%',
    right:'25%',
    display:'inline-flex',
    position:'absolute',
    width: '50%',
    alignContent:'center',
    justifyContent:'center'
  }
  function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
      <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    );
  }
  
  ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    value: PropTypes.number.isRequired,
  };
const PrettoSlider = styled(Slider)({
  color: 'goldenrod',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 18,
    background: 'unset',
    padding: 0,
    width: 70,
    height: 50,
    borderRadius: '0% 0% 0% 0',
    backgroundColor: 'goldenrod'
  },
});


const PlayerControls = forwardRef(({
  onPlayPause,
  playing,
  onforward,
  onbackward,
  onmute,
  muted,
  volume,
  onVolumeChange,
  elapsedTime,
  totalDuration,
  onChangeDispayFormat,
  onplaybackratechange, 
  onToggleFullScreen,
  played,
  onSeek,
  onTrack,
  onSeekMouseDown,
  onVolumeSeekDown,
  onSeekMouseUp,
  playbackRate,
  Buffer,
  title,
  onQuality,
  onPip,
  playerRef,
  contentId,
  upcoming,
  contentTitle,
  episode
},ref) => {
  const rate = [0.5,1.0,1.5,2.0]
  const [track,settrack]=useState(0)
  const [trackop,settrackop]=useState([])
  const arr=[]
  const [options,setoptions]=useState(false)
  const [checked, setChecked] = useState(false);
  const [qualityop,setQualityop]=useState([]);
  const [quality,setquality]=useState(-1)
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  //popover playback rate
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangeQuality = (event) => {
    setquality(event.target.value);
    //console.log(event.target.value)
  };
  const handleTrackChange=(e)=>{
    settrack(e.target.value);
    //Track(e.target.value)
  }
  const handlePlayer=()=>{
    var hls = playerRef.current.getInternalPlayer('hls');
    //console.log(hls)
    var alllevel = hls.levels ;
    var subtitles = hls.subtitleTracks;
    const curr_qual = hls.currentLevel
    const currentsub = hls.subtitleTrack;
    //setQualityop(alllevel)
    alllevel.map((x,index)=>{
      if(x.height === 240){
        arr.push({
          name:'Ultra Low',
          value:index
        })
      }
      else if(x.height === 320){
        arr.push({
          name:'Low',
          value:index
        })
      }
      else if(x.height === 480){
        arr.push({
          name:'Medium',
          value:index
        })
      }
      else if(x.height === 720){
        arr.push({
          name:'High',
          value:index
        })
      }
      else if(x.height === 1080){
        arr.push({
          name:'HD+',
          value:index
        })
      }
    })
    setQualityop(arr) 
    settrackop(subtitles)
    
  }




  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [options1,setoptions1]=useState(false);
  return (
    <>
    <div ref={ref}>
    <div style={controlsWrapper}>
    { upcoming ? 
    <Link href={'/upcoming' }><i className="fa fa-angle-left"></i> </Link>:
    episode ? <Link href={'/contents/'+ contentTitle }><i className="fa fa-angle-left"></i> </Link>:<Link href={'/contents/'+ title }><i className="fa fa-angle-left"></i> </Link>} 

     <h2> {title} </h2>
     {options ? 
      <div className="container options">
      <div className="row">
        <div className="col-md-6">
          <p>Subtitles</p>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={track}
            onChange={handleTrackChange}
          >
             <ul>
              {trackop.map((x,index)=>{
                return(
                  <li key={index}><FormControlLabel value={index} control={<Radio />} label={x.name} /></li>
                )
              })}
              {/*<li><FormControlLabel value="en" control={<Radio />} label="English" /></li>
              <li><FormControlLabel value="hi" control={<Radio />} label="Hindi" /></li>*/}
              
             </ul>
          </RadioGroup>
        </div>
        <div className="col-md-6">
          <p>Quality</p>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={quality}
            onChange={handleChangeQuality}
          >
             <ul>
             <li><FormControlLabel value={-1} control={<Radio />} label="AUTO"/></li>
              {qualityop.map((x,index)=>{
                return(
                    <li key={index}><FormControlLabel value={x.value} control={<Radio />} label={x.name} /></li>
                )
                
              })}
              
            
             </ul>
          </RadioGroup>
          
        </div>
        <button type="button" onClick={()=> {onQuality(quality , track);setoptions(false)}} >Done</button>
      </div>
      </div>
      :
      ''}
    </div>

    <div style={bottomIcons}>
    {Buffer ? 
      <CircularProgress />
    :
    <>
    <i className="fa fa-backward" onClick={onbackward}></i>
    {playing ? <i className="fa fa-pause" onClick={onPlayPause}></i>:<i className="fa fa-play"  onClick={onPlayPause}></i>}
    <i className="fa fa-forward" onClick={onforward}></i>
    </>
  }
    
    </div>

    <Grid container direction="row" justify="space-between" alignItems={'center'} style={{'height':'100px','padding':'0px 10px 0px 10px','position':'absolute','bottom':'0','backgroundColor': 'rgba(0,0,0,0.6)'}}>
      <Grid item xs={12} style={{'margin':'0px 10px'}}>
        <PrettoSlider
          min={0}
          max={100}
          valueLabelDisplay="off"
          aria-label="custom thumb label"
          value={played * 100}
          onChange={onSeek}
          onMouseDown={onSeekMouseDown}
          onChangeCommitted={onSeekMouseUp}
        />
      
        
        {/*bottom navigation file
        components={{
            ValueLabel: (props) => (
              <ValueLabelComponent {...props} value={elapsedTime} />
            )
          }}
        
        */}
        <div className="bottom container">
          <p> {elapsedTime} / {totalDuration} </p>
         

         {/*<Slider
                  min={0}
                  max={100}
                  value={muted ? 0 : volume * 100}
                  onChange={onVolumeChange}
                  aria-labelledby="input-slider"
                  className="volumeslider"
                  onMouseDown={onSeekMouseDown}
                  onChangeCommitted={onVolumeSeekDown}
          />*/}

         <div className="spacer"></div>
         
         {/*<Grid item >
              <Button
                onClick={handleClick}
                aria-describedby={id}
                variant="text"
              >
                <Typography>{playbackRate}X</Typography>
              </Button>

              <Popover
                open={open}
                id={id}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Grid container direction="column-reverse">
                  {[0.5, 1, 1.5, 2].map((rate) => (
                    <Button
                      key={rate}
                      //   onClick={() => setState({ ...state, playbackRate: rate })}
                      onClick={() => onplaybackratechange(rate)}
                      variant="text"
                    >
                      <Typography
                        color={rate === playbackRate ? "secondary" : "inherit"}
                      >
                        {rate} x
                      </Typography>
                    </Button>
                  ))}
                </Grid>
              </Popover>
                  </Grid>*/}
        
        <div className={ options1 ? "playback_options":"playback_options hide"}>
        {[0.5, 1, 1.5, 2].map((rate,index) => (
          <li key={index} onClick={() => {onplaybackratechange(rate);setoptions1(!options1)}}> {rate}x </li>
        ))}
        </div>
        
        <p className="playback" onClick={() => setoptions1(!options1)}>{playbackRate}X</p>
        {muted ?<i className="fa fa-volume-mute" onClick={onmute}></i> : <i className="fa fa-volume-up" onClick={onmute}></i> }
         <i className="fa fa-sliders-h" onClick={()=> {handlePlayer();setoptions(!options)}}></i>
         <i className="fa fa-compress-alt" onClick={onPip}></i>  
         <i className="fas fa-expand" onClick={onToggleFullScreen}></i>  
      </div>
      </Grid>
    </Grid>  
    </div>
    </>
    
  )
});
export default PlayerControls