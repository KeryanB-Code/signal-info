import { supabase } from "../lib/supabaseClient.js";

export async function fetchBugReports() {
  const { data, error } = await supabase.from("bug_reports").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function createBugReport({ title, description, reportedByName }) {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("bug_reports")
    .insert({ title, description, reported_by: user?.id, reported_by_name: reportedByName })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateBugReportStatus(id, status) {
  const { data, error } = await supabase
    .from("bug_reports")
    .update({ status })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
