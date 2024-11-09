import Footer from '../homepage/Footer';
import Header from '../homepage/Header';

const Loader = () => {
  return (
    <div className="flex h-screen items-center flex-col justify-center bg-white dark:bg-black">
      <Header />
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Loader;
