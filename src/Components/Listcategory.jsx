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
    useNavigate,
  } from "react-router-dom";
import Instance from '../Objects/Axios';
import alertinstance from '../Objects/Alert';
import Refresh from '../Objects/Refresh';
import Spin from './Spinner/Spin';
import Dragsubcategory from './Dnd/Dragsubcategory';
function Listcategory({icon}){
  let navigate = useNavigate();
  const [list, setList]= useState([]);
  const[sublist,setsublist]=useState([]);
  const [loading,setloading]=useState(false)
  useEffect(() => {
    const exec=()=>{
      getCategory();
      getSubcategory();
    }
    return exec()
  },[])
  
  //for listing all the catgeory along with its description
  function getCategory(){
          Instance.get('/listCategory')
            .then((response) => {
              //handle success
              setList(response.data.data)
             }).catch(err=>{
              if(err.response.status === 403){
                localStorage.clear()
                navigate('/login/error?message=session token expired please login again !')
              }
             })
  }

  function getSubcategory(){
      Instance.get('/listSubcategory')
        .then((res) => {
          //handle success
          setsublist(res.data.data)
      }).catch(err=>{
        if(err.response.status === 403){
          localStorage.clear()
          navigate('/login/error?message=session token expired please login again !')
        }
       })
  }
 
  //api call for deleting main catgeory using id parameter 
  function DeleteCategory(del_id){
          setloading(true)
          Instance.delete('/deleteCategory?categoryId='+`${del_id}`)
            .then((response) => {
              setloading(false)
              //handle success
              alertinstance(response);
              Refresh()
             })
    }
    //api for deleting sub catgeory using id parameter 
    function DeleteSubCategory(y){
      setloading(true)
      let data = {
        subcategoryId : y
      }
        const params = JSON.stringify(data)
        Instance.post('/deleteSubCategory',params)
          .then((response) => {
            setloading(false)
            //handle success
            alertinstance(response);
            Refresh()
           }).catch(err=>{
            setloading(false)
            console.log(err)
           })
  }
 
  return(
    <>{!loading ? '':<Spin/>}
            <div className='content'>
             <div className="alert alert-primary">  <i className="fa fa-bars" onClick={icon}></i>
                <span className='leftpush'> Categories</span>
              </div>
              <p className='path p-3 mt-2'>Home / Categories / </p>

              <button className='btn btn-danger mt-3'  onClick={()=>{navigate("/category/add")}}><i className="fa fa-plus"></i> Add category</button>
              
              <p className='pt-2 pb-2'><b>Category</b></p>
              <table className="table table-striped">
                    <thead>
                      <tr>
                      <th scope="col">No</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Update</th>
                      </tr>
                    </thead>
                    <tbody>
                    {list.map((q,index)=>{
                            return(                              
                                <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{q.title}</td>
                                <td>{q.description}</td>
                                <td><i className="fa fa-trash" onClick={()=>DeleteCategory(q._id)}></i></td>
                                <td><i className="fa fa-edit" onClick={()=>{
                                                navigate("/category/"+`${q._id}`+'/'+`${q.title}`)
                                            }}></i></td>
                                </tr>
                            )})} 
                    </tbody>
                </table><br/>
                <button className='btn btn-danger mt-2'  onClick={()=>{navigate("/subcategory/add")}}><i className="fa fa-plus"></i> Add sub category</button>
                <p className='pt-2 pb-2'><b>Sub Category</b>(Drag and Drop subcategories to update rank)</p>
                {/* <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th scope="col">Delete</th>

                        <th scope="col">Update</th>
                      </tr>
                    </thead>
                    <tbody>
                   {sublist.map((x,index)=>{
                     return(
                       <tr key={index}>
                       <th scope="row">{x.rank}</th>
                        <td>{x.title}</td>
                        <td>{x.description}</td>
                        <td>{x.active ? "Active":"Inactive"}</td>
                        <td><i className="fa fa-trash" onClick={()=>DeleteSubCategory(x._id)}></i></td>
                        <td><i className="fa fa-edit" onClick={()=>{navigate("/subcategory/"+`${x._id}`+'/'+`${x.title}`)}}></i></td>
                       </tr>
                     )
                   })}
                    
                    </tbody>
                </table> */}
               <Dragsubcategory data={sublist}/>
            </div>
            </>
        )
                
}
export default Listcategory;

