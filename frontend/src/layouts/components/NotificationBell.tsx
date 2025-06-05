import { FiBell } from "react-icons/fi";
interface typeProps {
  count: number | undefined;
}

const NotificationBell = ({ count }: typeProps) => {
  return (
    <div className="relative">
      <FiBell />
      {count ? (
        <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      ) : (
        <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
          0
        </span>
      )}
    </div>
  );
};

export default NotificationBell;
