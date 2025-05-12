import { FiBell } from "react-icons/fi";

const NotificationBell = ({ count = 3 }) => {
  return (
    <div className="relative">
      <FiBell />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;
