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
import Select from 'react-select';
import Instance from '../Objects/Axios';
import '../css/content.css';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import AsyncSelect from 'react-select/async';
import {
    useNavigate, Link
  } from "react-router-dom";
import '../css/upcomming.css';
import alertinstance from '../Objects/Alert';
import MultipartAPI from '../Objects/MultipartAPI';
import {countries,Listdevice,Listgenre,Listtags} from '../Objects/Country'
import Spin from './Spinner/Spin';
const Addcontentchild = ({icon}) => {
    const option_device=async()=>{
        return Listdevice()
    }
    //for navigation of pages
    let navigate = useNavigate();

    //intial state for all the keys of add content
    const [loading,setloading]=useState(false)
    const [title,settitle]=useState('');
    const [description,setdescription]=useState('')
    const[releaseDate,setrelease]=useState('');
    const [weight,setweight]=useState(1);
    const [published,setpublished]=useState(false);
    const [countryFiltered,setcountryFiltered]=useState([]);
    const [deviceFiltered,setdeviceFiltered]=useState([]);
    const [categoryName,setcategoryName]=useState([]);
    const [categoryCode,setcategoryCode]=useState('');
    const [categoryId,setcategoryId]=useState([]);
    const [subcategoryy,setsubcategory]=useState([]);
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
    const [list, setList]= useState([]);
    const [listnew,setlistnew]=useState([]);
    const [searches, setSearches] = useState([])
    const [query, setQuery] = useState("")
    //for multiple value fetch using single async select tag
    const [selectedValue, setSelectedValue] = useState(null);
    const [sel,setsel]=useState([]);
    const [Tags,setTags]=useState([])
    const [isTrailer,setIsTrailer]=useState(false)
    const [trailerObj,setTrailerObj]=useState({freeTrailer:'',paidTrailer:''})
    //intial data objects as key and value pair
    const data  = {
        'title':title,
        'description':description,
        'releaseDate':releaseDate,
        'rank':weight,
        'published':published,
        'countryFiltered':countryFiltered,
        'categoryName':categoryName,
        'deviceFiltered':deviceFiltered,
        'subcategory':subcategoryy,
        'categoryCode':categoryCode,
        'categoryId':categoryId,
        'censor':censor,
        'videoAvailable':videoAvailable,
        'ageGroup':ageGroup,
        'genre':genre,
        'director':director,
        'production':production,
        'freelyAvailable':freelyAvaialble,
        'authenticationNeeded':authenticationNeeded,
        'trailerFileUrl':trailerFileUrl,
        'actors':searches,
        'freeTrailer':trailerObj.freeTrailer,
        'paidTrailer':trailerObj.paidTrailer,
        'isTrailer':isTrailer
      }
    //api call for listing category
    useEffect(() => {
        Instance.get('/listCategory')
        .then((response) => {
        //handle success
        setList([response.data]);
        })
    },[])

    //global formdata object
    const formData = new FormData();
    formData.append('portraitSmall',portraitPosterIdSmall);
    formData.append('portraitNormal',portraitPosterIdNormal);
    formData.append('webPosterPortraitNormal',webportraitPosterIdNormal);
    formData.append('landscapeSmall',landscapePosterIdSmall);
    formData.append('landscapeNormal',landscapePosterIdNormal);
    formData.append('webPosterLandscapeNormal',weblandscapePosterIdNormal);


    //for managing
    const handleChange = value => {
        setSelectedValue(value);
        setsel([value]);
        callback(value);
    }
    const handleChangesub = (e) => {
        setsubcategory(Array.isArray(e)?e.map(x=>x.title):[])
    }


   const callback =(x)=>{
        setcategoryId(x._id);
        setcategoryName(x.title);
        setcategoryCode(x.code);
    }

    const loadsubcategory = async () =>{
        const res = await Instance.get('/listSubcategory');
        return res.data.data;
    }

      // load options using API call
      const loadOptions = async () => {
        const res = await Instance.get('/listCategory');
          return res.data.data;
    }


    //for adding multipart form data to server
    const Show = (e) =>{
        e.preventDefault();
        setloading(!loading)
        var a = [];
        Tags.map(x=> a.push(x.label))
        data["tags"]= a;
        const formText =JSON.stringify(data);
        formData.append('formText', formText);
        //calling API for adding content
          const params = formData;
          MultipartAPI.put('/addContent',formData)
          .then(res=>{
            setloading(false)
              alertinstance(res)
              if(res.data.error===false){
               setTimeout(() => {
                navigate('/content')
               }, 1500);
              }
          }).catch(err=>{
            setloading(false)
            console.log(err)
          })
    }

    const handle = (e) =>{
        setcountryFiltered(Array.isArray(e)?e.map(x=>x.value):[]);
    }
    const handletag = (e) =>{
        setTags(Array.isArray(e)?e.map(x=>x):[]);
    }
    const handledevice = (e) =>{
        setdeviceFiltered(Array.isArray(e)?e.map(x=>x.label):[]);
    }
    const handlegenre = (e) =>{
        setgenre(Array.isArray(e)?e.map(x=>x.label):[]);
    }
    const updateQuery = ({ target }) => {
        // Update query onKeyPress of input box
        setQuery(target.value)
      }

      const submitHandler = e => {
        // Prevent form submission on Enter key
        e.preventDefault()
        setSearches(searches => [...searches, query])
        setQuery('');

      }
      const deleteRow = (index) => {
        //let name="Mano"
        //setEmps(emps.filter(emp => emp.name !== name))
        let copy_emp=[...searches]
        copy_emp.splice(index,1)
        setSearches(copy_emp)
    }

    function activeContent() {
        return <td>Published</td>;
     }
     function inactiveContent() {
        return <td>Pending</td>;
     }

     const [hover,sethover]=useState(false);
     const func =()=>{
        sethover(!hover)
    }
    return (
        <>{!loading ? '':<Spin/>}
        <div className="content">
             <div className="alert alert-primary">  <i className="fa fa-bars" onClick={icon}></i>
                <span className='leftpush'> Add Content</span>
            </div>
            {/*for Adding content  */}
            <form onSubmit={submitHandler}>
                <label><i className="fa fa-user"></i> Add Actors</label>
                <input
                    value={query}
                    required
                    className="form-control"
                    placeholder="Enter the name of the actor*"
                    type="text"
                    onChange={updateQuery}
                />
                <button className="btn btn-success  mt-2" type="submit"> &#43; </button>
                <Stack direction="row" spacing={1} className="stack">
                    {searches.map((x,index) =>{
                        return(
                            <>
                            <Chip key={index} label={x} onDelete={()=>deleteRow(index)}/>
                            </>
                        )
                    })}
                </Stack>
            </form>
            <form onSubmit={Show}>
                    <label><i className="fa fa-heading"></i> Title</label>
                        <input
                            name=""
                            className="form-control"
                            placeholder="Enter title name*"
                            type="text"
                            onChange={(e)=>settitle(e.target.value)}
                        />
                    <label><i className="fa fa-sort-amount-up"></i> Description</label>
                        <textarea
                            name=""
                            className="form-control"
                            placeholder="Enter description max-characters 500*"
                            type="text"
                            rows="7"
                            maxLength={500}
                            onChange={(e)=>setdescription(e.target.value)}
                        />
                    <label><i className="fa fa-calendar-alt"></i> Date</label>
                        <input
                            name=""
                            className="form-control"
                            placeholder="Select date*"
                            type="date"
                            onChange={(e)=>setrelease(e.target.value)}
                        />

                    <input type="checkbox"  checked={published} onChange={e => setpublished(e.target.checked)}/>
                    <label> Published</label><br/>

                    <label><i className="fa fa-globe"></i> Select Country</label>
                    <Select className="form-control p-0" isMulti options={countries} placeholder="Select Country*" onChange={handle}></Select>

                    <label><i className="fa fa-globe"></i> Select Tags</label>
                    <Select className="form-control p-0" isMulti options={Listtags} placeholder="Select Tags*" onChange={handletag}></Select>

                    <label><i className="fa fa-phone"></i> Device</label><br/>
                    <AsyncSelect
                    isMulti
                        cacheOptions
                        defaultOptions
                        getOptionLabel={e => e.label}
                        getOptionValue={e => e.label}
                        loadOptions={option_device}
                        onChange={handledevice}
                        placeholder='Select device*'
                    />

                    {/*select catgeory id */}
                    <label><i className="fa fa-caret-square-down"></i> Select Category</label><br/>
                    <AsyncSelect
                        cacheOptions
                        defaultOptions
                        value={selectedValue}
                        getOptionLabel={e => e.title}
                        getOptionValue={e => e._id}
                        loadOptions={loadOptions}
                        onChange={handleChange}
                        placeholder='Select catgeory*'
                    />

                    <label><i className="fa fa-caret-square-down"></i> Select Sub Category</label><br/>
                    <AsyncSelect
                        isMulti
                        cacheOptions
                        defaultOptions
                        getOptionLabel={e => e.title}
                        getOptionValue={e => e._id}
                        loadOptions={loadsubcategory}
                        onChange={handleChangesub}
                        placeholder='Select sub catgeory*'
                    />
                    <input type="checkbox" value="true" onChange={(e)=>setcensor(e.target.checked)}/>
                    <label>Censor</label><br/>

                    <label><i className="fa fa-venus"></i> Genre</label><br/>
                    <Select className="form-control p-0" isMulti options={Listgenre} placeholder="Select Genre*" onChange={handlegenre}></Select>


                    <input type="checkbox"  checked={videoAvailable} onChange={e => setvideoAvailable(e.target.checked)}/>
                    <label> Vedio Available</label><br/>

                    <label><i className="fa fa-percentage"></i> Age Group</label>
                        <input
                            name=""
                            className="form-control"
                            placeholder="Enter age gorup*"
                            type="text"
                            onChange={(e)=>setageGroup(e.target.value)}
                        />

                    <label><i className="fa fa-user"></i> Director</label>
                        <input
                            name=""
                            className="form-control"
                            placeholder="Enter director name*"
                            type="text"
                            onChange={(e)=>setdirector(e.target.value)}
                        />
                     <label><i className="fa fa-film"></i> Production</label><br/>
                        <input
                            name=""
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
                            className="form-control m-0"
                            type="file"
                            onChange={(e)=>setportraitPosterIdSmall(e.target.files[0])}
                        />

                    <label><i className="fa fa-film"></i> Portrait Poster Normal (300 x 450)</label>

                        <input
                            className="form-control"
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
                            className="form-control"
                            type="file"
                            onChange={(e)=>setlandscapePosterIdSmall(e.target.files[0])}
                        />

                    <label><i className="fa fa-film"></i> Landscape Poster Normal (1920 x 1080)</label>

                        <input
                            className="form-control"
                            type="file"
                            onChange={(e)=>setlandscapePosterIdNormal(e.target.files[0])}
                        />

                    <label><i className="fa fa-film"></i>Web Landscape Poster Normal (1920 x 1080)</label>

                    <input
                        className="form-control"
                        type="file"
                        onChange={(e)=>setweblandscapePosterIdNormal(e.target.files[0])}
                    />
                    <label><i className="fa fa-film"></i> Trailer</label>

                        <input
                            name=""
                            className="form-control"
                            placeholder="Enter trailer url*"
                            type="text"
                        onChange={(e)=>settrailerFileUrl(e.target.value)}
                        />
                     <label><i className="fa fa-users"></i>Free Trailer</label>
                        <input
                            name=""
                            //value={common1}
                            className="form-control"
                            placeholder="Enter path for Free Trailer"
                            type="text"
                            onChange={(e)=>setTrailerObj({...trailerObj,freeTrailer:e.target.value})}
                        />
                        <label><i className="fa fa-users"></i>Paid Trailer</label>
                        <input
                            name=""
                           // value={common1}
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

                    <button type="submit"className='btn btn-primary mt-2'> Upload</button>
                    <Link to="/content"> <button className='btn btn-danger mt-2' style={{'marginLeft': '10px'}}>Back </button></Link>
            </form>
        </div>
        </>
    )
}

export default Addcontentchild
