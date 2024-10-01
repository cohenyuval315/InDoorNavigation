const ratio = PixelRatio.get();

const {northEast, southWest} = await mapRef.current?.getMapBoundaries();

const longitudeDelta = northEast.longitude - southWest.longitude;

mapContainerRef.current?.measureInWindow((x, y, w, h) => {
  const coord = convertGeoToPixel(
    coordinate.latitude,
    coordinate.longitude,
    w,
    h,
    southWest.longitude,
    longitudeDelta,
    southWest.latitude,
    (southWest.latitude * Math.PI) / 180,
  );

  setCoords({
    left: coord.x * ratio,
    top: coord.y * ratio,
  });
});


function convertGeoToPixel(
    latitude,
    longitude,
    mapWidth, // in pixels
    mapHeight, // in pixels
    mapLonLeft, // in degrees
    mapLonDelta, // in degrees (mapLonRight - mapLonLeft);
    mapLatBottom, // in degrees
    mapLatBottomDegree,
  ) {
    // in Radians
    var x = (longitude - mapLonLeft) * (mapWidth / mapLonDelta);
  
    latitude = (latitude * Math.PI) / 180;
    var worldMapWidth = ((mapWidth / mapLonDelta) * 360) / (2 * Math.PI);
    var mapOffsetY =
      (worldMapWidth / 2) *
      Math.log(
        (1 + Math.sin(mapLatBottomDegree)) / (1 - Math.sin(mapLatBottomDegree)),
      );
    var y =
      mapHeight -
      ((worldMapWidth / 2) *
        Math.log((1 + Math.sin(latitude)) / (1 - Math.sin(latitude))) -
        mapOffsetY);
  
    return {x: x, y: y};
  }




const markerRef = useRef();
const [markerPosition, setMarkerPosition] = useState({});

const measureMarker = () => {
  markerRef.current?.measureInWindow((x, y, width, height) => {
    const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
    // if any non-zero, on-screen values, save measurements
    if (!(x || y || width || height)) return;
    if (x > screenWidth || y > screenHeight) return;
    setMarkerPosition({x, y, width, height});
  }
};

...

return (
  <View ref={markerRef} onLayout={measureMarker}>
    <CustomMarker
      ...
);