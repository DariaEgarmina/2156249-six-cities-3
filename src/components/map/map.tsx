import { useRef, useEffect } from 'react';
import clsx from 'clsx';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City, Offer } from '@/types/offer';
import useMap from '@/hooks/use-map';

type MapProps = {
  className: string;
  city: City;
  offers: Offer[];
};

function Map({ className, city, offers }: MapProps): JSX.Element {
  const mapContainerRef = useRef(null);
  const map = useMap(mapContainerRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          })
          .addTo(map);
      });
    }
  }, [map, offers]);

  return <section className={clsx('map', className)} ref={mapContainerRef} />;
}

export default Map;
