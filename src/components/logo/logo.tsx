import styles from "./logo.module.css";

type LogoProps = {
    containerStyle?: string;
    logoStyle?: string;
    titleStyle?: string;
    subtitleStyle?: string;
};

const Logo: React.FC<LogoProps> = (props) => {
    const containerStyle = `${styles.container} ${props.containerStyle} `;
    const logoStyle = `${styles.logo} ${props.logoStyle}`;
    const titleStyle = `${styles.title} ${props.titleStyle}`;
    const subtitleStyle = `${styles.subtitle} ${props.subtitleStyle}`;
    return (
        <div className={containerStyle}>
            <img src="/favicon.svg" className={logoStyle} />
            <div>
                <h1 className={titleStyle}>BingJing Roberts</h1>
                <small className={subtitleStyle}>Ophthalmology</small>
            </div>
        </div>
    );
};

export default Logo;
