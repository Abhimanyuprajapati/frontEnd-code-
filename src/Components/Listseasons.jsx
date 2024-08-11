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
import {
    useNavigate,
    useParams,
    Link
  } from "react-router-dom";
  import sampler from '../Objects/axiosjson';
  import alertinstance from '../Objects/Alert';
  import Refresh from '../Objects/Refresh';
  import { useSearchParams } from 'react-router-dom';
const Listseasons = ({icon}) => {
   let navigate = useNavigate();
   let {contentId} = useParams();
   let {contentName} = useParams();
   let {awsStaticResourcePath} = useParams();
   const [bucket,setbucket]=useState([]);
   const [para,setPara]=useSearchParams();
   const [page,setPage]=useState();
   const data = {
       contentId : contentId
   }
    useEffect(()=>{
        setPage(para.get("tab"));
        sampler.post('/listSeason',data)
        .then(res =>{
            setbucket(res.data.data)
        }).catch(err=>{
            console.log(err)
        })
    },[])
    const[hover,sethover]=useState(false)
    const[seasonId,setseasonId]=useState('')
    const[seasonName,setseasonName]=useState('')
    const toggleDropdown =(x,y)=> {
        sethover(!hover);
        setseasonId(x)
        setseasonName(y)
       }
       const deleteSeason=(seasonId)=>{
           sampler.delete('/deleteSeason?contentId='+`${contentId}`+'&&'+'seasonId='+`${seasonId}`)
           .then(res=>{
               alertinstance(res)
               Refresh()
           }).catch(err =>{
               console.log(err)
           })
       }
    return (
        <div className="content">
             <div class="alert alert-primary">  <i class="fa fa-bars" onClick={icon}></i>
                <span className='leftpush'> All Seasons</span>
            </div>
            <Link to={"/seasons/add/"+contentName+'/'+`${contentId}`+'/'+awsStaticResourcePath}><button className='btn btn-success'><i className="fa fa-plus"></i> Add Season</button></Link>
            <Link to={`/content?tab=${page}&return=true`}> <button className='btn btn-danger' style={{'marginLeft': '10px'}}>Back </button></Link>

            <p className='path p-3 mt-2'>{contentName} / </p>

            <div className={hover ? 'list shadow':'listnone shadow'}>
            <li onClick={()=>{navigate("/episodes/"+`${contentName}`+'/'+`${contentId}`+'/'+`${seasonName}`+'/'+`${seasonId}`+'/'+`${awsStaticResourcePath}`)}}><i className='fa fa-eye'></i> View Episodes</li>
            <li onClick={()=>{navigate("/episodes/addepisode/"+`${contentName}`+'/'+`${contentId}`+'/'+`${seasonName}`+'/'+`${seasonId}`+'/'+awsStaticResourcePath)}}><i className='fa fa-plus'></i> Add Episode</li>
            <li onClick={()=>{navigate("/seasons/update/"+`${contentName}`+'/'+`${contentId}`+'/'+`${seasonId}`+'/'+`${seasonName}`+'/'+awsStaticResourcePath)}}><i className='fa fa-edit'></i> Update Season</li>
            {/*<li onClick={()=>{navigate("/seasons/"+`${contentId}`+`${seasonId}`)}}>1. view episodes</li>*/}
            </div>

            <table className="table mt-2">
            <thead>
                <tr>
                <th scope="col">No.</th>
                <th scope="col">Season Name</th>
                <th scope="col">Episodes</th>
                <th scope="col">Delete</th>
                <th scope="col">Option</th>
                </tr>
            </thead>
            <tbody>
            {
               bucket.map( (x,index) =>{
                   return(
                       <>
                       <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{x.seasonName}</td>
                        <td>{x.epiodeLength}</td>
                        <td><i className="fa fa-trash" onClick={()=>deleteSeason(x.seasonId)}></i></td>
                        <td><i className="fa fa-ellipsis-h" onClick={() => toggleDropdown(x.seasonId,x.seasonName)}></i></td>
                        </tr>
                       </>
                   )
               })
           }
                
            </tbody>
            </table>

        </div>
    )
}

export default Listseasons
