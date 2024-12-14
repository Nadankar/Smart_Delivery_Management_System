import React, { useEffect } from 'react'
import MapComponent from './MapComponent'
import PartnerAvailability from './PartnerAvailability';
import RecentAssignment from './RecentAssignment';
import { useState } from 'react';

function Dashboard() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPartners,setTotalPartners]=useState(0);
  const [totalRevenue,setTotalRevenue]=useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/orders");
        if (!response.ok) {
          throw Error("Failed to fetch orders");
        }
        const data = await response.json();
        setTotalOrders(data.length);

        const deliveredOrders=data.filter((order)=>order.status==="delivered");
        const totalDeliveredOrders=deliveredOrders.length;
        const charge=20;
        setTotalRevenue(totalDeliveredOrders*charge);


      } catch (error) {
        setError(error.message);
      }
    }

    fetchOrders();
  }, []);

  useEffect(()=>{
    const fetchPartners=async()=>{
      
      try{
        const response=await fetch("http://localhost:8000/api/partners");
        if(!response.ok){
          throw Error("failed to fetch partners");
        }
        const data= await response.json();
        
        const activePartners = data.filter((partner) => partner.status==="Active");
        setTotalPartners(activePartners.length);

         
        
      }catch(error){
        setError(error.message);
      }
                           
     
    }
    fetchPartners();
  },[])

  

  return (
    <>
      <header>

        <div className=' flex flex-row justify-around '>

          <div className="card bg-base-100 w-96 shadow-xl ">
            <div className="card-body">
              <h2 className="card-title">Total Orders</h2>
              <p className='text-2xl font-bold'>{totalOrders}</p>

            </div>
          </div>

          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Active Partners</h2>
              <p className='text-2xl font-bold'>{totalPartners}</p>

            </div>
          </div>
          <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Total Revenue</h2>
              <p className='text-2xl font-bold'>${totalRevenue}</p>

            </div>
          </div>
        </div>
      </header>
      <div>
        <MapComponent />
        <PartnerAvailability />
        <RecentAssignment />
      </div>

      <div className='mt-10'>

      </div>
    </>
  )
}

export default Dashboard;


