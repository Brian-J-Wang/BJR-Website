import styles from "./_carouselSlide.module.css";
import React, { useCallback, type Ref } from "react";
import { type PropsWithChildren } from "react";

type CarouselSlideProps = PropsWithChildren & {
    className?: string;
    _slideIndex?: number;
    ref?: Ref<HTMLDivElement>;
    onPointerUp?: () => void;
    onPointerMove?: (shift: number) => void;
};

const CarouselSlide: React.FC<CarouselSlideProps> = (props) => {
    const startX = React.useRef<number | null>(null);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        // This ensures the move/up events continue to fire on this element even if the cursor leaves it
        e.currentTarget.setPointerCapture(e.pointerId);
        startX.current = e.clientX;
    };

    const handlePointerMove = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            if (startX.current === null || !props.onPointerMove) return;

            // Calculate a normalized shift value (e.g. -1 to 1) based on drag distance
            const delta = e.clientX - startX.current;
            const normalizedShift = delta / e.currentTarget.getBoundingClientRect().width;

            props.onPointerMove(normalizedShift);
        },
        [props.onPointerMove],
    );

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        startX.current = null;
        props.onPointerUp?.();
    };

    return (
        <div
            className={`${styles.content} ${props.className}`}
            ref={props.ref}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{ touchAction: "none", userSelect: "none" }}
        >
            {props.children}
        </div>
    );
};

export default CarouselSlide;
