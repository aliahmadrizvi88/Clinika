/* ---------------- DATE ---------------- */
export const formatDate = (value) => {
  if (!value) return 'N/A';

  const date = new Date(value);
  if (isNaN(date.getTime())) return 'N/A';

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/* ---------------- TIME (HH:mm) ---------------- */
export const formatTime = (time) => {
  if (!time || typeof time !== 'string') return 'N/A';

  const parts = time.split(':');
  if (parts.length !== 2) return 'N/A';

  let [hours, minutes] = parts;
  hours = Number(hours);
  minutes = Number(minutes);

  if (isNaN(hours) || isNaN(minutes)) return 'N/A';

  const period = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;

  return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
};

/* ---------------- DATETIME ---------------- */
export const formatDateTime = (value) => {
  if (!value) return 'N/A';

  const date = new Date(value);
  if (isNaN(date.getTime())) return 'N/A';

  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
