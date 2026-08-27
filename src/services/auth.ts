import { supabase } from "@/integrations/supabase/client";

export type AccountType = "client" | "expert";

export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signUp(params: {
  email: string;
  password: string;
  fullName: string;
  company?: string;
  accountType: AccountType;
  language: string;
}) {
  return supabase.auth.signUp({
    email: params.email,
    password: params.password,
    options: {
      emailRedirectTo: `${window.location.origin}/app`,
      // El rol solicitado viaja como metadato, pero el trigger del servidor
      // solo acepta 'client' o 'expert': nunca se puede pedir 'admin'.
      data: {
        full_name: params.fullName,
        company_name: params.company ?? null,
        account_type: params.accountType,
        preferred_language: params.language,
      },
    },
  });
}

export async function signOut() {
  return supabase.auth.signOut();
}
