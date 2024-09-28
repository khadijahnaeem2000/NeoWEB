import React, { useEffect } from "react";
import { ZoomMtg } from "@zoom/meetingsdk";

import { getLocalUserdata } from "../../services/auth/localStorageData";
import "./styles.css";

ZoomMtg.setZoomJSLib("https://source.zoom.us/3.8.10/lib", "/av");

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load("es-ES");
ZoomMtg.i18n.reload("es-ES");

const Directo = () => {
  const data = getLocalUserdata();

  var signatureEndpoint = "https://neoestudio.net/api/JwtToken";
  var sdkKey = "ejMUC7sZJxrReEZ4iLrllWD4iYqM9W6tOqpS";
  var meetingNumber = "4269760334";
  var role = 0;
  var leaveUrl = window.location.href;
  var userName = null;
  if (data.name !== null) {
    userName = data.name;
  }
  var userEmail = "";
  var passWord = "Ehkuc2";
  // pass in the registrant's token if meeting or webinar requires registration.
  var registrantToken = "";

  function HideJoinAudio() {
    let joinBtn = document.getElementsByClassName(
      "join-audio-by-voip__join-btn"
    )[0];

    if (joinBtn) {
      wait(JoinAudioAuto, 0.5);
    } else {
      wait(OpenJoinAudio, 0.5);
      wait(JoinAudioAuto, 0.5);
    }

    return;
  }

  function OpenJoinAudio() {
    let btn = document.getElementsByClassName("join-audio-container__btn")[0];
    let joinDialog = document.getElementsByClassName("join-dialog")[0];

    if (btn && !joinDialog) {
      btn.click();
    }

    return;
  }

  function JoinAudioAuto() {
    let btn = document.getElementsByClassName(
      "join-audio-by-voip__join-btn"
    )[0];

    if (btn) {
      btn.click();
    }

    return;
  }

  const wait = (callback, seconds) => {
    return window.setTimeout(callback, seconds * 1000);
  };

  function getSignature() {
    fetch(signatureEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: 0,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        startMeeting(response.token);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const listenForAudioButtonNode = (params, callback) => {
    new MutationObserver(function (mutations) {
      const el = document.querySelector(params.className);

      if (el) {
        this.disconnect();
        callback(el);
      }
    }).observe(params.parent || document, {
      subtree: true,
      childList: true,
    });
  };

  const autoAudioJoin = (audioButton) => {
    const config = {
      attributes: true,
      childList: true,
      attributeOldValue: true,
      subtree: true,
    };

    const canClick = (oldValue) => {
      return (
        oldValue ===
        "zm-btn join-audio-by-voip__join-btn zm-btn--primary zm-btn__outline--white zm-btn--lg"
      );
    };

    const isJoined = (oldValue) => {
      return oldValue === "display: inline-block;";
    };
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (canClick(mutation.oldValue)) {
          // When join button becomes clickable.
          audioButton.click();
        } else if (isJoined(mutation.oldValue)) {
          // When connected to audio.
          observer.disconnect();
        }
      });
    });

    observer.observe(audioButton, config);
  };

  function startMeeting(signature) {
    document.getElementsByTagName("header")[0].style.display = "none";
    document.getElementById("zmmtg-root").style.display = "block";

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log("kk");
        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          sdkKey: sdkKey,
          userEmail: "",
          passWord: passWord,
          success: (success) => {
            HideJoinAudio();
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  useEffect(() => {
    {
      /*listenForAudioButtonNode(
      {
        className: '.zm-btn.zm-btn--primary.zm-btn__outline--white.zm-btn--lg',
        parent: document.getElementById('zmmtg-root'),  // SETUP your own zoom root DOM element name here
        recursive: false
      },
      element => autoAudioJoin(element)
    );*/
    }
    getSignature();
  }, []);

  return <div></div>;
};

export default Directo;
