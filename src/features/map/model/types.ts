export interface Coordinates {
  bounds: {
    nw: { lat: number; lon: number };
    se: { lat: number; lon: number };
  };
  center: { lat: number; lon: number };
}
