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
        if (this.rootKeyframe == undefined) {
            this.rootKeyframe = slideKeyframe;
        }

        //links the last leading keyframe with the next one;
        if (this.leadingSlideKeyframe != undefined) {
            this.leadingSlideKeyframe.next = slideKeyframe;
            slideKeyframe.prev = this.leadingSlideKeyframe;
        }
        this.leadingSlideKeyframe = slideKeyframe;
        this.chainLength++;

        return this;
    }

    //extends the animation slides to slideElement length
    addPadding(count: number) {
        if (this.leadingSlideKeyframe == undefined || this.rootKeyframe == undefined) {
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
        if (this.rootKeyframe == undefined) {
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
    private promise: Promise<void> = new Promise((_) => {});

    isPlaying: boolean = false;
    constructor(slides: CarouselSlide[], controllerOptions: ControllerOptions) {
        this.slides = slides;
        this.controllerOptions = controllerOptions;
    }

    private debugtime = Date.now();
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
            this.debugtime = Date.now();
            this.animateSlides().then(() => {
                this.isPlaying = false;
            });
        }
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
                        duration: (option.duration as number) / difference,
                        easing: difference == 1 ? "ease-out" : "linear",
                    };
                });
            }),
        ).then(() => {
            if (this.currentOffset < this.targetOffset) {
                this.currentOffset++;
            } else {
                this.currentOffset--;
            }

            return this.animateSlides();
        });
    }
}

const defaultKeyframeEffectOptions: KeyframeEffectOptions = {
    duration: 400,
    fill: "forwards",
    easing: "ease",
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
            if (!options) {
                if (!this.keyframeOption) {
                    return defaultKeyframeEffectOptions;
                } else {
                    return this.keyframeOption;
                }
            }

            if (typeof options == "function") {
                if (!this.keyframeOption) {
                    return options(defaultKeyframeEffectOptions as Required<KeyframeEffectOptions>);
                } else {
                    return options(this.keyframeOption as Required<KeyframeEffectOptions>);
                }
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
}
