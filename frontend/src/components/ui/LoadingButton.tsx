import { Button } from "./button";
import { Loader2 } from "lucide-react";
interface ValueType {
  value: string;
}

const LoadingButton = ({ value }: ValueType) => {
  return (
    <Button disabled className="w-full mt-3">
      <Loader2 className="animate-spin" />
      {value}
    </Button>
  );
};

export default LoadingButton;
