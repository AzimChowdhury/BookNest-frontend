/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useParams } from "react-router-dom"
import { useGetWishlistQuery } from "../redux/features/Users/userApi";
import Loading from "../components/Loading";
import { IWishlist } from "../types/wishlist.interface";

export default function MyWishlist() {
    const { email } = useParams()

    const { data, isLoading, isError } = useGetWishlistQuery(email)
    const myWishlist: IWishlist = data

    if (isLoading) {
        return <Loading />
    }

    if (data === null) {
        console.log(isError);
        return <div className='flex justify-center items-center my-48'><p className='text-3xl text-red-600'>No Books in your wishlist</p></div>
    }

    return (
        <div>
            <p className='text-center text-green-500 text-4xl font-semibold mt-5'> My Wishlist</p>
            {/* already read books */}
            <div>
                {
                    myWishlist.alreadyRead.length >= 1 &&
                    <div>
                        <p className='text-center text-green-500 text-2xl font-semibold my-6'>Already Read Books</p>
                        <div className="flex justify-around">
                            {
                                myWishlist.alreadyRead.map(book =>
                                    <div className="card w-60 bg-base-200 border-green-500 border-2 shadow-2xl shadow-gray-950">
                                        <figure className="p-2">
                                            <img width='200px' src={book.image} alt="book image" className="rounded-xl" />
                                        </figure>
                                        <div className="card-body p-2 items-center text-center">
                                            <h2 className="card-title">{book.Title}</h2>
                                            <p>Author: {book.Author}</p>
                                            <p>Genre: {book.Genre}</p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                }
            </div>
            {/* now reading books */}
            <div>
                {
                    myWishlist.nowReading.length >= 1 &&
                    <div>
                        <p className='text-center text-green-500 text-2xl font-semibold my-6'>Now Reading Books</p>
                        <div className="flex justify-around">
                            {
                                myWishlist.nowReading.map(book =>
                                    <div className="card w-60 bg-base-200 border-green-500 border-2 shadow-2xl shadow-gray-950">
                                        <figure className="p-2">
                                            <img width='200px' src={book.image} alt="book image" className="rounded-xl" />
                                        </figure>
                                        <div className="card-body p-2 items-center text-center">
                                            <h2 className="card-title">{book.Title}</h2>
                                            <p>Author: {book.Author}</p>
                                            <p>Genre: {book.Genre}</p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                }
            </div>
            {/* will read books */}
            <div>
                {
                    myWishlist.willRead.length >= 1 &&
                    <div>
                        <p className='text-center text-green-500 text-2xl font-semibold my-6'>Will Read Books</p>
                        <div className="flex justify-around">
                            {
                                myWishlist.willRead.map(book =>
                                    <div className="card w-60 bg-base-200 border-green-500 border-2 shadow-2xl shadow-gray-950">
                                        <figure className="p-2">
                                            <img width='200px' src={book.image} alt="book image" className="rounded-xl" />
                                        </figure>
                                        <div className="card-body p-2 items-center text-center">
                                            <h2 className="card-title">{book.Title}</h2>
                                            <p>Author: {book.Author}</p>
                                            <p>Genre: {book.Genre}</p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                }
            </div>
        </div>
    )
}
