import React from 'react'
import { useState, useEffect } from 'react'

function Partners() {
    const [partner, setPartner] = useState([]);
    const [error, setError] = useState(null);
    const [openModel, setOpenModel] = useState(false);
    const [updateData, setUpdateData] = useState([]);



    function editModel(partner) {
        setUpdateData(partner);
        setOpenModel(true);
        document.getElementById("my_model").showModal();

    }

    async function handleSubmit(event){
        event.preventDefault();
        const updatedPartner={
            name:document.getElementById("newname").value,
            email:document.getElementById("newemail").value,
            phone:document.getElementById("newphone").value,
            status:document.getElementById("newstatus").value,
            currentLoad:document.getElementById("newcurrentLoad").value,
            areas:document.getElementById("newareas").value,
            shiftStart:document.getElementById("newshiftStart").value,
            shiftEnd:document.getElementById("newshiftEnd").value,
            rating:document.getElementById("newrating").value,
            completeOrder: document.getElementById("newcompleteOrder").value,
            cancelledOrder:document.getElementById("newcancelledOrder").value,
        }
        console.log("Updated Partner Data:", updatedPartner);
        try{
            const response=await fetch(`http://localhost:8000/api/partners/${updateData._id}`,{
                method:"PUT",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(updatedPartner)
            });

            const result=await response.json();
            console.log("Response from Backend:", result);

            if(response.ok){
                setPartner(partner.map(p=>p._id=== updateData._id ? updatedPartner:p));
                // setOpenModel(false);
                document.getElementById("my_model").close();
            }else{
                setError(result.error || "failed to update partner");
            }

        }catch(error){
            console.error("Error:", error);
            setError(error.message);
        }

    }
    
 




    useEffect(() => {
        const fetchPartner = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/partners");
                if (!response.ok) {
                    throw new Error("failed to fetch data");

                }
                const data = await response.json();
                setPartner(data);
            } catch (error) {
                setError(error.message)
            }
        };
        fetchPartner();
    }, [])


    return (
        <>
            <div>
                <button className="btn btn-warning ml-5 mb-5" onClick={() => document.getElementById('my_modal_2').showModal()}>Add New Partner</button>
                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box">
                        <form action="" className='p-5'>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id='name' name='name' required /><br /><br />
                            <label htmlFor="email">Email:</label>
                            <input type="text" id='email' name='email' required /><br /><br />
                            <label htmlFor="phone">Phone Number:</label>
                            <input type="number" id="phone" name='phone' required /><br /><br />
                            <label htmlFor="status"></label>
                            <select name="status" id="status">
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select><br /><br />
                            <label htmlFor="currentLoad">Current Load:</label>
                            <input type="number" name='currentLoad' id='currentLoad' /><br /><br />
                            <label htmlFor="areas">Area:</label>
                            <input type="text" id='areas' name='area' required /><br></br><br />
                            <label htmlFor="shift">Shift:</label>
                            <input type="time" id='shift' name='shift' required /><br /><br />
                            <label htmlFor="rating">Rating:</label>
                            <input type="number" id='rating' name='rating' min={1} max={10} /><br /><br />
                            <label htmlFor="completeOrder">Complete Order:</label>
                            <input type="text" id='completeOrder' name='completeOrder' /><br /><br />
                            <label htmlFor="cancelledOrder">Cancelled Order:</label>
                            <input type="text" id='cancelledOrder' name='cancelledOrder' /><br /><br />
                            <button className='btn btn-accent'>Submit</button>
                        </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table  ">
                        <thead className=''>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Current Load</th>
                                <th>Area</th>
                                <th>Shift</th>
                                <th>Rating</th>
                                <th>Completed Orders</th>
                                <th>Cancelled Orders</th>
                                <th>Edit profile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {partner.map((partner, index) => (
                                <tr key={index} className='hover'>
                                    <td>{partner.name}</td>
                                    <td>{partner.email}</td>
                                    <td>{partner.phone}</td>
                                    <td>{partner.status}</td>
                                    <td>{partner.currentLoad}</td>
                                    <td>{partner.areas}</td>
                                    <td>{partner.shift?.start}-{partner.shift?.end}</td>
                                    <td>{partner.metrics.rating}</td>
                                    <td>{partner.metrics.completedOrders}</td>
                                    <td>{partner.metrics.cancelledOrders}</td>
                                    <td><button className='btn btn-error' onClick={(event) => editModel(partner)}>Edit</button></td>
                                </tr>

                            ))}

                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Current Load</th>
                                <th>Area</th>
                                <th>Shift</th>
                                <th>Rating</th>
                                <th>Completed Orders</th>
                                <th>Cancelled Orders</th>
                                <th>Edit profile</th>
                            </tr>
                        </tfoot>
                    </table>
                    <dialog className="modal" id='my_model'>
                        <div className="modal-box">
                            <form action="" className='p-5 ' onSubmit={(event) => handleSubmit(event)}>
                                <label htmlFor="newname">Name:</label>
                                <input type="text" id='newname' name='name' /><br /><br />
                                <label htmlFor="newemail">Email:</label>
                                <input type="text" id='newemail' name='email' /><br /><br />
                                <label htmlFor="newphone">Phone Number:</label>
                                <input type="number" id="newphone" name='phone'/><br /><br />
                                <label htmlFor="newstatus"></label>
                                <select name="status" id="newstatus">
                                    <option value="">Select Status:</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select><br /><br />
                                <label htmlFor="newcurrentLoad">Current Load:</label>
                                <input type="number" name='currentLoad' id='newcurrentLoad' /><br /><br />
                                <label htmlFor="newarea">Areas:</label>
                                <input type="text" id='newareas' name='areas' /><br></br><br />
                                <label htmlFor="newshiftStart">Shift Start:</label>
                                <input type="time" id="newshiftStart" name="shiftStart"  /><br /><br />

                                <label htmlFor="newshiftEnd">Shift End:</label>
                                <input type="time" id="newshiftEnd" name="shiftEnd" /><br /><br />

                                <label htmlFor="newrating">Rating:</label>
                                <input type="number" id='newrating' name='rating' min={1} max={10} /><br /><br />
                                <label htmlFor="newcompleteOrder">Completed Order:</label>
                                <input type="text" id='newcompleteOrder' name='completeOrder' /><br /><br />
                                <label htmlFor="newcancelledOrder">Cancelled Order:</label>
                                <input type="text" id='newcancelledOrder' name='cancelledOrder' /><br /><br />
                                <button className='btn btn-accent'>Submit</button>
                            </form>
                        </div>
                        <form method="dialog" className="modal-backdrop" >
                            <button>close</button>
                        </form>
                    </dialog>
                </div>
            </div>
        </>
    )
}

export default Partners
