/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useParams } from "react-router-dom"
import { useSingleBookQuery, useUpdateBookMutation } from "../redux/features/Books/BookApi"
import Loading from "../components/Loading"


export default function EditBook() {
    const { id } = useParams()
    const { data, isLoading, isError, error } = useSingleBookQuery(id)
    const [updateBook, { isLoading: loading, isError: error2, error: error3 }] = useUpdateBookMutation()

    if (isLoading || loading) {
        return <Loading />
    }

    if (isError) {
        console.log(error);
        return <div className='flex justify-center items-center my-48'><p className='text-3xl text-red-600'>No Books Found</p></div>
    }



    const title = data.data.Title || ''
    const author = data.data.Author || ''
    const genre = data.data.Genre || ''
    const publicationDate = data.data.PublicationDate || ''
    const image = data.data.image || ''


    const handleSubmit = (event) => {
        event.preventDefault()
        const Title = event.target.title.value;
        const Author = event.target.author.value;
        const Genre = event.target.genre.value;
        const PublicationDate = event.target.date.value;
        const image = event.target.image.value;
        const Reviews = data.data.Reviews
        const options = {
            id: id,
            data: { Title, Author, Genre, PublicationDate, image, Reviews }
        }
        const result = updateBook(options)
        console.log(result);

    }




    return (
        <div className="w-6/12 mx-auto">
            <p className="text-center text-4xl text-yellow-500 my-5">Edit Book Details</p>

            <form onSubmit={handleSubmit}>
                <div className="form-control w-96 mx-auto">
                    <label className="label">
                        <span className="label-text">Book Title</span>
                    </label>
                    <input defaultValue={title} name="title" type="text" className="input input-bordered w-96" />
                </div>
                <div className="form-control w-96 mx-auto">
                    <label className="label">
                        <span className="label-text">Author</span>
                    </label>
                    <input defaultValue={author} name="author" type="text" className="input input-bordered w-96" />
                </div>
                <div className="form-control w-96 mx-auto">
                    <label className="label">
                        <span className="label-text">Genre</span>
                    </label>
                    <input defaultValue={genre} name="genre" type="text" className="input input-bordered w-96" />
                </div>
                <div className="form-control w-96 mx-auto">
                    <label className="label">
                        <span className="label-text">Publish Date</span>
                    </label>
                    <input defaultValue={publicationDate} name="date" type="text" className="input input-bordered w-96" />
                </div>
                <div className="form-control w-96 mx-auto">
                    <label className="label">
                        <span className="label-text">Image URL</span>
                    </label>
                    <input defaultValue={image} name="image" type="text" className="input input-bordered w-96" />
                </div>
                {
                    error2 && error3 && <p className='text-red-500 text-center text-lg mt-5'>failed to update, something went wrong</p>
                }
                <button className="btn btn-outline btn-success w-96 ms-36 mt-5" type="submit">Success</button>
            </form>

        </div>
    )
}
