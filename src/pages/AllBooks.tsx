/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useGetBooksQuery, useSearchBookMutation } from '../redux/features/Books/BookApi';
import IBook from '../types/book.interface';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { setBook } from '../redux/features/Books/BookSlice';
import { usePostWishlistMutation } from '../redux/features/Users/userApi';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const styles = `
.image-container {
    width: 300px;
    height: 400px;
    perspective: 800px;
  }
  .image-container img {
    width: 100%;
    height: 100%;
    transform: rotateY(30deg); 
  }
  
`;


export default function AllBooks() {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user.user)
    const { data, isLoading, error } = useGetBooksQuery(undefined)
    const books = useAppSelector(state => state.book)

    const [searchBook, { isLoading: loading }] = useSearchBookMutation()
    const [postWishlist] = usePostWishlistMutation()
    const MySwal = withReactContent(Swal)

    let Books: IBook[] = data?.data


    if (isLoading || loading) {
        return <Loading />
    }

    if (error) {
        console.log(error);
        return <div className='flex justify-center items-center my-48'><p className='text-3xl text-red-600'>No Books Found</p></div>
    }


    const handleSearch = async (event: any) => {
        event.preventDefault()
        const searchText = event.target.search.value
        if (searchText) {
            const result: any = await searchBook(searchText)
            dispatch(setBook(result?.data))
        }
    }


    const handleYearFilter = () => {
        Books = data?.data
        const year = (document.getElementById('year') as HTMLInputElement)?.value;
        Books = Books.filter(book => {
            return book.PublicationDate.slice(0, 4) === year
        })
        dispatch(setBook(Books))

    }

    const handleGenreFilter = () => {
        Books = data?.data
        const genre = (document.getElementById('genre') as HTMLInputElement)?.value;
        Books = Books.filter(book => {
            return book.Genre === genre
        })
        dispatch(setBook(Books))

    }

    const handleAddToWishlist = async (book: IBook, stage: string) => {
        if (user.email) {
            const data = {
                user: user.email,
                stage,
                book
            }
            const result: any = await postWishlist(data)
            if (result?.data?.acknowledged) {
                MySwal.fire({
                    title: <strong>Successful</strong>,
                    html: <p>Book added to wishlist successfully!</p>,
                    icon: 'success'
                })
            } else {
                MySwal.fire({
                    title: <strong>Failed</strong>,
                    html: <p>Failed to add on wishlist!</p>,
                    icon: 'error'
                })
            }
        }
    }

    return (
        <div>
            <style>{styles}</style>
            <div className=' flex justify-around my-5'>
                {/* filter by publication year */}
                <div className="form-control w-full max-w-xs">
                    <select onChange={handleYearFilter} id='year' className="select select-bordered">
                        <option disabled selected>Filter by Publication year</option>
                        <option>2022</option>
                        <option>2021</option>
                        <option>2020</option>
                        <option>2019</option>
                    </select>
                </div>


                {/* search box */}
                <div className="form-control">
                    <form onSubmit={handleSearch} className="input-group">
                        <input name='search' type="text" placeholder="Search by title, author or genre" className="input input-bordered  w-96" />
                        <button type='submit' className="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </form>
                </div>

                {/* filter by genre */}
                <div className="form-control w-full max-w-xs">
                    <select onChange={handleGenreFilter} id='genre' className="select select-bordered">
                        <option disabled selected>Filter by Genre</option>
                        <option>Psychology</option>
                        <option>Spirituality</option>
                        <option>Personal Development</option>
                        <option>Personal Finance</option>
                    </select>
                </div>
            </div>




            {
                books.length >= 1 ?
                    <div>
                        <p className='text-center text-green-500 text-4xl font-semibold'> Results</p>

                        {
                            books?.map((book: IBook, index: number) =>
                                <Link key={index} to={`/book/${book._id!}`}>
                                    <div className={`mx-20 my-10 flex justify-around  items-center ${index % 2 && `flex-row-reverse `}`}>
                                        <div className='image-container'>
                                            <img width='300px' src={book.image} className="shadow-2xl shadow-black" />
                                        </div>
                                        <div className=''>
                                            <h1 className="text-4xl font-bold text-yellow-600 ">{book.Title}</h1>
                                            <p className='text-2xl   text-yellow-500'>Author: {book.Author}</p>
                                            <p className='text-2xl  text-yellow-500'> Genre: {book.Genre}</p>
                                            <p className='text-2xl  text-yellow-500'>Publish Data: {book.PublicationDate}</p>

                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                    </div>
                    :
                    <div>
                        <p className='text-center text-green-500 text-4xl font-semibold'>All Books</p>
                        {
                            Books?.map((book: IBook, index: number) =>
                                <div key={index} className={`mx-20 my-10 flex justify-around  items-center ${index % 2 && `flex-row-reverse `}`}>
                                    <Link key={index} to={`/book/${book._id!}`}>
                                        <div className='image-container'>
                                            <img width='300px' src={book.image} className="shadow-2xl shadow-black" />
                                        </div>
                                    </Link>
                                    <div className=''>
                                        <h1 className="text-4xl font-bold text-yellow-600 ">{book.Title}</h1>
                                        <p className='text-2xl   text-yellow-500'>Author: {book.Author}</p>
                                        <p className='text-2xl  text-yellow-500'> Genre: {book.Genre}</p>
                                        <p className='text-2xl  text-yellow-500'>Publish Data: {book.PublicationDate}</p>

                                        {
                                            user.email &&
                                            <div>
                                                <button onClick={() => handleAddToWishlist(book, 'alreadyRead')} className="btn btn-outline btn-primary mx-3 mt-3 btn-sm">have read</button>
                                                <button onClick={() => handleAddToWishlist(book, 'nowReading')} className="btn btn-outline btn-secondary mx-3 mt-3 btn-sm">now reading</button>
                                                <button onClick={() => handleAddToWishlist(book, 'willRead')} className="btn btn-outline btn-accent mx-3 mt-3 btn-sm">will read</button>
                                            </div>
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
            }
        </div>
    )
}
