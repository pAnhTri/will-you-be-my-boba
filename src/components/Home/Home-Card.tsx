interface HomeCardProps {
  children: React.ReactNode;
}

const HomeCard = ({ children }: HomeCardProps) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{children}</div>
    </div>
  );
};

export default HomeCard;
