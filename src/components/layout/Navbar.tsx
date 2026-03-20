import { createClient } from "@/lib/supabase/server";
import NavMenu from "@/components/layout/NavMenu";

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <NavMenu isLoggedIn={!!user} />;
}
