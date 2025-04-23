import { GiBoba } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-auto">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <GiBoba className="h-5 w-5 text-pink-400" />
          <span className="text-lg font-bold text-white">
            Will You Be My Boba
          </span>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Will You Be My Boba. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
