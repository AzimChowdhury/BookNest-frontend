import bannerBook from '../assets/book-banner.png'

export default function Banner() {
    const styles = `
    .round-image {
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      }
      
  `;
    return (
        <div className=" grid grid-cols-2 gap-24 mt-10 bg-base-100">
            <style>{styles}</style>
            <div className='ps-16 mt-24'>
                <p className='text-7xl font-semibold text-yellow-600'>Best Books to Grow Your Mind</p>
                <p className='text-lg font-semibold text-yellow-600 pt-5'>Discover worlds within pages, explore the shelves of imagination.</p>
            </div>
            <div className='ms-20'>
                <img className='round-image p-5' src={bannerBook} alt="" />
            </div>
        </div>
    )
}
