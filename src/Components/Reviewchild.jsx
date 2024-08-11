import React,{useState,useEffect} from 'react'
import Select from 'react-select';
import'../css//Review.css';
const Reviewchild = ({icon}) => {
    const [platform,Setplatform] = useState([]);
    const [feedback,Setfeedback] = useState('');
    //for devices filtered 
    var data_device = [
        {
            value:0,
            label:'Android TV'
        },
        {
            value:1,
            label:'Android Phone'
        },
        {
            value:2,
            label:'iphone'
        },
        {
            value:3,
            label:'PC/MAC'
        },
        {
            value:4,
            label:'AppleTV'
        },
        {
            value:5,
            label:'FireTV'
        },
        {
            value:6,
            label:'All'
        }
    ];
    const handle = (e) =>{
        Setplatform(Array.isArray(e)?e.map(x=>x.label):[]);
    }
    const mystyle = {
        padding: "15px 0px",
        fontFamily: "Arial"
      };
  return (
    <div class="content">
        <p> <i className="fa fa-bars" onClick={icon} style={{"font-size":"18px",'margin': '10px 10px'}}></i> Review &#x26; Ratings</p>
        <Select isMulti  className="form-select p-0" options={data_device}  onChange={handle} placeholder="select supported platform"></Select>
        {platform}

       {/* <div className="container" style={mystyle}>

            <div className='col-md-3'>     
            <Rating name="size-medium" defaultValue={1} /> 
            </div>
            <div className='col-md-3'>
            <Rating name="size-medium" defaultValue={2} /> 
            </div>
            <div className='col-md-3'>
            <Rating name="size-medium" defaultValue={3} />  
            </div>
            <div className='col-md-3'>
            <Rating name="size-medium" defaultValue={4} />    
            </div>
            <div className='col-md-3'>
            <Rating name="size-medium" defaultValue={5} /> 
            </div>
  </div>*/}
        <label><i className="fa fa-heading"></i> Feedback</label>
                        <input
                            name=""
                            className="form-control"
                            placeholder="enter description"
                            type="text"
                            onChange={(e)=>Setfeedback(e.target.value)}
                        />
        <table className="table mt-2">
        <thead>
            <tr>
                <th scope="col">Date</th>
                <th scope="col">Country</th>
                <th scope="col">Platform</th>
                <th scope="col">Username</th>
                <th scope="col">Comment</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">12-43-2232</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
            </tr>
          
        </tbody>
        </table>
    </div>
  )
}

export default Reviewchild