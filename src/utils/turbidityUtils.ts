export const getTurbidityLevel = (turbidity: number): 'excellent' | 'good' | 'moderate' | 'poor' | 'very-poor' => {
  if (turbidity <= 4) return 'excellent';
  if (turbidity <= 10) return 'good';
  if (turbidity <= 25) return 'moderate';
  if (turbidity <= 50) return 'poor';
  return 'very-poor';
};

export const getTurbidityColor = (turbidity: number): string => {
  const level = getTurbidityLevel(turbidity);
  switch (level) {
    case 'excellent': return '#10B981'; // green-500
    case 'good': return '#22C55E'; // green-400
    case 'moderate': return '#F59E0B'; // amber-500
    case 'poor': return '#EF4444'; // red-500
    case 'very-poor': return '#DC2626'; // red-600
    default: return '#6B7280'; // gray-500
  }
};

export const getTurbidityDescription = (turbidity: number): string => {
  const level = getTurbidityLevel(turbidity);
  switch (level) {
    case 'excellent': return 'Excellent - Crystal clear water';
    case 'good': return 'Good - Clear water with minimal particles';
    case 'moderate': return 'Moderate - Slightly cloudy water';
    case 'poor': return 'Poor - Cloudy water with visible particles';
    case 'very-poor': return 'Very Poor - Highly turbid water';
    default: return 'Unknown';
  }
};

export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};