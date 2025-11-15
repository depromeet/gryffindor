export function formatDistance(distanceInMeters: number): string {
  if (distanceInMeters >= 1000) {
    const distanceInKm = (distanceInMeters / 1000).toFixed(1);
    return `${distanceInKm}km`;
  }
  return `${distanceInMeters}m`;
}
