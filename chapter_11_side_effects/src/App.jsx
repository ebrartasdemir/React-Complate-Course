import { useCallback, useEffect, useRef, useState } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import {sortPlacesByDistance} from './loc.js';

const storedIds=JSON.parse(localStorage.getItem('selectedPlaces'))||[];
  const storedPlaces=storedIds.map((id)=>
    AVAILABLE_PLACES.find((place)=>place.id===id)
).filter(Boolean);

function App() {
  const [modalIsOpen,setModalIsOpen]=useState(false);
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);
  const [availablePlaces, setAvailablePlaces]=useState([]);

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      const soretedPlaces=sortPlacesByDistance(
        AVAILABLE_PLACES,
      position.coords.latitude,
    position.coords.longitude
  );
  setAvailablePlaces(soretedPlaces);
    });
  },[])
  

  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      const updatedPlaces=[place,...prevPickedPlaces];
      localStorage.setItem('selectedPlaces',JSON.stringify(updatedPlaces.map(place=>place.id)));
      return updatedPlaces;

    });
    
  }

  const handleRemovePlace=useCallback( function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>{
      const updatedPlaces=prevPickedPlaces.filter((place) => place.id !== selectedPlace.current);

      localStorage.setItem(
        'selectedPlaces',
        JSON.stringify(updatedPlaces.map(place=>place.id)));
        return updatedPlaces;
      });
setModalIsOpen(false);
  },[]);

  return (
    <>
      <Modal open={modalIsOpen}
      onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by distance"
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
