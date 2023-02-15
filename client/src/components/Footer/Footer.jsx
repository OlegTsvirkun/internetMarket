import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMainContact } from "../../store/slices/contactSlice";
import { ScheduleList } from "../AdditionalComponents/ScheduleList/ScheduleList";
import { TelList } from "../AdditionalComponents/TelList/TelList";
import { ContentWrapper } from "../UA_Components/ContentWrapper/ContentWrapper";
import styles from "./Footer.module.scss";

export const Footer = ({}) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getMainContact());
	}, []);

	const {
		mainContacts: { tel, email, scheduling, city, address },
	} = useSelector((state) => state?.contacts);
	if (!city) return <></>;
	return (
		<div className={styles.footer}>
			<ContentWrapper className={styles.container}>
				<div className={styles.mainInfo}>
					<div className={styles.workingHours}>
						{scheduling && <ScheduleList schedule={scheduling} />}
					</div>

					<div className={styles.info}>{tel && <TelList tel={tel} />}</div>
					<div className={styles.address}>
						<div>
							<span>e-mail:</span>{" "}
							<a href={"mailto:" + email}>{email && email}</a>
						</div>
						<div>
							<span>Адреса:</span> {address && address}
						</div>
					</div>
				</div>
				<div className={styles.genInfo}>
					{" "}
					© 2023 Інтернет-магазин «MyApp Store» Знак на товари і послуги MyApp
					Store використовується на підставі ліцензійного договору з
					правовласником знака
				</div>
			</ContentWrapper>
		</div>
	);
};
