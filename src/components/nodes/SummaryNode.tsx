import { memo } from "react";
import { Handle, Position } from "reactflow";
import { usePizzaStore } from "@/components/store/usePizzaStrore";

function SummaryNode() {
  const { order, prevStep, resetOrder } = usePizzaStore();

  const handleOrder = () => {
    alert(`Order placed successfully! Total: $${order.totalPrice?.toFixed(2)}`);
    resetOrder();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg min-w-[500px]">
      <Handle type="target" position={Position.Top} />
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-black">Order Summary</h3>

        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
          <div>
            <h4 className="font-medium text-black">Your Order</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Quantity: {order.quantity}x</li>
              <li>Size: {order.size}</li>
              <li>Crust: {order.crust}</li>
              <li>Toppings: {order.toppings?.join(", ")}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-black">Special Instructions</h4>
            <p className="text-gray-600">
              {order.aiRecommendation?.instructions}
            </p>
          </div>

          <div className="text-xl font-bold text-black">
            Total: ${order.totalPrice?.toFixed(2)}
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={() => {
              prevStep();
              /* eslint-disable @typescript-eslint/no-explicit-any */
              (window as any).scrollToNode("3");
            }}
            className="px-6 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-black"
          >
            ← Back
          </button>
          <button
            onClick={() => {
              handleOrder();
              (window as any).scrollToNode("1");
            }}
            className="px-6 py-3 rounded-lg bg-green-500 text-white hover:bg-green-600"
          >
            Place Order 🎉
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(SummaryNode);
