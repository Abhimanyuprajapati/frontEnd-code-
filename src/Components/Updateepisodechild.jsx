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
import React, { useState,useEffect} from 'react';
import '../css/Promotion.css';
import '../css/episodes.css';
import MultipartAPI from '../Objects/MultipartAPI';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useNavigate , useParams,Link} from 'react-router-dom';
import alertinstance from '../Objects/Alert';
import sampler from '../Objects/axiosjson';
import Spin from './Spinner/Spin';
const Updateepisodechild = (props) => {
    const [episodename, setepisodename] = useState('')
    const [desc, setdesc] = useState('')
    const [landscapeposter, setlandscapeposter] = useState('')
    const [weblandscapeposter, setweblandscapeposter] = useState('')
    const [duration, setduration] = useState('')
    const [query,setQuery]=useState([]);
    const [searches,setSearches]=useState([]);
    const [loading,setloading]=useState(false)
    //navigation
    let {contentId} = useParams()
    let {seasonId} = useParams()
    let{episodeId}=useParams()
    let{episodeName}=useParams()
    let {contentName} = useParams()
    let {seasonName} = useParams()
    let {awsStaticResourcePath} = useParams()
    let navigate = useNavigate();
     //for refreshing page to view new content\
     const data ={
        contentId : contentId,
        seasonId : seasonId
    }
    useEffect(()=>{
        sampler.post('/listEpisodes',data)
        .then(res=>{
            call(res.data.data)
          })
    },[])
     const call =(values)=>{
        for (var index = 0; index < values.length; index++) {
            if (values[index]._id === episodeId) {
               setepisodename(values[index].name)
               setdesc(values[index].description)
               const result = new Date(values[index].duration * 1000).toISOString().slice(11, 19);
               setduration(result)
               //setduration(values[index].duration)
               setSearches(values[index].casts)

            }
         }
       }
    
    //adding actors or cast
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

    //adding episodes to season -> content
    const addepisode=(e)=>{
        e.preventDefault();
        var a = duration.split(':'); // split it at the colons
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
        setloading(!loading)
        const hold = {
            'name':episodename,
            'description':desc,
            'casts':searches,
            'duration':seconds,
            'contentId':contentId,
            'seasonId':seasonId,
            'episodeId':episodeId
        }
        const formdata = new FormData();
        const formText = JSON.stringify(hold)
        formdata.append('formText',formText);
        formdata.append('landScapePoster',landscapeposter);
        formdata.append('weblandScapePoster',weblandscapeposter);
        //api call
        MultipartAPI.post('/updateEpisode',formdata)
        .then(res =>{
            setloading(false)
           alertinstance(res)
           setTimeout(() => {
            navigate('/episodes/'+`${contentName}`+'/'+`${contentId}`+'/'+`${seasonName}`+'/'+`${seasonId}`+'/'+awsStaticResourcePath)
           }, 1500);
        }).catch(err=>{
            setloading(!loading)
            console.log(err)
        })
    }
   

    return (
        <>{!loading ? '':<Spin/>}
        <div className='episode content'>
            <p className='path p-3 mt-2'><i class="fa fa-bars ph-3" onClick={props.icon}></i> {contentName} / {seasonName} / {episodeName} -- update</p>
             <form onSubmit={submitHandler}>
           
            <label><i className="fa fa-plus"/>Add Actors</label>
            <input
              id="select"
               required
                className="form-control"
                placeholder="Enter name of the actors*"
                type="text"
                onChange={updateQuery}
            />
            <button className="btn btn-primary mt-2" type="button" onClick={handleClick}> Add </button>
            <Stack direction="row" spacing={1} className="stack">
                {searches.map((x,index) =>{
                    return(
                        <>
                        <Chip label={x} onDelete={()=>deleteRow(index)}/>
                        </>
                    )
                })}
            </Stack>
           
             </form>
             <form onSubmit={addepisode}>
                <label><i className="fa fa-heading"/>Episode Name</label>
               
                    <input
                    value={episodename}
                    className="form-control"
                    placeholder="Enter title*"
                    type="text"
                    onChange={(e)=>setepisodename(e.target.value)}
                    />
               
               <label> <i className="fa fa-tag"/>Episode Description</label>
              
                    <input
                    value={desc}
                    className="form-control"
                    placeholder="Enter description*"
                    type="text"
                    onChange={(e)=>setdesc(e.target.value)}
                    />
               
               
               <label><i className="fa fa-heading"/>Landscape Poster (1920 x 1080)</label>
               
                    <input
                    name=""
                    className="form-control"
                    placeholder="Select poster*"
                    type="file"
                    onChange={(e)=>setlandscapeposter(e.target.files[0])}
                    />
                <label><i className="fa fa-heading"/>Web Landscape Poster</label>
                    <input
                    className="form-control"
                    type="file"
                    onChange={(e)=>setweblandscapeposter(e.target.files[0])}
                    />
               <label><i className="fa fa-heading"/>Duration</label>
               
                    <input
                    value={duration}
                    className="form-control"
                    placeholder="Enter duration in minutes*"
                    type="time"
                    step={1}
                    onChange={(e)=>setduration(e.target.value)}
                    />
               
               <button className='btn btn-primary mt-2' type='submit'>Submit</button>
               <Link to={"/episodes/"+contentName+'/'+contentId+'/'+seasonName+'/'+seasonId+'/'+awsStaticResourcePath}> <button className='btn btn-danger mt-2' style={{'marginLeft': '10px'}}>Back </button></Link>
              </form>
              
        </div>
        </>
    )
}

export default Updateepisodechild
