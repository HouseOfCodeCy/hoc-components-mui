import { ShopConfigurationInterface } from '@houseofcodecy/hoc-utils';
import React from 'react';

interface Props {
	Head: ({ children }: { children: React.ReactNode }) => JSX.Element;
	shopConfiguration: ShopConfigurationInterface;
	title: string;
	content?: string;
}

const HeadMeta = ({ Head, shopConfiguration, title, content }: Props) => {
	return (
		<Head>
			<title>{`${shopConfiguration.shopFullName} - ${title}`}</title>
			<meta
				name='description'
				content={`${content} - ${shopConfiguration.shopDescription}`}
			/>
			<link rel='icon' href={shopConfiguration.favicon} />
		</Head>
	);
};

export default HeadMeta;
