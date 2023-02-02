import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSecondaryContact } from "../../../store/contactSlice";
import { ContentWrapper } from "../../UA_Components/ContentWrapper";
import { Spinner } from "../../UA_Components/Spinner";
import { OptionOrderCard } from "../OptionOrderCard/OptionOrderCard";
import styles from "./DeliverySelf.module.scss";
import { AiOutlineCrown } from "react-icons/ai";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { addOrderDeliveryData } from "../../../store/orderSlice";
export const DeliverySelf = ({}) => {
	const dispatch = useDispatch();
	const [checkedId, setCheckedId] = useState();
	const [currentOffice, setCurrentOffice] = useState({});
	const [contacts, setContacts] = useState([]);
	useEffect(() => {
		dispatch(getSecondaryContact());
		return () => {
			dispatch(addOrderDeliveryData({ office: "", city: "" }));
		};
	}, []);

	const { mainContacts, secondaryContacts } = useSelector(
		(state) => state.contacts,
	);

	// console.log(contacts);
	// console.log(checkedId);

	useEffect(() => {
		setContacts([mainContacts, ...secondaryContacts]);
	}, [mainContacts, secondaryContacts]);
	useEffect(() => {
		if (contacts[0])
			setCurrentOffice(contacts.filter((item) => item._id == checkedId)[0]);
	}, [checkedId]);

	useEffect(() => {
		if (contacts[0]) {
			setCheckedId(contacts[0]?._id);
			dispatch(
				addOrderDeliveryData({
					office: contacts[0]?._id,
					city: contacts[0]?.city,
				}),
			);
		}
	}, [contacts]);

	// console.log(currentOffice);
	if (!contacts[0])
		return (
			<ContentWrapper className={styles.containerLoader}>
				<h1>Загрузка</h1> <Spinner />{" "}
			</ContentWrapper>
		);
	return (
		<div className={styles.deliverySelf}>
			<h1 className={styles.deliverySelfTitle}>
				Ви можете забрати своє замовлення за такми адресами:
			</h1>
			<div className={styles.gridContent}>
				<div className={styles.cardsContainer}>
					{contacts.map((item, index) => (
						<OptionOrderCard
							borderColor="orange"
							checkedColor="rgba(255, 166, 0, 0.062)"
							containerClassName={styles.containerCard}
							className={styles.card}
							key={index}
							checked={checkedId == item._id ? true : false}
							name="office"
							value={item._id}
							onClick={(e) => {
								setCheckedId(item._id);
								dispatch(
									addOrderDeliveryData({ office: item._id, city: item.city }),
								);
							}}
						>
							<div className={styles.headerContainer}>
								<h3 className={styles.title}>{item.name}</h3>
								<div className={styles.iconItem}>
									{item.type == "mainOffice" ? (
										<AiOutlineCrown color="gold" size="45" />
									) : (
										<HiOutlineOfficeBuilding color="var(--blue)" size="45" />
									)}
								</div>
							</div>
							<div className={styles.infoContainer}>
								<span className={styles.titleName}>Місто:</span>
								<h4 className={styles.info}>{item.city}</h4>
								<span className={styles.titleName}>Адреса:</span>

								<h3 className={styles.infoAddress}>{item.address}</h3>
							</div>
						</OptionOrderCard>
					))}
				</div>
				{Object.keys(currentOffice)[0] && (
					<div className={styles.cardsContainer}>
						<section className={styles.section}>
							<p className={styles.titleName}>Телефони:</p>
							<ul>
								{currentOffice?.tel.map((tel) => (
									<li key={tel}>{tel}</li>
								))}
							</ul>
						</section>

						<section className={styles.section}>
							<h3 className={styles.titleName}>Розклад</h3>
							<ul>
								{Object.keys(currentOffice?.scheduling).map((key) => (
									<li key={key}>
										{`${key}: ${currentOffice.scheduling[key]}`}{" "}
									</li>
								))}
							</ul>
						</section>
						<section className={styles.section}>
							<p className={styles.titleName}>Email: </p>
							<p className={styles.titleName}>{currentOffice?.email} </p>
						</section>
					</div>
				)}
			</div>
		</div>
	);
};
