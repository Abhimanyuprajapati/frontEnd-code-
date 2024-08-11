import React from "react";

const Newsletter = () => {
  return (
    <>
      <section className="trailernews">
        <h1>JOIN OUR NEWSLETTER</h1>
        <p style={{'textAlign':'center'}}>Subscribe to our weekly newsletter and stay updated.</p>
        <input type="text" placeholder="Enter Full Name"></input> <br />
        <input type="text" placeholder="Email Address"></input>   <br />
        <button>Subscribe Now</button>
      </section>
    </>
  )
}
export default Newsletter;