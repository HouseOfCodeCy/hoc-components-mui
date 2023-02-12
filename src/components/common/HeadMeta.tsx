import { ConfigurationInterface } from '@houseofcodecy/hoc-utils';
import React from 'react';

interface Props {
	Head: ({ children }: { children: React.ReactNode }) => JSX.Element;
	configuration: ConfigurationInterface;
	title: string;
	content: string;
}

const HeadMeta = ({ Head, configuration, title, content }: Props) => {
	return (
		<Head>
			<title>{`${configuration.shopFullName} - ${title}`}</title>
			<meta
				name='description'
				content={`${content} - ${configuration.shopDescription}`}
			/>
			<link rel='icon' href={configuration.favicon} />
		</Head>
	);
};

export default HeadMeta;
