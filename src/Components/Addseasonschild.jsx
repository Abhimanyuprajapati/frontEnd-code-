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
import sampler from '../Objects/axiosjson';
import '../css/content.css';
import {
    useNavigate,
    useParams,Link
  } from "react-router-dom";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import MultipartAPI from '../Objects/MultipartAPI';
import alertinstance from '../Objects/Alert';
import Spin from './Spinner/Spin';
const Addseasonschild = ({icon}) => {
    //taking parameter from URL
    let navigate = useNavigate();
    let {contentId} = useParams();let {contentName} = useParams();
    let {awsStaticResourcePath} = useParams()
    //defining intial state for users and server request 
    const [seasonback, setseasonback] = useState([]);
    const [loading,setloading]=useState(false)
    const [updatedseason,setupdatedseason]=useState('');
    const [seasonName,setseasonName]=useState('');
    const [selectedValue, setSelectedValue] = useState({seasons:[{seasonName:'',_id:''}]});
     //for refreshing page to view new content
     const refreshPage = ()=>{
        window.location.reload();
     }
    //for listing seasons

    const display=(e)=>{
        e.preventDefault();
        let replace = seasonName.split(' ').join('_');
        const localizationKey = replace;
        let addedseasons = {seasonName,localizationKey};
        setseasonback([...seasonback,addedseasons]);
        setseasonName('');
    }
   
    //for adding season 
    const send=(e)=>{
        e.preventDefault();
        setloading(!loading)
        const seasons = seasonback;
        const params = {contentId,seasons}
        sampler.post('/addSeasons',params)
        .then(res=>{
            setloading(false)
            alertinstance(res);
            if(res.data.error === false){
                setTimeout(() => {
                    navigate('/seasons/'+`${contentName}`+'/'+`${contentId}`+'/'+awsStaticResourcePath)
            }, 1500);
            }
        })
        .catch(err=>{
            setloading(false)
            alertinstance(err);
        })
    }
    const deleteRow = (index) => {
        //let name="Mano"
        //setEmps(emps.filter(emp => emp.name !== name))
        let copy_emp=[...seasonback]
        copy_emp.splice(index,1)
        setseasonback(copy_emp)
    }
   
   const loadOptions = () => {
        return  MultipartAPI.get('/listContents').then(res => res.data.data )
    }
    const handleChange = value => {
        setSelectedValue(value);
    }

    return (
        <>{!loading ? '':<Spin/>}
        <div className="content">
            <div class="alert alert-primary">  <i class="fa fa-bars" onClick={icon}></i>
                <span className='leftpush'> Add Seasons</span>
            </div>

            <p className='path p-3 mt-2'>{contentName} / </p>
            {/*tabs for adding seasons */}
            <form onSubmit={display}>
                <label><i class="fa fa-heading"></i>Season Name</label>
                        <input
                        required
                            name=""
                            value={seasonName}
                            className="form-control"
                            placeholder="Enter Season Name"
                            type="text"
                            onChange={(e)=>setseasonName(e.target.value)}
                        />
            <button type="submit" className='btn btn-primary mt-2'>Add</button>
            </form>
            <Stack direction="row" spacing={1} className="stack">
                {seasonback.map((x,index) =>{
                    return(
                        <>
                        <Chip label={x.seasonName} onDelete={()=>deleteRow(index)}/>
                        </>
                    )
                })}
            </Stack>
            <form onSubmit={send}>
            <button type="submit" className='btn btn-primary'>Submit</button>
            <Link to={"/seasons/"+contentName+'/'+contentId+'/'+awsStaticResourcePath}> <button className='btn btn-danger' style={{'marginLeft': '10px'}}>Back </button></Link>
            </form>
           
        </div>
        </>
    )
}

export default Addseasonschild
