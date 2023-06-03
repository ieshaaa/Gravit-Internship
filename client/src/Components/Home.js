import Navbaar from './Navbaar';
import React, { useState,useEffect, useContext } from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import { adddata,deldata } from './Context/ContextProvider';
import { updatedata } from './Context/ContextProvider';

const Home = () => {

    const location =useLocation();
    

  const [getuserdata,setUserdata] = useState([]);
  console.log(getuserdata);

  const { udata, setUdata } = useContext(adddata);

    const {updata, setUPdata} = useContext(updatedata);

    const {dltdata, setDLTdata} = useContext(deldata);


  const getdata = async () => {

    const res = await fetch("/getdata", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
        console.log("error ");

    } else {
        setUserdata(data)
        console.log("get data");

    }
}

  useEffect(()=>{
    getdata();
  },[])

  const deleteuser = async (id) => {

    const res2 = await fetch(`/deleteuser/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
        console.log("error");
    } else {
        console.log("user deleted");
        setDLTdata(deletedata)
        getdata();
    }

}





    return (
        <>
         {
                udata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{udata.name}</strong>  Register succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
            {
                updata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{updata.name}</strong>  Updated succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }

            {
                dltdata ?
                    <>
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>{dltdata.name}</strong>  Deleted succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }


        <header><Navbaar /></header>
        <div className='mt-5'>
            <div className='container'>
            <div className='add_btn mt-2 mb-2'>
                <NavLink to="/register" className="btn btn-primary">Register Product</NavLink> 
                </div>    

                <table class="table table-striped">
  <thead>
    <tr class="table-dark">
      <th scope="col">Serial No.</th>
      <th scope="col">Product ID</th>
      <th scope="col">Name</th>
      <th scope="col">Category</th>
      
      <th scope="col">Company</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody >

      {
        getuserdata.map((element, id) => {
          return (
              <>
               <tr>
      <th scope="row">{id + 1}</th>
      <td>{element.ProdID}</td>
      <td>{element.Prodname}</td>
      <td>{element.Prodcategory}</td> 
      <td>{element.Prodcompany}</td>
      <td className='d-flex justify-content-between'>
        <NavLink to={`view/${element._id}`}><button className='btn btn-success'><i class="fa-solid fa-eye"></i></button></NavLink>
        <NavLink to={`edit/${element._id}`}> <button className='btn btn-primary'><i class="fa-solid fa-pen"></i></button></NavLink>
        <button className='btn btn-danger' onClick={()=>deleteuser(element._id)}><i class="fa-solid fa-trash"></i></button>
      </td>
      
    </tr>
    </>
     )
     })
      }

    
    
  </tbody>
</table>


            </div>
        </div>
        </>
       
    )
}

export default Home