import { Button } from "@/components/ui/button";
import profile from "@/assets/avatar.png";

export function AuthorSection() {
  return (
    <section className="containerBox mt-14">
      <h3 className="text-2xl font-bold mb-6">✍️ Author Spotlight</h3>
      <div className="max-w-4xl bg-card border p-5 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-6">
        <img
          src={profile}
          alt="Author Jane Doe"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-xl font-semibold mb-2">Klein Moretti</h4>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Klein Moretti is an award-winning novelist known for his captivating
            storytelling and rich characters. His works explore themes of love,
            loss, and resilience.
          </p>
          <Button>View Profile</Button>
        </div>
      </div>
    </section>
  );
}
