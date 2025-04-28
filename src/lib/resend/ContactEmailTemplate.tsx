interface ContactEmailTemplateProps {
  email: string;
  message: string;
}

const ContactEmailTemplate = ({
  email,
  message,
}: ContactEmailTemplateProps) => {
  return (
    <div>
      <h1>{email} sent you a message</h1>
      <p>Message:</p>
      <br />
      <p>{message}</p>
      <br />
      <p>You can reply to this email directly at {email}!</p>
    </div>
  );
};

export default ContactEmailTemplate;
