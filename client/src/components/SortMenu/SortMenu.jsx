import React, { useCallback, useEffect } from "react";
import { AiOutlineSortAscending } from "react-icons/ai";
import {
	BsSortAlphaDown,
	BsSortAlphaDownAlt,
	BsSortDown,
	BsSortDownAlt,
} from "react-icons/bs";
import { FaSortAmountDown, FaSortAmountDownAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
	Link,
	redirect,
	useHref,
	useLocation,
	useNavigate,
	useParams,
	useSearchParams,
} from "react-router-dom";
import { getCategory } from "../../store/categorySlice";
import styles from "./SortMenu.module.scss";

export const SortMenu = ({}) => {
	const [search, setSearch] = useSearchParams();
	const url = useLocation();
	const navigate = useNavigate();

	const handleSort = (e) => {
		e.preventDefault();
		const type = e.target.dataset.type;
		// if (search.has("q")) {
		// 	console.log(search.get("q"));
		// }
		if (search.has("s")) {
			search.set("s", type);
		} else {
			search.append("s", type);
		}
		// console.log(search.toString());
		navigate(url.pathname + "?" + search.toString());
	};
	return (
		<div className={styles.sortMenu}>
			<ul className={styles.sortMenu__list}>
				<li>
					<Link data-type="az" onClick={(e) => handleSort(e)}>
						<div data-type="az" className={styles.sortMenu__item}>
						За алфавітом A-Z
						</div>

						<BsSortAlphaDown data-type="az" />
					</Link>
				</li>
				<li>
					<Link data-type="za" onClick={(e) => handleSort(e)}>
						<div
							data-type="za"
							className={styles.sortMenu__item}
						>
							За алфавітом Z-A
						</div>
						<BsSortAlphaDownAlt data-type="za" />
					</Link>
				</li>
				<li>
					<Link
						data-type="cheap"
						onClick={(e) => handleSort(e)}
					>
						<div data-type="cheap" className={styles.sortMenu__item}>
							Спочатку дешевші
						</div>
						<BsSortDownAlt data-type="cheap" />
					</Link>
				</li>
				<li>
					<Link data-type="expens" onClick={(e) => handleSort(e)}>
						<div
							data-type="expens"
							className={styles.sortMenu__item}
						>
							Спочатку дорожчі
						</div>
						<BsSortDown data-type="expens" />
					</Link>
				</li>
			</ul>
		</div>
	);
};
