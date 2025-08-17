const Overview = () => {
    const images = [
    "https://i.ibb.co/Z6PLh7LK/img-4.webp",
"https://i.ibb.co/JwySJRJj/img-3.webp",
"https://i.ibb.co/qwkfGmw/img-2.webp",
"https://i.ibb.co/zT47kt2J/img-1.webp"
/*     "https://i.ibb.co/gM5nqn22/img-1.jpg",
    "https://i.ibb.co/XmKXWqQ/img-2.jpg",
    "https://i.ibb.co/1JXDyKRG/img-3.jpg",
    "https://i.ibb.co/VcxtGD8z/img-4.jpg", */
  ];
  return (
    <section className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <div className="space-y-4 mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center  text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">
        Why Choose Trip Hood?
      </h2>
       <p className='text-center md:text-lg text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]'>A small glimpse about TripHood. We believe that we provide the best travel journey you have ever experienced</p>
       </div>

      <div className="grid md:grid-cols-2 gap-12 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">
        {/* Left Content */}
        <div className="space-y-4 md:mt-10">
  <h3 className="text-xl md:text-2xl font-semibold">About Trip Hood</h3>
  <p className="leading-relaxed text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
    Trip Hood is your personal travel companion, dedicated to connecting travelers with unforgettable experiences. Whether you're a solo explorer or an adventurer in a group, we help you uncover the hidden gems of the world. We offer curated tour packages, personalized itineraries, community travel forums, and essential travel resources to make planning effortless and exciting. Our services include hand-picked packages for every budget, 24/7 travel assistance, local guide recommendations with authentic reviews, a vibrant online community to connect with fellow travelers, and secure booking with flexible cancellations — ensuring your journey is smooth, memorable, and truly yours.
  </p>
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
{/*         <div className="grid grid-cols-2 gap-4">
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
        </div> */}
              <iframe
        src="https://www.youtube.com/embed/SzYJ-EgWmvQ"
        title="Trip Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        // style={{ width: "100%", height: "100%" }}
        className="rounded-xl h-[450px] w-full"
      ></iframe>
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
