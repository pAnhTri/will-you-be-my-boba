import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-auto">
      <div className="mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Logo width={32} height={32} />
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
