import signUpImage from '../assets/signin.jpeg'

export default function SignIn() {
    return (
        <div className='flex justify-around items-center my-16'>
            <div>
                <img width='450px' src={signUpImage} alt="" />
            </div>
            <div className='px-8 py-16 rounded-2xl shadow-2xl shadow-black'>
                <p className='text-4xl text-yellow-400 text-center'>Sign In</p>
                <div className="form-control my-5">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="Email" className="input input-bordered w-96  " />
                </div>
                <div className="form-control my-5">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="Password" className="input input-bordered w-96 " />
                </div>
                <button className="btn btn-outline btn-warning w-96 mt-5">Sign In</button>
            </div>
        </div>
    )
}
