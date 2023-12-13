import { Layout } from 'antd';
import { memo } from 'react';

import styles from './footer.module.scss';

function Footer() {
	return (
		<Layout.Footer className={styles.footer}>
			<p>
				© 2007–2022 | Московская область, г. Долгопрудный Лихачевский
				проезд, дом 5Б
			</p>
		</Layout.Footer>
	);
}

export default memo(Footer);
