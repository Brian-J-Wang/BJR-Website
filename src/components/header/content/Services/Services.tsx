import styles from "./Services.module.css";

type ServiceOption = {
	name: string;
	blurb: string;
};

const SurgicalServices: ServiceOption[] = [
	{
		name: "LASIK",
		blurb: "Laser vision correction for nearsightedness, farsightedness, and astigmatism.",
	},
	{
		name: "EVO ICL",
		blurb: "Implantable lens for patients who aren't candidates for LASIK.",
	},
	{
		name: "Cataract Surgery",
		blurb: "Removal of the clouded lens with a premium intraocular implant.",
	},
	{
		name: "Toric IOL",
		blurb: "Specialized implant engineered to correct astigmatism post-cataract surgery.",
	},
	{
		name: "Multifocal IOL",
		blurb: "Premium lens reducing dependence on reading glasses at multiple distances.",
	},
	{
		name: "Multifocal Toric IOL",
		blurb: "Full-range vision correction combining astigmatism and multifocal capability.",
	},
];

const EyeServices: ServiceOption[] = [
	{
		name: "Comprehensive Eye Exam",
		blurb: "Full evaluation of vision health, refraction, and ocular structures.",
	},
	{
		name: "Glaucoma Management",
		blurb: "Monitoring and treatment to preserve vision and control eye pressure.",
	},
	{
		name: "Diabetic Eye Care",
		blurb: "Screening and treatment for diabetic retinopathy and related conditions.",
	},
	{
		name: "Dry Eye Treatment",
		blurb: "Personalized therapy to relieve chronic dryness, irritation, and redness.",
	},
	{
		name: "Macular Degeneration",
		blurb: "Diagnosis and ongoing management of age-related macular changes.",
	},
	{
		name: "Contact Lens Fitting",
		blurb: "Precision fitting for soft, rigid, and specialty contact lenses.",
	},
];

type ServicesProps = {
	className?: string;
};

const Services: React.FC<ServicesProps> = (props) => {
	return (
		<div className={`${props.className} ${styles.services}`}>
			<div className={styles.services__group}>
				<h3 className={styles.services__groupName}>
					Surgical Services
				</h3>
				<div className={styles.services__list}>
					{SurgicalServices.map((service, index) => (
						<div key={index} className={styles.services__option}>
							<h4 className={styles.services__optionName}>
								{service.name}
							</h4>
							<small className={styles.services__option_blurb}>
								{service.blurb}
							</small>
						</div>
					))}
				</div>
			</div>
			<div className={styles.services__group}>
				<h3 className={styles.services__groupName}>Eye Services</h3>
				<div className={styles.services__list}>
					{EyeServices.map((service, index) => (
						<div key={index} className={styles.services__option}>
							<h4 className={styles.services__optionName}>
								{service.name}
							</h4>
							<small className={styles.services__option_blurb}>
								{service.blurb}
							</small>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Services;
