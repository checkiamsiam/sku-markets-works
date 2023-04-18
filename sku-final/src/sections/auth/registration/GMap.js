import { Autocomplete, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Box, Button, CircularProgress, useTheme } from '@mui/material';

// Variables
const libraries = ['places'];

// Input Styles
const inputStyles = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: 'none',
  outline: '1.5px solid gray',
  fontSize: '15px',
};

const GMap = ({center, setCenter, marker, setMarker, height='80vh', location}) => {
  const theme = useTheme();
  const [map, setMap] = useState(null);
  const [autoComplete, setAutoComplete] = useState(null);
  let currentLocation = { lat: 0, lng: 0 };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos?.coords?.latitude;
      const lng = pos?.coords?.longitude;

      setCenter({ lat, lng });
      currentLocation = { lat, lng };
      setMarker({ lat, lng });
    });
  };

  useEffect(() => {
    if(!location) {
      getLocation();
    }
  }, []);

  // Fit map to bounds
  useEffect(() => {
    if (map) {
      var bounds = new window.google.maps.LatLngBounds();
      bounds.extend(new window.google.maps.LatLng(marker?.lat, marker?.lng));

      if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
        var extendPoint1 = new window.google.maps.LatLng(
          bounds.getNorthEast().lat() + 0.002,
          bounds.getNorthEast().lng() + 0.002
        );
        var extendPoint2 = new window.google.maps.LatLng(
          bounds.getNorthEast().lat() - 0.002,
          bounds.getNorthEast().lng() - 0.002
        );
        bounds.extend(extendPoint1);
        bounds.extend(extendPoint2);
      }
      map.fitBounds(bounds);
    }
  }, [marker, map]);

  // Load Google Maps
  const { isLoaded } = useJsApiLoader({
    id: 'sku_market_company_location',
    googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
    libraries,
  });

  // Map Options
  const handleClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCenter({ lat, lng });
    setMarker({ lat, lng });
  };

  const handleDrag = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCenter({ lat, lng });
    setMarker({ lat, lng });
  };

  const handleCurrentLocation = () => {
    getLocation();
    map.panTo(currentLocation);
  };

  const handlePlaceChanged = () => {
    if (autoComplete !== null) {
      const lat = autoComplete?.getPlace().geometry?.location?.lat();
      const lng = autoComplete?.getPlace().geometry?.location?.lng();
      setCenter({ lat, lng });
      setMarker({ lat, lng });
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  if (!isLoaded) {
    return (
      <Box sx={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{width: '100%'}}>

      <Autocomplete
        style={{ width: '100%' }}
        onLoad={(e) => setAutoComplete(e)}
        onPlaceChanged={handlePlaceChanged}
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}
        >
          <input type="text" placeholder="Search an addres" style={inputStyles} />
          <Button
            onClick={handleCurrentLocation}
            variant="contained"
            sx={{
              color: 'white',
              '&:hover': {
                bgcolor: 'white',
                color: 'primary.main',
                border: `1px solid ${theme.palette.primary.main}`,
              },
            }}
            title="Get Current Location"
          >
            <MyLocationIcon />
          </Button>
        </Box>
      </Autocomplete>

      <Box
        sx={{
          width: '100%',
          height,
          position: 'relative',
        }}
      >
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={15}
          options={{
            zoomControl: true,
            mapTypeControl: false,
            fullscreenControl: true,
            streetViewControl: false,
            markLocationControl: true,
          }}
          onClick={handleClick}
          onLoad={(map) => setMap(map, { zoom: 15 })}
        >
          <Marker position={marker} map={map} animation="BOUNCE" draggable onDragEnd={handleDrag} />
        </GoogleMap>
      </Box>
    </Box>
  );
};

export default GMap;
