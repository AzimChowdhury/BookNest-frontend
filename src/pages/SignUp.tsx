import signUpImage from '../assets/signup.jpeg'

export default function SignUp() {


    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log({ email, password });

    }

    return (
        <div className='flex justify-around items-center my-16'>
            <div>
                <img width='450px' src={signUpImage} alt="" />
            </div>
            <div className='px-8 py-16 rounded-2xl shadow-2xl shadow-black'>
                <form onSubmit={handleSubmit}>
                    <p className='text-4xl text-yellow-400 text-center'>Sign Up</p>
                    <div className="form-control my-5">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name='email' id="email" type="email" placeholder="Email" autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off" className="input input-bordered w-96  " />
                    </div>
                    <div className="form-control my-5">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input name='password' id="password" type="password" autoCapitalize="none"
                            autoCorrect="off" placeholder="Password" className="input input-bordered w-96 " />
                    </div>
                    <button className="btn btn-outline btn-warning w-96 mt-5">Sign Up</button>
                </form>
            </div>
        </div>
    )
}
