/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useGetBooksQuery, useSearchBookMutation } from '../redux/features/Books/BookApi';
import IBook from '../types/book.interface';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { setBook } from '../redux/features/Books/BookSlice';

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
    const { data, isLoading, error } = useGetBooksQuery(undefined)
    const books = useAppSelector(state => state.book)


    const [searchBook, { isLoading: loading, isError }] = useSearchBookMutation()


    let Books: IBook[] = data?.data


    if (isLoading || loading) {
        return <Loading />
    }

    if (error) {
        console.log(error);
        return <div className='flex justify-center items-center my-48'><p className='text-3xl text-red-600'>No Books Found</p></div>
    }


    const handleSearch = async (event) => {
        event.preventDefault()
        const searchText = event.target.search.value
        if (searchText) {
            const result = await searchBook(searchText)
            dispatch(setBook(result?.data))
        }
    }


    const handleYearFilter = () => {
        Books = data?.data
        const year = document.getElementById('year').value;
        Books = Books.filter(book => {
            return book.PublicationDate.slice(0, 4) === year
        })
        dispatch(setBook(Books))

    }

    return (
        <div>
            <style>{styles}</style>
            <div className=' flex justify-around my-5'>
                {/* search box */}
                <div className="form-control">
                    <form onSubmit={handleSearch} className="input-group">
                        <input name='search' type="text" placeholder="Search by title, author or genre" className="input input-bordered  w-96" />
                        <button type='submit' className="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </form>
                </div>
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
            }
        </div>
    )
}
