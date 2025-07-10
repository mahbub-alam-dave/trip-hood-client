const AppAndNewsletterCTA = () => {
  return (
    <section className="bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)] text-white py-12 px-4 mt-20 ">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Plan Your Next Tour with Freindy Tour</h2>
        <p className="text-sm max-w-xl mx-auto text-gray-300">
          Stay updated with the latest travel deals, destination tips, and exclusive offers. Subscribe now or download our app to experience seamless tour planning!
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
        {/* Newsletter Form */}
        <form className="flex flex-wrap justify-center gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 w-64 rounded-lg text-black focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[var(--color-primary)] dark:bg-[var(--color-primary-dark)] text-white px-5 py-3 rounded-lg font-semibold hover:scale-105 transition"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* App Download Buttons */}
      <div className="flex justify-center gap-4 flex-wrap">
        <a href="#" target="_blank">
          <img
            src="/assets/appstore.png"
            alt="Download on App Store"
            className="h-12 hover:scale-105 transition"
          />
        </a>
        <a href="#" target="_blank">
          <img
            src="/assets/playstore.png"
            alt="Get it on Google Play"
            className="h-12 hover:scale-105 transition"
          />
        </a>
      </div>
    </section>
  );
};

export default AppAndNewsletterCTA;
