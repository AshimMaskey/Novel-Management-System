import { Button } from "@/components/ui/button";

export function AuthorSection() {
  return (
    <section className="containerBox mt-14">
      <h3 className="text-2xl font-bold mb-6">✍️ Author Spotlight</h3>
      <div className="max-w-4xl bg-card p-5 rounded-xl shadow-md flex flex-col md:flex-row items-center gap-6">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Author Jane Doe"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-xl font-semibold mb-2">Jane Doe</h4>
          <p className="text-gray-600 mb-4">
            Jane Doe is an award-winning novelist known for her captivating
            storytelling and rich characters. Her works explore themes of love,
            loss, and resilience.
          </p>
          <Button>View Profile</Button>
        </div>
      </div>
    </section>
  );
}
