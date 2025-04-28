import QA from "./About-Section-FAQ-QA";

const FAQSection = () => {
  return (
    <>
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text text-gray-600 max-w-3xl mx-auto">
          Have questions about Will You Be My Boba? Here are some answers to the
          most common questions.
        </p>
      </div>
      <div className="space-y-4">
        <QA
          question="What can I do with Will You Be My Boba?"
          answer={`Will You Be My Boba is completely free to use.
            You can either stay anonymous, allowing you to add bobas, shops, and reviews without revealing your identity.
            If you want more features, you can create an account to collect badges and personalize your experience.`}
        />
        <QA
          question="How are boba ratings calculated?"
          answer={`Boba ratings are calculated based on the number of reviews and the average rating of the boba.`}
        />
        <QA
          question="Can I suggest new features?"
          answer={`I'm always looking for ways to improve Will You Be My Boba. You can suggest new features by using the
              contact form below or by reaching out via email.`}
        />
        <QA
          question="Is there a mobile app available?"
          answer={`Currently, Will You Be My Boba is a web application optimized for both desktop and mobile browsers. A
              dedicated mobile app is in the development roadmap for the future.`}
        />
      </div>
    </>
  );
};

export default FAQSection;
