import { supabase } from "@/integrations/supabase/client";

export type PlanCode = "starter" | "growth" | "enterprise";

export type Plan = {
  code: PlanCode;
  price_cop: number | null;
  is_custom_price: boolean;
  expert_discount: number | null;
};

// Respaldo local para que la comparativa se pinte incluso si la lectura falla.
export const FALLBACK_PLANS: Plan[] = [
  { code: "starter", price_cop: 349000, is_custom_price: false, expert_discount: null },
  { code: "growth", price_cop: 990000, is_custom_price: false, expert_discount: 10 },
  { code: "enterprise", price_cop: null, is_custom_price: true, expert_discount: null },
];

export async function getPlans(): Promise<Plan[]> {
  const { data, error } = await supabase
    .from("plans")
    .select("code, price_cop, is_custom_price, expert_discount")
    .order("sort_order", { ascending: true });
  if (error || !data?.length) return FALLBACK_PLANS;
  return data as Plan[];
}
