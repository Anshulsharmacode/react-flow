import { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { usePizzaStore } from "@/components/store/usePizzaStrore";
import type { PizzaSize, PizzaCrust } from '@/lib/types';

function CustomizeNode() {
  const { order, setOrder, nextStep, prevStep } = usePizzaStore();
  const [size, setSize] = useState<PizzaSize>('medium');
  const [crust, setCrust] = useState<PizzaCrust>('thin');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrder('size', size);
    setOrder('crust', crust);
    setOrder('toppings', selectedToppings);
    
    const basePrice = { small: 10, medium: 14, large: 18 }[size];
    const toppingsPrice = selectedToppings.length * 1.5;
    setOrder('totalPrice', basePrice + toppingsPrice);
    nextStep();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg min-w-[500px]">
      <Handle type="target" position={Position.Top} />
      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="text-2xl font-bold text-black">Customize Your Pizza</h3>
        
        {order.aiRecommendation && (
          <div className="bg-red-50 p-4 rounded-lg space-y-2">
            <p className="font-medium text-black">AI Recommendation:</p>
            <p className="text-gray-600">{order.aiRecommendation.recommendedPizza}</p>
            <p className="text-gray-600">{order.aiRecommendation.reason}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-black mb-2">Size</label>
            <div className="flex gap-4">
              {['small', 'medium', 'large'].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s as PizzaSize)}
                  className={`px-4 py-2 rounded-lg capitalize ${
                    size === s ? "bg-black text-white border-2 border-black" : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-black mb-2">Crust</label>
            <select
              value={crust}
              onChange={(e) => setCrust(e.target.value as PizzaCrust)}
              className="w-full p-2 border rounded-lg text-black"
            >
              <option value="thin">Thin Crust</option>
              <option value="thick">Thick Crust</option>
              <option value="stuffed">Stuffed Crust</option>
            </select>
          </div>

          <div>
            <label className="block text-black mb-2">Toppings</label>
            <div className="grid grid-cols-2 gap-2">
              {order.aiRecommendation?.suggestedToppings.map((topping) => (
                <label key={topping} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedToppings.includes(topping)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedToppings([...selectedToppings, topping]);
                      } else {
                        setSelectedToppings(selectedToppings.filter(t => t !== topping));
                      }
                    }}
                  />
                  <span className="text-black">{topping}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-black"
          >
            ← Back
          </button>
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800"
          >
            Continue →
          </button>
        </div>
      </form>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default memo(CustomizeNode);