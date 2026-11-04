
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import type { PointerEvent } from 'react';

import './GovernmentLogosCarousel.css';
import { useLanguage } from '../context/LanguageContext';

type GovernmentLogo = {
  name: string;
  image?: string;
  abbreviation?: string;
};

// Asset path
const assetPath = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

// Government logos
const governmentLogos: GovernmentLogo[] = [
  {
    name: 'ICP',
    image: '/assets/service-logos/federalauthority.png',
  },
  {
    name: 'Amer',
    image: '/assets/service-logos/amer.png',
  },
  {
    name: 'RTA Dubai',
    image: '/assets/service-logos/rta.png',
  },
  {
    name: 'Tasheel',
    image: '/assets/service-logos/tasheel.png',
  },
  {
    name: 'Ministry of Health',
    image: '/assets/service-logos/ministryofhealth.png',
  },
  {
    name: 'Ministry of Foreign Affairs',
    image: '/assets/service-logos/ministryofforeign.png',
  },
  {
    name: 'Ministry of Interior',
    image: '/assets/service-logos/ministeryofinterior.png',
  },
  {
    name: 'Government of Sharjah',
    image: '/assets/service-logos/govermentofsharjah.png',
  },
  {
    name: 'Sharjah Municipality',
    image: '/assets/service-logos/sharjamuncipality.png',
  },
  {
    name: 'Visa',
    image: '/assets/service-logos/visa.png',
  },
];

// Individual logo
function LogoItem({
  logo,
  duplicate = false,
}: {
  logo: GovernmentLogo;
  duplicate?: boolean;
}) {
  return (
    <li
      className="government-logos-carousel__item"
      aria-hidden={duplicate || undefined}
    >
      <div className="government-logos-carousel__circle">
        {logo.image ? (
          <img
            src={assetPath(logo.image)}
            alt={duplicate ? '' : logo.name}
            width="72"
            height="72"
            loading="eager"
            draggable={false}
          />
        ) : (
          <span className="government-logos-carousel__text">
            {logo.abbreviation?.split('\n').map((line, index) => (
              <span key={`${logo.name}-${index}`}>
                {line}
              </span>
            ))}
          </span>
        )}
      </div>
    </li>
  );
}

export function GovernmentLogosCarousel() {
  const { t, isArabic } = useLanguage();

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstListRef = useRef<HTMLUListElement>(null);

  // Animation
  const animationRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  // Carousel dimensions and position
  const loopWidthRef = useRef(0);
  const positionRef = useRef(0);

  // Dragging
  const isDraggingRef = useRef(false);
  const pointerXRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);

  // Pause / resume
  const isPausedRef = useRef(false);
  const pauseTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const isRTLRef = useRef(isArabic);

  const [isPaused, setIsPaused] = useState(false);
  const [duplicateSets, setDuplicateSets] = useState(3);

  // Configuration
  const SPEED = 45;
  const RESUME_DELAY = 1200;

  // Keep position inside one complete logo set.
  const normalizePosition = (
    position: number,
    width: number
  ) => {
    if (width <= 0) return 0;

    return ((position % width) + width) % width;
  };

  // Update track transform.
  const updateTrackPosition = useCallback(() => {
    const track = trackRef.current;
    const width = loopWidthRef.current;

    if (!track || width <= 0) return;

    const offset = normalizePosition(
      positionRef.current,
      width
    );

    track.style.transform = `translate3d(${
      -(width + offset)
    }px, 0, 0)`;
  }, []);

  // Pause / resume automatic scrolling.
  const setPaused = useCallback((paused: boolean) => {
    isPausedRef.current = paused;
    previousTimeRef.current = null;
    setIsPaused(paused);
  }, []);

  // Resume after manual interaction.
  const pauseTemporarily = useCallback(() => {
    setPaused(true);

    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
    }

    pauseTimerRef.current = setTimeout(() => {
      if (!isDraggingRef.current) {
        setPaused(false);
      }

      pauseTimerRef.current = null;
    }, RESUME_DELAY);
  }, [setPaused]);

  // Measure carousel width.
  const updateDimensions = useCallback(() => {
    const viewport = viewportRef.current;
    const firstList = firstListRef.current;

    if (!viewport || !firstList) return;

    const width = firstList.getBoundingClientRect().width;

    if (width <= 0) return;

    const oldWidth = loopWidthRef.current;

    // Preserve approximate position during resize.
    if (oldWidth > 0 && oldWidth !== width) {
      positionRef.current =
        (positionRef.current / oldWidth) * width;
    }

    loopWidthRef.current = width;

    positionRef.current = normalizePosition(
      positionRef.current,
      width
    );

    // Add enough copies to fill wide screens.
    const requiredSets = Math.max(
      3,
      Math.ceil(viewport.clientWidth / width) + 3
    );

    setDuplicateSets((current) =>
      current === requiredSets ? current : requiredSets
    );

    updateTrackPosition();
  }, [updateTrackPosition]);

  // Update direction.
  useEffect(() => {
    isRTLRef.current = isArabic;
  }, [isArabic]);

  // Observe dimensions.
  useEffect(() => {
    const viewport = viewportRef.current;
    const firstList = firstListRef.current;

    if (!viewport || !firstList) return;

    updateDimensions();

    const observer = new ResizeObserver(() => {
      updateDimensions();
    });

    observer.observe(viewport);
    observer.observe(firstList);

    return () => observer.disconnect();
  }, [updateDimensions]);

  // Infinite automatic movement.
  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current === null) {
        previousTimeRef.current = time;
      }

      const delta = Math.min(
        (time - previousTimeRef.current) / 1000,
        0.05
      );

      previousTimeRef.current = time;

      const width = loopWidthRef.current;

      if (
        !isPausedRef.current &&
        !isDraggingRef.current &&
        width > 0
      ) {
        const direction = isRTLRef.current ? -1 : 1;

        positionRef.current = normalizePosition(
          positionRef.current + direction * SPEED * delta,
          width
        );

        updateTrackPosition();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      previousTimeRef.current = null;
    };
  }, [duplicateSets, updateTrackPosition]);

  // Previous / next buttons.
  const scrollLogos = useCallback(
    (direction: -1 | 1) => {
      const viewport = viewportRef.current;
      const width = loopWidthRef.current;

      if (!viewport || width <= 0) return;

      pauseTemporarily();

      const amount = Math.max(
        viewport.clientWidth * 0.7,
        180
      );

      const logicalDirection = isArabic
        ? -direction
        : direction;

      positionRef.current = normalizePosition(
        positionRef.current + logicalDirection * amount,
        width
      );

      updateTrackPosition();
    },
    [isArabic, pauseTemporarily, updateTrackPosition]
  );

  // Mouse / touch drag start.
  const handlePointerDown = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }

    isDraggingRef.current = true;
    pointerIdRef.current = event.pointerId;
    pointerXRef.current = event.clientX;

    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }

    setPaused(true);

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  // Drag in both directions.
  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (!isDraggingRef.current) return;

    const width = loopWidthRef.current;

    if (width <= 0) return;

    const delta = pointerXRef.current - event.clientX;

    pointerXRef.current = event.clientX;

    if (Math.abs(delta) > 0) {
      positionRef.current = normalizePosition(
        positionRef.current + delta,
        width
      );

      updateTrackPosition();
    }
  };

  // Drag end.
  const handlePointerUp = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    pointerIdRef.current = null;

    if (
      event.currentTarget.hasPointerCapture(event.pointerId)
    ) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    pauseTemporarily();
  };

  // Handle interrupted pointer interactions.
  const handlePointerCancel = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    handlePointerUp(event);
  };

  // Lost pointer capture.
  const handleLostPointerCapture = () => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    pointerIdRef.current = null;

    pauseTemporarily();
  };

  // Cleanup.
  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }

      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section
      className={`government-logos-carousel ${
        isPaused
          ? 'government-logos-carousel--paused'
          : ''
      }`}
      aria-labelledby="government-logos-title"
    >
      {/* Heading */}
      <div className="government-logos-carousel__container">
        <p className="government-logos-carousel__eyebrow">
          {t.home.governmentEyebrow}
        </p>

        <h2 id="government-logos-title">
          {t.home.governmentTitle}
        </h2>
      </div>

      {/* Infinite draggable carousel */}
      <div
        className="government-logos-carousel__viewport"
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onLostPointerCapture={handleLostPointerCapture}
      >
        <div
          className="government-logos-carousel__track"
          ref={trackRef}
        >
          {Array.from(
            { length: duplicateSets },
            (_, setIndex) => (
              <ul
                key={`logo-set-${setIndex}`}
                ref={
                  setIndex === 0
                    ? firstListRef
                    : undefined
                }
                className="government-logos-carousel__list"
                aria-hidden={setIndex !== 0 || undefined}
              >
                {governmentLogos.map((logo) => (
                  <LogoItem
                    key={`${setIndex}-${logo.name}`}
                    logo={logo}
                    duplicate={setIndex !== 0}
                  />
                ))}
              </ul>
            )
          )}
        </div>
      </div>

      {/* Navigation controls */}
      {/* <div
        className="government-logos-carousel__controls"
        dir="ltr"
      >
        <button
          type="button"
          className="government-logos-carousel__control"
          onClick={() => scrollLogos(-1)}
          aria-label={
            isArabic
              ? 'الشعارات السابقة'
              : 'Previous logos'
          }
        >
          <span aria-hidden="true">←</span>
        </button>

        <button
          type="button"
          className="government-logos-carousel__control"
          onClick={() => scrollLogos(1)}
          aria-label={
            isArabic
              ? 'الشعارات التالية'
              : 'Next logos'
          }
        >
          <span aria-hidden="true">→</span>
        </button>
      </div> */}
    </section>
  );
}
