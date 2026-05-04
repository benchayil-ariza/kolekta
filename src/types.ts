export interface User {
  id: string;
  name: string;
  barangay: string;
  points: number;
  logs: WasteLog[];
}

export interface WasteLog {
  id: string;
  date: string;
  plastic: number;
  paper: number;
  glass: number;
  bio: number;
  points: number;
}

export interface Reward {
  id: string;
  title: string;
  cost: number;
  description: string;
  category: string;
}

export const REWARDS: Reward[] = [
  { id: "1", title: "1kg Rice", cost: 100, description: "Quality local rice voucher.", category: "Groceries" },
  { id: "2", title: "Grocery Voucher", cost: 50, description: "P50 worth of basic items.", category: "Vouchers" },
  { id: "3", title: "Eco-Bag", cost: 30, description: "Reusable canvas bag.", category: "Sustainable" },
  { id: "4", title: "Laundry Detergent", cost: 80, description: "Refill pack (500ml).", category: "Household" },
];

export const THEME_COLORS = {
  emerald: "#059669",
  golden: "#f59e0b",
  slate: "#475569",
  navy: "#1e3a8a",
  white: "#ffffff",
};
