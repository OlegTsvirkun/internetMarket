import React from "react";
import {
	BsSortAlphaDown,
	BsSortAlphaDownAlt,
	BsSortDown,
	BsSortDownAlt,
} from "react-icons/bs";
import {
	Link,
	useLocation,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import styles from "./SortMenu.module.scss";

export const SortMenu = ({}) => {
	const [search] = useSearchParams();
	const url = useLocation();
	const navigate = useNavigate();

	const handleSort = (e) => {
		e.preventDefault();
		const type = e.target.dataset.type;
		if (search.has("s")) {
			search.set("s", type);
		} else {
			search.append("s", type);
		}
		navigate(url.pathname + "?" + search.toString());
	};
	return (
		<div className={styles.sortMenu}>
			<ul className={styles.list}>
				<li>
					<Link data-type="az" onClick={(e) => handleSort(e)}>
						<div data-type="az" className={styles.item}>
						За алфавітом A-Z
						</div>

						<BsSortAlphaDown data-type="az" />
					</Link>
				</li>
				<li>
					<Link data-type="za" onClick={(e) => handleSort(e)}>
						<div
							data-type="za"
							className={styles.item}
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
						<div data-type="cheap" className={styles.item}>
							Спочатку дешевші
						</div>
						<BsSortDownAlt data-type="cheap" />
					</Link>
				</li>
				<li>
					<Link data-type="expens" onClick={(e) => handleSort(e)}>
						<div
							data-type="expens"
							className={styles.item}
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
