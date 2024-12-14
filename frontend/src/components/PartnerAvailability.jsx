import React, { useState, useEffect } from "react";

function PartnerAvailability(){
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/partners"); 
        if (!response.ok) {
          throw new Error("Failed to fetch partner data");
        }
        const data = await response.json();
        setPartners(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Partner Availability Status</h1>
      <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner) => (
          <li key={partner._id} className="card w-full bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">{partner.name}</h2>
              <div className="mt-2">
                <span
                  className={`badge ${
                    partner.status === "Online"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {partner.status}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PartnerAvailability;