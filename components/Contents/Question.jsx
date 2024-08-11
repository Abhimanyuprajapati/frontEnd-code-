import React from 'react'
// import Image from 'next/image'

const Question = () => {
    const increase=(i)=>{
        document.getElementsByClassName('hidden')[i].style.height = "auto";
        document.getElementsByClassName('decrease')[i].style.display="block";
        document.getElementsByClassName('increase')[i].style.display="none";
    }
    const decrease=(i)=>{
        document.getElementsByClassName('hidden')[i].style.height = "0px";
        document.getElementsByClassName('increase')[i].style.display="block";
        document.getElementsByClassName('decrease')[i].style.display="none";
    }
  return (
    <>
    <section className='frequent'>
    <h1>Frequently Asked Questions</h1>
    <div className="row">
        <div className='col-md-6'>
            <div className='freq-child'>
            <span>How Can I create an account on Jalva and login? </span> 
            <i className='fa fa-plus increase' onClick={()=> increase(0)}></i>
            <i className='fa fa-minus decrease' onClick={()=> decrease(0)}></i>
            </div>
            
            <div className='hidden'>
                <p>If youre accessing Jalva on a Desktop/App, click on Sign Up or by the social icon Login with Google or Login with Facebook, this will automatically create your account.
                     Since you have logged in through your social profile hence NO PASSWORD is needed. Just remember your login account email id.
                </p>
            </div>
        </div>
        <div className='col-md-6'>
            <div className='freq-child'>
            <span>How do I contact Support team?</span> 
            <i className='fa fa-plus increase' onClick={()=> increase(1)}></i>
            <i className='fa fa-minus decrease' onClick={()=> decrease(1)}></i>
            </div>
            
            <div className='hidden'>
                <p>To contact the Support team, go to the Contact Us section from the Menu or from the footer link on our website and send us a question. 
                    You can also write to us directly at Jalva.app@gmail.com  Well get in touch with you as soon as possible.
                </p>
            </div>
        </div>
    </div>
    <div className="row">
        <div className='col-md-6'>
            <div className='freq-child'>
            <span>How Can I create an account on Jalva and login? </span> 
            <i className='fa fa-plus increase' onClick={()=> increase(2)}></i>
            <i className='fa fa-minus decrease' onClick={()=> decrease(2)}></i>
            </div>
            
            <div className='hidden'>
                <p>If youre accessing Jalva on a Desktop/App, click on Sign Up or by the social icon Login with Google or Login with Facebook, this will automatically create your account.
                     Since you have logged in through your social profile hence NO PASSWORD is needed. Just remember your login account email id.
                </p>
            </div>
        </div>
        <div className='col-md-6'>
            <div className='freq-child'>
            <span>How do I contact Support team?</span> 
            <i className='fa fa-plus increase' onClick={()=> increase(3)}></i>
            <i className='fa fa-minus decrease' onClick={()=> decrease(3)}></i>
            </div>
            
            <div className='hidden'>
                <p>To contact the Support team, go to the Contact Us section from the Menu or from the footer link on our website and send us a question. 
                    You can also write to us directly at Jalva.app@gmail.com  Well get in touch with you as soon as possible.
                </p>
            </div>
        </div>
    </div>
</section>
    </>
  )
}

export default Question