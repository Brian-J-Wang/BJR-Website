import styles from "./servicesCarousel.module.css";
import { useState } from "react";

const services = [
    {
        title: "Lasik",
        kicker: "Precision Vision Correction",
        description:
            "Experience freedom from glasses and contacts. Our state-of-the-art LASIK technology reshapes your vision with microscopic precision, often resulting in 20/20 vision or better.",
        link: "/lasik",
        image: "/services/lasik.png",
    },
    {
        title: "EVO ICL",
        kicker: "Advanced Lens Implant",
        description:
            "A flexible lens implant that works with your natural eye to correct nearsightedness and astigmatism without removing corneal tissue.",
        link: "/evo-icl",
        image: "/services/evo_icl.png",
    },
    {
        title: "Cataract Surgery",
        kicker: "Restorative Eye Care",
        description:
            "Regain the clarity you've been missing. We replace clouded lenses with advanced intraocular technology, tailored to your specific lifestyle and visual goals.",
        link: "/cataract-surgery",
        image: "/services/cataract.png",
    },
    {
        title: "Toric IOL",
        kicker: "Specialized Astigmatism Care",
        description:
            "Say goodbye to blurry vision caused by astigmatism. Our premium Toric lenses are engineered to correct corneal irregularities, providing sharp, stable vision.",
        link: "/toric-iol",
        image: "/services/toric.png",
    },
    {
        title: "Multifocal Toric IOL",
        kicker: "Full Range Astigmatism Care",
        description:
            "Combining astigmatism correction with multifocal capability, these premium lenses provide a full range of vision from near to far.",
        link: "/multifocal-toric-iol",
        image: "/services/toric.png",
    },
    {
        title: "Multifocal IOL",
        kicker: "Premium Lifestyle Lenses",
        description:
            "Designed to reduce dependency on reading glasses, these advanced lenses provide high-quality vision at multiple distances.",
        link: "/multifocal-iol",
        image: "/services/cataract.png",
    },
];

const ServicesCarousel: React.FC<{}> = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeService = services[activeIndex];

    return (
        <div className={styles.layout}>
            <div className={styles.tabBar}>
                {services.map((service, index) => (
                    <button
                        key={`tab-${service.title}`}
                        className={`${styles.tab} ${activeIndex === index ? styles.activeTab : ""}`}
                        onClick={() => setActiveIndex(index)}
                    >
                        {service.title}
                        {activeIndex === index && <div className={styles.activeLine} />}
                    </button>
                ))}
            </div>

            {/* Content Display Area */}
            <div className={styles.displayArea}>
                <div key={activeService.title} className={styles.contentWrapper}>
                    <div className={styles.imageSection}>
                        <img src={activeService.image} alt={activeService.title} className={styles.activeImage} />
                    </div>

                    <div className={styles.infoSection}>
                        <span className={styles.kicker}>{activeService.kicker}</span>
                        <h3 className={styles.title}>{activeService.title}</h3>
                        <p className={styles.description}>{activeService.description}</p>

                        <a href={activeService.link} className={styles.cta}>
                            <span>Explore Procedure</span>
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M5 12h14m-7-7l7 7-7 7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesCarousel;
