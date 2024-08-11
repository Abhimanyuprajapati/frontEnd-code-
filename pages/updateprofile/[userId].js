import React, { useState }  from 'react'
import Select from 'react-select';
import { useRouter } from 'next/router'
import { useUserAuth } from '../../context/UserAuthContext'
import { Multipart } from '../../services/context';
import withAuth from '../../components/Auth/Hoc';
const Updateprofile = () => {
    const router = useRouter();
    const {userId} = router.query;
    const {logout}=useUserAuth();
    const [name,setname]=useState()
    const [genre,setgenre]=useState('')
    const [address,setaddress]=useState('')
    const [pincode,setpincode]=useState('')
    const [dob,setdob]=useState('')
    const [pic,setpic]=useState('')
    const options =[
        {
            value:0,
            label:'M'
        },
        {
            value:1,
            label:'F'
        },
        {
            value:2,
            label:'N'
        }
    ]
    const handle=(e)=>{
        setgenre(e)
    }
    const[msg,setsmg]=useState('')
    const update=(e)=>{
        e.preventDefault();
        const formdata = new FormData();
        const d = new Date(dob);
        const epoch_time = d.getTime();
        formdata.append('profilePic',pic)
        formdata.append('userId',userId)
        formdata.append('name',name)
        formdata.append('genre',genre.label)
        formdata.append('address',address)
        formdata.append('dob',epoch_time)
        formdata.append('zip',pincode)
        Multipart.post('/updateProfile',formdata)
        .then(res =>{
            console.log(res)
            setsmg(res.data.message)
        }).catch(err=>{
            if(err.response.code === 403){
              logout()
            }
          })
    }

  return (
    <>
    <div className='update'>
        <h1>Update Profile</h1>
        <p>Kanagn offers you a wide collection of movies and shows to choose from in HD.</p>
        <br/>
        <div className='row'>
            <div className='col-md-12'>
            <form onSubmit={update}>
                <p className='small'>{msg}</p>
                <div className="mb-3">
                    <label id="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" value={name} onChange={(e)=> setname(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label id="exampleInputEmail1" className="form-label">Genre</label>
                    <Select
                    className='form-control p-0 m-0 selectd'
                    value={genre}
                    onChange={handle}
                    options={options}
                />
                </div>
                <div className="mb-3">
                    <label id="exampleInputEmail1" className="form-label">Address</label>
                    <textarea rows={3} className="form-control" onChange={(e)=> setaddress(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label id="exampleInputEmail1" className="form-label">DOB</label>
                    <input type="date" className="form-control"  onChange={(e)=> setdob(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label id="exampleInputEmail1" className="form-label">Pincode</label>
                    <input type="number" className="form-control" onChange={(e)=> setpincode(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                <label id="exampleInputEmail1" className="form-label">Profile Pic</label>
                <input name="" className="form-control" type="file" onChange={(e)=>setpic(e.target.files[0])}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
          
        </div>
    </div>
    <br/>
    <br/>
    </>
  )
}

export default withAuth(Updateprofile);