import React from 'react';
import AuthLayout from '../src/components/layout/AuthLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MainPage from '../src/components/mains/others/baseMain/MainPage';

export default function Home(props) {
	console.log(props);
	return (
		<>
			<AuthLayout className="h-screen overflow-hidden">
				<MainPage />
			</AuthLayout>
		</>
	);
}

export async function getStaticProps({ locale }) {
	const glob = require('glob');
	const allEntries = glob.sync('public/images/main-slider/dinnerIdea/*.jpeg');

	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
			images: allEntries
		}
	};
}
