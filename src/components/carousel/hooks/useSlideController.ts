import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { CarouselAnimation, CarouselSlideElement } from "../carousel.classes";

const useSlideController = () => {
    const slides = useRef<CarouselSlideElement[]>([]);
    const [offset, _setOffset] = useState<number>(0);
    const [targetOffset, setTargetOffset] = useState<number>(0);
    const isPlaying = useRef<boolean>(false);
    const length = useMemo(() => slides.current.length, [slides.current]);

    const setOffset = (value: number | ((prev: number) => number)) => {
        const target = typeof value === "function" ? value(offset) : value;
        console.log(target);
        setTargetOffset(target);
    };

    const getGrabController = () => {
        let slideOffset = 0;
        let currentShift = 0;
        const dragTo = (shift: number) => {
            currentShift = shift - slideOffset;
            const direction: "next" | "prev" = currentShift < 0 ? "next" : "prev";

            if (currentShift >= 1) {
                slides.current.forEach((slide) => {
                    slide.currentKeyframe = slide.currentKeyframe.next!;
                });
                slideOffset++;
            } else if (currentShift <= -1) {
                slides.current.forEach((slide) => {
                    slide.currentKeyframe = slide.currentKeyframe.prev!;
                });
                slideOffset--;
            }

            slides.current.forEach((slide) => {
                slide.setKeyframe(direction);
                slide.drag(Math.abs(currentShift), (option) => {
                    return {
                        ...option,
                        duration: 200,
                        easing: "linear",
                    };
                });
            });
        };

        const release = () => {
            const playbackRate = Math.abs(currentShift) > 0.5 ? 1 : -1;
            slides.current.forEach((slide) => {
                slide.animation.playbackRate = playbackRate;
                slide.release().then(() => {
                    slide.animation.playbackRate = 1;
                });
            });

            if (playbackRate > 0) {
                if (currentShift > 0.5) {
                    _setOffset((prev) => prev + 1);
                }
            } else if (playbackRate < 0) {
                if (currentShift < -0.5) {
                    _setOffset((prev) => prev - 1);
                }
            }
        };

        return {
            dragTo,
            release,
        };
    };

    useLayoutEffect(() => {
        if (!isPlaying.current) {
            slides.current.forEach((slide) => slide.reposition());
        }

        if (offset != targetOffset && !isPlaying.current) {
            if (offset < targetOffset) {
                AnimateSlides("next");
            } else {
                AnimateSlides("prev");
            }
        }
    }, [offset, targetOffset]);

    const AnimateSlides = (direction: "next" | "prev") => {
        if (isPlaying.current) return;
        isPlaying.current = true;

        let currentVirtualOffset = offset;

        const runStep = () => {
            const difference = Math.abs(targetOffset - currentVirtualOffset);
            Promise.allSettled(
                slides.current.map((slide) => {
                    return slide.move(direction, (option) => {
                        return {
                            ...option,
                            duration: (option.duration as number) / Math.pow(difference, 1.2),
                            easing: difference == 1 ? "cubic-bezier(0.22, 1, 0.36, 1)" : "linear",
                        };
                    });
                }),
            ).then(() => {
                currentVirtualOffset = direction == "next" ? currentVirtualOffset + 1 : currentVirtualOffset - 1;
                _setOffset(currentVirtualOffset);

                if (currentVirtualOffset != targetOffset) {
                    runStep();
                } else {
                    isPlaying.current = false;
                }
            });
        };

        runStep();
    };

    return {
        length,
        slides,
        offset,
        setOffset,
        getGrabController,
    };
};

export default useSlideController;
