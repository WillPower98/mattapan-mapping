import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import styled from '@emotion/styled';

mapboxgl.accessToken = 'pk.eyJ1IjoibGF1ZGlja3NvbiIsImEiOiJja3RrYXpiajIwbXo1MnZxem94Z2toMjQzIn0.5WitslZwklYGvH8Rh7FuEw';

const MapContainer = styled.div`
	height: 100%;
	width: 100%;
	overflow: visible;
`;

const MapContainerTwo = styled.div`
	position: relative;
	height: 50vh;
	width: 100vw;
`;

export default function Map() {
	const mapContainer = useRef<HTMLDivElement | null>(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const lng = -71.08;
	const lat = 42.271;
	const zoom = 13

	// When adding stuff into the map consider using useState (from mapbox tutorial):
	// const [lng, setLng] = useState(-71.08);
	// const [lat, setLat] = useState(42.271);
	// const [zoom, setZoom] = useState(13);

	useEffect(() => {
		if (map.current) return; // initialize map only once
		if (map && !map.current && mapContainer && mapContainer.current) {
			map.current = new mapboxgl.Map({
				container: mapContainer.current,
				style: 'mapbox://styles/mapbox/streets-v11',
				center: [lng, lat],
				zoom: zoom
			});
		}
	});

	return (
		<MapContainerTwo>
			<MapContainer ref={mapContainer} />
		</MapContainerTwo>
	);
}
