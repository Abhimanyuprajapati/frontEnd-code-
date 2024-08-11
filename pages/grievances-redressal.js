import React from 'react'
import withState from '../components/Auth/State'

const Grievances = () => {
  return (
    <section class="Termsandcondition_css">
                <div class="termsandconditionHeader">
                        <h2>Grievances<span> Redressal</span></h2>
                </div>
                    <h5>DETAILS:</h5>
                    <p>
                    If you have any grievance with respect to any of the Content, Title, Age rating, Synopsis, Parental control feature etc. available 
                        on our Jalva App, you can register a complaint with our Grievance Redressal Officer on below mentioned details:</p>
                    <p>Grievance Redressal Officer: Umesh Chandrai <br/>
                    Email id: umesh.chandrai@jalva.app</p>
                    <p>One can raise a complaint by contacting our Grievance Redressal officer by emailing at umesh.chandrai@jalva.app Upon receipt of the complaint the same shall be acknowledged within a period of 24 hours. Our Grievance Redressal
                         team headed by our Grievance Redressal Officer will resolve the complaint within 15 days from the date of receipt of complaint.</p>
    </section>
  )
}

export default withState(Grievances);