import { useRef, useEffect } from 'react';
import clsx from 'clsx';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City, Offer } from '@/types/offer';
import useMap from '@/hooks/use-map';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from './const';

type MapProps = {
  className: string;
  city: City;
  offers: Offer[];
  selectedOfferId: string | null;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

function Map({
  className,
  city,
  offers,
  selectedOfferId,
}: MapProps): JSX.Element {
  const mapContainerRef = useRef(null);
  const map = useMap(mapContainerRef, city);

  const markerLayerRef = useRef<leaflet.LayerGroup | null>(null);

  useEffect(() => {
    if (map) {

      if (!markerLayerRef.current) {
        markerLayerRef.current = leaflet.layerGroup().addTo(map);
      }

      markerLayerRef.current.clearLayers();

      offers.forEach((offer) => {
        leaflet
          .marker(
            {
              lat: offer.location.latitude,
              lng: offer.location.longitude,
            },
            {
              icon:
                offer.id === selectedOfferId
                  ? currentCustomIcon
                  : defaultCustomIcon,
            }
          )
          .addTo(markerLayerRef.current!);
      });
    }
  }, [map, offers, selectedOfferId]);

  return <section className={clsx('map', className)} ref={mapContainerRef} />;
}

export default Map;
