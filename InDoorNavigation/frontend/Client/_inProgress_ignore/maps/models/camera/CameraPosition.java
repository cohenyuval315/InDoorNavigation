public class CameraPosition {
    private LatLng target;
    private float zoom;
    private float tilt;
    private float bearing;

    public CameraPosition(LatLng target, float zoom, float tilt, float bearing) {
        this.target = target;
        this.zoom = zoom;
        this.tilt = tilt;
        this.bearing = bearing;
    }

    public LatLng getTarget() {
        return target;
    }

    public void setTarget(LatLng target) {
        this.target = target;
    }

    public float getZoom() {
        return zoom;
    }

    public void setZoom(float zoom) {
        this.zoom = zoom;
    }

    public float getTilt() {
        return tilt;
    }

    public void setTilt(float tilt) {
        this.tilt = tilt;
    }

    public float getBearing() {
        return bearing;
    }

    public void setBearing(float bearing) {
        this.bearing = bearing;
    }
}
