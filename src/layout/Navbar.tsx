/* eslint-disable @typescript-eslint/no-misused-promises */
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { setUser } from '../redux/features/Users/userSlice'

export default function Navbar() {
    const user = useAppSelector(state => state.user.user)
    const dispatch = useAppDispatch()
    const logout = async () => {
        await signOut(auth)
            .then(() => {
                dispatch(setUser(null))
            })
    }

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
                {
                    user.email ?
                        <p onClick={() => logout()} className="mx-5 text-lg cursor-pointer hover:font-bold font-semibold">Log Out</p>
                        :
                        <Link to='/signin'>
                            <p className="mx-5 text-lg cursor-pointer hover:font-bold font-semibold">Sign In</p>
                        </Link>
                }
                {
                    user.email ? "" :
                        <Link to='/signup'>
                            <p className="mx-5 text-lg cursor-pointer hover:font-bold font-semibold">Sign Up</p>
                        </Link>
                }
            </div>
        </div>
    )
}
