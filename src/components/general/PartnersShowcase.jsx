const PartnersShowcase = () => {
  const partners = [
    { id: 1, name: "GreenView Hostel", logo: "/assets/greenview.png", website: "#" },
    { id: 2, name: "Skylink Transports", logo: "/assets/skylink.png", website: "#" },
    { id: 3, name: "Breeze Airlines", logo: "/assets/breeze.png", website: "#" },
    { id: 4, name: "NextStay Inn", logo: "/assets/nextstay.png", website: "#" },
    { id: 5, name: "Horizon Cabs", logo: "/assets/horizon.png", website: "#" },
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
              className="h-14 w-auto object-contain grayscale hover:grayscale-0 transition"
            />
          </a>
        ))}
      </div>
    </section>
  );
};

export default PartnersShowcase;
