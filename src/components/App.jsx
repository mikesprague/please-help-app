import React, { useEffect, useRef, useState } from 'react';
import {
  faCarSide,
  faHandWave,
  faPersonWalking,
  faTrafficLightGo,
  faTrafficLightSlow,
  faTrafficLightStop,
  faTruckMedical,
} from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import got from 'got';
import Swal from 'sweetalert2';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { useSessionStorage } from '@uidotdev/usehooks';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

library.add(
  faCarSide,
  faHandWave,
  faPersonWalking,
  faTrafficLightGo,
  faTrafficLightSlow,
  faTrafficLightStop,
  faTruckMedical,
);

import './App.scss';

export const App = () => {
  const [countdown, setCountdown] = useState(60);
  const countdownRef = useRef();
  const btnStopCountdownRef = useRef();
  // const [contacts, setContacts] = useSessionStorage('contacts', []);

  useEffect(() => {
    const handle = setTimeout(() => {
      if (!countdown) {
        if (countdown === 0) {
          console.log('countdown complete');
          // this will use the emergency related methods once built out
          // in theory, it will send a text message to the contacts and
          // then try calling the primary one
          // it will capture geolocation info and include tha in the text
        } else {
          console.log('countdown stopped');
          // shouldn't hit this since it will exit the app when stopped
          // leaving this in for debugging purposes
        }

        clearTimeout(handle);

        return;
      }

      const newValue = countdown - 1;

      setCountdown(newValue);
      // console.log(countdown);
    }, 1000);

    return () => clearTimeout(handle);
  }, [countdown]);

  const stopCountdownHandler = () => {
    MySwal.fire({
      title: 'Are you sure?',
      text: 'This will stop the countdown and exit the application.',
      icon: 'warning',
      iconColor: '#f4bf4f',
      showCancelButton: true,
      background: '#0c1322',
      color: '#b4c6ef',
      showClass: { popup: 'animate__animated animate__fadeIn animate__faster' },
    }).then((result) => {
      if (result.isConfirmed) {
        // const val = countdown;
        btnStopCountdownRef.current.setAttribute('disabled', true);
        countdownRef.current.innerHTML = '--';
        setCountdown(null);
        // window.close();
      }
    });
  };

  return (
    <div className="page-wrapper">
      <div className="card w-fit bg-base-300 shadow-xl">
        <div className="card-body">
          <h1 className="card-title">
            <FontAwesomeIcon icon="fa-duotone fa-hand-wave" fixedWidth />
            &nbsp;Hello!
          </h1>
          <h2>What kind of help do you need?</h2>
          <div className="card-actions">
            <button className="btn btn-lg btn-block btn-info">
              <FontAwesomeIcon icon="fa-duotone fa-person-walking" fixedWidth />
              &nbsp;Casual
              <small>(As Available)</small>
            </button>
            <button className="btn btn-lg btn-block btn-warning">
              <FontAwesomeIcon icon="fa-duotone fa-car-side" fixedWidth />
              &nbsp;Somewhat Urgent
              <small>(As Soon As Possible)</small>
            </button>
            <button className="btn btn-lg btn-block btn-error">
              <FontAwesomeIcon icon="fa-duotone fa-truck-medical" fixedWidth />
              &nbsp;Emergency
              <small>(Immediately)</small>
            </button>
          </div>
          <div className="text-center">
            <p className="text-center my-2">&nbsp;</p>
            <div className="countdown font-mono text-8xl" ref={countdownRef}>
              <span style={{ '--value': countdown }}></span>
            </div>
          </div>

          <p className="mt-2 text-sm text-center">
            Contacts will be automatically notified if no selection is made
            before timer reaches zero
          </p>
          <p className="text-center mt-2">&nbsp;</p>
          <button
            onClick={stopCountdownHandler}
            ref={btnStopCountdownRef}
            className="btn btn-md btn-outline mt-2 btnStopCountdown"
          >
            <FontAwesomeIcon
              icon="fa-duotone fa-traffic-light-stop"
              fixedWidth
            />
            &nbsp;Stop Countdown and Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
