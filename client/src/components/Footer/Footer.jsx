import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainContact } from "../../store/mainContactSlice";
import { ContentWrapper } from "../ContentWrapper";
import styles from "./Footer.module.scss";

export const Footer = ({}) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getMainContact());
	}, []);

	const {
		contacts: { tel, email, scheduling, city, address },
	} = useSelector((state) => state?.mainContact);
	// if(!city) return <></>
	return (
		<div className={styles.footer}>
			<ContentWrapper className={styles.footer__container}>
				<div className={styles.footer__mainInfo}>
					<div className={styles.footer__workingHours}>
						<span>Час роботи Call-центру:</span>
						{scheduling &&
							Object.keys(scheduling).map((days) => (
								<li key={days} className={styles.footer__days}>
									<span>{days}:</span> <h4>{scheduling[days]}</h4>
								</li>
							))}
					</div>

					<div className={styles.footer__info}>
						<p>
							<span> Контактні телефони:</span>
						</p>
						<ul className={styles.footer__telList}>
							{tel &&
								tel.map((item) => (
									<li key={item} className={styles.footer__telItem}>
										<a href={"tel:"+item}>{item}</a>
									</li>
								))}
						</ul>
					</div>
					<div className={styles.footer__address}>
						<div>
							<span>e-mail:</span> <a  href={"mailto:"+email}>{email && email}</a>
						</div>
						<div>
							<span>Адреса:</span> {address && address}
						</div>
					</div>
				</div>
				<div className={styles.footer__genInfo}>
					{" "}
					© 2023 Інтернет-магазин «MyApp Store» Знак на товари і послуги MyApp Store використовується на підставі ліцензійного договору з правовласником знака
				</div>
			</ContentWrapper>
		</div>
	);
};
