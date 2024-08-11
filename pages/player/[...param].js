import React,{useState,useEffect} from 'react'
import withState from '../../components/Auth/State';
import { useRouter } from 'next/router';
import ReactPlay from '../../components/Player/Reactplay';
const player = () => {
  const [flag,setflag]=useState(false)
  const router = useRouter()
  const {title} = router.query;
  const {contentId} = router.query;
  const {type} = router.query;
  const {episodeId} = router.query;
  const {path} = router.query;
  const {contentTitle}=router.query;
  const {userId}=router.query;
  const {seekTime}=router.query;
useEffect(()=>{
  setflag(true)
},[title,type])
  return (
    <>
    <br/>
    <br/>
    {!flag ?'':
      <ReactPlay title={title} path={path} seekTime={seekTime} type={type} contentId={contentId} userId={userId} episodeId={episodeId} contentTitle={contentTitle}/>
    }
    </>
  )
}

export default withState(player);