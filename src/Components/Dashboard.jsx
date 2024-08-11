import React, { useEffect, useState } from 'react';
import '../css/App.css';
import '../css/Home.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import sampler from '../Objects/axiosjson';
import "../css/graphsme.css";

// Reusable component for displaying data sections
const DataSection = ({ title, data, show, toggle }) => (
  <div className='graphsme'>
    <div className='graphsme01'>
      <p>
        <h5>{title}</h5>
        <span onClick={toggle}>
          {show ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </span>
      </p>
      {show && data && (
        <div className='graphsme02'>
          {Object.keys(data).map((key) => (
            <p key={key}>
              <span>{key.replace(/([A-Z])/g, ' $1')}:&nbsp;</span>
              <b>
                {data[key] && data[key][0]
                  ? data[key][0].count || `₹ ${data[key][0].totalAmount || "NA"}`
                  : "NA"}
              </b>
            </p>
          ))}
        </div>
      )}
    </div>
  </div>
);

const Dashboard = ({ icon }) => {
  const name = localStorage.getItem('role');
  const email = localStorage.getItem('email');

  const [data, setData] = useState([]);
  const [registerUserData, setRegisterUserData] = useState(null);
  const [incomeData, setIncomeData] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showDownload, setShowDownload] = useState(true);
  const [showUserChart, setShowUserChart] = useState(true);
  const [showIncome, setShowIncome] = useState(true);
  const [showSubscription, setShowSubscription] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await sampler.get('/dashboardJalwa');
        setData(res.data.data);
        if (res.data.data) {
          setRegisterUserData(res.data.data.registeredUser);
          setIncomeData(res.data.data.income);
          setSubscriptionData(res.data.data.subscription);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleDownload = () => setShowDownload(!showDownload);
  const toggleUserChart = () => setShowUserChart(!showUserChart);
  const toggleIncome = () => setShowIncome(!showIncome);
  const toggleSubscription = () => setShowSubscription(!showSubscription);

  if (loading) {
    return <span className="loader">Loading Jalva Data...</span>; // Add a loading spinner or message
  }

  return (
    <div className="subcr content">
      <span className="head">
        <span className="dashhead m-3">
          <i className="fa fa-bars" onClick={icon}></i>
          <h3>Dashboard</h3>
        </span>
        <span className="userhead">
          <p style={{ fontWeight: '500' }}>
            <i className="fa fa-user"></i> {email} <br />Role - {name}
          </p>
        </span>
      </span>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-6 pt-2'>
            <DataSection
              title="Subscription Data"
              data={subscriptionData}
              show={showSubscription}
              toggle={toggleSubscription}
            />
          </div>
          <div className='col-md-6 pt-2'>
            <DataSection
              title="Income Data"
              data={incomeData}
              show={showIncome}
              toggle={toggleIncome}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6 pt-2'>
            <DataSection
              title="Registered User Data"
              data={registerUserData}
              show={showUserChart}
              toggle={toggleUserChart}
            />
          </div>
          <div className='col-md-6 pt-2'>
            <DataSection
              title="Downloads User"
              data={registerUserData}
              show={showDownload}
              toggle={toggleDownload}
            />
          </div>
        </div>
      </div>
      <p className='small' style={{ marginLeft: '18px', color: '#aaa' }}>Jalva CMS - v2.0.6</p>
    </div>
  );
};

export default Dashboard;
