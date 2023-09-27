import React from 'react'
import Image from 'next/image';
import Arrower from "../../assets/home/Group 66211.png";

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
    <div className='row-join'>
            <div className='row-join-box'>
                <h2>Join Our Newsletter !</h2>
                <p>Subscribe to our weekly newsletter and stay tunned.</p>
                <Image src={Arrower} alt="mpb" className='arrower'/>
            </div>
            <div className='row-join-image'>
                <input type="email" placeholder="enter your email address"/><br/>
                <button>Subscribe</button>
            </div>
        </div>
    
    <h1>Frequently Asked Questions</h1>
    <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mollis mauris scelerisque dignissim.</h3>
    <div className="row">
        <div className='col-md-6'>
            <div className='freq-child'>
            <span>How Can I create an account on FilmCity and login? </span> 
            <i className='fa fa-plus increase' onClick={()=> increase(0)}></i>
            <i className='fa fa-minus decrease' onClick={()=> decrease(0)}></i>
            </div>
            
            <div className='hidden'>
                <p>If youre accessing FilmCity on a Desktop/App, click on Sign Up or by the social icon Login with Google or Login with Facebook, this will automatically create your account.
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
                    You can also write to us directly at filmcity.app@gmail.com  Well get in touch with you as soon as possible.
                </p>
            </div>
        </div>
    </div>
    <div className="row">
        <div className='col-md-6'>
            <div className='freq-child'>
            <span>Where to download FilmCity App?</span> 
            <i className='fa fa-plus increase' onClick={()=> increase(2)}></i>
            <i className='fa fa-minus decrease' onClick={()=> decrease(2)}></i>
            </div>
            
            <div className='hidden'>
                <p>FilmCity - Web Series and more. – Apps on Google Play
                </p>
            </div>
        </div>
        <div className='col-md-6'>
            <div className='freq-child'>
            <span>Where to download FilmCity App?</span> 
            <i className='fa fa-plus increase' onClick={()=> increase(3)}></i>
            <i className='fa fa-minus decrease' onClick={()=> decrease(3)}></i>
            </div>
            
            <div className='hidden'>
                <p>FilmCity - Web Series and more. – Apps on Google Play
                </p>
            </div>
        </div>

    </div>
    <div className="row">
        <div className='col-md-6'>
            <div className='freq-child'>
            <span>Where to download FilmCity App?</span> 
            <i className='fa fa-plus increase' onClick={()=> increase(4)}></i>
            <i className='fa fa-minus decrease' onClick={()=> decrease(4)}></i>
            </div>
            
            <div className='hidden'>
                <p>FilmCity - Web Series and more. – Apps on Google Play
                </p>
            </div>
        </div>
        <div className='col-md-6'>
            <div className='freq-child'>
            <span>Where to download FilmCity App?</span> 
            <i className='fa fa-plus increase' onClick={()=> increase(5)}></i>
            <i className='fa fa-minus decrease' onClick={()=> decrease(5)}></i>
            </div>
            
            <div className='hidden'>
                <p>FilmCity - Web Series and more. – Apps on Google Play
                </p>
            </div>
        </div>
    </div>
    <div className="row">
        <div className='col-md-6'>
            <div className='freq-child'>
            <span>Where to download FilmCity App?</span> 
            <i className='fa fa-plus increase' onClick={()=> increase(6)}></i>
            <i className='fa fa-minus decrease' onClick={()=> decrease(6)}></i>
            </div>
            
            <div className='hidden'>
                <p>FilmCity - Web Series and more. – Apps on Google Play
                </p>
            </div>
        </div>
        <div className='col-md-6'>
            <div className='freq-child'>
            <span>Where to download FilmCity App?</span> 
            <i className='fa fa-plus increase' onClick={()=> increase(7)}></i>
            <i className='fa fa-minus decrease' onClick={()=> decrease(7)}></i>
            </div>
            
            <div className='hidden'>
                <p>FilmCity - Web Series and more. – Apps on Google Play
                </p>
            </div>
        </div>
    </div>
</section>
    </>
  )
}

export default Question