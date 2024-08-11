import React, { useState}  from 'react'
import withAuth from '../../components/Auth/Hoc';
import { useRouter } from 'next/router';
import { useUserAuth } from '../../context/UserAuthContext';
const Changepassword = () => {
    const router = useRouter();
    const {userId} = router.query;
    const [newpassword,setnewpassword]= useState('');
    const [cnew,setcnew]= useState('');
    const [current,setcurrent]= useState('');
    const [alert,setalert]=useState('')
    const [passwordalert,setpasswordalert]=useState('')
    const [flag ,setflag]=useState(false)
    const {ChangePassword} = useUserAuth();
    var regularExpression = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
    const reset=async(e)=>{
        e.preventDefault();
        setflag(true)
        if(!regularExpression.test(newpassword)){
            setpasswordalert('Password must contain minimum 1 unique special character and 1 numeric value.')
        }else{
            setpasswordalert('')
        }
        if(newpassword === cnew){
            const data = {oldPassword:current,newPassword:newpassword,confirmPassword:cnew,userId:userId}
            const result = await ChangePassword(data)
            setalert(result.message)
            setTimeout(()=>{
            if(result.error === false){
                router.replace(`/profile/${userId}`)
            }
            },[3000])
        }else{
            setalert('password not matching')
        }
       
    }
  return (
    <section className="login">
    <div className='logg'>
      <p style={{'color':'#fff','textAlign':'center','color':'red'}}>{alert}</p>
      <h1>CHANGE PASSWORD</h1>
      <p>Change Password and explore now !</p><br/>
      <small>{passwordalert}</small>
      <input type="text" placeholder="Enter your current password" onChange={(e)=>setcurrent(e.target.value)}/>
      <input type="password" placeholder="Enter your new password" onChange={(e)=>setnewpassword(e.target.value)}/>
      <input type="password" placeholder="Enter your confirm password" onChange={(e)=>setcnew(e.target.value)}/>
      <button className='playbtn' onClick={reset}>Reset</button>
      </div>
    </section>
  )
}

export default withAuth(Changepassword)