'use client';

import Lottie from 'lottie-react';
import animationData from '@/public/animation.json';

export default function HeroAnimation() {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      style={{ width: '100%', maxWidth: '450px', height: 'auto' }}
    />
  );
}
