/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useGetBooksQuery } from '../redux/features/Books/BookApi';
import IBook from '../types/book.interface';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

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

    const { data, isLoading, error } = useGetBooksQuery(undefined)
    const Books: IBook[] = data?.data


    if (isLoading) {
        return <Loading />
    }

    if (error) {
        console.log(error);
        return <div className='flex justify-center items-center my-48'><p className='text-3xl text-red-600'>No Books Found</p></div>
    }
    return (
        <div>
            <style>{styles}</style>
            {
                Books?.map((book: IBook, index: number) =>
                    <Link to={`/book/${book._id!}`}>
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
    )
}
