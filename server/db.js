const { createClient } = require('@supabase/supabase-js');

const URL = 'https://iwziunmdabceavqvheki.supabase.co';
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3eml1bm1kYWJjZWF2cXZoZWtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwODk4NzIsImV4cCI6MjAyNDY2NTg3Mn0.tKRrzgStibVaeNrHjed088vn8J0eFnezsrBkr86i4k8';

const supabase = createClient(URL, KEY);

module.exports = supabase;