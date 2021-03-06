import React, { useState, useEffect } from "react";

const initialLocationState = {
    latitude: null,
    longitude: null,
    speed: null
}

const AppFunction = () => {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [position, setPosition] = useState({ x: null, y: null });
  const [status, setStatus] = useState(navigator.onLine);
  const [{latitude, longitude, speed}, setLocation] = useState(initialLocationState)
  let mounted = true;

  useEffect(() => {
    document.title = `You have clicked ${count} times`;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    navigator.geolocation.getCurrentPosition(handleGeolocation)
    const watchId = navigator.geolocation.watchPosition(handleGeolocation)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      navigator.geolocation.clearWatch(watchId)
      mounted = false

    };
  }, [count]);

  const handleGeolocation = e => {
      if (mounted) {
          setLocation({
              latitude: e.coords.latitude,
              longitude: e.coords.longitude,
              speed: e.coords.speed
          })
      }
  }

  const handleOnline = () => {
    setStatus(true);
  };

  const handleOffline = () => {
    setStatus(false);
  };

  const handleMouseMove = e => {
    setPosition({
      x: e.pageX,
      y: e.pageY
    });
  };

  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  const toggleLight = () => {
    setIsOn(prevIsOn => !prevIsOn);
  };

  return (
    <>
      <h2>Counter</h2>
      <button onClick={incrementCount}>I was clicked {count} times.</button>
      <h2>Toggle Light</h2>
      <img
        src={
          isOn
            ? "https://icon.now.sh/highlight/fd0"
            : "https://icon.now.sh/highlight/aaa"
        }
        style={{
          height: "50px",
          width: "50px"
        }}
        onClick={toggleLight}
        alt="Flashlight"
      />
      <h2>Mouse Position:</h2>
      {JSON.stringify(position, null, 2)}
      <br />

      <h2>Network Status</h2>
      <p>
        You are <strong>{status ? "online" : "offline"}</strong>
      </p>

      <h2>Geolocation</h2>
      <p>Latitude is: {latitude}</p>
      <p>Longitude is: {longitude}</p>
      <p>Your speed is: {speed ? speed : "0"}</p>
      
    </>
  );
};

export default AppFunction;
