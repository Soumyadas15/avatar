"use client";

import { useEffect, useContext, useRef, useState } from "react";
import {
  useRive,
  useStateMachineInput,
  Layout,
  Alignment,
} from "@rive-app/react-canvas";
import { AvatarStateContext } from "@/app/context/avatarState";
import html2canvas from "html2canvas";
import { Button } from "./ui/button";

const STATE_MACHINE_NAME = "State Machine 1";

export default function RiveAvatarComponent() {
  const { rive, RiveComponent } = useRive({
    src: "./avatar_demo.riv",
    artboard: "Avatar",
    stateMachines: [STATE_MACHINE_NAME],
    layout: new Layout({
      alignment: Alignment.TopCenter,
    }),
    autoplay: true,
  });

  const {
    state: { riveAvatarSelections },
  } = useContext(AvatarStateContext);

  const numBodyColor = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "numBodyColor"
  );
  const numBodySize = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "numBodySize"
  );
  const numBodyEyes = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "numBodyEyes"
  );
  const numBodyHair = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "numBodyHair"
  );
  const numBodyFaceHair = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "numBodyFaceHair"
  );
  const numBackgroundColor = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "numBackgroundColor"
  );

  const changesTrigger = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "changes"
  );

  const avatarRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  const downloadAvatar = () => {
    html2canvas(avatarRef.current!).then((canvas) => {
      const url = canvas.toDataURL();
      const a = document.createElement("a");
      a.href = url;
      a.download = "avatar.png";
      a.click();
    });
  };

  useEffect(() => {
    if (
      rive &&
      numBodyColor &&
      numBodySize &&
      numBodyEyes &&
      numBodyHair &&
      numBodyFaceHair &&
      numBackgroundColor &&
      changesTrigger
    ) {
      numBodyColor.value = riveAvatarSelections["BodyColor"];
      numBodySize.value = riveAvatarSelections["BodySize"];
      numBodyEyes.value = riveAvatarSelections["BodyEyes"];
      numBodyHair.value = riveAvatarSelections["BodyHair"];
      numBodyFaceHair.value = riveAvatarSelections["BodyFaceHair"];
      numBackgroundColor.value = riveAvatarSelections["BackgroundColor"];
      changesTrigger.fire();
      setIsReady(true);
    }
  }, [
    rive,
    numBodyColor,
    numBodySize,
    numBodyEyes,
    numBodyHair,
    numBodyFaceHair,
    riveAvatarSelections,
    numBackgroundColor,
    changesTrigger,
  ]);

  return (
    <div className=" w-full h-full p-5">
      <div className="bg-blue-400 w-full h-[90%]" ref={avatarRef}>
      <RiveComponent className="bg-black w-full h-full shadow-[10px_0_#000]" />
      </div>
      <div className="flex justify-start items-center h-[10%]">
        {isReady && (
          <Button onClick={downloadAvatar} className="bg-white text-black text-[20px] p-5">
            Save
          </Button>
        )}
      </div>
    </div>
  );
}
