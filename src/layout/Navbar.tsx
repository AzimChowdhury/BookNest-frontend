import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div className="navbar bg-base-200">
            <Link to='/' className="flex-1 ms-10">
                <img width='30' src="vite.png" alt="BN" />
                <p className=" text-2xl font-bold ms-2">BookNest</p>
            </Link>

            <div className="flex-none me-16">
                <Link to='/allBooks'>
                    <p className="mx-5 text-lg cursor-pointer hover:font-bold font-semibold">All Books</p>
                </Link>
                <p className="mx-5 text-lg cursor-pointer hover:font-bold font-semibold">Add New</p>
                <p className="mx-5 text-lg cursor-pointer hover:font-bold font-semibold">Sign In</p>
                <p className="mx-5 text-lg cursor-pointer hover:font-bold font-semibold">Sign Up</p>
            </div>
        </div>
    )
}
