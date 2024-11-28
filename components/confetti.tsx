"use client";
import React, {createRef} from "react";
import {Button} from "@logi-x/button";
import confetti from "canvas-confetti";

type Props = {};

const ConfettiButton = (props: Props) => {
  const buttonRef = createRef<HTMLButtonElement>();

  //   const duration = 5 * 1000;
  //   const end = Date.now() + duration;

  const handleConfetti = () => {
    (function frame() {
      // launch a few confetti from the left edge
      confetti({
        particleCount: Math.floor(200 * 0.25),
        spread: 26,
        startVelocity: 55,
        origin: {y: 0.7},
      });
      // and launch a few from the right edge
      confetti({
        particleCount: Math.floor(200 * 0.2),
        angle: 120,
        spread: 60,
        origin: {y: 0.7},
      });
      confetti({
        particleCount: Math.floor(200 * 0.35),
        decay: 0.91,
        scalar: 0.8,
        origin: {y: 0.7},
      });
      confetti({
        particleCount: Math.floor(200 * 0.1),
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
        origin: {y: 0.7},
      });
      confetti({
        particleCount: Math.floor(200 * 0.1),
        spread: 120,
        startVelocity: 45,
        origin: {y: 0.7},
      });

      // keep going until we are out of time
      //   if (Date.now() < end) {
      //     requestAnimationFrame(frame);
      //   }
    })();
  };

  return (
    <Button
      ref={buttonRef}
      disableRipple
      className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-background/30 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
      size="lg"
      onPress={handleConfetti}
    >
      Press me
    </Button>
  );
};

export default ConfettiButton;
