/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useState, useEffect } from 'react';


export default function AllBooks() {
    const [Books, setBooks] = useState([])
    useEffect(() => {
        fetch('data.json')
            .then((res) => res.json())
            .then(data => setBooks(data))
    }, [])

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
    return (
        <div>
            <style>{styles}</style>
            {
                Books?.map((book, index) =>
                    <div className={`mx-20 my-10 flex justify-around  items-center ${index % 2 && `flex-row-reverse `}`}>
                        <div className='image-container'>
                            <img width='300px' src={book.image} className="shadow-2xl shadow-black" />
                        </div>
                        <div className=''>
                            <h1 className="text-4xl font-bold text-yellow-600 ">{book.Title}</h1>
                            <p className='text-2xl   text-yellow-500'>Author: {book.Author}</p>
                            <p className='text-2xl  text-yellow-500'> Genre: {book.Genre}</p>
                            <p className='text-2xl  text-yellow-500'>Publish Data: {book.PublicationDate}</p>
                            <p className='text-2xl  text-yellow-500'> Reviews: {book.Reviews}</p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
