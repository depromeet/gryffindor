export function getGeolocationErrorMessage(error: GeolocationPositionError) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "위치 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요.";
    case error.POSITION_UNAVAILABLE:
      return "위치 정보를 사용할 수 없습니다. GPS가 꺼져있거나 신호가 약할 수 있습니다.";
    case error.TIMEOUT:
      return "위치를 가져오는 중 알 수 없는 오류가 발생했습니다";
    default:
      return "위치를 가져올 수 없습니다";
  }
}
