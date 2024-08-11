import React from 'react'
import Quote from '../components/Contents/Quote'
import withState from '../components/Auth/State'
const Refundpolicy = () => {
    return (
        <div className="Termsandcondition_css">
            <div class="termsandconditionHeader">
                <h2>Refund & Cancellation</h2>
            </div>
            <p align="left">
                policy applies to Jalva Site/App Platforms including without limitation
                <a href="https://www.Jalva.app" style={{ 'color': 'red' }}> www.Jalva.app</a> other related
                Sites/s or App/s,
                mobile
                applications and other online features each a “Site/s or App/s”.We have provided extensive
                information
                for you to view the packages before choosing to subscribe to us. If you have any questions or
                reservations, please contact us at
                <a href="mailto:contact@Jalva.app" style={{ 'color': 'red' }}> contact@Jalva.app</a> prior
                to
                subscribing to our
                services.
                We,being the service providers for contents available through website or APP where you are
                expected to
                view packages of your choice after being paid for subscription,unfortunately,all fees to Jalva
                for
                such services are non refundable.
                <br />
                <br />
                In case because of any technical glitch at the time of online transaction, the transaction does
                not occur
                the amount in process of transfer by default goes back into your bank account,automatically
                through
                Payment Gateway.
            </p>
            <h5>CHARGE BREAKS </h5>
            <p >
                If we receive a chargeback or payment dispute from a credit card company or bank, your service
                and/or
                subscription will be suspended without notice. Applicable chargeback fees will be issued to
                recovers fees
                passed on to us by the credit company, plus any outstanding balances accured as a result of the
                chargeback(s) must be paid in full before service is restored. Instead of issuing a chargeback,
                contact us
                to address any billing issues. Requesting a chargeback or opening any sort of dispute for a
                valid charge
                from us is fraud, and is never an appropriate or legal means of obtaining a refund.
            </p>
            <h5 className="text-br/and mt-4" style={{ 'color': 'red', 'padding': '10px 0px', 'textAlign': 'center', 'fontSize': '20px', 'textTransform': 'uppercase' }}>
                Please Read and make sure you fully understand our refund policy prior to makeing a payment
            </h5>
            <Quote />
            <div className='detail_com'>
                <p>This website is managed by <strong>Films Garden Private Limited.</strong></p>
            </div>
        </div>

    )
}

export default withState(Refundpolicy);