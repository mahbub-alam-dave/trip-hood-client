const Overview = () => {
    const images = [
    "https://i.ibb.co/gM5nqn22/img-1.jpg",
    "https://i.ibb.co/XmKXWqQ/img-2.jpg",
    "https://i.ibb.co/1JXDyKRG/img-3.jpg",
    "https://i.ibb.co/VcxtGD8z/img-4.jpg",
  ];
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <h2 className="text-4xl font-bold text-center mb-16 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">
        Why Choose Trip Hood?
      </h2>

      <div className="grid md:grid-cols-2 gap-12 items-center text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">
        {/* Left Content */}
        <div className="space-y-8 ">
          {/* About Purpose */}
          <div>
            <h3 className="text-2xl font-semibold mb-2">Who We Are</h3>
            <p className=" leading-relaxed text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
              Trip Hood is your personal travel companion — dedicated to connecting travelers with unforgettable experiences. Whether you're a solo explorer or group adventurer, we help you discover the hidden gems of the world.
            </p>
          </div>

          {/* What We Offer */}
          <div>
            <h3 className="text-2xl font-semibold mb-2 ">What We Offer</h3>
            <p className="leading-relaxed text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
              From curated tour packages and personalized itineraries to community travel forums and travel resources — we offer everything you need to plan and enjoy your next adventure.
            </p>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-2xl font-semibold mb-2">Our Services</h3>
            <ul className="list-disc pl-5 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] space-y-2">
              <li>Hand-picked tour packages for every budget</li>
              <li>24/7 travel assistance and support</li>
              <li>Local guide recommendations & reviews</li>
              <li>Online community to connect with fellow travelers</li>
              <li>Secure booking & flexible cancellations</li>
            </ul>
          </div>
        </div>

        {/* Right Side Image or Illustration */}
        {/* <div className="grid grid-cols-2 gap-4">
          <img
            src="https://i.ibb.co/gM5nqn22/img-1.jpg"
            alt="Travel Spot"
            className="rounded-lg shadow-lg h-40 object-cover"
          />
          <img
            src="https://i.ibb.co/5XpKvNjn/img-12.jpg"
            alt="Adventure"
            className="rounded-lg shadow-lg h-80 object-cover"
          />
          <img
            src="https://i.ibb.co/ytRn7bK/img-13.jpg"
            alt="Nature Tour"
            className="rounded-lg shadow-lg h-80 object-cover"
          />
          <img
            src="https://i.ibb.co/4Z7cBDmb/pexels-asadphoto-1430677.jpg"
            alt="City Trip"
            className="rounded-lg shadow-lg h-40 object-cover"
          />
        </div> */}
            {/* Right Image Collage */}
        <div className="grid grid-cols-2 gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-lg group"
            >
              <img
                src={img}
                alt={`Destination ${index}`}
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Overview;


/* 
https://i.ibb.co/gM5nqn22/img-1.jpg
https://i.ibb.co/XmKXWqQ/img-2.jpg
https://i.ibb.co/1JXDyKRG/img-3.jpg
https://i.ibb.co/VcxtGD8z/img-4.jpg
https://i.ibb.co/Q3TpRxwJ/img-5.jpg
https://i.ibb.co/Nd61D9jS/img-6.jpg
https://i.ibb.co/VpmWyz0N/img-7.jpg
https://i.ibb.co/0VpYd1B7/img-8.jpg
https://i.ibb.co/gMyptPrC/img-9.jpg
https://i.ibb.co/9KPvwsd/img-10.jpg
https://i.ibb.co/Kpy5t1Xk/img-11.jpg
https://i.ibb.co/5XpKvNjn/img-12.jpg
https://i.ibb.co/ytRn7bK/img-13.jpg
https://i.ibb.co/4Z7cBDmb/pexels-asadphoto-1430677.jpg */
