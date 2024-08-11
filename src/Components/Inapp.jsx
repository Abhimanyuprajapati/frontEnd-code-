import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import Select from 'react-select';
const Inapp = () => {
    const create=()=>{

    }
    const arr =[
        {
            label:'130',
            value:0
        },
        {
            label:'99',
            value:1
        },

        

    ]
    const ids =[
        {
            label:'voovi.inapp.android.onetime.test',
            value:0
        },
        {
            label:'voovi.inapp.android.onetime.test',
            value:1
        }
    ]
    const handleid=(e)=>{
console.log(e)
    }
  return (
    <>
    <div className='content inapp'>

    <p className='path p-3 mt-2'>Home / In-app Package / Add</p>

    <form onSubmit={create}>
                <label>Create Product Id*</label>
                <input
                    required
                    className="form-control"
                    placeholder="Create Id"
                    type="text"
                    //onChange={updateQuery}
                />
                <div className='small p-2'>Must start with a number or lowercase letter, and can contain numbers (0-9), lowercase letters (a-z), underscores (_) and full stops (.).
<br/>You can’t change or reuse a product ID after the product has been created. </div>


                <h1>Product details </h1>
                <label>Name*</label>
                <input
                    required
                    className="form-control"
                    placeholder="Enter a name*"
                    type="text"
                    //onChange={updateQuery}
                />
                 <label>Description*</label>
                <textarea
                    required
                    className="form-control"
                    placeholder="Enter Description*"
                    type="text"
                    rows={5}
                    cols={12}
                    //onChange={updateQuery}
                />
                <h1>Price </h1>
                 <label>Default price*</label>
                 <div className='row'>
                    <div className='col-md-12' style={{'display':'flex'}}>
                    <div className='col-md-3'><Select options={arr} placeholder="select pricing template"></Select></div>
                    <div className='col-md-4' style={{'marginLeft':'10px'}}><button className='btn btn-primary'> Set Price </button></div>
                    </div>
                 </div>

                 <label>Multi Quantity*</label>
                 <input type="checkbox"></input>
                 <label>Allow users to purchase more than one of this product in a single transaction</label>
                 <div className='small'>Billing Library version 4.0+ is required to use this feature.</div>
                 
                 
               
    </form>
    <Link to="/subcription"> <button className='btn btn-danger mt-4 ml-0' style={{'marginLeft': '0px'}}>Back </button></Link>
    </div>
    </>            
  )
}

export default Inapp