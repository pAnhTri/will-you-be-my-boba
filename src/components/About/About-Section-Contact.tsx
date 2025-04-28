import CallCard from "./About-Section-Contact-CallCard";
import EmailForm from "./About-Section-Contact-EmailForm";

const ContactSection = () => {
  return (
    <>
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
        <p className="text text-gray-600 max-w-3xl mx-auto">
          Have questions, suggestions, or just want to say hello? I&apos;d love
          to hear from you! Fill out the form below or reach out directly via
          email or social media.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between items-stretch gap-8 p-2">
        <EmailForm className="flex-1 bg-white p-4 rounded-lg shadow-md" />
        <CallCard
          email="anhtp5@uci.edu"
          location="Irvine, CA"
          phone="4086096660"
          className="bg-white p-4 rounded-lg shadow-md md:self-center"
        />
      </div>
    </>
  );
};

export default ContactSection;
