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
import alertinstance from '../Objects/Alert';
import Spin from './Spinner/Spin';

const Updateseasonschild = ({icon}) => {
    //taking parameter from URL
   let {seasonId} = useParams();
   let {contentId} = useParams();
   let {contentName} = useParams();
   let {seasonName} = useParams();
   let {awsStaticResourcePath} = useParams()
    let navigate = useNavigate();
   
    //defining intial state for users and server request 
    const [updatedseason,setupdatedseason]=useState('');
    const [loading,setloading]=useState(false)
    useEffect(()=>{
        getseason()
    },[])
    const getseason=()=>{
        const data = {
            contentId : contentId
        }
        sampler.post('/listSeason',data)
        .then(res =>{
            call(res.data.data)
        })
    }
    const call =(values)=>{
        for (var index = 0; index < values.length; index++) {
            if (values[index].seasonId === seasonId) {
               setupdatedseason(values[index].seasonName)
            }
         }
       }
   //for updating season
    const update=(e)=>{
        e.preventDefault();
        setloading(!loading)
        let replace = updatedseason.split(' ').join('_');
        const ee = replace;
        const season = {seasonName:updatedseason,localizationKey:ee}
        const params = {contentId,seasonId,season}
        sampler.post('/updateSeason',params)
        .then(res=>{
            setloading(false)
            alertinstance(res)
            setTimeout(() => {
                navigate(`/seasons/${contentName}/${contentId}/${awsStaticResourcePath}`)
            }, 1500);
        })
        .catch(err=>{
            setloading(false)
            console.log(err);
        })
    }

    return (
        <>{!loading ? '':<Spin/>}
        <div className="content">
            <div class="alert alert-primary">  <i class="fa fa-bars" onClick={icon}></i>
        </div>
        <p className='path p-3 mt-2'>{contentName} / {seasonName} -- Update</p>
            {/*tabs for updating seasons */}
            <form onSubmit={update}>
                <label>Season Name</label>
                        <input
                            name=""
                            value={updatedseason}
                            className="form-control"
                            placeholder="enter seasons name"
                            type="text"
                            onChange={e =>setupdatedseason(e.target.value)}
                        />
                <button type="submit" className='btn btn-primary mt-2'>update season</button>
                <Link to={"/seasons/"+contentName+'/'+contentId+'/'+awsStaticResourcePath}> <button className='btn btn-danger mt-2' style={{'marginLeft': '10px'}}>Back </button></Link>

            </form>
        </div>
        </>
    )
}

export default Updateseasonschild
