import React from "react";

const data = {
  title: "Privacy Policy",
  intro: `Welcome to FreshAlert. Your privacy is important to us. 
    This Privacy Policy explains how we collect, use, and protect your information 
    when you use our platform.`,

  about: {
    heading: "About FreshAlert",
    text: `FreshAlert is a food sharing and management platform designed to reduce food waste 
      by helping users post, find, and claim fresh and nearly expired food items. 
      We aim to promote sustainability and community support by connecting people 
      who have surplus food with those who can use it.`
  },

  infoCollection: {
    heading: "Information We Collect",
    text: `We may collect personal information such as your name, email address, and location 
      when you register, post food items, or claim available items. 
      We also collect non-personal data like usage statistics to improve our service.`
  },

  usage: {
    heading: "How We Use Your Information",
    list: [
      "To connect users who want to share or claim food.",
      "To notify you about item availability, updates, or promotions.",
      "To improve our platform and user experience."
    ]
  },

  dataProtection: {
    heading: "Data Protection",
    text: `We use industry-standard measures to protect your information. 
      However, no method of transmission over the internet is 100% secure, 
      so we cannot guarantee absolute security.`
  },

  thirdParty: {
    heading: "Third-Party Services",
    text: `FreshAlert may use third-party services (such as Google for login authentication) 
      that collect information to provide better service. These services have their own 
      privacy policies.`
  },

  rights: {
    heading: "Your Rights",
    list: [
      "You can request to view, update, or delete your personal information.",
      "You can opt out of promotional emails at any time."
    ]
  },

  changes: {
    heading: "Changes to This Policy",
    text: `We may update our Privacy Policy from time to time. Any changes will be posted on this page with the updated date.`
  },

  contact: {
    heading: "Contact Us",
    text: `If you have any questions about this Privacy Policy or FreshAlert's practices, 
      please contact us at:`,
    email: "support@freshalert.com"
  }
};


const PrivacyPolicy = () => {
  return (
    <div className=" min-h-screen px-5 sm:px-10 lg:px-20">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 sm:p-10 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-primary">{data.title}</h1>
        <p className="mb-4 dark:text-[#EEEFE0] text-gray-500">{data.intro}</p>

        {/* About */}
        <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">{data.about.heading}</h2>
        <p className="mb-4 dark:text-[#EEEFE0] text-gray-500">{data.about.text}</p>

        {/* Info Collection */}
        <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">{data.infoCollection.heading}</h2>
        <p className="mb-4 dark:text-[#EEEFE0] text-gray-500">{data.infoCollection.text}</p>

        {/* Usage */}
        <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">{data.usage.heading}</h2>
        <ul className="list-disc pl-6 dark:text-[#EEEFE0] text-gray-500 mb-4 space-y-1">
          {data.usage.list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {/* Data Protection */}
        <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">{data.dataProtection.heading}</h2>
        <p className="mb-4 dark:text-[#EEEFE0] text-gray-500">{data.dataProtection.text}</p>

        {/* Third Party */}
        <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">{data.thirdParty.heading}</h2>
        <p className="mb-4 dark:text-[#EEEFE0] text-gray-500">{data.thirdParty.text}</p>

        {/* Rights */}
        <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">{data.rights.heading}</h2>
        <ul className="list-disc pl-6 dark:text-[#EEEFE0] text-gray-500 mb-4 space-y-1">
          {data.rights.list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {/* Changes */}
        <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">{data.changes.heading}</h2>
        <p className="mb-4 dark:text-[#EEEFE0] text-gray-500">{data.changes.text}</p>

        {/* Contact */}
        <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">{data.contact.heading}</h2>
        <p className="dark:text-[#EEEFE0] text-gray-500">{data.contact.text} <strong>{data.contact.email}</strong></p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
