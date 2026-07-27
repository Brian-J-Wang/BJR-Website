import "./embla.css";
import styles from "./testimonialsCarousels.module.css";
import "embla-carousel-react";

import { useCallback, useEffect, useState } from "react";
import Slide from "./Slide";
import useEmblaCarousel from "embla-carousel-react";

type SlideData = {
    name: string;
    text: string;
    link: string;
};

const slides: SlideData[] = [
    {
        name: "Scott Camilleri",
        text: `Over the course of several visits to the doctor's office, I have consistently experienced exceptional care from Dr. Roberts. She demonstrates a genuine concern for her patients, making each interaction feel personal and compassionate.`,
        link: "https://maps.app.goo.gl/TbQ6AUZsUJxTrWXx8",
    },
    {
        name: "JF Angile",
        text: `Excellent all across the board — medical techs are professional and thorough. Front desk staff are attentive and courteous. Dr. Roberts takes the time to explain and answer EVERY question and concern. Most important of all, my vision is 100% better thanks to Dr. Roberts.`,
        link: "https://maps.app.goo.gl/twFqHyDFf1d9WDXk9",
    },
    {
        name: "E M",
        text: `Dr. Roberts was super helpful and quick with identifying the problem with my grandfather's eyesight. She was able to schedule a cataract surgery very quickly and did a great job with restoring his sight.`,
        link: "https://maps.app.goo.gl/u3NKXAkWJKpnpk1BA",
    },
    {
        name: "Daniel Lau",
        text: `I want to express my sincere appreciation to Dr. Roberts for taking care of my eyes for more than 10 years from cataract surgery. Her kind and warm personality give me full confidence to face the surgery. After Dr. Roberts' professional love and care, I can now see and walk with confidence. It's all because of the great job of Dr. Roberts giving me a brand new perspective on life.`,
        link: "https://maps.app.goo.gl/326onLguwUCQFuc78",
    },
    {
        name: "Janice Kao",
        text: `Dr. Roberts was very professional and took the time to explain everything during my visit. The clinic can seem busy at times, and this is because she is a very skillful doctor who is also great at surgeries! She is a very informative and knowledgeable doctor who genuinely cares about you. I will continue to see her for my regular visits.`,
        link: "https://maps.app.goo.gl/SSH9z2xBGkQWWGnA9",
    },
    {
        name: "Wei Chen",
        text: `Dr. Bingjing Roberts has always been good to me and explains things very clearly and thoroughly. She always checks in with me at the end of my visits to be sure that everything went well and is always very professional. She genuinely cares about her patients, is always friendly, and is extremely knowledgeable. I would recommend her to anyone who is looking for a new doctor.`,
        link: "https://maps.app.goo.gl/ixnDctPymqgRMoZL7",
    },
    {
        name: "Robert Chen",
        text: `I am deeply grateful to my ophthalmologist for her exceptional care in treating my uveitis on three separate occasions. She is also incredibly responsible and patient, always conducting thorough follow-up exams to ensure the inflammation is completely under control. I truly feel fortunate to have found such a trustworthy and dependable doctor.`,
        link: "https://maps.app.goo.gl/7cjv3c3MvSkFqu3P7",
    },
    {
        name: "Evan Gao",
        text: `Everyone here is friendly, and I was delighted with my experience in this clinic. I always have enough time to explain my issues without being rushed. The doctors are very knowledgeable, informative, and skilled. I was well taken care of and will continue to come here for routine eye exams.`,
        link: "https://maps.app.goo.gl/muujNmWTFma1igcZA",
    },
    {
        name: "Naty Kaykav",
        text: `I have been going here for the past few years. The staff is so supportive and friendly — they make you feel like a part of the family. Dr. Roberts is always kind and thorough, explains my diagnosis and plan of care. In short, we are highly satisfied with their service and I would recommend them to anyone.`,
        link: "https://maps.app.goo.gl/ZPdufAmqabvoFANY6",
    },
];

const TestimonialCarousel: React.FC = () => {
    const [ref, api] = useEmblaCarousel({
        loop: true,
        align: "center",
    });
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const onSelect = useCallback(() => {
        if (!api) return;
        setSelectedIndex(api.selectedScrollSnap());
    }, [api]);

    useEffect(() => {
        if (!api) return;
        onSelect();
        api.on("select", onSelect);
        api.on("reInit", onSelect);
    }, [api, onSelect]);

    return (
        <div>
            <div className="embla" ref={ref}>
                <div className={`embla__container ${styles.content}`}>
                    {slides.map((slide) => (
                        <Slide
                            key={slide.name}
                            name={slide.name}
                            text={slide.text}
                            link={slide.link}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.navigation}>
                <button className={styles.arrow} onClick={() => api?.scrollPrev()} aria-label="Previous slide">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                <div className={styles.dotContainer}>
                    {api?.scrollSnapList().map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${index === selectedIndex ? styles.dotActive : ""}`}
                            onClick={() => api?.scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                <button className={styles.arrow} onClick={() => api?.scrollNext()} aria-label="Next slide">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default TestimonialCarousel;
