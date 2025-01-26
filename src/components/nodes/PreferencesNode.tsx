import { memo, useState } from "react";
import { Handle, Position } from "reactflow";
import { usePizzaStore } from "@/components/store/usePizzaStrore";
import { getPizzaRecommendation } from "@/lib/gemini";

function PreferencesNode() {
  const [loading, setLoading] = useState(false);
  const { setOrder, nextStep } = usePizzaStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const preferences = formData.get("preferences") as string;

    try {
      const recommendation = await getPizzaRecommendation(preferences);
      setOrder("preferences", preferences);
      setOrder("aiRecommendation", recommendation);
      nextStep();
      /* eslint-disable @typescript-eslint/no-explicit-any */
      (window as any).scrollToNode("3");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg ">
      <Handle type="target" position={Position.Top} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-2xl font-bold text-black">
          Tell us your preferences
        </h3>
        <p className="text-gray-600">
          Describe what you like in a pizza (e.g., spicy, vegetarian, favorite
          toppings)
        </p>
        <textarea
          name="preferences"
          className="w-full p-3 border rounded-lg h-32 text-black"
          placeholder="I like spicy food with lots of vegetables..."
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white px-6 py-3 rounded-lg
                   hover:bg-gray-800 disabled:bg-gray-400"
        >
          {loading ? "Getting Recommendations..." : "Get Suggestions →"}
        </button>
      </form>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default memo(PreferencesNode);
