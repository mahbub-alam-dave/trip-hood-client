import React from 'react';

const testimonials = [
  { _id: 1, name: "Tanvir", photo: "https://...", destination: "Cox's Bazar", text: "Had an unforgettable family trip." },
  { _id: 2, name: "Samia", photo: "https://...", destination: "Sajek", text: "Sea of clouds, beautiful experience!" },
  { _id: 2, name: "Samia", photo: "https://...", destination: "Sajek", text: "Sea of clouds, beautiful experience!" },
  // etc...
];


const ReviewSection = () => {
    return (
<section className="max-w-5xl mx-auto px-4 my-16 text-center">
  <h2 className="text-3xl font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-two)] mb-8">What Travelers Are Saying</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {testimonials.map(review => (
      <div key={review._id} className="text-center flex flex-col items-center">
  <img src={review.photo} className="w-16 h-16 rounded-full mb-2" />
  <p className="text-sm italic">“{review.text}”</p>
  <h4 className="text-md font-semibold mt-2">{review.name}</h4>
  <span className="text-xs text-gray-400">{review.destination}</span>
</div>
    ))}
  </div>
</section>
    );
};

export default ReviewSection;