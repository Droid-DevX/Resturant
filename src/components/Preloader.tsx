import { useEffect, useRef, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let current = 0;
    intervalRef.current = setInterval(() => {
      current += Math.random() * 15 + 5;
      if (current >= 100) {
        current = 100;
        if (intervalRef.current) clearInterval(intervalRef.current);

        setTimeout(() => {
          setHidden(true);
          setTimeout(() => {
            setRemoved(true);
            onComplete();
          }, 800);
        }, 300);
      }
      setProgress(current);
    }, 150);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onComplete]);

  if (removed) return null;

  return (
    <div className={`preloader ${hidden ? 'hidden' : ''}`}>
      <div className="preloader__inner">
        <div className="preloader__crown"></div>
        <h1 className="preloader__title">MAHARAJA</h1>
        <p className="preloader__subtitle">Family Restaurant</p>
        <div className="preloader__bar">
          <div
            className="preloader__progress"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="preloader__percent">{Math.floor(progress)}%</span>
      </div>
    </div>
  );
}
