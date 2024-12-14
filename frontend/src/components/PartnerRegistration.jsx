import React, { useEffect, useState } from 'react'

function PartnerRegistration() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const response = await fetch("http://localhost:8000/api/registrations",
             {  method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (response.ok) {
                alert("Registration successful !")
                setFormData({ name: "", email: "", password: "" })
            } else {
                alert("Registration failed" + (result.message || "Unknown error occured"));
            }

        } catch (error) {
            alert("An error occurred while submiting the form");
            console.log("Error details:", error);

        }
    }

    return (
        <>
            <div className="flex items-center justify-center ">
                <div className="border-2 w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12 px-8 py-6 border-zinc-900 rounded-lg">
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-xl font-bold mb-6 text-center">Partner Registration Form</h1>
                        <label htmlFor="name" className="block">Name:</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            name="name"
                            id="name"
                            className="w-full mb-4 px-3 py-2 border rounded-md"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <label htmlFor="email" className="block">Email:</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            id="email"
                            className="w-full mb-4 px-3 py-2 border rounded-md"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <label htmlFor="password" className="block">Password:</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            id="password"
                            className="w-full mb-4 px-3 py-2 border rounded-md"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full">
                            Submit
                        </button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default PartnerRegistration
