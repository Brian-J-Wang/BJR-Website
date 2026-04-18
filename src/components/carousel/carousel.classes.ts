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

    build(slideElements: HTMLDivElement[]) {
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
        const carouselSlides: CarouselSlide[] = [];
        for (let i = 0; i < slideElements.length; i++) {
            const offset = (i + this.controllerOptions.primaryKeyframeOffset) % slideElements.length;
            carouselSlides.push(new CarouselSlide(slideElements[offset], keyframes));
            keyframes = keyframes.prev!;
        }

        return new CarouselAnimationController(carouselSlides, this.controllerOptions);
    }

    get length() {
        return this.chainLength;
    }
}

export class CarouselAnimationController {
    controllerOptions: ControllerOptions;

    currentOffset: number = 0;
    targetOffset: number = 0;

    private slides: CarouselSlide[] = [];

    isPlaying: boolean = false;
    onOffsetChange?: (offset: number) => void;

    constructor(slides: CarouselSlide[], controllerOptions: ControllerOptions) {
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
        let currentshift = 0;

        const shiftTo = (shift: number) => {
            let direction: "next" | "prev" = shift < 0 ? "next" : "prev";

            if (shift >= 1) {
                this.slides.forEach((slide) => {
                    slide.currentKeyframe = slide.currentKeyframe.next!;
                });
                this.currentOffset++;
                currentshift = 0;
                return;
            } else if (shift <= -1) {
                this.slides.forEach((slide) => {
                    slide.currentKeyframe = slide.currentKeyframe.prev!;
                });
                this.currentOffset--;
                currentshift = 0;
                return;
            }

            this.slides.forEach((slide) => {
                slide.drag(direction, Math.abs(shift), (option) => {
                    return {
                        ...option,
                        duration: 200,
                        easing: "linear",
                    };
                });
            });

            currentshift = shift;
        };

        //returns to original position if shift is less than the absolute value of 0.5.
        //otherwise shifts to the new position.
        const release = () => {
            this.slides.forEach((slide) => {
                slide.release();
            });
        };

        return {
            shiftTo,
            release,
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

const defaultKeyframeEffectOptions: KeyframeEffectOptions = {
    duration: 400,
    fill: "forwards",
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
};

class CarouselSlide {
    element: HTMLDivElement;
    animation: Animation = new Animation(null, document.timeline);
    currentKeyframe: SlideKeyframe;
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

    move(
        direction: "next" | "prev",
        options?: KeyframeEffectOptions | ((option: Required<KeyframeEffectOptions>) => KeyframeAnimationOptions),
    ) {
        const keyframes =
            direction == "next"
                ? [this.currentKeyframe.keyframe, this.currentKeyframe.next?.keyframe!]
                : [this.currentKeyframe.keyframe, this.currentKeyframe.prev?.keyframe!];

        const computedOptions = (() => {
            const baseOption = this.keyframeOption || defaultKeyframeEffectOptions;

            if (!options) return baseOption;

            if (typeof options === "function") {
                return options(baseOption as Required<KeyframeEffectOptions>);
            }

            return options;
        })();
        this.animation.cancel();
        this.animation.effect = new KeyframeEffect(this.element, keyframes, computedOptions);
        this.animation.play();
        return this.animation.finished.then(() => {
            this.currentKeyframe = direction == "next" ? this.currentKeyframe.next! : this.currentKeyframe.prev!;
        });
    }

    drag(
        direction: "next" | "prev",
        amount: number,
        options?: KeyframeEffectOptions | ((option: Required<KeyframeEffectOptions>) => KeyframeAnimationOptions),
    ) {
        const keyframes =
            direction == "next"
                ? [this.currentKeyframe.keyframe, this.currentKeyframe.next?.keyframe!]
                : [this.currentKeyframe.keyframe, this.currentKeyframe.prev?.keyframe!];

        const computedOptions = (() => {
            const baseOption = this.keyframeOption || defaultKeyframeEffectOptions;

            if (!options) return baseOption;

            if (typeof options === "function") {
                return options(baseOption as Required<KeyframeEffectOptions>);
            }

            return options;
        })();

        this.animation.effect = new KeyframeEffect(this.element, keyframes, computedOptions);
        this.animation.pause();
        const duration = this.animation.effect?.getComputedTiming().duration;

        if (typeof duration === "number") {
            this.animation.currentTime = duration * amount;
        }
    }

    release() {
        const currentPosition =
            ((this.animation.currentTime as number) ?? 1) /
            (this.animation.effect?.getComputedTiming().duration as number);

        if (currentPosition < 0.5) {
            this.animation.playbackRate = -1;
        } else {
            this.animation.playbackRate = 1;
        }
        this.animation.play();
    }
}
