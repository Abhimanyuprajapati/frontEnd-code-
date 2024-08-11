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

import React, {useState,useEffect} from 'react';
import '../css/category.css';
import {
    BrowserRouter as Router,
    Link,
    useNavigate,
    useParams
  } from "react-router-dom";
import Instance from '../Objects/Axios';
import alertinstance from '../Objects/Alert';
import { posterTypeOptions } from '../Objects/Country';
import Select from 'react-select';
import Spin from './Spinner/Spin';
const UpdateSubCategory = ({icon}) => {
    //object navigate
    let navigate= useNavigate();
    //url useparams
    let {subcategoryId} = useParams();
    let {subcategoryName} = useParams();
    ///initialization
    const [upsubtitle,setupsubtitle]= useState("");
    const [upsubdescription,setupsubdescription]=useState("");
    const [notify,setnotify] = useState("");
    const [weight,setweight]=useState(1);
    const [loading,setloading]=useState(false)
    const [active,setActive]=useState(true)
    const [posterType,setposterType]=useState({value:'horizontal',label:'Horizontal'});
    useEffect(()=>{
        Instance.get('/listSubcategory')
        .then((res) => {
            call(res.data.data)
         })
    },[])

    const call =(values)=>{
        for (var index = 0; index < values.length; index++) {
            if (values[index]._id === subcategoryId) {
               setupsubtitle(values[index].title)
               setupsubdescription(values[index].description)
               setweight(values[index].rank)
               setActive(values[index].active)
               setposterType({value:values[index].poster_type,label:values[index].poster_type})
            }
         }
       }
    //api call for updating sub category 
    function Updatesubcategory(e){
        e.preventDefault()
        setloading(!loading)
        var token = localStorage.getItem('token');
        let convert = upsubtitle.split(' ').join('_');
        let localisationKey = convert;
        let subcategory = [{
            "title":upsubtitle,
            "localisationKey":localisationKey,
            "description":upsubdescription,
            "rank":weight,
            "active":active,
            "poster_type":posterType.value
        }];
        const data = {subcategoryId,subcategory};
          const params = JSON.stringify(data)
          Instance.post('/editSubCategory',params)
            .then((res) => {
                setloading(false)
              //handle success
             alertinstance(res)
             setTimeout(() => {
                navigate("/category");
             }, 1500);
             })
            .catch(err=>{
                console.log(err)
            })
    }
    const handletype = (e) =>{
        setposterType({value:e.value,label:e.label})
      }
    return (
        <>{!loading ? '':<Spin/>}
        <div className="category content">
         <div class="alert alert-primary">  <i class="fa fa-bars" onClick={icon}></i>
                <span className='leftpush'> you are updating {subcategoryName} </span>
                </div>
            <form onSubmit={Updatesubcategory}>
                                    <label><i class="fa fa-heading"/> Sub Category Title</label>
                                    <input
                                        name=""
                                        value={upsubtitle}
                                        className="form-control"
                                        placeholder="Enter title*"
                                        type="text"
                                        onChange={(e)=>setupsubtitle(e.target.value)
                                        }
                                    />
                                    <label><i class="fa fa-heading"/> Sub Category Description</label>
                                    <textarea
                                        name=""
                                        value={upsubdescription}
                                        className="form-control"
                                        placeholder="Enter description*"
                                        type="text"
                                        onChange={(e)=>setupsubdescription(e.target.value)}
                                        rows="4" cols="50"
                                    />
                                    <input type="checkbox"  checked={active} onChange={e => setActive(e.target.checked)}/>
                                    <label>Active</label><br/>
                            <label><i className="fa fa-calendar-alt"></i> Rank</label>
                            <input className="form-control" placeholder="Enter Weight*" type="number" value={weight} onChange={(e)=>setweight(e.target.value)}/>
                            <label><i className="fa fa-heading"></i> Poster Type</label>
              <Select className=" p-0" options={posterTypeOptions} value={posterType} placeholder="Select Poster Type" onChange={handletype}></Select>
                            <button type="submit" className="btn btn-primary mt-2">Submit</button>
                            <Link to="/category"> <button className='btn btn-danger mt-2' style={{'marginLeft': '10px'}}>Back </button></Link>
                    </form>
       
        </div>
        </>
    )
}

export default UpdateSubCategory
