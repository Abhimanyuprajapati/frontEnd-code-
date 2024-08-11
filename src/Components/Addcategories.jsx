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

import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/category.css';
import Instance from '../Objects/Axios';
import { useNavigate ,Link} from 'react-router-dom';
import alertinstance from '../Objects/Alert';
import Spin from './Spinner/Spin';
const Addcategories = ({icon}) => {
    const [title,settitle]= useState("");
    const [description,setdescription]=useState("");
    const rank = 1;
    const subcategory = [];
    const [loading,setloading]=useState(false)
    let navigate = useNavigate();
    function Storecat(e){
        e.preventDefault()
        setloading(!loading)
        let replace = title.split(' ').join('_');
        let localisationKey = replace ;
        const values= {title,localisationKey,description,rank,subcategory}
        const Token = localStorage.getItem('token');
        
            const data = JSON.stringify(values);
            Instance.put('/addCategory',data)
            .then((res)=>{
                setloading(false)
                alertinstance(res)
                if(res.data.error===false){
                    navigate('/category')
                }
            }).catch((err)=>{
                setloading(false)
                console.log(err);
            })
        }
    return (
        <>{!loading ? '':<Spin/>}
        <div className="category content">
                <div class="alert alert-primary">  <i class="fa fa-bars" onClick={icon}></i>
                <span className='leftpush'> Add Category</span>
                </div>
            {/* For Add Category */}
            <form onSubmit={Storecat}>
                                    <label><i class="fa fa-heading"/> Title</label>
                                        <input 
                                        required
                                        name=""
                                        className="form-control"
                                        placeholder="Enter title *"
                                        type="text"
                                        onChange={(e)=>settitle(e.target.value)}
                                    />     
                                    <label><i class="fa fa-sort-amount-up"/> Description</label>
                                    <textarea 
                                        name=""
                                        required
                                        maxLength={200}
                                        className="form-control"
                                        placeholder="Enter description *"
                                        type="text"
                                        onChange={(e)=>setdescription(e.target.value)}
                                        rows="4" cols="50"
                                    />
                            <button type="submit" className="btn btn-primary mt-2">Add</button>
                            <Link to="/category"> <button className='btn btn-danger mt-2' style={{'marginLeft': '10px'}}>Back </button></Link>
            </form>
        </div>
        </>
    )
}

export default Addcategories
