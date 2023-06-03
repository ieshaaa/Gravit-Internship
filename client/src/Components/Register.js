import React, { useState,useContext } from 'react'
import Navbaar from './Navbaar'
import {NavLink,useNavigate} from 'react-router-dom';
import { adddata } from './Context/ContextProvider';



const Register = () => {

  const {udata,setUdata}= useContext(adddata);

  const history = useNavigate();

    const [inpval,setINP] = useState({
      ProdID:"",
        Prodname:"",
        Prodcategory:"",
        Proddate:"",
        Prodcompany:"",
        Prodwarranty:""
    })

    const setdata = (e) =>{
        console.log(e.target.value);
        const{name,value} = e.target;
        setINP((preval)=>{
            return{
                ...preval,
                [name]:value
            }
        })
    }

    const addinpdata = async (e) => {
      e.preventDefault();

      const {ProdID,Prodname,Prodcategory,Proddate,Prodcompany } = inpval;

      const res = await fetch("/register", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ProdID,Prodname,Prodcategory,Proddate,Prodcompany
          })
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 422 || !data) {
          console.log("error ");
          history("/")

      } else {
          history("/")
          setUdata(data)
          console.log("data added");

      }
  }


    return (
        <>
        <header>
            <Navbaar />
        </header>
            <div className='Container' style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div className='item' style={{display:'flex',justifyContent:'center', padding:30,marginTop:30,alignItems:'center',margin:40,width:'40vw',height:'auto',backgroundColor:'rgb(255,255,255,0.512)'}}>
        <form className='mt-4'>
            <div className='row'style={{color:'#000',fontSize:16,display:'flex',justifyContent:'center'}}>
                <div style={{fontWeight:'bold',color:'#000',fontSize:25,display:'flex',justifyContent:'center',padding:8}}>Product Registration</div> 
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Product ID</label>
    <input type="text" value={inpval.ProdID} onChange={setdata}  name="ProdID" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Product Name</label>
    <input type="text" value={inpval.Prodname} onChange={setdata}  name="Prodname" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  <div class="mb-3 ">
    <label for="exampleInputPassword1" class="form-label"> category</label>
    <input type="text" value={inpval.Prodcategory} onChange={setdata} name="Prodcategory" class="form-control" id="exampleInputPassword1" />
  </div>
  <div class="mb-3 ">
    <label for="exampleInputPassword1" class="form-label"> Purchase Date</label>
    <input type="date" value={inpval.Proddate} onChange={setdata} name="Proddate" class="form-control" id="exampleInputPassword1" />
  </div>
  <div class="mb-3 ">
    <label for="exampleInputPassword1" class="form-label"> Company</label>
    <input type="text"value={inpval.Prodcompany} onChange={setdata} name="Prodcompany" class="form-control" id="exampleInputPassword1" />
  </div>
  <div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
  <label value={inpval.Prodwarranty} onChange={setdata} name="Prodwarranty" class="form-check-label" for="flexSwitchCheckDefault"> In Warranty </label>
</div>
 
  <button type="submit" onClick={addinpdata} class="btn btn-primary">Submit</button>
  </div>
</form>
  </div>
  </div>
            
    


       </>
    )
}

export default Register