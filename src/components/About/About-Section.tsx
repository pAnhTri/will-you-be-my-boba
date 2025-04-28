import { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Section = ({ className, id, children, ...props }: SectionProps) => {
  return (
    <section id={id} className={`${className}`} {...props}>
      <div className="container mx-auto max-w-5xl">{children}</div>
    </section>
  );
};

export default Section;
