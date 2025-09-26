export const getDefaultStationCenter = (station: string) => {
  switch (station) {
    case "강남역":
      return { lat: 37.497952, lon: 127.027619 };
    case "역삼역":
      return { lat: 37.5000776, lon: 127.0385419 };
    default: //강남역
      return { lat: 37.497952, lon: 127.027619 };
  }
};
