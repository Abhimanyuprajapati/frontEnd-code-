import React, { useState } from 'react'
import Image from 'next/image';
import { useUserAuth } from '../context/UserAuthContext';
import logo from '../assets/logo/FilmCity.png';
import Question from '../components/Contents/Question';
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
        const result = await contactus(data)
        setmessage(result.data.message)
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
                    <h1 className='contactUs-headline'>Help & Support</h1>
                    <p className='contactUs-detail'>We will get back to you within 24 hours</p>
                    <form onSubmit={contact}>
                        <p style={{ 'fontSize': '16px', 'marginBottom': '0px', 'color': 'orange', 'padding': '0px' }}>{message}</p>
                        <div className="ch">
                            <input type="text" placeholder='Full Name' onChange={(e) => setname(e.target.value)}></input>
                        </div>
                        <div className="ch">
                            <input type="text" placeholder='Email Address' onChange={(e) => setemail(e.target.value)}></input>
                        </div>
                        <div className="ch">
                            <input type="number" placeholder='Phone Number' onChange={(e) => setnumber(e.target.value)}></input>
                        </div>
                        <div className="ch">
                            <input type="text" placeholder='Subject' onChange={(e) => setsubject(e.target.value)}></input>
                        </div>
                        <div className="ch">
                            <textarea rows="4" placeholder='Describe your issue' onChange={(e) => setmessaged(e.target.value)} />
                        </div>
                        <button className="btn" type='submit'>Submit</button>
                    </form>
                </div>
                </div>
        </section>
        <Quote />
        </>
    )
}

export default withState(Contactus);