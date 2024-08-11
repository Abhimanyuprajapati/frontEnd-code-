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
import '../css/content.css';
import MultipartAPI from '../Objects/MultipartAPI';
import {
    useNavigate,
    useParams,
    useSearchParams
  } from "react-router-dom";
import '../css/upcomming.css';
import { mdiCloudDownload } from '@mdi/js';
import { mdiVideoPlus } from '@mdi/js';
import { mdiFolderPlay } from '@mdi/js';
import Icon from "@mdi/react";
import { mdiMovieEdit } from '@mdi/js';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const static_url = process.env.REACT_APP_CDN_STATIC;
const Addcontentmodule = ({icon}) => {
const [query,setQuery]=useSearchParams();
 //initialize contentId for updating content
 const [contentId,setcontentId]=useState('');
 const [contentName,setcontentName]=useState('');
 const [len,setlen]=useState(0)
 const [page,setpage]=useState(1);
 const [container, setcontainer] = useState([])
const [handler,sethandler]=useState([])
const [startindex,setstartindex]=useState(0)
const [endindex,setendindex]=useState(10)
    //for navigation of pages 
    let navigate = useNavigate();
    const [hide,sethide]=useState(false)
    const [listnew,setlistnew]=useState([]);
    const [awsStaticResourcePath, setAwsStaticResourcePath] = useState('')
    const [raw,setRaw]=useState([])
    //for multiple value fetch using single async select tag
    //api call for listing existing content from database
    useEffect(()=>{
      let para = query.get("tab");
        MultipartAPI.get('/listContents')
        .then(res=>{
            const rev = res.data.data.reverse()
            sethandler(rev)
            transform(rev)
            handlePaginationHelp(rev,para)
            setRaw(rev)
          }).catch(err=>{
            if(err.response.status === 403){
              localStorage.clear()
              navigate('/login/error?message=session token expired please login again !')
            }
          })

       },[query])
    const transform =(data)=>{
        var rem;
        var n = data.length
        rem = n % 10;
        if(rem > 0){
          n = n + (10-rem)
        }else{
          n=n-rem
        }
        setlen(n/10)
        setcontainer(data.slice(startindex,endindex))
      }
    const [hover,sethover]=useState(false);
    const checkcontent=(contentId,contentName,categoryName,awsStaticResourcePath)=>{
        if(categoryName === 'Movies'){
            sethide(!hide)
            sethover(hover)
            setcontentId(contentId)
            setcontentName(contentName)
            setAwsStaticResourcePath(awsStaticResourcePath)
        }else{
            sethide(hide)
            sethover(!hover)
            setcontentId(contentId)
            setcontentName(contentName)
            setAwsStaticResourcePath(awsStaticResourcePath)
        }
      }

      const handleChange=(e,value)=>{
        setpage(value)
        if(value === 1){
          const dd  = handler.slice(0,10)
          setcontainer(dd)
        }else{
          const dd1  = handler.slice(value*10 - 10 , value*10)
          setcontainer(dd1)
        }
       handlePaginationHelp(handler,value)
      }
      const handlePaginationHelp=(data,value)=>{
        setpage(value)
        if(value === 1){
          const dd  = data.slice(0,10)
          setcontainer(dd)
        }else{
          const dd1  = data.slice(value*10 - 10 , value*10)
          setcontainer(dd1)
        }
        navigate(`/content?tab=${value}&return=true`)
      }
    
      const handleSearch=(e)=>{
        let key = e.target.value;
        var filData  = raw.filter(x=>{
          if(x.title.toUpperCase().includes(key.toUpperCase())){
            return x
          }
        })

        if(key.length > 0){
          transform(filData)
        }else if(key.length === 0){
          transform(raw)
        }
      }
      
    return (
        <div className="content poster">
        <div className="alert alert-primary">  <i className="fa fa-bars" onClick={icon}></i>
                <span className='leftpush'>All Contents</span>
        </div>
        <p className='path p-3 mt-2'>Home / Contents / </p>
            <button className='btn btn-danger mt-2'  onClick={()=>{navigate("/content/add")}}><i className="fa fa-plus"></i> Add content</button>
            {/*for listing content  */}
            
            <div className='search_div'>
            <i className='fa fa-search abs'></i>
              <input type='text'
              className='form-control mt-2 mb-2 abs'
              placeholder="Search Content Name Here*"
              onChange={handleSearch}/>
            </div>
            <div className={hover ? 'list shadow':'listnone shadow'}>
            <li onClick={()=>{navigate("/seasons/"+`${contentName}`+'/'+`${contentId}`+'/'+`${awsStaticResourcePath}?return=true&tab=${page}`)}}>
                <Icon path={mdiFolderPlay} title="Dog"  className="mdicon" />  <span>View Seasons</span></li><br/>
                <li onClick={()=>{navigate(`/content/update/${contentId}/${contentName}?return=true&tab=${page}`)}}> 
                <Icon path={mdiMovieEdit} title="Dog"  className="mdicon" /> <span>Update Content</span></li>
            </div>
            <div className={hide ? 'list shadow':'listnone shadow'}>
           
            <li onClick={()=>{navigate('/videos/'+`${contentId}`+'/'+`${contentName}`)}} >
            <Icon path={mdiFolderPlay} title="Dog"  className="mdicon" /> <span>View Videos</span></li><br/>
            <li onClick={()=>{navigate('/videos/add/'+`${contentId}`+'/'+`${contentName}`)}} > 
            <Icon path={mdiVideoPlus} title="Dog"  className="mdicon" />  <span>Add Video</span></li><br/>
            <li onClick={()=>{navigate(`/content/update/${contentId}/${contentName}?return=true&tab=${page}`)}}> 
            <Icon path={mdiMovieEdit} title="Dog"  className="mdicon" /> <span>Update Content</span></li><br/>
            <li onClick={()=>{navigate('/download/videos/'+`${contentId}`+'/'+`${contentName}`)}}> 
            <Icon path={mdiCloudDownload} className="mdicon"  title="Dog" /> <span>View downloaded Videos</span></li>
            </div>

            <table className="table table-striped mt-2">
                <thead>
                    <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Thumbnail</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Director</th>
                    <th scope="col">Release Date</th>
                    <th scope="col">Status</th>
                    <th scope="col"> Option</th>
                    </tr>
                </thead>
                <tbody>
            {container.map((q,index)=>{
                            return(
                                            <tr key={index + 1} id={`${q._id}`}>
                                                <td>{index + 1}</td>
                                                <td><img style={{'width':'320px' , 'height':'200px'}} src={ static_url +'/' +q.awsStaticResourcePath+'/'+q.landscapePosterIdNormal}/> 
                                                <br/>
                                                <p>views - {q.statitics.map(x => { return (<>{x.numViews}</>)})}</p>
                                                </td>
                                                <td>{q.title}</td>
                                                <td>{q.categoryName}</td>
                                                <td>{q.director}</td>
                                                <td>{q.releaseDate}</td>
                                                <td id="status">{q.published ? <span><i class="fa fa-check success"></i> Published</span> : 
                                                <span><i className="fa fa-exclamation failure"></i>Unpublished</span>}</td>
                                                <td>
                                                <i className="fa fa-ellipsis-h ms-4" 
                                                onClick={() => checkcontent(q._id,q.title,q.categoryName,q.awsStaticResourcePath)}></i>
                                               </td> 
                                               
                                            </tr>
                                        )
                                        
                            })}
                </tbody>
            </table>
          <div className="numbers">
          <Stack spacing={2}>
            <Pagination count={len} page={page} onChange={handleChange}  variant="outlined" shape="rounded" />
          </Stack>
        
      </div>
        </div>
    )
}

export default Addcontentmodule
