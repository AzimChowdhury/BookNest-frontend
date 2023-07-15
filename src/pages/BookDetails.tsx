/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Link, useParams } from "react-router-dom"
import { useGiveReviewMutation, useSingleBookQuery } from "../redux/features/Books/BookApi"
import Loading from "../components/Loading"
import IBook from "../types/book.interface"
import men from '../assets/men.png'
import { useAppSelector } from "../redux/hook"


export default function BookDetails() {
    const { id } = useParams()
    const user = useAppSelector(state => state.user.user)
    const { data, isLoading, isError, error } = useSingleBookQuery(id)
    const [giveReview, { isLoading: loading, isError: error2, isSuccess: success }] = useGiveReviewMutation()

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        console.log(error);
        return <div className='flex justify-center items-center my-48'><p className='text-3xl text-red-600'>No Books Found</p></div>
    }
    const book: IBook = data.data;

    const handleSubmit = (event) => {
        event.preventDefault()
        const review = event.target.review.value
        const options = {
            id: id,
            data: { review: review }
        }
        giveReview(options)
        event.target.review.value = ''


    }

    return (
        <div>

            {/* book details */}
            <div className={`mx-20 my-10 flex justify-around  items-center `}>
                <div className='image-container'>
                    <img width='300px' src={book.image} className="shadow-2xl shadow-black" />
                </div>
                <div className=''>
                    <h1 className="text-4xl font-bold text-yellow-600 ">{book.Title}</h1>
                    <p className='text-2xl   text-yellow-500'>Author: {book.Author}</p>
                    <p className='text-2xl  text-yellow-500'> Genre: {book.Genre}</p>
                    <p className='text-2xl  text-yellow-500'>Publish Date: {book.PublicationDate}</p>
                    {/* edit and delete */}
                    <div className="flex justify-center my-5">
                        <Link to={`/editbook/${book._id}`}>
                            <button className="btn btn-outline btn-warning  me-5">Edit Book Details</button>
                        </Link>
                        <button className="btn btn-outline btn-error mx-3">Delete Book</button>
                    </div>
                </div>
            </div>



            {/*  review */}
            <div className="mt-20">
                <div className="flex justify-around">
                    <div>
                        <p className="text-4xl text-yellow-600 text-center">Reviews</p>
                        {
                            book.Reviews.map(review =>
                                <div className="flex my-5">
                                    <img width='35px' src={men} alt="" />
                                    <p className="mx-3">{review}</p>
                                </div>
                            )
                        }
                    </div>
                    {
                        user.email && <div>
                            <p className="text-4xl text-yellow-600 text-center">Give your review here</p>
                            <form onSubmit={handleSubmit}>
                                <textarea name="review" maxLength={150} cols={45} rows={5} className="textarea textarea-warning my-5" placeholder="write your review here"></textarea>
                                <br />
                                <button type="submit" className="btn btn-outline btn-warning w-full">Give Review</button>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
