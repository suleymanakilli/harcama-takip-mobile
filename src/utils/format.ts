// Format Utilities (Max 40 satır)

export const formatCurrency = (amount: number, currency = '₺'): string => {
  return `${amount.toLocaleString('tr-TR', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })} ${currency}`;
};

export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'short',
  });
};

export const formatDateFull = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const getRelativeDate = (date: string | Date): string => {
  const d = new Date(date);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Bugün';
  if (diffDays === 1) return 'Dün';
  if (diffDays < 7) return `${diffDays} gün önce`;
  return formatDate(date);
};

export const truncate = (str: string, max = 12): string => {
  return str.length > max ? `${str.slice(0, max)}...` : str;
};

