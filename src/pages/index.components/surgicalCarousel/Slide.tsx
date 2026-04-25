import styles from "./slide.module.css";

type SlideProps = {
    children: React.ReactNode;
    link?: string;
    index: number;
};

const Slide = ({ children, link, index }: SlideProps) => {
    return (
        <div className={styles.slide}>
            <div className={styles.contentInner}>
                <div className={styles.slideHeader}>
                    <span className={styles.slideNumber}>0{index + 1}</span>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.textBlock}>{children}</div>
                <div className={styles.buttonContainer}>
                    <a href={link ?? "#"} className={styles.button}>
                        <span>Learn More</span>
                        <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6 11L10.6464 6.35355C10.8417 6.15829 10.8417 5.84171 10.6464 5.64645L6 1"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <path d="M1 6H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Slide;
