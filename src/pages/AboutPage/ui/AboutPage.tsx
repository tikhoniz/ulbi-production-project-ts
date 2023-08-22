import { useTranslation } from 'react-i18next';

const AboutPage = () => {
	// передаем первым аргументом название файла с переводом
	const { t } = useTranslation('about');

	return <div>{t('AboutPage')}</div>;
};

export default AboutPage;
