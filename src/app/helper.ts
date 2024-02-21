export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", { year: 'numeric', month: 'long', day: 'numeric' });
}