import React, { useEffect, useState } from 'react'

function Assignment() {
    const [assignments, setAssignments] =useState ([]);
    const [assiMetric, setassiMetric] = useState([]);
    const [error, setError] = useState(null);

    useEffect( () => {
        const fetchAssignments=async()=>{
            try {
                const response = await fetch("http://localhost:8000/api/assignments");
    
                if (!response.ok) {
                    throw Error("Failed to fetch assignmets");
                }
                const data =await response.json();
             

                setAssignments(data);
            } catch (error) {
                setError(error.message);
            }

        }
        fetchAssignments();
        
    }, [])

    useEffect(() => {
        const fetchAssiMetrics=async()=>{
            try {
                const response =await fetch("http://localhost:8000/api/assignmentMetric");
                if (!response.ok) {
                    throw Error("failed to fetch assignmnet metrics");
                }
                const data =await response.json();
                setassiMetric(data);
            } catch (error) {
                setError(error.message);
            }

        }
        fetchAssiMetrics();

    },[])
    return (
        <>
            <div>
                {assiMetric.map((metric,index) => (
                    <div className="card bg-primary text-primary-content flex flex-row mb-10 m-4" key={index}>
                        <div className="card-body bg-red-500 text-black rounded-l-2xl">
                            <h2 className="card-title">Assigned Assignments</h2>
                            <p>{metric.totalAssigned}</p>
                        </div>
                        <div className="card-body">
                            <h2 className="card-title">Success Rate</h2>
                            <p>{metric.successRate}</p>
                        </div>
                        <div className="card-body bg-red-500 text-black">
                            <h2 className="card-title">Average Time</h2>
                            <p>{metric.averageTime}</p>
                        </div>
                        <div className="card-body  bg-primary rounded-r-2xl">
                            <h2 className="card-title ">failure Reasons</h2>
                            <p>{metric.failureResons}</p>
                        </div>
                    </div>
                ))}

            </div>
            <div className='overflow-x-auto '>
                <table className='table flex '>
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Partner Id</th>
                            <th>Timestamp</th>
                            <th>Status</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.map((assignment, index) => (
                            <tr className='hover ' key={index}> 
                                <td>{assignment.orderId}</td>
                                <td>{assignment.partnerId}</td>
                                <td>{new Date(assignment.timestamp).toLocaleString()}</td>
                                <td>{assignment.status}</td>
                                <td>{assignment.reason}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Assignment

