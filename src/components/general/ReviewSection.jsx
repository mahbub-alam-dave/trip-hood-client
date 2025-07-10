import React from 'react';

const testimonials = [
  { _id: 1212, name: "Tanvir", photo: "https://...", destination: "Cox's Bazar", text: "Had an unforgettable family trip." },
  { _id: 211223, name: "Samia", photo: "https://...", destination: "Sajek", text: "Sea of clouds, beautiful experience!" },
  { _id: 212313, name: "Samia", photo: "https://...", destination: "Sajek", text: "Sea of clouds, beautiful experience!" },
  // etc...
];


const ReviewSection = () => {
    return (
        <div className='bg-gray-100 dark:bg-[var(--color-bg-primary-dark)] py-10'>
<section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
  <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] mb-12">What Travelers Are Saying</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {testimonials.map(review => (
      <div key={review._id} className="text-center flex flex-col items-center text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
  <img src={review.photo} className="w-16 h-16 rounded-full mb-2" />
  <p className="text-sm italic">“{review.text}”</p>
  <h4 className="text-md font-semibold mt-2">{review.name}</h4>
  <span className="text-xs text-gray-400">{review.destination}</span>
</div>
    ))}
  </div>
</section>
</div>
    );
};

export default ReviewSection;