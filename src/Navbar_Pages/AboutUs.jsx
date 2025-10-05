import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useLanguage } from "../utils/i18n.jsx";

// --- SVG Icon Components ---
const IconMission = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 text-blue-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
    />
  </svg>
);

const IconVision = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 text-blue-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const TeamMemberCard = ({ name, role, linkedinUrl, instagramUrl, initials }) => {
  const { t } = useLanguage();

  return (
    <div className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <div className="text-center">
        {/* Avatar */}
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
          {initials}
        </div>

        {/* Name and Role */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4">{role}</p>

        {/* Social Links - Shows on Hover */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
          {/* LinkedIn Link */}
          {linkedinUrl ? (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 w-full justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn
            </a>
          ) : (
            <div className="inline-flex items-center px-4 py-2 bg-gray-400 text-white text-sm font-medium rounded-lg cursor-not-allowed w-full justify-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn Soon
            </div>
          )}

          {/* Instagram Link */}
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-pink-600 hover:to-purple-700 transition-colors duration-200 w-full justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Instagram
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const AboutUs = () => {
  const { t } = useLanguage();

  const teamMembers = [
    {
      name: t('pranavGhodke'),
      role: t('pranavRole'),
      linkedinUrl: 'https://www.linkedin.com/in/pranav-ghodke',
      instagramUrl: 'https://www.instagram.com/panu_8760/',
      initials: 'PG'
    },
    {
      name: t('abhishekJamdade'),
      role: t('abhishekRole'),
      linkedinUrl: 'https://linkedin.com/in/abhishek-jamdade',
      instagramUrl: 'https://www.instagram.com/abhi.jamdade_0205/',
      initials: 'AJ'
    },
    {
      name: t('sunnyGupta'),
      role: t('sunnyRole'),
      linkedinUrl: 'https://linkedin.com/in/sunny3544',
      instagramUrl: 'https://www.instagram.com/_r3be1/',
      initials: 'SG'
    },
    {
      name: t('radhikaKulkarni'),
      role: t('radhikaRole'),
      linkedinUrl: null, // No LinkedIn URL as requested
      instagramUrl: 'https://www.instagram.com/radhikakulkarni_1/',
      initials: 'RK'
    }
  ];

  return (
    <>
      <div className="bg-amber-50">
        <Navbar />
      </div>
      <div className="bg-amber-50 min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              {t('aboutUsTitle')}
            </h1>
            <p className="text-base md:text-lg max-w-4xl mx-auto text-gray-600">
              {t('aboutUsDescription')}
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Our Mission Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <IconMission />
              <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-3">
                {t('missionTitle')}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('missionDescription')}
              </p>
            </div>

            {/* Our Vision Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
              <IconVision />
              <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-3">
                {t('visionTitle')}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('visionDescription')}
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {t('teamTitle')}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base">
              {t('teamSubtitle')}
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={index}
                name={member.name}
                role={member.role}
                linkedinUrl={member.linkedinUrl}
                instagramUrl={member.instagramUrl}
                initials={member.initials}
              />
            ))}
          </div>

          {/* Values Section */}
          <div className="mt-16 text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                {t('valuesTitle')}
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {t('valuesDescription')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
