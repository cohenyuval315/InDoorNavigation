package com.client.maps.models.latlng;

public class LatLngBounds {

    private LatLng northeast;
    private LatLng southwest;

    /**
     * Constructor to create a LatLngBounds instance.
     *
     * @param northeast The northeast corner of the bounds
     * @param southwest The southwest corner of the bounds
     */
    public LatLngBounds(LatLng northeast, LatLng southwest) {
        this.northeast = northeast;
        this.southwest = southwest;
    }

    /**
     * Gets the northeast corner of the bounds.
     *
     * @return The northeast corner of the bounds
     */
    public LatLng getNortheast() {
        return northeast;
    }

    /**
     * Gets the southwest corner of the bounds.
     *
     * @return The southwest corner of the bounds
     */
    public LatLng getSouthwest() {
        return southwest;
    }

    /**
     * Gets the center of the bounds.
     *
     * @return The center of the bounds
     */
    public LatLng getCenter() {
        double lat = (northeast.latitude + southwest.latitude) / 2;
        double lng = (northeast.longitude + southwest.longitude) / 2;
        return new LatLng(lat, lng);
    }

    /**
     * Gets the latitude delta of the bounds.
     *
     * @return The latitude delta of the bounds
     */
    public double getLatitudeDelta() {
        return northeast.latitude - southwest.latitude;
    }

    /**
     * Gets the longitude delta of the bounds.
     *
     * @return The longitude delta of the bounds
     */
    public double getLongitudeDelta() {
        return northeast.longitude - southwest.longitude;
    }

    @Override
    public String toString() {
        return "LatLngBounds{" +
                "northeast=" + northeast +
                ", southwest=" + southwest +
                '}';
    }
}
