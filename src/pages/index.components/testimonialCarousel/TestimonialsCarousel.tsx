import styles from "./testimonialsCarousels.module.css";

import { Carousel, CarouselSlide } from "../../../components/carousel";
import { useContext, type Ref } from "react";
import { CarouselContext } from "../../../components/carousel/_carouselContext/carouselContext";
import { CarouselAnimation } from "../../../components/carousel/carousel.classes";
import Slide from "./Slide";

const slideAnimation = new CarouselAnimation({
    primaryKeyframeOffset: 2,
    wrap: "wrap",
});
slideAnimation
    .addKeyframe("stage-bottom", {
        opacity: "0%",
        transform: "translateX(220%)",
        zIndex: 1,
    })
    .addKeyframe("appear-bottom", {
        transform: "translateX(110%)",
        zIndex: 2,
    })
    .addKeyframe("enter-right", {
        zIndex: 3,
    })
    .addKeyframe("appear-top", {
        transform: "translateX(-110%)",
        zIndex: 2,
    })
    .addKeyframe("stage-top", {
        opacity: "0%",
        transform: "translateX(-220%)",
        zIndex: 1,
    });

const TestimonialCarousel: React.FC = () => {
    return (
        <div className={styles.content}>
            <Carousel after={() => <ButtonRow />} className={styles.carousel} slideAnimation={slideAnimation}>
                <Slide
                    name={"Scott Camilleri"}
                    text={`Over the course of several visits to the doctor's office, 
                        I have consistently experienced exceptional care from Dr. Roberts. 
                        She demonstrates a genuine concern for her patients, making each interaction feel personal and compassionate.`}
                    link={"https://maps.app.goo.gl/TbQ6AUZsUJxTrWXx8"}
                />
                <Slide
                    name={"JF Angile"}
                    text={`
                        Excellent all across the board-- medical techs are professional and thorough.
                        Front desk staff are attentive and courteous. Dr. Roberts takes the time to explain and answer EVERY question and concern.  
                        Most important of all my vision is 100% better thanks to Dr. Roberts.
                        `}
                    link={"https://maps.app.goo.gl/twFqHyDFf1d9WDXk9"}
                />
                <Slide
                    name={"E M"}
                    text={`Dr. Roberts was super helpful and quick with identifying the problem with my grandfather's eyesight. 
                        She was able to schedule a cataract surgery very quickly and did a great job with restoring his sight.`}
                    link={"https://maps.app.goo.gl/u3NKXAkWJKpnpk1BA"}
                />
                <Slide
                    name={"Daniel Lau"}
                    text={`I want to express my sincere appreciation to Dr. Roberts for taking care of my eyes for more than 10 years from cataract surgery.
                        Her kind and warm personality give me full confidence to face the surgery. After Dr. Roberts professional love and care, I can now see and walk with confidence. 
                        It's all because of the great job of Dr. Roberts giving me a brand new perspective on life.`}
                    link={"https://maps.app.goo.gl/326onLguwUCQFuc78"}
                />
                <Slide
                    name={"Janice Kao"}
                    text={`Dr. Roberts was very professional and took the time to explain everything during my visit. 
                        The clinic can seems busy at times, and this is because she is very skillful doctor who is also good at doing surgeries!
                        She is a very informative and knowledgeable doctor who genuinely cares about you. 
                        I will continue to see her for my regular visit.`}
                    link={"https://maps.app.goo.gl/SSH9z2xBGkQWWGnA9"}
                />
                <Slide
                    name={"Wei Chen"}
                    text={`Dr. Bingjing Roberts has always been good to me and explains things very clearly and thoroughly. 
                        She always checks in with me at the end of my visits to be sure that everything went well and is always very professional.
                        She genuinely cares about her patients is always friendly and extremely knowledgeable. 
                        I would recommend her to anyone who is looking for a new doctor.
                        `}
                    link={"https://maps.app.goo.gl/ixnDctPymqgRMoZL7"}
                />
                <Slide
                    name={"Robert Chen"}
                    text={`I am deeply grateful to my ophthalmologist for her exceptional care in treating my uveiti on three separate occasions. 
                        She is also incredibly responsible and patient, always conducting thorough follow-up exams to ensure the inflammation is completely under control. 
                        I truly feel fortunate to have found such a trustworthy and dependable doctor.`}
                    link={"https://maps.app.goo.gl/7cjv3c3MvSkFqu3P7"}
                />
                <Slide
                    name={"Evan Gao"}
                    text={`Everyone here is friendly, and I was delighted with my experience in this clinic. I always have enough time to explain my issues without being rushed. 
                        The doctors there are very knowledgeable, informative, and skilled. I was well taken care of and will continue to come here for routine eye exams.`}
                    link={"https://maps.app.goo.gl/muujNmWTFma1igcZA"}
                />
                <Slide
                    name={"Naty Kaykav"}
                    text={`I have been going here for the past few years. The staff is so supportive and friendly they make you feel like a part of the family.
                         Dr. Roberts is always kind and thorough, explains my diagnosis and plan of care. In short we are highly satisfied  with their service and I would recommend them to anyone.`}
                    link={"https://maps.app.goo.gl/ZPdufAmqabvoFANY6"}
                />
            </Carousel>
        </div>
    );
};

const ButtonRow = () => {
    const carouselContext = useContext(CarouselContext);
    return (
        <div className={styles.buttonRow}>
            <button
                className={`${styles.button} ${styles.leftButton}`}
                onClick={() => {
                    carouselContext.setOffset((prev) => prev - 1);
                }}
            >
                <svg width="20" height="26" viewBox="1 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.7745 23.3338L4.77454 12.8338L17.7745 2.3338" stroke="#292929" strokeWidth="3" />
                </svg>
            </button>
            <div className={styles.dotContainer}>
                {Array.from({ length: carouselContext.slideCount }).map((_, index) => {
                    return (
                        <button
                            key={index}
                            className={styles.dot}
                            style={{
                                backgroundColor:
                                    carouselContext.offset === index ? "rgb(var(--color-primary))" : "white",
                            }}
                            onClick={() => {
                                carouselContext.setOffset(index);
                            }}
                        ></button>
                    );
                })}
            </div>
            <button
                className={`${styles.button} ${styles.rightButton}`}
                onClick={() => {
                    carouselContext.setOffset((prev) => prev + 1);
                }}
            >
                <svg width="20" height="26" viewBox="-1 0 19 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.88501 23.3338L14.885 12.8338L1.88501 2.3338" stroke="#292929" strokeWidth="3" />
                </svg>
            </button>
        </div>
    );
};

export default TestimonialCarousel;
