import React, { Component, useEffect, useState } from 'react';  
import { RiDragMove2Line } from 'react-icons/ri'; 
import Instance from '../../Objects/Axios';
import { useNavigate } from 'react-router-dom';
import alertinstance from '../../Objects/Alert';
import Spin from '../Spinner/Spin';
const Dragsubcategory = ({data}) => {
    let navigate = useNavigate();
    const [arr,setArr]=useState({item:[],	draggingItem: null, newItemName: '', newItemImage: '', })
    const [loading,setloading]=useState(false)
    const [real,setreal]=useState([])
    useEffect(()=>{
        setArr({item:data})
        setreal(data)
    },[data])
    const handleDragStart = (e, item) => { 
		setArr({ ...arr,draggingItem: item }); 
		e.dataTransfer.setData('text/plain', ''); 
	}; 

	const handleDragEnd = () => { 
		setArr({...arr, draggingItem: null }); 
	}; 

	const handleDragOver = (e) => { 
		e.preventDefault(); 
	}; 

	const handleDrop = (e, targetItem) => { 
		const { draggingItem, item } = arr; 
		if (!draggingItem) return; 

		const currentIndex = item.indexOf(draggingItem); 
		const targetIndex = item.indexOf(targetItem); 

		if (currentIndex !== -1 && targetIndex !== -1) { 
			item.splice(currentIndex, 1); 
			item.splice(targetIndex, 0, draggingItem); 
			setArr({...arr,item:item}); 
            transformData(item)
		} 
	}; 

    const transformData=(item)=>{
        setloading(true)
        item.forEach((x, index) => {
         x.rank = index + 1;  // Or any other modification based on index
        });
      //  console.log("final",item)
        const param  = {
            subcategory:item
        }
        Instance.post('/arrangeSubcategory',param)
        .then((res) => {
            setloading(false)
         })
        .catch(err=>{
            console.log(err)
        })
    }
    function DeleteSubCategory(y){
        let data = {
          subcategoryId : y
        }
        setloading(true)
          const params = JSON.stringify(data)
          Instance.post('/deleteSubCategory',params)
            .then((response) => {
              setloading(false)
              //handle success
              alertinstance(response);
           //   Refresh()
             }).catch(err=>{
             // setloading(false)
              console.log(err)
             })
    }
   
  return (
    <>
    {!loading ? '':<Spin/>}
    <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Status</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Update</th>
                      </tr>
                    </thead>
                    <tbody>
  				{arr.item.map((item, index) => ( 
 					<tr 
 						key={item.rank} 
 						className= 
 							{`item ${item === arr.draggingItem ? 
 								'dragging' : ''
							}`} 
						draggable="true"
						onDragStart={(e) => handleDragStart(e, item)} 
						onDragEnd={handleDragEnd} 
						onDragOver={handleDragOver} 
						onDrop={(e) => handleDrop(e, item)} 
					> 
                    <th scope="row">{item.rank}</th>
							<td>{ item.title}</td> 
                            <td>{item.description}</td> 
                            <td>{item.active ? "Active":"Inactive"}</td> 
                            <td><i className="fa fa-trash" onClick={()=>DeleteSubCategory(item._id)}></i></td>
                        <td><i className="fa fa-edit" onClick={()=>{navigate("/subcategory/"+`${item._id}`+'/'+`${item.title}`)}}></i></td>
						<RiDragMove2Line /> 
					</tr> 
				))} 
                 </tbody>
                </table>
    </>
  )
}
export default Dragsubcategory ;
