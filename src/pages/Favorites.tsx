import Navbar from '../components/Navbar';

const Favorites = () => {
  return (
    <div className="bg-black min-h-screen text-white font-['Poppins']">
      <Navbar />
      <div className='pt-[150px] px-4 md:px-[140px]'>
        <h1 className='text-3xl font-bold mb-8'>My Favorites</h1>
        <p className='text-neutral-400'>
          Your favorite movies will appear here.
        </p>
      </div>
    </div>
  );
};

export default Favorites;
