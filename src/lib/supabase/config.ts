import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://zlvtuyyyhsfhvcvoadkn.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsdnR1eXl5aHNmaHZjdm9hZGtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI5ODk4ODYsImV4cCI6MjAxODU2NTg4Nn0.It2r6_RfbmJjPQMJnzaBzRHXZqrDrrZ2cEfr0a-IU70';
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
