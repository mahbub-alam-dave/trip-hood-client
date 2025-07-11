import { FaGithub, FaLinkedin, FaGlobe, FaExternalLinkAlt, FaCode } from "react-icons/fa";

const AboutUsPage = () => {
  const projects = [
    {
      title: "TripHood — Tour Booking Platform",
      live: "https://triphood.web.app",
      repo: "https://github.com/yourusername/triphood",
    },
    {
      title: "Parcel Pro — Courier Service App",
      live: "https://parcelpro.web.app",
      repo: "https://github.com/yourusername/parcel-pro",
    },
    {
      title: "EduMate — Study Resource Dashboard",
      live: "https://edumate-study.web.app",
      repo: "https://github.com/yourusername/edumate",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Page Title */}
      {/* <h1 className="text-4xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] mb-8">
        About the Developer
      </h1> */}

      {/* Developer Info */}
      <div className="flex flex-col  gap-10 items-start">
        {/* Profile */}
        <div className="flex-shrink-0">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Mahbub Alam"
            className="w-44 h-44 rounded-full border-4 border-[var(--color-primary)] shadow-lg object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-5">
          <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">
            Mahbub Alam <span className="font-normal">(Frontend Developer)</span>
          </h2>

          <p className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] leading-relaxed">
            I’m a self-taught frontend developer, passionate about crafting fast, scalable, and engaging web applications with the MERN stack. I enjoy building polished UIs, optimizing user flows, and transforming creative ideas into clean, usable products.
          </p>

          {/* Skillset */}
          <div>
            <h3 className="text-lg font-medium mb-2 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">Skillset:</h3>
            <ul className="flex flex-wrap gap-3 text-sm">
              {["HTML", "CSS", "Tailwind CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB", "Firebase"].map((skill) => (
                <li key={skill} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
          <p className="text-base text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
            🚀 <span className="font-semibold text-[var(--color-text-primary)] dark:text-[var(--color-primary-dark)]">15+</span> completed projects in domains like travel booking, courier services, e-learning platforms, and dashboards.
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap gap-6 mt-4 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] text-base">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary-dark)]"
            >
              <FaGithub /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary-dark)]"
            >
              <FaLinkedin /> LinkedIn
            </a>
            <a
              href="https://yourportfolio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary-dark)]"
            >
              <FaGlobe /> Portfolio
            </a>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="mt-14">
        <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)] mb-6">
          My Recent Projects
        </h3>

        <div className="space-y-5">
          {projects.map((project, index) => (
            <div
              key={index}
              className="border border-[var(--color-border)] dark:border-[var(--color-border-dark)] rounded-lg p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-[var(--color-bg-primary-dark)]"
            >
              <div>
                <h4 className="text-lg font-medium text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-two)]">
                  {project.title}
                </h4>
              </div>

              <div className="flex gap-5 flex-wrap">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[var(--color-primary)] dark:text-[var(--color-primary-dark)] hover:underline"
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] hover:text-[var(--color-primary)]"
                >
                  <FaCode /> GitHub Repo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
