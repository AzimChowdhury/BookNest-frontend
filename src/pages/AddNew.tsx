/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useAddBookMutation } from "../redux/features/Books/BookApi"
import Loading from "../components/Loading"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useAppSelector } from "../redux/hook"


export default function AddNew() {
    const { user } = useAppSelector(state => state.user)
    const [addBook, { isLoading, isError, error }] = useAddBookMutation()

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        console.log(error);
        return <div className='flex justify-center items-center my-48'><p className='text-3xl text-red-600'>Failed to add book</p></div>
    }




    const MySwal = withReactContent(Swal)





    const handleSubmit = async (event: any) => {
        event.preventDefault()
        const Title = event.target.title.value;
        const Author = event.target.author.value;
        const Genre = event.target.genre.value;
        const PublicationDate = event.target.date.value;
        const image = event.target.image.value;
        if (!user.email) {
            MySwal.fire({
                title: <strong>Failed</strong>,
                html: <p>you are not authorized to add a book, please log in first</p>,
                icon: 'error'
            })
        } else {
            const data = { Title, Author, Genre, PublicationDate, image, user: user.email, Reviews: [] }
            const result: any = await addBook(data)
            if (result.data.data.acknowledged) {
                MySwal.fire({
                    title: <strong>Successful</strong>,
                    html: <p>Book added successfully!</p>,
                    icon: 'success'
                })
            }
        }

    }




    return (
        <div className="w-6/12 mx-auto">
            <p className="text-center text-4xl text-green-500 my-5">Add New Book </p>

            <form onSubmit={handleSubmit}>
                <div className="form-control w-96 mx-auto">
                    <label className="label">
                        <span className="label-text">Book Title</span>
                    </label>
                    <input placeholder="book title" name="title" type="text" className="input input-bordered w-96" />
                </div>
                <div className="form-control w-96 mx-auto">
                    <label className="label">
                        <span className="label-text">Author</span>
                    </label>
                    <input placeholder="author name" name="author" type="text" className="input input-bordered w-96" />
                </div>
                <div className="form-control w-96 mx-auto">
                    <label className="label">
                        <span className="label-text">Genre</span>
                    </label>
                    <input placeholder="book genre" name="genre" type="text" className="input input-bordered w-96" />
                </div>
                <div className="form-control w-96 mx-auto">
                    <label className="label">
                        <span className="label-text">Publish Date</span>
                    </label>
                    <input placeholder="publication date" name="date" type="text" className="input input-bordered w-96" />
                </div>
                <div className="form-control w-96 mx-auto">
                    <label className="label">
                        <span className="label-text">Image URL</span>
                    </label>
                    <input placeholder="book image url" name="image" type="text" className="input input-bordered w-96" />
                </div>
                {/* {
                    error2 && error3 && <p className='text-red-500 text-center text-lg mt-5'>failed to update, something went wrong</p>
                } */}
                <button className="btn btn-outline btn-success w-96 ms-36 mt-5" type="submit">Add Book</button>
            </form>

        </div>
    )
}
