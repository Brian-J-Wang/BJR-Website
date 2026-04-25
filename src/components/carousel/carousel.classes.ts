import type { Dispatch, SetStateAction } from "react";

type ControllerOptions = {
    primaryKeyframeOffset: number;
    wrap: "wrap" | "nowrap";
};

class SlideKeyframe {
    name: string;
    keyframe: Keyframe;

    next?: SlideKeyframe;
    prev?: SlideKeyframe;
    constructor(name: string, keyframe: Keyframe) {
        this.name = name;
        this.keyframe = keyframe;
    }
}

export class CarouselAnimation {
    private chainLength: number = 0;
    controllerOptions: ControllerOptions;
    rootKeyframe?: SlideKeyframe;
    leadingSlideKeyframe?: SlideKeyframe;
    constructor(controllerOptions: ControllerOptions) {
        this.controllerOptions = controllerOptions;
    }

    addKeyframe(name: string, keyframe: Keyframe) {
        const slideKeyframe = new SlideKeyframe(name, keyframe);
        //sets the rootKeyframe as the first keyframe that is added;
        if (this.rootKeyframe === undefined) {
            this.rootKeyframe = slideKeyframe;
        }

        //links the last leading keyframe with the next one;
        if (this.leadingSlideKeyframe !== undefined) {
            this.leadingSlideKeyframe.next = slideKeyframe;
            slideKeyframe.prev = this.leadingSlideKeyframe;
        }
        this.leadingSlideKeyframe = slideKeyframe;
        this.chainLength++;

        return this;
    }

    //extends the animation slides to slideElement length
    addPadding(count: number) {
        if (this.leadingSlideKeyframe === undefined || this.rootKeyframe === undefined) {
            throw new Error("Cannot call this method with no keyframes");
        }

        for (let i = 0; i < count; i++) {
            const padding = new SlideKeyframe(`padding-${i}`, {
                opacity: "0%",
                visibility: "hidden",
            });

            this.leadingSlideKeyframe.next = padding;
            padding.prev = this.leadingSlideKeyframe;
            this.leadingSlideKeyframe = padding;
            this.chainLength++;
        }
    }

    buildCarouselSlides(slideElements: HTMLDivElement[]) {
        if (this.rootKeyframe === undefined) {
            throw new Error("Root Keyframe not defined");
        }

        const extraPadding = slideElements.length - this.chainLength;
        if (extraPadding > 0) {
            this.addPadding(extraPadding);
        }
        this.leadingSlideKeyframe!.next = this.rootKeyframe;
        this.rootKeyframe.prev = this.leadingSlideKeyframe!;

        let keyframes = this.rootKeyframe;
        const carouselSlides: CarouselSlideElement[] = [];
        for (let i = 0; i < slideElements.length; i++) {
            const offset = (i + this.controllerOptions.primaryKeyframeOffset) % slideElements.length;
            carouselSlides.push(new CarouselSlideElement(slideElements[offset], keyframes));
            keyframes = keyframes.prev!;
        }

        return carouselSlides;
    }

    get length() {
        return this.chainLength;
    }
}

export class CarouselAnimationController {
    controllerOptions: ControllerOptions;
    currentOffset: number = 0;
    targetOffset: number = 0;

    private slides: CarouselSlideElement[] = [];

    isPlaying: boolean = false;
    onOffsetChange?: (offset: number) => void;

    constructor(slides: CarouselSlideElement[], controllerOptions: ControllerOptions) {
        this.slides = slides;
        this.controllerOptions = controllerOptions;
    }

    setOffset(offset: number | ((offset: number) => number)) {
        if (this.isPlaying) {
            return;
        }

        const newOffset = typeof offset === "function" ? offset(this.targetOffset) : offset;

        if (newOffset == this.targetOffset) {
            return;
        } else {
            this.targetOffset = newOffset;

            this.isPlaying = true;
            this.animateSlides().then(() => {
                this.isPlaying = false;
            });
        }
    }

    grabController() {
        let slideOffset = 0;
        let currentShift = 0;
        const dragTo = (shift: number) => {
            let direction: "next" | "prev" = currentShift < 0 ? "next" : "prev";
            currentShift = shift - slideOffset;

            console.log(currentShift);
            if (currentShift >= 1) {
                this.slides.forEach((slide) => {
                    slide.setCurrentKeyframe("prev");
                });
                this.currentOffset++;
                this.targetOffset++;
                slideOffset++;
            } else if (currentShift <= -1) {
                this.slides.forEach((slide) => {
                    slide.setCurrentKeyframe("next");
                });
                this.currentOffset--;
                this.targetOffset--;
                slideOffset--;
            }

            this.slides.forEach((slide) => {
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

        let onRelease = () => {};
        const setReleaseCallback = (onReleaseCallback: () => void) => {
            onRelease = onReleaseCallback;
        };

        //returns to original position if shift is less than the absolute value of 0.5.
        //otherwise shifts to the new position.
        const release = () => {
            this.slides.forEach((slide) => {
                if (Math.abs(currentShift) < 0.5) {
                    slide.animation.playbackRate = -1;
                }
                slide
                    .release()
                    .then(() => {
                        slide.animation.playbackRate = 1;
                    })
                    .then(() => {
                        onRelease();
                    });
            });
        };

        return {
            shiftTo: dragTo,
            release,
            setReleaseCallback,
            slideOffset,
        };
    }

    animateSlides(): Promise<void> {
        if (this.currentOffset == this.targetOffset) {
            return Promise.resolve();
        }

        const direction = this.currentOffset < this.targetOffset ? "next" : "prev";
        const difference = Math.abs(this.targetOffset - this.currentOffset);

        return Promise.allSettled(
            this.slides.map((slide) => {
                return slide.move(direction, (option) => {
                    return {
                        ...option,
                        duration: (option.duration as number) / Math.pow(difference, 1.2),
                        easing: difference == 1 ? "cubic-bezier(0.22, 1, 0.36, 1)" : "linear",
                    };
                });
            }),
        ).then(() => {
            if (this.currentOffset < this.targetOffset) {
                this.currentOffset++;
            } else {
                this.currentOffset--;
            }
            if (this.onOffsetChange) this.onOffsetChange(this.currentOffset);

            return this.animateSlides();
        });
    }
}

type SlideDirection = "next" | "prev";

const defaultKeyframeEffectOptions: KeyframeEffectOptions = {
    duration: 400,
    fill: "forwards",
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
};

class CarouselSlideElement {
    element: HTMLDivElement;
    animation: Animation = new Animation(null, document.timeline);
    currentKeyframe: SlideKeyframe;
    currentAnimationFrames: Keyframe[] = [];
    currentDirection?: SlideDirection;
    keyframeOption?: KeyframeAnimationOptions;
    constructor(element: HTMLDivElement, initialKeyframe: SlideKeyframe, keyframeOption?: KeyframeAnimationOptions) {
        this.element = element;
        this.currentKeyframe = initialKeyframe;
        this.animation.effect = new KeyframeEffect(element, [initialKeyframe.keyframe], {
            fill: "forwards",
        });
        this.animation.finish();
        this.keyframeOption = keyframeOption;
    }

    setKeyframe(direction: SlideDirection) {
        if (this.currentDirection == direction) return;
        this.currentDirection = direction;

        this.currentAnimationFrames =
            direction == "next"
                ? [this.currentKeyframe.keyframe, this.currentKeyframe.next?.keyframe!]
                : [this.currentKeyframe.keyframe, this.currentKeyframe.prev?.keyframe!];
    }

    setCurrentKeyframe(direction: SlideDirection) {
        this.currentKeyframe = direction == "next" ? this.currentKeyframe.next! : this.currentKeyframe.prev!;
        this.currentDirection = undefined;
        this.animation.effect = new KeyframeEffect(this.element, [this.currentKeyframe.keyframe], {
            ...this.keyframeOption,
            fill: "forwards",
        });
        this.animation.finish();
    }

    move(
        direction: SlideDirection,
        options?: KeyframeEffectOptions | ((option: Required<KeyframeEffectOptions>) => KeyframeAnimationOptions),
    ) {
        this.setKeyframe(direction);

        const computedOptions = (() => {
            const baseOption = this.keyframeOption || defaultKeyframeEffectOptions;

            if (!options) return baseOption;

            if (typeof options === "function") {
                return options(baseOption as Required<KeyframeEffectOptions>);
            }

            return options;
        })();
        this.animation.cancel();
        this.animation.effect = new KeyframeEffect(this.element, this.currentAnimationFrames, computedOptions);
        this.animation.play();
        return this.animation.finished.then(() => {
            this.setCurrentKeyframe(direction);
        });
    }

    drag(
        amount: number,
        options?: KeyframeEffectOptions | ((option: Required<KeyframeEffectOptions>) => KeyframeAnimationOptions),
    ) {
        const computedOptions = (() => {
            const baseOption = this.keyframeOption || defaultKeyframeEffectOptions;

            if (!options) return baseOption;

            if (typeof options === "function") {
                return options(baseOption as Required<KeyframeEffectOptions>);
            }

            return options;
        })();

        this.animation.effect = new KeyframeEffect(this.element, this.currentAnimationFrames, computedOptions);
        this.animation.pause();
        const duration = this.animation.effect?.getComputedTiming().duration;

        if (typeof duration === "number") {
            this.animation.currentTime = duration * amount;
        }
    }

    release() {
        this.animation.play();
        return this.animation.finished;
    }

    //when react components rerender, the elements moves back to natural position, this places them back to the correct location
    reposition() {
        if (this.animation.playState === "running") return;
        this.animation.effect = new KeyframeEffect(this.element, [this.currentKeyframe.keyframe], {
            fill: "forwards",
        });
        this.animation.finish();
    }
}

export { CarouselSlideElement };
