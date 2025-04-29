interface ContactEmailTemplateProps {
  email: string;
  message: string;
  subject?: string;
}

const ContactEmailTemplate = ({
  email,
  message,
  subject = "Contact Form Submission",
}: ContactEmailTemplateProps) => {
  const mailtoLink = `mailto:${email}?subject=Re: ${encodeURIComponent(subject)}`;

  return (
    <div>
      <h1>{email} sent you a message</h1>
      <p>Message:</p>
      <br />
      <p>{message}</p>
      <br />
      <p>
        You can reply to this email by clicking{" "}
        <a
          href={mailtoLink}
          style={{ color: "#0070f3", textDecoration: "underline" }}
        >
          here
        </a>{" "}
        or directly at {email}!
      </p>
    </div>
  );
};

export default ContactEmailTemplate;
