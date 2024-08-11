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

import React, { Component, useState,useEffect} from 'react';
import '../css/category.css';
import {
    BrowserRouter as Router,
    Link,
    useNavigate,
    useParams
  } from "react-router-dom";
import Instance from '../Objects/Axios';
import alertinstance from '../Objects/Alert';
import AsyncSelect from 'react-select/async';
import Spin from './Spinner/Spin';
const UpdateCategory = ({icon}) => {
    //object of navigate
    let navigate = useNavigate();

    //fetching value from url parameter
    let {categoryName} = useParams();
    let {categoryId} = useParams();

    //initialization of keys
    const [uptitle,setuptitle]= useState("");
    const [updescription,setupdescription]=useState("");
    const [list,setlist]=useState([])
    const [loading,setloading]=useState(false)
    const [subcategoryy,setsubcategory]=useState([]);

    useEffect(()=>{
        Instance.get('/listCategory')
        .then(res => {
          call(res.data.data)
         })

    },[])
    const loadsubcategory = () =>{
        return Instance.get('/listSubcategory').then(res => res.data.data )
    }
    const handleChangesub = (e) => {
        setsubcategory(Array.isArray(e)?e.map(x=>x):[])
    }
    const call =(values)=>{
        for (var index = 0; index < values.length; index++) {
            if (values[index]._id === categoryId) {
               setuptitle(values[index].title)
               setupdescription(values[index].description)
               setsubcategory(values[index].subcategory)
            }
         }
       }
    //api call for updating category
    function addSubCategory(e){
        e.preventDefault();
        var arr=[];
        subcategoryy.map(x=>{
            arr.push(x._id)
        })
        const params ={
            categoryId:categoryId,
            subCategoryId:arr
        }
        Instance.post('/addSubcategoryToCategory',params)
        .then(res=>{
            alertinstance(res)
            refresh()
        }).catch(err =>{
            console.log(err)
        })
    }
    function refresh(){
        setTimeout(()=>{
            window.location.reload();
        },[1000])
    }
    function removeSubCategory(e){
        e.preventDefault();
        var arr=[];
        subcategoryy.map(x=>{
            arr.push(x._id)
        })
        const params ={
            categoryId:categoryId,
            subCategoryId:arr
        }
        Instance.post('/deleteSubcategoryFromCategory',params)
        .then(res=>{
            alertinstance(res)
            refresh()
        }).catch(err =>{
            console.log(err)
        })
    }
    function UpdateCategory(e){
        //setloading(!loading)
        e.preventDefault()
        let category = {
            "title":uptitle,
            "description":updescription,
        };
        const data = {categoryId,category};
          const params = JSON.stringify(data)
          Instance.post('/updateCategory',params)
            .then((res) => {
            setloading(false)
            alertinstance(res)
            if(res.data.error===false){
                navigate('/category')
            }
             })
            .catch((response) =>{
              //handle error
              setloading(false)
            });
    }
    return (
        <>{!loading ? '':<Spin/>}
        <div className="category content">
             <div className="alert alert-primary">  <i className="fa fa-bars" onClick={icon}></i>
                <span className='leftpush'> you are updating {categoryName}</span>
                </div>
            <form onSubmit={UpdateCategory}>
            <label><i className="fa fa-heading"/> Title</label>
                                    <input required
                                        name=""
                                        value={uptitle}
                                        className="form-control"
                                        placeholder="Enter title *"
                                        type="text"
                                        onChange={(e)=>setuptitle(e.target.value)}
                                    />     
                                    <label><i className="fa fa-sort-amount-up"/> Description</label>
                                    <textarea required
                                        name=""
                                        value={updescription}
                                        className="form-control"
                                        placeholder="Enter description *"
                                        type="text"
                                        onChange={(e)=>setupdescription(e.target.value)}
                                        rows="4" cols="50"
                                    />
                            <button type="submit" className="btn btn-primary mt-2">Update</button>
                    </form>
                    <form>
                    <label><i className="fa fa-caret-square-down"></i>Link / Unlink Sub Category</label><br/>
                                    <AsyncSelect
                                        isMulti
                                        cacheOptions
                                        defaultOptions
                                        value={subcategoryy}
                                        defaultValue={subcategoryy}
                                        getOptionLabel={e => e.title}
                                        getOptionValue={e => e._id}
                                        loadOptions={loadsubcategory}
                                        onChange={handleChangesub}
                                        placeholder='Select sub catgeory*'
                                    />
                    <button onClick={addSubCategory} className="btn btn-primary mt-2">Link</button>
                    <button onClick={removeSubCategory} className="btn btn-primary mt-2 ml-2" style={{'marginLeft':'10px'}}>Unlink</button>
                    <Link to="/category"> <button className='btn btn-danger mt-2' style={{'marginLeft': '10px'}}>Back </button></Link>
                    </form>
        </div>
        </>
    )
}

export default UpdateCategory
