import { Breadcrumb } from 'antd';
import { memo, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { BreadcrumbsVocabulary } from '@/constant/breadcrumbs-vocabulary';

import styles from './breadcrumbs.module.scss';

function Breadcrumbs() {
	const { pathname } = useLocation();

	const pathnames = useMemo(
		() => pathname.split('/').filter((x) => x),
		[pathname],
	);

	const last = useMemo(() => pathnames.at(-1), [pathnames]);

	return (
		<Breadcrumb className={styles.breadcrumbs}>
			{pathnames.map(
				(path) =>
					BreadcrumbsVocabulary[path] && (
						<Breadcrumb.Item key={path}>
							{last === path ? (
								BreadcrumbsVocabulary[path]
							) : (
								<Link to={`/${path}`}>
									{BreadcrumbsVocabulary[path]}
								</Link>
							)}
						</Breadcrumb.Item>
					),
			)}
		</Breadcrumb>
	);
}

export default memo(Breadcrumbs);
