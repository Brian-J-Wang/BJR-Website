import styles from "./logo.module.css";

type LogoProps = {
    containerStyle: string;
    logoStyle: string;
    titleStyle: string;
    subtitleStyle: string;
};

const Logo: React.FC<LogoProps> = (props) => {
    const containerStyle = `${props.containerStyle} ${styles.container}`;
    const logoStyle = `${props.logoStyle} ${styles.logo}`;
    const titleStyle = [props.titleStyle, styles.title].join(" ");
    const subtitleStyle = [props.subtitleStyle, styles.subtitle].join(" ");
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
