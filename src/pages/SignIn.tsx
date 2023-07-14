/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useNavigate } from 'react-router-dom'
import signUpImage from '../assets/signin.jpeg'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import Loading from '../components/Loading'
import { signin } from '../redux/features/Users/userSlice'

export default function SignIn() {

    const { user, isLoading, isError, error } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        dispatch(signin({ email, password }))

    }
    if (isLoading) {
        return <Loading />
    }
    if (user.email) {
        navigate('/')
    }



    return (
        <div className='flex justify-around items-center my-16'>
            <div>
                <img width='450px' src={signUpImage} alt="" />
            </div>
            <div className='px-8 py-16 rounded-2xl shadow-2xl shadow-black'>
                <form onSubmit={handleSubmit}>
                    <p className='text-4xl text-yellow-400 text-center'>Sign In</p>
                    <div className="form-control my-5">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input required name='email' id="email" type="email" placeholder="Email" autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off" className="input input-bordered w-96  " />
                    </div>
                    <div className="form-control my-5">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input required name='password' id="password" type="password" autoCapitalize="none"
                            autoCorrect="off" placeholder="Password" className="input input-bordered w-96 " />
                    </div>
                    {
                        isError && <p className='text-red-500'>{error}</p>
                    }
                    <button type='submit' className="btn btn-outline btn-warning w-96 mt-5">Sign In</button>
                </form>
            </div>
        </div>
    )
}
