//@ts-ignore
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ueeetmawfwpophoufjft.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlZWV0bWF3Zndwb3Bob3VmamZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MjgxMjMsImV4cCI6MjA2MDMwNDEyM30.Nzn6fxA9dmG45KfAM1dUAGCLA3e_CRj4_ta6Mi28NfU'
)
export { supabase }
