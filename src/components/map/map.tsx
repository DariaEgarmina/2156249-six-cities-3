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
  selectedOffer: Offer | null;
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
  selectedOffer,
}: MapProps): JSX.Element {
  const mapContainerRef = useRef(null);
  const map = useMap(mapContainerRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker(
            {
              lat: offer.location.latitude,
              lng: offer.location.longitude,
            },
            {
              icon:
                offer.id === selectedOffer?.id
                  ? currentCustomIcon
                  : defaultCustomIcon,
            }
          )
          .addTo(map);
      });
    }
  }, [map, offers, selectedOffer]);

  return <section className={clsx('map', className)} ref={mapContainerRef} />;
}

export default Map;
