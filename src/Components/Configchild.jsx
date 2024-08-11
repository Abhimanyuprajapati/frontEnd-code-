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
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import '../css/App.css';
import '../css/Home.css';
import '../css/Configchild.css';
import 'bootstrap/dist/css/bootstrap.css';
import Instance from '../Objects/Axios';
import alertinstance from '../Objects/Alert';
import Spin from './Spinner/Spin';
//main function for module
const Configchild = ({icon}) => {
  let navigate = useNavigate();
    const [cdnUrl,setcdnUrl]= useState("");
    const [apiHostname,setapiHostname]= useState("");
    const [profileCdn,setprofileCdn]=useState("")
    const [stripeAPIKey, setstripeAPIKey] = useState("")
    const [paytmMID,setpaytMID]=useState("")
    const [upiID,setupiID]=useState("")
    const [trailercdn,settrailercdn]=useState('')
    const [googleInapp,setgoogleInapp]=useState({label:'both',value:'both'})
    const [loading,setloading]=useState(false)
    const [configData,setConfigData]=useState([]);
   
    //render the content only once at a time
    useEffect(() => {
        getconfig();
        },[])

    function getconfig(){
        Instance.get('/getConfig')
        .then(function (res) {
          if(!res.data.error){
            setConfigData(res.data.list)
            res.data.list.map(x=>{
              switch(x.key){
              case "upiID":
                setupiID(x.value)
                break
              case "cdnUrl":
                setcdnUrl(x.value)
                break
              case "profileCdn":
                setprofileCdn(x.value)
                break
              case "apiHostname":
                setapiHostname(x.value)
                break
              case "stripeAPIKey":
                setstripeAPIKey(x.value)
                break
              case "paytmMID":
                setpaytMID(x.value)
                break
              case "trailerCdn":
                settrailercdn(x.value)
                break
            }
            })
          }
        }).catch(err=>{
          if(err.response){
            if(err.response.status === 403){
              localStorage.clear();
              navigate('/login/error?message=session token expired please login again !')
            }
          }
          
        })
  }

  const options =[
    {
      label:'both',
      value:'both'
    },
    {
      label:'India',
      value:'india'
    },
    {
      label:'International',
      value:'international'
    }
  ]
  const handle=(e)=>{
    setgoogleInapp(e)
  }

    const addconfig=(e)=>{
      e.preventDefault()
        const data = {
          cdnUrl :cdnUrl,
          apiHostname:apiHostname,
          profileCdn:profileCdn,
          stripeAPIKey:stripeAPIKey,
          paytmMID:paytmMID,
          upiID:upiID,
          trailerCdn:trailercdn,
          googleInapp:googleInapp.value
        }
       setloading(true)
        Instance.post('/addConfig',data)
        .then(res=> {
          setloading(false)
          alertinstance(res)
        }).catch(err=>{
          setloading(false)
        })
    }
    const handleChangeBox=(e,key)=>{
      let val = e.target.value;
      switch(key){
        case "upiID":
          setupiID(val)
          break
        case "cdnUrl":
          setcdnUrl(val)
          break
        case "profileCdn":
          setprofileCdn(val)
          break
        case "apiHostname":
          setapiHostname(val)
          break
        case "stripeAPIKey":
          setstripeAPIKey(val)
          break
        case "paytmMID":
          setpaytMID(val)
          break
        case "trailerCdn":
          settrailercdn(val)
          break

      }
    }
        return (
        <>
        {!loading ? '':<Spin/>}
        <div className="config content">
            <div className="alert alert-primary">  <i className="fa fa-bars" onClick={icon}></i>
                <span className='leftpush'> Configuration Details</span>
            </div>
            <p className='path p-3 mt-2'>Home / Configuration / </p>
            <div className="configchild">
              <form className="configform" onSubmit={addconfig}>
                    {configData.map((x,index)=>{
                      if(x.key === 'cdnUrl' || x.key === 'apiHostname' || x.key === 'profileCdn' || x.key === 'stripeAPIKey' 
                      || x.key === 'paytmMID' || x.key === 'upiID' || x.key === 'trailerCdn' ){
                        return(
                          <div className='boxes' key={index}>
                            <label>{x.key.toUpperCase()}</label>
                            <input type="text" defaultValue={x.value} onChange={(e)=>handleChangeBox(e,x.key)}/>
                          </div>
                        )
                      }else if(x.key === 'googleInapp'){
                        return(
                        <div className='boxes' key={index}>
                        <label>{x.key.toUpperCase()}</label>
                        <Select style={{'width':'400px'}} 
                        options={options} 
                        defaultValue={{label:x.value,value:x.value}}
                        placeholder="Select google in app setting*" 
                        onChange={handle}></Select>
                        </div>
                        )
                      }
                      else{
                        return(
                          <div className='boxes' key={index}>
                            <label>{x.key.toUpperCase()}</label>
                            <input type="text" value={x.value} onChange={(e)=>handleChangeBox(e,x.key)} disabled/>
                          </div>
                        )
                      }
                      
                    })}   
                    {apiHostname !== "" ?
                    <button type="submit" className='btn btn-primary mt-2'>save</button>:
                    <button type="submit" disabled className='btn btn-primary mt-2'>save</button>}
          </form>
          </div>
        </div>
        </>
    )
}

export default Configchild
