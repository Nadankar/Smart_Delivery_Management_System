import React, { useEffect, useState } from 'react'

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/orders");
        if (!response.ok) {
          throw Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchOrders();
  }, [])
  return (
    <>
      <div className='overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Customer Name</th>
              <th>Phone Number</th>
              <th>Area</th>
              <th>Items Ordered</th>
              <th>Status</th>
              <th>Assigned Partner</th>
              <th>Total Amount</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr className=' hover' key={index}>

                <td>{order.orderNumber}</td>
                <td>{order.customer.name}</td>
                <td>{order.customer.phone}</td>
                <td>{order.area}</td>
                <td>{order.items.name}</td> 
                <td>
                  < button
                    className={`${order.status === "pending"
                        ? "bg-yellow-300"
                        : order.status === "assigned"
                          ? "bg-green-300"
                          : order.status === "picked"
                            ? "bg-blue-300"
                            : order.status === "delivered"
                              ? "bg-rose-500"
                              : ""
                      } p-2 rounded-md`}
                  >
                    {order.status}
                  </button>
                </td>
                <td>{order.assignedTo}</td>
                <td>{order.totalAmount}</td>
                <td>{order.createdAt}</td>
                <td>{order.updatedAt}</td>
              </tr>

            ))

            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Orders

