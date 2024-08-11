import React, { useState } from 'react'
// import Image from 'next/image';
import { useUserAuth } from '../context/UserAuthContext';
import Question from '../components/Contents/Question';
import Newsletter from '../components/Contents/Newsletter';
import Download from '../components/Contents/Download';
import Quote from '../components/Contents/Quote';
import withState from '../components/Auth/State';
const Contactus = () => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [number, setnumber] = useState('')
    const [messaged, setmessaged] = useState('')
    const [subject, setsubject] = useState('')
    const [message, setmessage] = useState('')
    const [flag, setflag] = useState(false)
    const { contactus } = useUserAuth();

    const contact = async (e) => {
        e.preventDefault();
        const data = {
            "email": email,
            "mobile": number,
            "name": name,
            "issueType": subject,
            "description": messaged
        }
        console.log(data)
        const result = await contactus(data)
        setmessage("note : "+result.data.message)
    }
    const handler = async (e) => {
        if (e === null) {
            setflag(false)
            setmessage('Recaptcha not verfied !!')
        } else {
            const result = await verify(e);
            if (result.data.data.success) {
                setflag(true)
                setmessage('')
            }
        }
    }
    return (
        <>
            <section className='contactUs'>
                <div className='contactusMain'>
                    <div className='contactusBackground'>
                        <h1 className='contactUs-headline'>Contact Us</h1>
                        <p className='contactUs-detail'>Jalva offers you a wide collection of movies and shows to choose from in HD.</p>
                        <div className='contactUs-form'>
                            <form onSubmit={contact}>
                                <p style={{ 'fontSize': '18px', 'marginBottom': '0px', 'color': '#fff', 'padding': '0px','textAlign':'center' }}>{message}</p>
                                <div className="ch">
                                    <label className='inputboxCh'>Enter Full Name</label>
                                    <input type="text" placeholder='Enter Your Full Name' onChange={(e) => setname(e.target.value)}></input>
                                </div>
                                <div className="ch">
                                    <label className='inputboxCh'>Email Address</label>
                                    <input type="text" placeholder='Enter Your Email Address' onChange={(e) => setemail(e.target.value)}></input>
                                </div>
                                <div className="ch">
                                    <label className='inputboxCh'>Contact Number</label>
                                    <input type="text" placeholder='Enter Your Mobile Number' onChange={(e) => setnumber(e.target.value)}></input>
                                </div>
                                <div className="ch">
                                    <label className='inputboxCh'>Issue Type</label>
                                    <input type="text" placeholder='Enter Your Issue' onChange={(e) => setsubject(e.target.value)}></input>
                                </div>
                                <div className="ch">
                                    <label className='inputboxCh'>Your Message</label>
                                    <textarea rows="1" placeholder='Type Your Message' onChange={(e) => setmessaged(e.target.value)} />
                                </div>
                                <button className="submitbutton" type='submit'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Quote />   {/* quotes section */}
             {/* download section */}
            <Newsletter />  {/* newsletter section */}
            <Question />    {/* question section */}
            <div className='detail_com'>
                <p>This website is owned by <strong>Films Garden Private Limited.</strong></p>
            </div>
        </>
    )
}

export default withState(Contactus);
