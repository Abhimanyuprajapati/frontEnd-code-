import React,{useState,useEffect} from 'react'
import sampler from '../Objects/axiosjson'
const ListInapp = () => {
  const [inapp,setinapp]=useState([])
  useEffect(()=>{
    sampler.post('/listAndroidInAppPackages')
    .then(res=>{
      if(res.status === 200){
        setinapp(res.data.data)
      }
    }).catch(err =>{
      console.log(err)
    })
  },[])
  
  return (
    
<table className="table m-0 p-0 inapp">
  <thead>
    <tr>
      <th scope="col">No.</th>
      <th scope="col">Product Name</th>
      <th scope="col">Product Id</th>
      <th scope="col">Price</th>
      <th scope="col">Status</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {inapp.map((x,index)=>{
      return(
         <tr key={index}>
          <th scope="row">{index+1}</th>
          <td>{x.name}</td>
          <td>{x.inappproductId}</td>
          <td>{`${x.baseCurrency} ${x.basePrice / 100} - ${x.period} Days`}</td>
          <td><i class="fa fa-check p-0"></i>{x.status}</td>
          <td><i class="fa fa-arrow-right"></i></td>
        </tr>
      )
    })}
   
  </tbody>
</table>
    
  )
}

export default ListInapp