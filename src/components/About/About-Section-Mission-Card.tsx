interface MissionCardProps {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const MissionCard = ({ title, children, icon }: MissionCardProps) => {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{children}</p>
    </div>
  );
};

export default MissionCard;
