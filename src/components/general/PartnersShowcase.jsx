const PartnersShowcase = () => {
  const partners = [
    { id: 1, name: "GreenView Hostel", logo: " https://i.ibb.co/zTfQXbMS/Black-White-Simple-Staycation-House-Business-Logo.png", website: "#" },
    { id: 2, name: "Skylink Transports", logo: "https://i.ibb.co/FknnsrJp/Black-and-Yellow-Technology-Company-Logo.png", website: "#" },
    { id: 3, name: "Breeze Airlines", logo: "https://i.ibb.co/LzrhX86R/Green-white-Modern-car-service-Logo.png", website: "#" },
    { id: 4, name: "NextStay Inn", logo: "https://i.ibb.co/wrjkKSjM/Red-Blue-Modern-Logistics-Express-Logo.png", website: "#" },
    { id: 5, name: "Horizon Cabs", logo: "https://i.ibb.co/Kc8XTZBr/Blue-and-White-Modern-Hotel-Logo-1.png", website: "#" },
    { id: 5, name: "Horizon Cabs", logo: "https://i.ibb.co/GfY2BNsV/Black-Gold-Simple-Modern-Villa-Homestay-Logo.png", website: "#" },
  ];

 






  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">
        Trusted Partners & Services
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-8">
        {partners.map(partner => (
          <a
            key={partner.id}
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:opacity-100 opacity-70"
            // title={partner.name}
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-14 w-auto rounded-lg object-contain grayscale hover:grayscale-7 transition"
            />
          </a>
        ))}
      </div>
    </section>
  );
};

export default PartnersShowcase;
