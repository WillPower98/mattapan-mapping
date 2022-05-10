import styled from '@emotion/styled';
import * as React from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';

import { Theme } from '@/theme/Theme';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ENV;

export const Map = ({ startingCoordinates, children, mapStyle, interactive = true }: MapProps) => {
  const [viewport, setViewport] = React.useState({
    latitude: startingCoordinates?.lat ?? 42.286,
    longitude: startingCoordinates?.lng ?? -71.088,
    zoom: 12.1,
    width: '100%',
    height: '100%'
  });

  const settings = {
    touchZoom: false,
    doubleClickZoom: false,
  };

  return (
    <ReactMapGL
      {...viewport}
      {...settings}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      onViewportChange={ (viewport: any) => interactive && setViewport(viewport)}
      mapStyle={ mapStyle ?? Theme.map.light }
    >
      { children }
    </ReactMapGL>
  )
};

export const MapContainer = styled.div`
	position: relative;
  height: 90vh;
	width: 80vw;
	box-shadow: 0 0 2px 2px black;
	margin: 0 auto;
	margin-bottom: 24px;

	.map {
		height: 100%;
		width: 100%;
		overflow: visible;
	}
`;

export const MapTitle = styled.p`
	font-family: ${ props => props.theme.fonts.fontFamily.header };
	font-size: ${ props => props.theme.fonts.fontSize.subtitle };
	text-align: center;
	margin: 24px auto;
`;

export const MapGeoJsonSource = ({ data, id, type, color, visible }: Omit<MapGeoJsonData, 'name'> ) => {
  if (!visible) {
    return null;
  }

  const paint = () => {
    if (type === 'line') {
      return { 'line-color': color };
    }

    if (type === 'fill') {
      return { 'fill-color': color };
    }
  }

  const layer: MapLayer = {
    id: id,
    type: type,
    paint: paint(),
  };

  return (
    <Source type='geojson' data={ data }>
      <Layer { ...layer }/>
    </Source>
  );
};

export function Pin({ size = 20, color = Theme.colors.orange}: {size: number, color: string}) {
  const ICON = 'M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z';
  
  const pinStyle = {
    // cursor: 'pointer',
    fill: color,
    stroke: 'none',
    display: 'block',
  };

  return (
    <svg height={size} viewBox="0 0 16 16" style={pinStyle}>
      <path d={ICON} />
    </svg>
  );
};