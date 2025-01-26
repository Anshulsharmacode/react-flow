import { memo } from "react";
import { Handle, Position } from "reactflow";
import { usePizzaStore } from "@/components/store/usePizzaStrore";

function WelcomeNode() {
  const nextStep = usePizzaStore((state) => state.nextStep);

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md transform hover:scale-[1.02] transition-all duration-300">
      <div className="space-y-6 text-center">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-black">🍕 Pizza Builder</h2>
          <p className="text-gray-600 text-lg">
            Create your perfect pizza in just a few steps
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl space-y-4">
          <p className="font-semibold text-black text-left">Steps:</p>
          <ul className="list-none space-y-3 text-left">
            {[
              "1. Choose your size & crust",
              "2. Select your toppings",
              "3. Review your order",
              "4. Enjoy your pizza!",
            ].map((step, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-600">
                <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => {
            nextStep();
            /* eslint-disable @typescript-eslint/no-explicit-any */
            (window as any).scrollToNode("2");
          }}
          className="bg-black text-white w-full py-4 rounded-xl font-medium
                   hover:bg-gray-800 transform active:scale-95 transition-all
                   duration-200 text-lg"
        >
          Start Building 🎨
        </button>
      </div>
      <Handle type="source" position={Position.Bottom} id="welcome-out" />
    </div>
  );
}

export default memo(WelcomeNode);
