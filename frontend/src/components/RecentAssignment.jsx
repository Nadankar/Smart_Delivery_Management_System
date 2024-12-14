import React, { useEffect, useState } from 'react';

function RecentAssignment() {
    const [assignments, setAssignments] = useState(0);
    const [error, setError] = useState(null);
  

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/assignments");
                if (!response.ok) {
                    throw new Error("Failed to fetch assignments");
                }
                const data = await response.json();
                setAssignments(data.length);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchAssignments();
    }, []);

    return (
        <div className='p-4 card-body card bottom-3 shadow-md mb-2 font-bold text-2xl text-center bg-base-100 m-5'>
            <h2 className=' mb-4'>Recent Assignments:</h2>
            {error ? (
                <p>Error: {error}</p> 
            ) : (
                <p>{assignments}</p> 
            )}
        </div>
       

    );
}

export default RecentAssignment;

