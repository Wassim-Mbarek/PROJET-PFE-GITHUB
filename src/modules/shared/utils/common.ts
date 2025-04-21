import { supabase } from "./supabase"

export async function getConnectedUser() {
    const { data, error } = await supabase.auth.getUser()
    if (error) {
      console.error('Error fetching user:', error)
      return null
    }
    return data?.user?.user_metadata || null
  }
  