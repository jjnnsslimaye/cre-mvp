'use client';

import { useRef, useEffect } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import animationData from '@/public/animation.json';

export default function NavLogo() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef.current) {
      // Go to the middle frame where buildings are fully visible
      const totalFrames = (animationData as any).op;
      const middleFrame = Math.floor(totalFrames / 2);
      lottieRef.current.goToAndStop(middleFrame, true);
    }
  }, []);

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop={false}
      autoplay={false}
      style={{ width: '40px', height: '40px' }}
    />
  );
}
