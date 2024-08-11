import React,{useState,useEffect} from 'react'

const Email = () => {
const[text,settext]=useState('Build flawless email <br/>newsletters within 10 minutes effortlessly by using Stripo’s templates!Our compilation comprises up-to-date, fully responsive email templates for 2022. Easy to customize any!Export them to 70 ESPs and email clients, like Mailchimp, HubSpot, Campaign Monitor, AWeber, eSputnik, Outlook, and Gmail.More: https://stripo.email/templates/')
const handlechange=(e)=>{
    settext(e.target.value)
}  
return (
    <div className='email_temp'>
        {/*<div className='email_temp_options'>
            <p><i className='fa fa-bold'></i><i className='fa fa-italic'></i><i className='fa fa-font'></i></p>
        </div>
        <div className='contenttext'>
            <input type="text" placeholder='Enter title' className='form-control mt-2'></input>
            <textarea placeholder='enter body' rows={8} value={text}  onChange={handlechange} className='form-control mt-2'/>
            <p></p>
        </div>
        <button className='btn btn-primary'>Generate</button>
*/}
    </div>
  )
}

export default Email