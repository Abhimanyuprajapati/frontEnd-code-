import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
const static_url = process.env.NEXT_PUBLIC_CDN_STATIC;
import { Access } from '../../services/context';
// import play from '../../assets/image/Group 66223.png';
import Download from '../../assets/loginPage/Download.png'
import Watchlist from '../../assets/loginPage/icomoon-free_download2.png'
import share from '../../assets/loginPage/icomoon-free_download2 (1).png'
import Image from 'next/image';
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from 'next/link';
import withState from '../../components/Auth/State';
export async function getServerSideProps(context) {
    // Fetch data from external API
    const res = await Access.get('/getContents?index=0&&limit=50');
    return {
        props: { data: res.data.data }
    };
}

const Post = ({ data }) => {
    const router = useRouter()
    const { contentId } = router.query;
    const [persons, setPersons] = useState({ seasons: [], actors: [], trailerFileUrl: [], genre: [], actors: [] });
    const [genre, setgenre] = useState([]);
    const [options, setoptions] = useState([]);
    const [season, setseason] = useState([])
    const [child, setchild] = useState({ episodes: [] })
    const [flag, setflag] = useState(false)
    const [date, setdate] = useState('')
    const [seas, setseas] = useState(false)
    const [awsresourceId, setawsresourceId] = useState('')
    const [selectedOption, setSelectedOption] = useState(null);
    const [flag1, setflag1] = useState(false)
    const [index1, setindex1] = useState(0)
    const [loader, setloader] = useState(false)
    const [userId, setuserId] = useState('')
    const [flag_movie, setflag_movie] = useState(false);
    const [episode, setepisode] = useState(null)
    const [msg, setmsg] = useState('No seasons & Episodes');
    const [similar, setsimilar] = useState([])

    useEffect(() => {
        if (data.contents.length > 0) {
            validate(data.contents)
        }
        if (window.innerWidth < 600) {
            setflag1(true)
        }
        setuserId(localStorage.getItem('id'))
    }, [data.contents])

    const arr = []
    const checksimilarcontents = (x) => {
        for (var i = 0; i < data.contents.length; i++) {
            if (data.contents[i].subcategory[0] === x[0] && data.contents[i].title !== contentId) {
                arr.push(data.contents[i])
            }
        }
        setsimilar(arr)
    }
    const seasoncheck = (seasonId, season) => {
        var i;
        for (i = 0; i < season.length; i++) {
            if (season[i]._id === seasonId) {
                setchild(season[i])
                if (season[i].episodes.length === 0) {
                    setmsg('')
                } else {
                    setmsg('')
                }
            }
        }
    }
    const handle = (e) => {
        setSelectedOption(e)
        seasoncheck(e.value, season)
    }
    const appenddata = (e) => {
        setindex1(e.realIndex)
    }

    const validate = (res) => {
        for (var i = 0; i < res.length; i++) {
            if (res[i].title == contentId) {
                console.log(res[i])
                if (res[i].categoryName === 'Movies' || res[i].categoryName === 'movies') {
                    setflag_movie(true)
                }
                checksimilarcontents(res[i].subcategory)
                setPersons(res[i])
                setgenre(res[i].genre)
                setawsresourceId(res[i].awsStaticResourcePath)
                setseason(res[i].seasons)
                const dat = res[i].releaseDate.toLocaleString()
                setdate(dat)
                if (res[i].seasons.length <= 0) {
                    setflag(false)
                } else {
                    setseas(true)
                    setflag(true)
                    setoptions(res[i].seasons.map(x => { return { value: x._id, label: x.seasonName } }))
                    setSelectedOption({ value: res[i].seasons[0]._id, label: res[i].seasons[0].seasonName })
                    seasoncheck(res[i].seasons[0]._id, res[i].seasons)
                    const seas = res[i].seasons;
                    if (seas[0].episodes.length > 0) {
                        setepisode(seas[0].episodes[0])
                    }
                }

            }
        }
    }

    return (
        <>
            <div className={loader ? 'loader' : 'loader hide'}>
                <div className='spin' />
            </div>
            <section className='content-details'>
                <div className='contentchild-2'>
                <Image src={static_url + '/' + persons.awsStaticResourcePath + '/' + persons.portraitPosterIdNormal} alt="image"  width="300" height="400" className='smallbackground' />
                <Image src={static_url + '/' + persons.awsStaticResourcePath + '/' + persons.landscapePosterIdNormal} alt="image" width="920" height="550" className='background' />
                {/* <Image src={play} alt="image" width="300" height="200" className='bigplaybtn' onClick={() => { router.push(`/player/data?title=${persons.title}&path=${persons.trailerFileUrl}&type=trailer&contentId=${persons._id}`); setloader(true) }} /> */}
                </div>
                <div className='contentchild-1'>
                    <div className='contentchild-2'>
                        <div className='contentchild-3'>
                            <h1>{persons.title}</h1>
                        </div>
                        <div className='contentchild-4'>
                            <div className='contentchild-5' style={{color:'rgba(246, 173, 27, 1)'}}>
                                <Image src={Download} alt="play" width="auto" height="auto" />
                                Download
                            </div>
                            <div className='contentchild-5'>
                                <Image src={Watchlist} alt="image" width="auto" height="auto" />
                                Watchlist
                            </div>
                            <div className='contentchild-5'>
                                <Image src={share} alt="image" width="auto" height="auto" />&nbsp;
                                Share
                            </div>
                        </div>
                    </div>
                    <div className='contentchild-8'>
                        <p>{persons.description}</p>
                    </div>
                </div>
            </section>
            {/* New and Fresh TV Shows section  */}
            <section className="product">
                <div className="container">
                    <div className="product_category">
                        <div className="product_category_heading">
                            <h4>New and Fresh TV Shows</h4>
                            <h4 style={{color:'rgba(246, 173, 27, 1)'}}>View All</h4>
                        </div>
                        <div className="product_item_list">
                            {data.contents.map((x, index) => {
                                return (
                                    <div key={index}>
                                        <Link
                                            href={"/contents/" + `${x.title}`}
                                            className="product_item"
                                        >
                                            <div className="product_item_image">
                                                <Image
                                                    src={
                                                        static_url +
                                                        "/" +
                                                        x.awsStaticResourcePath +
                                                        "/" +
                                                        x.portraitPosterIdNormal
                                                    }
                                                    alt="dd"
                                                    width="200"
                                                    height="300"
                                                />
                                                <div className="product_item_image_overlay">
                                                    <div className="play_icon"></div>
                                                </div>
                                            </div>
                                            <p>{x.title}</p>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
 {/* What Genre you want to watch section  */}
            <section className="product">
                <div className="container">
                    <div className="product_category">
                        <div className="product_category_heading">
                            <h4>What Genre you want to watch ?</h4>
                            <h4 style={{color:'rgba(246, 173, 27, 1)'}}>View All</h4>
                        </div>
                        <div className="product_item_list">
                            {data.contents.map((x, index) => {
                                return (
                                    <div key={index}>
                                        <Link
                                            href={"/contents/" + `${x.title}`}
                                            className="product_item"
                                        >
                                            <div className="product_item_image">
                                                <Image
                                                    src={
                                                        static_url +
                                                        "/" +
                                                        x.awsStaticResourcePath +
                                                        "/" +
                                                        x.portraitPosterIdNormal
                                                    }
                                                    alt="dd"
                                                    width="200"
                                                    height="300"
                                                />
                                                <div className="product_item_image_overlay">
                                                    <div className="play_icon"></div>
                                                </div>
                                            </div>
                                            <p>{x.title}</p>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default withState(Post)