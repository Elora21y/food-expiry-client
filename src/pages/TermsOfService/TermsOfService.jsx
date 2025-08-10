import React from "react";

const data = {
  title: "Terms of Service",
  intro: `Welcome to FreshAlert. By using our platform, you agree to the terms and conditions outlined here. 
  Please read these terms carefully before using our services.`,

  acceptance: {
    heading: "1. Acceptance of Terms",
    text: `By accessing or using FreshAlert, you confirm that you have read, understood, and agree to be bound by these Terms of Service.`
  },

  description: {
    heading: "2. Service Description",
    text: `FreshAlert is a food sharing and management platform designed to reduce food waste 
    by allowing users to post, find, and claim fresh or nearly expired food items. 
    We act solely as a connecting platform and are not responsible for the quality or safety of the food shared.`
  },

  eligibility: {
    heading: "3. User Eligibility",
    text: `You must be at least 13 years old to use FreshAlert. If you are under the legal age in your country, 
    you must have parental or guardian consent.`
  },

  responsibilities: {
    heading: "4. User Responsibilities",
    list: [
      "Provide accurate and truthful information when posting items.",
      "Ensure that shared food is safe and fit for consumption.",
      "Respect other users and refrain from abusive or harmful behavior."
    ]
  },

  prohibited: {
    heading: "5. Prohibited Activities",
    list: [
      "Posting expired, unsafe, or non-food items.",
      "Using the platform for illegal purposes.",
      "Spamming, phishing, or attempting to hack the platform."
    ]
  },

  disclaimer: {
    heading: "6. Disclaimer",
    text: `FreshAlert is not liable for any harm, illness, or damages caused by food obtained through the platform. 
    Users are responsible for checking the condition of food before consuming it.`
  },

  changes: {
    heading: "7. Changes to Terms",
    text: `We reserve the right to update or modify these Terms of Service at any time. 
    Continued use of the platform after changes means you accept the updated terms.`
  },

  contact: {
    heading: "8. Contact Us",
    text: `If you have any questions about these Terms of Service, please contact us at:`,
    email: "support@freshalert.com"
  }
};


const TermsOfService = () => {
  return (
    <div className="bg-base-200 min-h-screen py-10 px-5 sm:px-10 lg:px-20">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 sm:p-10 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-primary">{data.title}</h1>
        <p className="mb-4 dark:text-[#EEEFE0] text-gray-500">{data.intro}</p>

        {/* Acceptance */}
        <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">{data.acceptance.heading}</h2>
        <p className="mb-4 dark:text-[#EEEFE0] text-gray-500">{data.acceptance.text}</p>

        {/* Description */}
        <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">{data.description.heading}</h2>
        <p className="mb-4 dark:text-[#EEEFE0] text-gray-500">{data.description.text}</p>

        {/* Eligibility */}
        <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">{data.eligibility.heading}</h2>
        <p className="mb-4 dark:text-[#EEEFE0] text-gray-500">{data.eligibility.text}</p>

        {/* Responsibilities */}
        <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">{data.responsibilities.heading}</h2>
        <ul className="list-disc pl-6 dark:text-[#EEEFE0] text-gray-500 mb-4 space-y-1">
          {data.responsibilities.list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {/* Prohibited Activities */}
        <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">{data.prohibited.heading}</h2>
        <ul className="list-disc pl-6 dark:text-[#EEEFE0] text-gray-500 mb-4 space-y-1">
          {data.prohibited.list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {/* Disclaimer */}
        <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">{data.disclaimer.heading}</h2>
        <p className="mb-4 dark:text-[#EEEFE0] text-gray-500">{data.disclaimer.text}</p>

        {/* Changes */}
        <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">{data.changes.heading}</h2>
        <p className="mb-4 dark:text-[#EEEFE0] text-gray-500">{data.changes.text}</p>

        {/* Contact */}
        <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">{data.contact.heading}</h2>
        <p className="dark:text-[#EEEFE0] text-gray-500">
          {data.contact.text} <strong>{data.contact.email}</strong>
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
