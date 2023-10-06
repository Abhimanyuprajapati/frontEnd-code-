import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Header from '../../components/Header';
const static_url = process.env.NEXT_PUBLIC_CDN_STATIC;
import { Access } from '../../services/context';
import play from '../../assets/image/Group 66223.png';
import play1 from '../../assets/image/playtrailer.png';
import share from '../../assets/image/Invite_friend.png';
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from 'next/link';
import Select from 'react-select';
import Download from '../../components/Contents/Download';
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
                    <Image src={static_url + '/' + persons.awsStaticResourcePath + '/' + persons.landscapePosterIdNormal} alt="image" width="600" height="500" className='background' />
                    <Image src={play} alt="image" width="300" height="200" className='bigplaybtn' onClick={() => { router.push(`/player/data?title=${persons.title}&path=${persons.trailerFileUrl}&type=trailer&contentId=${persons._id}`); setloader(true) }} />
                </div>
                <div className='contentchild-1'>
                    <div className='contentinnerchild'>
                    <div className='col-md-3'>
                    <Image src={static_url + '/' + persons.awsStaticResourcePath + '/' + persons.landscapePosterIdSmall} alt="image" width="600" height="500" className='background' />
                    </div>
                    <div className='col-md-9'>
                    <h1>{persons.title} <Image src={share} alt="imag" /> <span>14+</span></h1>
                    <ul>
                        <li>{persons.seasons.length} Seasons</li>
                        {persons.genre.map((x,index)=>{
                            return (
                                <li key={index}>{x}</li>
                            )
                        })}
                    </ul>
                    <p>{persons.description}</p>
                    <p>Director :{persons.director}</p>
                    <p>Casts :{persons.actors.map((x,index)=>{
                        return (
                            <span key={index}>{x}</span>
                        )
                    })}</p>
                    <Image src={play1} alt="trailer_button" onClick={() => { router.push(`/player/data?title=${persons.title}&path=${persons.trailerFileUrl}&type=trailer&contentId=${persons._id}`); setloader(true) }}/>
                    </div>
                    </div>
                    
                    <div className='topmovie'>
                            <Select
                                className='select'
                                value={selectedOption}
                                onChange={handle}
                                options={options}
                            />
                            <div className='head'>
                                <h2>Episodes</h2>
                                <p> {index1 + 1} /{child.episodes.length} </p>
                            </div>
                            {!flag ? <p>No episodes !!</p> :
                                <Swiper
                                    className='episodesl'
                                    loop={false}
                                    slidesPerView={flag1 ? 2 : 5}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    navigation={true}
                                    modules={[Pagination, Navigation]}
                                    spaceBetween={5}
                                    onSlideChange={(e) => appenddata(e)}
                                >
                                    {child.episodes.map((x, index) => {
                                        return (
                                            <SwiperSlide key={index} >
                                                <Link href={`/player/data?title=${x.name}&contentId=${persons._id}&episodeId=${x._id}&contentTitle=${contentId}&userId=${userId}&type=episode`}>
                                                    <p>{index + 1}</p>
                                                    <Image src={static_url + '/' + awsresourceId + '/' + x.landscapePosterId} alt="sldi" width="260" height="165" style={{ 'borderRadius': '12px' }} />
                                                    <h2 style={{ 'fontSize': '16px', 'color': '#fff', 'margin': '10px' }}>{x.name}</h2>
                                                </Link>
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                            }
                    </div>
                </div>

            </section>
            {/*seasons and episodes*/}
    
            <Download />     {/* download section */}
      {/* featured and upcoming movies section  */}
      <section className="product">
        <div className="container">
          <div className="product_category">
            <div className="product_category_heading">
              <h4>FEATURED MOVIES</h4>
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