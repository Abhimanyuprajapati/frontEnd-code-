/*                              @Author : {}
* Copyright (c) 2021, by Tush Entertainment
* Permission to use, copy, modify or distribute this software in binary or source form
* for any purpose is allowed only under explicit prior consent in writing from Tush Entertainment.
* THE SOFTWARE IS PROVIDED "AS IS" AND TUSH ENTERTAINMENT DISCLAIMS
* ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL TUSH ENTERTAINMENT
* BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL
* DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR
* PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS
* ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS
* SOFTWARE.THIS SOFTWARE IS PROTECTED BY COPYRIGHT LAWS FROM INDIA AND USA.
* ANY OR ALL PART OF THIS SOFTWARE OR SOURCES CANNOT BE USED FOR ANY TYPES OF
* PRODUCTS WHICH IS DIRECTLY AND INDIRECTLY AFFECTING THE LIFE OF HUMANS.
*/

import React,{useState,useEffect} from 'react'
import Instance from '../Objects/Axios';
import '../css/content.css';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import MultipartAPI from '../Objects/MultipartAPI';
import AsyncSelect from 'react-select/async';
import {
    useNavigate,
    useParams,
    Link
  } from "react-router-dom";
import '../css/upcomming.css';
import Select from 'react-select';
import {countries,Listdevice,Listgenre,Listtags,Listcountry} from '../Objects/Country'
import alertinstance from '../Objects/Alert';
import Spin from './Spinner/Spin';
import { useSearchParams } from 'react-router-dom';
const Updatecontentchild = ({icon}) => {
    //fetching contentid from url using useparams
    let {contentId} = useParams();
    let {contentName} =useParams();
    //for country filtered

    const data_device=async()=>{
        return Listdevice()
    }
    const data_genre=async()=>{
        return Listgenre()
    }

    //for navigation of pages
    let navigate = useNavigate();

    //intial state for all the keys of add content
    const [para,setPara]=useSearchParams();
    const [page,setPage]=useState();
    const [loading,setloading]=useState(false)
    const [title,settitle]=useState('');
    const [description,setdescription]=useState('')
    const[releaseDate,setrelease]=useState('');
    const [weight,setweight]=useState(null);
    const [published,setpublished]=useState(false);
    const [countryFiltered,setcountryFiltered]=useState([]);
    const [deviceFiltered,setdeviceFiltered]=useState([]);
    const [categoryName,setcategoryName]=useState([]);
    const [categoryCode,setcategoryCode]=useState('');
    const [categoryId,setcategoryId]=useState([]);
    const [subcategory,setsubcategory]=useState([]);
    const [censor,setcensor]=useState(false);
    const [videoAvailable,setvideoAvailable]=useState(false);
    const [ageGroup,setageGroup]=useState('');
    const [genre,setgenre]=useState([]);
    const [director,setdirector] = useState('');
    const [production,setproduction] = useState('');
    const [freelyAvaialble,setfreelyAvaialble] = useState(false);
    const [authenticationNeeded,setauthenticationNeeded] = useState(false);
    const [portraitPosterIdSmall,setportraitPosterIdSmall] = useState('');
    const [portraitPosterIdNormal,setportraitPosterIdNormal] = useState('');
    const [webportraitPosterIdNormal,setwebportraitPosterIdNormal] = useState('');
    const [landscapePosterIdSmall,setlandscapePosterIdSmall] = useState('');
    const [landscapePosterIdNormal,setlandscapePosterIdNormal] = useState('');
    const [weblandscapePosterIdNormal,setweblandscapePosterIdNormal] = useState('');
    const [trailerFileUrl,settrailerFileUrl] = useState([]);
    const [searches, setSearches] = useState([])
    const [isTrailer,setIsTrailer]=useState(false)
    const [query, setQuery] = useState("")
    //for multiple value fetch using single async select tag
    const [selectedValue, setSelectedValue] = useState(null);
    const [Tags,setTags]=useState([])
    const [trailerObj,setTrailerObj]=useState({freeTrailer:'',paidTrailer:''})
    //dfgh
    useEffect(() => {
        setPage(para.get("tab"));
        MultipartAPI.get('/listContents')
        .then(res=>{
           call(res.data.data)
          })
    }, [])
    const call =(val)=>{
        const agenre =[]
        const adevice=[]
        const acountry=[]
        const subc =[]
        var atags = []
        for (var i = 0; i < val.length; i++) {
            if (val[i]._id === contentId) {
               settitle(val[i].title)
               setdescription(val[i].description)
               setdirector(val[i].director)
               setrelease(val[i].releaseDate)
               setweight(val[i].rank)
               setproduction(val[i].production)
               setageGroup(val[i].ageGroup)
               settrailerFileUrl(val[i].trailerFileUrl[0])
               if(val[i].paidTrailer || val[i].freeTrailer){
                setTrailerObj({...trailerObj,paidTrailer:val[i].paidTrailer[0],freeTrailer:val[i].freeTrailer[0]})
               }
               setfreelyAvaialble(val[i].freelyAvailable)
               setpublished(val[i].published)
               setauthenticationNeeded(val[i].authenticationNeeded)
               setcensor(val[i].censor)
               setvideoAvailable(val[i].videoAvailable)
               setSearches(val[i].actors)
               setcategoryName({title:val[i].categoryName})
               setcategoryId(val[i].categoryId)
               setcategoryCode(val[i].categoryCode)
               val[i].subcategory.map(x=>{
                subc.push({title:x})
               })
               val[i].genre.map(x=>{
                    agenre.push({label:x,value:x})
                })
                val[i].deviceFiltered.map(x=>{
                    adevice.push({label:x,value:x})
                })
                if(val[i].tags){
                    val[i].tags.map(x=>{
                        atags.push({label:x,value:x})
                    })
                }
                setTags(atags)
                callback1(val[i].countryFiltered)
                setgenre(agenre)
                setdeviceFiltered(adevice)
                setsubcategory(subc)
                setIsTrailer(val[i].isTrailer ? val[i].isTrailer : false)
            }
         }

    }
    const callback1=async(data)=>{
        const ss = countries;
        const arr = [];
        for(var i=0 ; i < ss.length; i++){
           for (var j=0;j<data.length;j++){
            if(data[j] === ss[i].value){
                arr.push(ss[i])
            }
        }
        }
        setcountryFiltered(arr)
       }

    //global formdata object
    const formData = new FormData();



    //for managing
    const handleChange = value => {
        setSelectedValue(value);
        callback(value);
    }

    function callback(x){
        setcategoryId(x._id);
        setcategoryName({title:x.title});
        setcategoryCode(x.code);
    }

    const handleChangesub = (e) => {
        setsubcategory(Array.isArray(e)?e.map(x=>x):[])
    }

    // load catgory options using API call
    const loadOptions = async () => {
        return Instance.get('/listCategory').then(res => res.data.data )
    }
    //load sub category
    const loadsubcategory = () =>{
        return Instance.get('/listSubcategory').then(res => res.data.data )
    }

    //for updating multipart form data to server
    const Update = (e) =>{
    e.preventDefault();
    setloading(!loading)
    const country = countryFiltered.map(x=>x.value)
    const device = deviceFiltered.map(x=>x.label)
    const gen = genre.map(x=>x.label)
    const subcate = subcategory.map(x=>x.title)
    const finaltag = Tags.map(x=>x.label)
   //intial data objects as key and value pair
   const data  = {
    'title':title,
    'description':description,
    'releaseDate':releaseDate,
    'rank':weight,
    'published':published,
    'countryFiltered':country,
    'categoryName':categoryName.title,
    'deviceFiltered':device,
    'subcategory':subcate,
    'categoryCode':categoryCode,
    'categoryId':categoryId,
    'censor':censor,
    'videoAvailable':videoAvailable,
    'ageGroup':ageGroup,
    'genre':gen,
    'director':director,
    'production':production,
    'freelyAvailable':freelyAvaialble,
    'authenticationNeeded':authenticationNeeded,
    'trailerFileUrl':trailerFileUrl,
    'actors':searches,
    'contentId':contentId,
    'tags':finaltag,
    'freeTrailer':trailerObj.freeTrailer,
    'paidTrailer':trailerObj.paidTrailer,
    'isTrailer':isTrailer
  }
  formData.append('portraitSmall',portraitPosterIdSmall);
  formData.append('portraitNormal',portraitPosterIdNormal);
  formData.append('webPosterPortraitNormal',webportraitPosterIdNormal);
  formData.append('landscapeSmall',landscapePosterIdSmall);
  formData.append('landscapeNormal',landscapePosterIdNormal);
  formData.append('webPosterLandscapeNormal',weblandscapePosterIdNormal);
        const formText =JSON.stringify(data);
        formData.append('formText', formText);
        //calling API for updating content
        const params = formData;
        MultipartAPI.post('/updateContent',params)
          .then(res=>{
            setloading(false)
            alertinstance(res);
            if(res.data.error === false){
                navigate('/content')
            }
          }).catch(err=>{
            setloading(!loading)
            console.log(err)
          })
    }

    const handle = (e) =>{
        setcountryFiltered(Array.isArray(e)?e.map(x=> x):[]);
    }
    const handledevice = (e) =>{
        setdeviceFiltered(Array.isArray(e)?e.map(x=>x):[]);
    }
    const handlegenre = (e) =>{
        setgenre(Array.isArray(e)?e.map(x=>x):[]);
    }
    const handletag = (e) =>{
        setTags(Array.isArray(e)?e.map(x=>x):[]);
    }
    const handleClick = () => {
        // Save search term state to React Hooks
        setSearches(searches => [...searches, query])
        setQuery('');
        // setSearches(searches => searches.concat(query))
    }
    const updateQuery = ({ target }) => {
        // Update query onKeyPress of input box
        setQuery(target.value)
      }

      const submitHandler = e => {
        // Prevent form submission on Enter key
        e.preventDefault()

      }
      const deleteRow = (index) => {
        //let name="Mano"
        //setEmps(emps.filter(emp => emp.name !== name))
        let copy_emp=[...searches]
        copy_emp.splice(index,1)
        setSearches(copy_emp)
    }


    return (
        <>{!loading ? '':<Spin/>}
        <div className="content">
        <div className="alert alert-primary">  <i className="fa fa-bars" onClick={icon}></i>
            <span className='leftpush'> You are updating {contentName} </span>
        </div>
            <form onSubmit={submitHandler}>
                <div>

                <label>Add Actors</label>
                <input
                    value={query}
                    className="form-control"
                    placeholder="Enter name of the actors*"
                    type="text"
                    onChange={updateQuery}
                />
                <button
                    className="btn btn-success ph-5 mt-2"
                    type="submit"
                    onClick={handleClick}
    >
                    add
                </button>
                <Stack direction="row" spacing={1} className="stack">
                    {searches.map((x,index) =>{
                        return(
                            <>
                            <Chip label={x} onDelete={()=>deleteRow(index)}/>
                            </>
                        )
                    })}
                    </Stack>
                </div>
            </form>

            <form onSubmit={Update}>
                    <label><i className="fa fa-heading"></i> Title</label>
                        <input
                            name=""
                            value={title}
                            className="form-control"
                            placeholder="Enter title name*"
                            type="text"
                            onChange={(e)=>settitle(e.target.value)}
                        />
                    <label><i className="fa fa-sort-amount-up"></i> Description</label>
                        <textarea
                            name=""
                            value={description}
                            className="form-control"
                            placeholder="Enter description max-characters 500*"
                            type="text"
                            rows="7"
                            onChange={(e)=>setdescription(e.target.value)}
                        />
                    <label><i className="fa fa-calendar-alt"></i> Set Date</label>
                        <input
                            name=""
                            value={releaseDate}
                            className="form-control"
                            placeholder="Enter date*"
                            type="date"
                            onChange={(e)=>setrelease(e.target.value)}
                        />

                    <input type="checkbox"  checked={published} onChange={e => setpublished(e.target.checked)}/>
                    <label> published</label><br/>

                    <label><i className="fa fa-globe"></i>Select Country</label>
                    <Select className="form-control p-0" isMulti value={countryFiltered} options={countries} placeholder="Select Country*" onChange={handle}></Select>

                    <label><i className="fa fa-globe"></i> Select Tags</label>
                    <Select className="form-control p-0" isMulti value={Tags}  options={Listtags} placeholder="Select Tags*" onChange={handletag}></Select>

                    <label><i className="fa fa-phone"></i>Select Device</label><br/>
                    <AsyncSelect
                        isMulti
                        cacheOptions
                        defaultOptions
                        value={deviceFiltered}
                        defaultValue={deviceFiltered}
                        getOptionLabel={e => e.label}
                        getOptionValue={e => e.label}
                        loadOptions={data_device}
                        onChange={handledevice}
                        placeholder='Select device*'
                    />

                    {/*select catgeory id */}
                    <label><i className="fa fa-caret-square-down"></i>Select Category</label><br/>
                    <AsyncSelect
                        cacheOptions
                        defaultOptions
                        value={categoryName}
                        defaultValue={categoryName}
                        getOptionLabel={e => e.title}
                        getOptionValue={e => e._id}
                        loadOptions={loadOptions}
                        onChange={handleChange}
                        placeholder='Select catgeory*'
                    />

                    <label><i className="fa fa-caret-square-down"></i>Select Sub Category</label><br/>
                    <AsyncSelect
                        isMulti
                        cacheOptions
                        defaultOptions
                        value={subcategory}
                        defaultValue={subcategory}
                        getOptionLabel={e => e.title}
                        getOptionValue={e => e.title}
                        loadOptions={loadsubcategory}
                        onChange={handleChangesub}
                        placeholder='Select sub catgeory*'
                    />
                    <input type="checkbox" checked={censor} onChange={(e)=>setcensor(e.target.checked)}/>
                    <label>Censor</label><br/>

                    <label><i className="fa fa-venus"></i> Genre</label><br/>
                    <Select className="form-control p-0" isMulti value={genre} options={Listgenre} placeholder="Select Genre*" onChange={handlegenre}></Select>

                    <input type="checkbox"  checked={videoAvailable} onChange={e => setvideoAvailable(e.target.checked)}/>
                    <label>Vedio Available</label><br/>

                    <label><i className="fa fa-percentage"></i> Age Group</label>
                        <input
                            name=""
                            value={ageGroup}
                            className="form-control"
                            placeholder="Enter age gorup*"
                            type="text"
                            onChange={(e)=>setageGroup(e.target.value)}
                        />

                    <label><i className="fa fa-user"></i> Director</label>
                        <input
                            name=""
                            value={director}
                            className="form-control"
                            placeholder="Enter director name*"
                            type="text"
                            onChange={(e)=>setdirector(e.target.value)}
                        />
                     <label><i className="fa fa-film"></i> Production</label><br/>
                        <input
                            name=""
                            value={production}
                            className="form-control"
                            placeholder="Enter production details*"
                            type="text"
                            onChange={(e)=>setproduction(e.target.value)}
                        />

                    <input type="checkbox"  checked={freelyAvaialble} onChange={e => setfreelyAvaialble(e.target.checked)}/>
                    <label> Freely Available</label><br/>

                    <input type="checkbox"  checked={authenticationNeeded} onChange={e => setauthenticationNeeded(e.target.checked)}/>
                    <label> Authentication Needed</label><br/>

                    <label><i className="fa fa-film"></i> Portrait Poster Small (200 x 300)</label>

                        <input
                            name=""
                            className="form-control"
                            placeholder="Select poster*"
                            type="file"
                            onChange={(e)=>setportraitPosterIdSmall(e.target.files[0])}
                        />

                    <label><i className="fa fa-film"></i> Portrait Poster Normal (300 x 450)</label>

                        <input
                            name=""
                            className="form-control"
                            placeholder="Select poster*"
                            type="file"
                            onChange={(e)=>setportraitPosterIdNormal(e.target.files[0])}
                        />

                    <label><i className="fa fa-film"></i>Web Portrait Poster Normal (300 x 450)</label>
                    <input
                        className="form-control"
                        type="file"
                        onChange={(e)=>setwebportraitPosterIdNormal(e.target.files[0])}
                    />
                    <label><i className="fa fa-film"></i> Landscape Poster Small (1200 x 675)</label>

                        <input
                            name=""
                            className="form-control"
                            placeholder="Select poster*"
                            type="file"
                            onChange={(e)=>setlandscapePosterIdSmall(e.target.files[0])}
                        />

                    <label><i className="fa fa-film"></i> Landscape Poster Normal (1920 x 1080)</label>

                        <input
                            name=""
                            className="form-control"
                            placeholder="Select poster*"
                            type="file"
                            onChange={(e)=>setlandscapePosterIdNormal(e.target.files[0])}
                        />
                    <label><i className="fa fa-film"></i>Web Landscape Poster Normal (1920 x 1080)</label>
                    <input
                        className="form-control"
                        type="file"
                        onChange={(e)=>setweblandscapePosterIdNormal(e.target.files[0])}
                    />
                    <label>Trailer</label>

                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fa fa-film"/>
                            </span>
                        </div>
                        <input
                            name=""
                            value={trailerFileUrl}
                            className="form-control"
                            placeholder="Enter trailer url*"
                            type="text"
                        onChange={(e)=>settrailerFileUrl(e.target.value)}
                        />
                    <label><i className="fa fa-users"></i>Free Trailer</label>
                        <input
                            name=""
                            value={trailerObj.freeTrailer}
                            className="form-control"
                            placeholder="Enter path for Free Trailer"
                            type="text"
                            onChange={(e)=>setTrailerObj({...trailerObj,freeTrailer:e.target.value})}
                        />
                        <label><i className="fa fa-users"></i>Paid Trailer</label>
                        <input
                            name=""
                           value={trailerObj.paidTrailer}
                            className="form-control"
                            placeholder="Enter path for Paid Trailer"
                            type="text"
                            onChange={(e)=>setTrailerObj({...trailerObj,paidTrailer:e.target.value})}
                        />

                    <label><i className="fa fa-random"></i> Rank</label>
                    <input
                            className="form-control"
                            placeholder="Enter rank*"
                            type="number"
                            value={weight}
                            onChange={(e)=>setweight(e.target.value)}
                        />
                    <input type="checkbox"  checked={isTrailer} onChange={e => setIsTrailer(e.target.checked)}/>
                    <label>Trailer Available</label><br/>
                    <button type="submit"className='btn btn-primary mt-2'>upload</button>
                    <Link to={`/content?return=true&tab=${[page]}&id=${contentId}`}> <button className='btn btn-danger mt-2' style={{'marginLeft': '10px'}}>Back </button></Link>
            </form>

        </div>
        </>
    )
}

export default Updatecontentchild
