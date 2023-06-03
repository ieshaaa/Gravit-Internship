import React from 'react'
import { useEffect, useState } from 'react'
import Navbaar from './Navbaar'
import { Card,CardContent } from '@mui/material'
import {  NavLink,useParams,useNavigate } from 'react-router-dom'

const Details = () => {

    
    const {id} = useParams("");
    console.log(id)
    
    const [getuserdata,setUserdata] = useState([]);
    console.log(getuserdata);
    
    const history = useNavigate();

    const getdata = async () => {

        const res = await fetch(`/getuser/${id}`, {
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
            history("/")
        }
    
    }
    
    
    
    
    return (
        <>
        <div>
             <header><Navbaar /></header>
        </div>
        <div className="container mt-3">
        <h1 style={{ fontWeight: 400, marginBottom:30 }}>Product Details</h1>

        <Card sx={{ maxWidth: 600 }}>
            <CardContent>
                <div className="add_btn">
                <NavLink to={`/edit/${getuserdata._id}`} ><button className='btn btn-primary mx-2'><i class="fa-solid fa-pen"></i></button></NavLink>
        <button className='btn btn-danger' onClick={()=>deleteuser(getuserdata._id)}><i class="fa-solid fa-trash"></i></button>
                </div>
                <div className="row">
                    <div className="left_view col-lg-6 col-md-6 col-12">
                        <h3 className="mt-3">Product ID: <span >{getuserdata.ProdID}</span></h3>
                        <h3 className="mt-3">Product Name: <span >{getuserdata.Prodname}</span></h3>
                        <h3 className="mt-3">Category: <span >{getuserdata.Prodcategory}</span></h3>
                    </div>
                    <div className="right_view  col-lg-6 col-md-6 col-12">

                        <p className="mt-5">Purchase Date: <span>{getuserdata.Proddate}</span></p>
                        <p className="mt-5">Company: <span>{getuserdata.Prodcompany}</span></p>
                        <p className="mt-3">In Warranty: <span>{getuserdata.Prodwarranty}</span></p>
                    </div>
                </div>

            </CardContent>
        </Card>
    </div>
    </>
    ) 
}

export default Details