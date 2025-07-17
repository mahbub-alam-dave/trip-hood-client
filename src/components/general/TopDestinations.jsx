import React from 'react';
const destinations = [
  { _id: 1, name: "Cox's Bazar", image: "https://i.ibb.co/fzZw53Nk/cox-s-bazar-four.jpg", tagline: "World's longest sea beach" },
  { _id: 2, name: "Sajek Valley", image: "https://i.ibb.co/hxttXf5C/sajek-valley-four.jpg", tagline: "Heaven above the clouds" },
  { _id: 3, name: "St. Martin's Island", image: "https://i.ibb.co/KzQxRCWs/saint-martin-two.jpg", tagline: "Tropical beach paradise" },
  // add more...
];
const TopDestinations = () => {
    return (
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
  <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">Top Tourist Destinations</h2>
  <div className="flex overflow-x-auto gap-4">
  {destinations.map(dest => (
    <div key={dest._id} className="min-w-[300px] w-full rounded-xl overflow-hidden relative">
      <img src={dest.image} className="h-68 w-full object-cover" />
      <div className="absolute bottom-0 left-0 w-full bg-black/25 p-2 text-[var(--color-text-primary-two)]">
        <h3 className="text-lg font-bold">{dest.name}</h3>
        <p className="text-xs">{dest.tagline}</p>
      </div>
    </div>
  ))}
</div>
</section>
    );
};

export default TopDestinations;