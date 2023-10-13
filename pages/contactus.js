import React, { useState } from 'react'
import Image from 'next/image';
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
                        <h1 className='contactUs-headline'>Contact Us</h1>
                        <p className='contactUs-detail'>Hunt offers you a wide collection of movies and shows to choose from in HD.</p>
                        <div className='contactUs-form'>
                            <form onSubmit={contact}>
                                <p style={{ 'fontSize': '18px', 'marginBottom': '0px', 'color': 'orange', 'padding': '0px' }}>{message}</p>
                                <div className="ch">
                                    <label className='inputboxCh'>Enter Full Name</label>
                                    <input type="text" placeholder='Enter Your Full Name' onChange={(e) => setname(e.target.value)}></input>
                                </div>
                                <div className="ch">
                                    <label className='inputboxCh'>Email Address</label>
                                    <input type="text" placeholder='Enter Your Email Address' onChange={(e) => setemail(e.target.value)}></input>
                                </div>
                                <div className="ch">
                                    <label className='inputboxCh'>Your Message</label>
                                    <textarea rows="1" placeholder='Type Your Message' onChange={(e) => setmessaged(e.target.value)} />
                                </div>
                                <button className="submitbutton" type='submit'>Submit</button>
                            </form>
                            <Quote />   {/* quotes section */}
                        </div>
                    </div>
                </div>
            </section>
            <Download />   {/* download section */}
            <Newsletter />  {/* newsletter section */}
            <Question />    {/* question section */}
            <hr className='contactushr'/>
            <div className='lastLineContactus'>
                <div className='contactlastPara'>
                    <section>
                        <p>Have a Question ?</p>
                        <h2>Didn't get your answer on <br />
                            frequently asked question ?
                        </h2>
                    </section>
                    <section>
                        <button>Contact Now</button>
                    </section>
                </div>
            </div>
        </>
    )
}

export default withState(Contactus);
