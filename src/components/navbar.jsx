import React from "react";
const Navbar = () => {
    return (
        <>
            <div className="navbar w-full fixed top-0">
                <nav className="bg-indigo-900 text-white p-2 flex justify-between">
                <h1 className="font-semibold text-2xl">TODO Task</h1>
                <ul className="hidden md:flex gap-10 justify-center text-xl font-bold">
                    <li className="cursor-pointer transform transition duration-300 hover:scale-105">About</li>
                    <li className="cursor-pointer transform transition duration-300 hover:scale-105">Home</li>
                    <li className="cursor-pointer transform transition duration-300 hover:scale-105">Contact</li>
                </ul>
                </nav>
            </div>
        </>)
}

export default Navbar;