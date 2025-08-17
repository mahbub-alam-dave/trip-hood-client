import { Compass, Users, CreditCard, Shield, LayoutDashboard, Globe } from "lucide-react";

const features = [
  {
    title: "Hassle-Free Navigation",
    description: "Easily explore tours, guides, and community stories with a smooth and intuitive interface.",
    icon: <Compass className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "Guide Choice",
    description: "Choose from trusted local guides with authentic reviews and transparent profiles.",
    icon: <Users className="w-8 h-8 text-green-500" />,
  },
  {
    title: "Easy Payment",
    description: "Secure, quick, and flexible payment options to make booking stress-free.",
    icon: <CreditCard className="w-8 h-8 text-purple-500" />,
  },
  {
    title: "Protected Dashboard",
    description: "Personalized dashboard with role-based access and strong security features.",
    icon: <LayoutDashboard className="w-8 h-8 text-pink-500" />,
  },
  {
    title: "Safe & Secure",
    description: "Your data and transactions are protected with top-level encryption and privacy controls.",
    icon: <Shield className="w-8 h-8 text-red-500" />,
  },
  {
    title: "Global Community",
    description: "Connect with fellow travelers worldwide, share stories, and build lasting connections.",
    icon: <Globe className="w-8 h-8 text-yellow-500" />,
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-gray-100 dark:bg-[#141414] py-20 my-16">
      <div className="max-w-7xl mx-auto px-6 text-center text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">
        <div className="mb-12 space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold">Latest Features</h2>
        <p className=" text-base md:text-lg text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">Explore our latest feature and confirm your booking to enjoy your next vacation with Trip Hood</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="px-6 py-8 bg-[var(--color-bg-primary)] dark:bg-[var(--color-bg-primary-dark)] rounded-2xl shadow-md hover:shadow-lg transition flex flex-col items-center text-center"
            >
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="max-w-[300px] w-full text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
