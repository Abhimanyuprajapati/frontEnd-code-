import React,{useRef,useState,useEffect} from "react";
import ReactPlayer from "react-player";
import PlayerControls from "./PlayerControls";
import screenfull from "screenfull";
import { useRouter } from "next/router";
import { useUserAuth } from "../../context/UserAuthContext";
import CryptoJS from "crypto-js";
const playback = process.env.NEXT_PUBLIC_CDN_PLAYBACK;
var count = 0;
function ReactPlay(props) {
  const router = useRouter();
  const {player} = useUserAuth();
  //const {player } = useUserAuth()
  //let {title} = useParams()
  //const search = new URLSearchParams(window.location.search)
  const playerRef = useRef()
  const playerContainerRef= useRef()
  const controlRef = useRef()
  const title = props.title;
  const type = props.type;
  const contentId = props.contentId;
  const episodeId = props.episodeId;
  const contentTitle = props.contentTitle;
  const userId = props.userId;
  const seekTime = props.seekTime;
  const path = props.path;
  const [hlsUrl,sethlsUrl]=useState('')
  const [trackLang, setTrackLang] = useState('');
  const [upcoming,setupcoming]=useState(false)
  const [episode,setepisode] = useState(false)
  const [finalDecrypted,setfinalDecrypted]=useState('random')
  var popping = localStorage.getItem('pop');
  const [loader,setloader]=useState(false)
  useEffect(()=>{
      //sethlsUrl(playback+ id + '/trailer_h264.smil/playlist.m3u8')
      // sethlsUrl(`${playback}${path}/avc/trailer.m3u8`)
      //watch_trailer()
      if(type === 'trailer'){
        setloader(false)
        sethlsUrl(`${playback}${path}/playlist.m3u8`)
      }else if(type === "movies"){
        setepisode(true)
        handleepisode();
      }
      else if(type === "episode"){
        setepisode(true)
        handleepisode();
      }else if(type === "upcoming"){
        setloader(false)
        sethlsUrl(`${playback}${path}/playlist.m3u8`)
        setupcoming(true)
      }
  },[])

  const [state,setstate] = useState({
    playing:true,
    muted:false,
    playbackRate:1.0,
    played:0,
    seeking:false,
    pip:false
  })

  const [buff,setBuff]=useState(false)
  const handleplaypause=()=>{
    setstate({...state, playing: !state.playing})
    const play = playerRef.current.getInternalPlayer()
  }
  const handleforward=()=>{
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10)
  }
  const handlebackward=()=>{
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10)
  }
  const handlemute=()=>{
    setstate({...state, muted:!state.muted})
  }

  const handleplaybackratechange=(rate)=>{
    setstate({...state, playbackRate : rate })
  }

  const toggleFullScreen=()=>{
    screenfull.toggle(playerContainerRef.current)
  }
  const handleBuffer=()=>{
    setBuff(true)
  }
    const handleBufferEnd=()=>{
    setBuff(false)
  }


  const handleProgress=(changeState)=>{
    if(count > 3){
      controlRef.current.style.visibility="hidden"
      count = 0
    }
    if(controlRef.current.style.visibility === 'visible'){
      count+=1
    }
    if(!state.seeking){
      setstate({...state, ...changeState})
    }

  }

  const handleSeekChange=(e,newValue)=>{
    setstate({...state,played:parseFloat(newValue/100)})
  }
  const handleSeekMouseDown=(e)=>{
    setstate({...state,seeking:true})
  }
  const handleSeekMouseUp=(e,newValue)=>{
    setstate({...state,seeking:false})
    playerRef.current.seekTo(newValue/100)
  }

    const format=(seconds)=>{
      if(isNaN(seconds)){
        return '00:00'
      }
      const date = new Date(seconds*1000)
      const hh = date.getUTCHours()
      const mm = date.getUTCMinutes()
      const ss = date.getUTCSeconds().toString().padStart(2,"0")
      if(hh){
        return `${hh}:${mm.toString().padStart(2,"0")}:${ss}`
      }
      return `${mm}:${ss}`
    }
  const currentTime = playerRef.current ? 
  playerRef.current.getCurrentTime() : '00:00'

  const duration = playerRef.current ? 
  playerRef.current.getDuration() : '00:00'

  const elapsedTime = format(currentTime)
  const totalDuration = format(duration)

  const handleMouseMove=()=>{
    controlRef.current.style.visibility="visible";
    count = 0
  }
  const handleVolumeChange=(e, newValue)=>{
    setstate({
      ...state,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });

  }
  const handleVolumeSeekDown=(e, newValue)=>{
    setstate({ ...state, seeking: false, volume: parseFloat(newValue / 100) });
  }



  const handleQuality=(quality , level)=>{
    //console.log(level)
    setstate({...state, playing: false})
    var hls = playerRef.current.getInternalPlayer('hls');
    if(quality === '-1'){
      hls.loadLevel = quality
      hls.subtitleTrack = level
    }else{
      hls.currentLevel = quality
      hls.subtitleTrack = level
    }
    //console.log(alllevel)
    //setstate({...state, playing: !state.playing})
    setstate({...state, playing: true})
  }
  const onTrackChange=(e)=>{
    //console.log(e)
    setTrackLang(e)
  }
  const handlePip=()=>{
    setstate({...state, pip:!pip})
  }

  const{playing,muted,playbackRate,played,seeking,pip}=state  

  //https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8
  //http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
const [query,setquery]=useState('');
  const handleepisode=()=>{
    if(!userId){
      router.push('/login')
    }
    if(userId !== ''){
      const data = {
        "episodeId": episodeId, 
        "contentId":contentId, 
        "countrycode":"in", 
        "keyversion":"1.0", 
        "ishevcSupported":"false", 
        "ishevcHardwareSupported":"false", 
        "avcHighProfileSupported":"false", 
        "isAV1HardwareSupported":"false",               
        "client":"NATIVE", 
        "osversion":"22", 
        "adaptive":"true", 
        "streaming_type":"HLS", 
        "os":"Android", 
        "userId":userId, 
    }
    player(data)
    .then(res=>{
      setloader(false)
      if(res){
        if(res.data.code === 75001){
          router.push('/subscription')
        }else if(res.data.code === 5200){
          router.push('/login')
        }else if(res.data.error !== true){
          const path = res.data.url.split('?');
          if(path.length > 0){
            setquery(path[1])
          }
          sethlsUrl(res.data.url) 
        }
      }
     
    })
    }
    

}
const [pop,setpop]=useState(false)
const [pop1,setpop1]=useState(false)
const redirect=()=>{
  navigate(`/content/details/${contentId}`)
}
const handlepop=()=>{
  setpop(false)
  if(popping === null){
    localStorage.setItem('pop',false)
    //setpop(false)
  }else{
   // setpop(false)
   setpop1(true)
  }
}

function decrypt(ciphertext, key) {
  var keyHex = CryptoJS.enc.Hex.parse(key); 
  var decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
  }, keyHex, {
     mode: CryptoJS.mode.ECB, 
     padding:CryptoJS.pad.Pkcs7
     });
     setfinalDecrypted(decrypted.toString(CryptoJS.enc.Utf8))
     return decrypted.toString(CryptoJS.enc.Utf8); 
  }
  const onReady = React.useCallback(() => {
    if(seekTime){
      playerRef.current.seekTo(seekTime, 'seconds');
    }
    toggleFullScreen()
  }, [playerRef.current]);
  return (
    <>
        <div className="playerWrapper" ref={playerContainerRef} onMouseMove={handleMouseMove}>
        <div className={ loader ? 'loader' : 'loader hide'}>
      <div className='spin'/>
    </div>
          {
          
          pop && pop1 ? 
            <div className='content_popup'>
            <h2>Maturity Rating: 18+</h2>
            <p>May contain non-explicit sexual behaviour, nudity, violence, strong language, substance.</p>
            <br/>
            <p className='head'> I CONFIRM THAT I AM 18 YEARS AND ABOVE </p>
            <div className='buttons'>
                <button className="btn btn-custom" onClick={()=>redirect()} >CANCEL</button>
                <button className="btn btn-custom" onClick={()=>handlepop()}>OK</button>
            </div>
            </div>
            :''
          }
       
          <ReactPlayer
            width={"100%"}
            height="100%"
            url={hlsUrl}
            pip={pip}
            muted={muted}
            playing={playing}
            ref={playerRef}
            playbackRate={playbackRate}
            onProgress={handleProgress}
            onBuffer={handleBuffer}
            onBufferEnd={handleBufferEnd}
            onReady={onReady}
            config={{
              file: {
                hlsOptions: {
                  forceHLS: true,
                  debug: false,
                  xhrSetup: function(xhr, url) {
                      if(!url.includes('playlist.m3u8')){
                        xhr.open('GET', url +'?' + query )
                      }
                      // if(url.includes('keyserver.jalva.app') && url.includes('getKey')){
                      // var splitt = url.split('?');
                      // //console.log(`${splitt[0]}?key=${finalDecrypted}&_id=${userId}`)
                      // xhr.open('POST', `https://keyserver.jalva.app/getKey?key=${finalDecrypted}&_id=${userId}`)
                      //  //xhr.setRequestHeader('drmapiKey',"dan8fKLn1nd2nnRap2pn5w==")
                      // }
                  },
                },
              },
            }}
          />
          
          <PlayerControls 
          upcoming={upcoming}
          episode={episode}
          contentTitle={contentTitle}
          playerRef={playerRef}
          contentId={contentId}
          ref={controlRef}
          onPlayPause={handleplaypause}
          playing={playing} 
          onforward={handleforward}
          onbackward={handlebackward}
          muted={muted}
          onmute={handlemute}
          playbackRate={playbackRate}
          onplaybackratechange={handleplaybackratechange}
          onToggleFullScreen={toggleFullScreen}
          played={played}
          onSeek={handleSeekChange}
          onSeekMouseDown={handleSeekMouseDown}
          onSeekMouseUp={handleSeekMouseUp}
          onVolumeChange={handleVolumeChange}
          onVolumeSeekDown={handleVolumeSeekDown}
          elapsedTime={elapsedTime}
          totalDuration={totalDuration}
          Buffer={buff}
          onBuffer={handleBuffer}
          onBufferEnd={handleBufferEnd}
          title={title}
          onQuality={handleQuality}
          onTrack={onTrackChange}
          onPip={handlePip}
        //onDetail={handlePlayer}
        />
        </div>
    </>
  );
}

export default ReactPlay;