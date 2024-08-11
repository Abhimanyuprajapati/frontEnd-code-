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
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'; 
import logo from '../logo/jalva.png';
import '../css/App.css';
import sampler from '../Objects/axiosjson';
import alertinstance from '../Objects/Alert';
import Spin from './Spinner/Spin';
function App() {
  const [email,setEmail]= useState("");
  const [password,setPassword]=useState("");
  const [permission,setPermission]=useState(["Jalva"]);
  const [role,setRole]=useState("");
  const[show,setshow]=useState(false);
  const [loading,setloading]=useState(false)
  let navigate = useNavigate();
  const search = new URLSearchParams(window.location.search)
  const message = search.get("message");

//main functional component to make login API request
function login(e){
    e.preventDefault()
    setloading(true)
    const email1 = {email,password,role,permission}
    const params = JSON.stringify(email1)
    //api request
    sampler.post('/login',params)
      .then(function (response) {
        setloading(false)
        alertinstance(response)
        if (response.data.error === false){
        localStorage.setItem('token',response.data.data.accessToken);
        localStorage.setItem('role',role);
        localStorage.setItem('email',email);
        setshow(!show);
        if(role === "BACKOFFICE"){
          setTimeout(() => {
            navigate("/support");
          },1000);
        }else{
          setTimeout(() => {
            navigate("/admin/dashboard");
          },1000);
        }
        }
      })
      .catch(function (err) {
        setloading(false)
        //handle error
        setloading(false)
        console.log(err);
      });
  }

  return (
    <>
    {!loading ? '':<Spin/>}
    <div className="Login">
      <div className="Form">
      <img src={logo} className="logo" alt="logo" />
      {/*form for collecting login credential*/}
      <p style={{'margin':'0','color':'#fff','padding':'0'}}>{message} </p>
      <form onSubmit={login}>
             
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fa fa-envelope"></i>
                                        </span>
                                    </div>
                                    <input
                                        name=""
                                        className="form-control"
                                        placeholder="Email address"
                                        type="email"
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group input-group mt-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="fa fa-lock"/>
                                        </span>
                                    </div>
                                     <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                                </div>
                                {/*radio buttons*/}
                                <div className="form-check form-check-inline">
                                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="ADMIN" onChange={(e)=>setRole(e.target.value)} required/>
                                  <label className="form-check-label">
                                    Admin
                                  </label>
                                </div>
                                <div className="form-check form-check-inline">
                                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="BACKOFFICE" onChange={(e)=>setRole(e.target.value)} required/>
                                  <label className="form-check-label">
                                    Backoffice
                                  </label>
                                </div>
                                <div className="form-group mt-3">
                                  <button type="submit" className="btn  btn-block"><i className="fa fa-sign-in-alt"></i> Log In </button>                              
                                </div>
                                
      </form>                          
      </div>

      {/*for UI interface for Login page*/}
      <div className="st"></div>
      <div className="nd"></div>
      
    </div>
    </>
  )
}

export default App;
