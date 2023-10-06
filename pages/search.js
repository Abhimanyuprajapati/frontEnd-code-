import React,{useState,useEffect} from 'react'
import { useUserAuth } from '../context/UserAuthContext'
import Link from 'next/link';
import Image from 'next/image';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
import withState from '../components/Auth/State'
const static_url = process.env.NEXT_PUBLIC_CDN_STATIC;
const search = () => {
    const {allContents} = useUserAuth();
    const [input,setinput]=useState('')
    const [collection,setcollection]=useState([])
    const [origin,setorigin]=useState([])
    useEffect(()=>{
        const fetch=async()=>{
            const data= await allContents();
            setorigin(data.contents)
        }
        fetch()
    },[])
    const filter_result=(data, key)=>{
        const title = data.filter(x=>x.title.toLowerCase().includes(key.toLowerCase()))
        if(key.length <= 0){
            setcollection([])
        }else{
            setcollection(title)
        }
    }
    const handlesearch=(e)=>{
        var val = e.target.value
        setinput(val)
        filter_result(origin,input)
    }

  return (
    <div className='header_search'>
            <span className='header-menu'>
                <Link href="/"><i className='fa fa-angle-left'></i> Back </Link>
            </span>
            <div className="child">
                <i className='fa fa-search'></i>
                <input type="text" placeholder="Search" value={input} onChange={handlesearch} name=""/>
            </div>
            {/*for search result */}
            <section className="product">
                <p style={{'color':'#ccc','padding':'10px 0 0 10px'}}>search result for {input}</p>
                    <div className="product_category">
                        <div className="product_item_list">
                        {
                        collection.map( (x,index) => {
                            return(
                                    <div key={index}>
                                            <Link href={'/contents/'+`${x.title}`} className="product_item">
                                                <div className="product_item_image">
                                                    <Image src={static_url+'/'+x.awsStaticResourcePath +'/'+x.portraitPosterIdNormal} alt="dd" width="200" height="300"/>
                                                    <div className="product_item_image_overlay">
                                                        <div className="play_icon"></div>
                                                    </div>
                                                </div>
                                            <p>{x.title}</p>
                                            </Link>
                                    </div>
                            )
                        })}
                        </div>
                </div>
            </section>
    </div>
  )
}

export default withState(search) 