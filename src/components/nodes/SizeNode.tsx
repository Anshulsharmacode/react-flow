import { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { usePizzaStore } from '@/components/store/usePizzaStrore';

function SizeNode() {
  const { setOrder, nextStep } = usePizzaStore();
  const [size, setSize] = useState('medium');
  const [crust, setCrust] = useState('thin');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (size && crust) {
      setOrder('size', size);
      setOrder('crust', crust);
      const basePrice = { small: 10, medium: 14, large: 18 }[size];
      if (basePrice !== undefined) {
        setOrder('totalPrice', basePrice);
      }
      nextStep();
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg min-w-[400px]">
      <Handle type="target" position={Position.Top} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-2xl font-bold text-black">Choose Your Pizza Base</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-black mb-2">Size</label>
            <div className="flex gap-4">
              {['small', 'medium', 'large'].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 rounded-lg capitalize ${
                    size === s ? 'bg-black text-white' : 'bg-gray-100'
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
              onChange={(e) => setCrust(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="thin">Thin Crust</option>
              <option value="thick">Thick Crust</option>
              <option value="stuffed">Stuffed Crust</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white px-6 py-3 rounded-lg
                   hover:bg-gray-800 transition-colors"
        >
          Continue →
        </button>
      </form>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default memo(SizeNode);