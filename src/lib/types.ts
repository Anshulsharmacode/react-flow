export interface PizzaOrder {
  preferences: string;
  size: "small" | "medium" | "large";
  crust: "thin" | "thick" | "stuffed";
  toppings: string[];
  quantity: number;
  aiRecommendation: {
    recommendedPizza: string;
    reason: string;
    instructions: string;
    suggestedToppings: string[];
    suggestedQuantity?: number;
  };
  totalPrice: number;
}

export type PizzaSize = PizzaOrder["size"];
export type PizzaCrust = PizzaOrder["crust"];

export interface NodeData {
  label: string;
  error?: string;
}
