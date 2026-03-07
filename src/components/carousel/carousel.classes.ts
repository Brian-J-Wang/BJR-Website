type ControllerOptions = {
    primaryKeyframeOffset: number;
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
    }

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
            keyframes = keyframes.next!;
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
    constructor(slides: CarouselSlide[], controllerOptions: ControllerOptions) {
        this.slides = slides;
        this.controllerOptions = controllerOptions;
    }

    setOffset(offset: number | ((offset: number) => number)) {
        const newOffset = typeof offset === "function" ? offset(this.targetOffset) : offset;

        if (newOffset == this.targetOffset) {
            return;
        } else {
            this.targetOffset = newOffset;
            this.animateSlides();
        }
    }

    animateSlides() {
        if (this.currentOffset == this.targetOffset) {
            return;
        }

        const animationFinishPromises: Promise<Animation>[] = [];
        //moving right
        if (this.currentOffset < this.targetOffset) {
            this.currentOffset++;
            this.slides.forEach((slide) => {
                slide.moveNext();
            });
        } else {
            this.currentOffset--;
            this.slides.forEach((slide) => {
                slide.movePrev();
            });
        }
    }
}

class CarouselSlide {
    element: HTMLDivElement;
    animation: Animation = new Animation();
    currentKeyframe: SlideKeyframe;
    constructor(element: HTMLDivElement, initialKeyframe: SlideKeyframe) {
        this.element = element;
        this.currentKeyframe = initialKeyframe;
        this.animation.effect = new KeyframeEffect(element, [initialKeyframe.keyframe], {
            duration: 200,
            fill: "forwards",
        });
        this.animation.finish();
    }

    moveNext() {
        const nextKeyframe = this.currentKeyframe.next;
        if (!nextKeyframe) {
            return;
        }

        this.animation.effect = new KeyframeEffect(
            this.element,
            [this.currentKeyframe.keyframe, nextKeyframe.keyframe],
            {
                duration: 200,
                fill: "forwards",
            },
        );
        this.animation.play();
        this.currentKeyframe = nextKeyframe;
    }

    movePrev() {
        const prevKeyframe = this.currentKeyframe.prev;
        if (!prevKeyframe) {
            return;
        }

        this.animation.effect = new KeyframeEffect(
            this.element,
            [this.currentKeyframe.keyframe, prevKeyframe.keyframe],
            {
                duration: 200,
                fill: "forwards",
            },
        );
        this.animation.play();
        this.currentKeyframe = prevKeyframe;
    }
}
