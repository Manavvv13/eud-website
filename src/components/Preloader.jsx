import React, { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [hideCounter, setHideCounter] = useState(false);
  const [zooming, setZooming] = useState(false);
  const [bgDissolve, setBgDissolve] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const startTime = Date.now();
    const duration = 1500; // 0 to 100 in 1.5s

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);

        // Step 1: Hide bar & counter
        setTimeout(() => {
          setHideCounter(true);
        }, 100);

        // Step 2: Start moderate Logo Zoom & Fade
        setTimeout(() => {
          setZooming(true);
        }, 200);

        // Step 3: Dissolve white background
        setTimeout(() => {
          setBgDissolve(true);
        }, 900);

        // Step 4: Unmount preloader & trigger landing page entrance
        setTimeout(() => {
          setFinished(true);
          document.body.style.overflow = 'auto';
          if (onComplete) onComplete();
        }, 1450);
      }
    }, 20);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  if (finished) return null;

  return (
    <div className={`preloader-overlay ${bgDissolve ? 'preloader-bg-dissolve' : ''}`}>
      <div className="preloader-content">
        <div className={`preloader-logo-wrapper ${zooming ? 'logo-zoom-in' : ''}`}>
          <img src="/EUD Logo.png" alt="EUD Group" className="preloader-logo" />
        </div>
        
        {/* Progress Bar in Brand Blue */}
        <div className={`preloader-counter-wrap ${hideCounter ? 'counter-hidden' : ''}`}>
          <div className="preloader-loader-bar">
            <div 
              className="preloader-progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
