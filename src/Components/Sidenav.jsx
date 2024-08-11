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
import React , {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import logo from '../logo/jalva.png';
import '../css/App.css';
import '../css/Home.css';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
//code start from here 
const Sidenav =(props) => {
  const [flag,setflag]=useState(false);
  useEffect(()=>{
    var role = localStorage.getItem('role');
    if(role === "BACKOFFICE"){
      setflag(false)
    }else{
      setflag(true)
    }
  },[])
    //for icon  
    const sty={
      textDecoration: "none",
      color: '#000',
      display:'inline-flex'
     
    };
    let navigate = useNavigate();
    const logout = () => {
      localStorage.clear();
      navigate('/login')
    }

return (
        <div className={props.show ? 'home' : 'home active'}>
            <div className={props.show ? "logo active":"logo "} ><img src={logo}/></div>
            <div className="SideNav">
            {flag  ? 
            <>
            <div className="flex">
            <Link to="/admin/dashboard" style={sty}><i className="fa fa-th-large"/><p>Dashboard</p></Link>
            </div>
            <div className="flex">
            <Link to="/config" style={sty}><i className="fa fa-server"/><p>Configuration</p></Link>
            </div>
            <div className="flex">
            <Link to="/subcription" style={sty}><i className="fa fa-cube" ></i><p>Subscription</p></Link>
            </div>
            <div className="flex">
            <Link to="/payment" style={sty}><i className="fa fa-credit-card"/><p >Payment Gateway</p></Link>
            </div>
            </>:
            <></>}
             <div className="flex">
                <Link to="/reels?tab=1" style={sty}><i className="fa fa-free-code-camp"/><p>Reels</p></Link>
            </div>
            <div className="flex">
            <Link to="/category" style={sty}><i className="fa fa-th"/><p>Categories</p></Link>
            </div>
            <div className="flex">
            <Link to="/posters" style={sty}><i className="fa fa-file-image"/><p> Posters</p> </Link>
            </div>
            <div className="flex">
            <Link to="/content?tab=1&return=true" style={sty}><i className="fa fa-film"/><p>Content</p></Link>
            </div>
            <div className="flex">
            <Link to="/upcomming/content" style={sty}><i className="fa fa-photo-video"/><p>Upcoming</p></Link>
            </div>
            
            <div className="flex">
            <Link to="/support" style={sty}><i className="fa fa-ticket"/><p >Support Ticket</p></Link>
            </div>
            <div className="flex">
            <Link to="/users" style={sty}><i className="fa fa-users"/><p >Users</p></Link>
            </div>
            <div className="flex">
            <Link to="/notification/promotional" style={sty}><i className="fa fa-bell"/><p >Notification</p></Link>
            </div>
            <div className="flex">
            <Link to="/release/management" style={sty}><i className="fa fa-android"/><p >Release Management</p></Link>
            </div>
            
            <div className="flex">
            <span onClick={logout} style={sty}><i className="fa fa-sign-out-alt"/><p >Logout</p></span>
            </div>
        </div>
        </div>
)
}
export default Sidenav;
    



