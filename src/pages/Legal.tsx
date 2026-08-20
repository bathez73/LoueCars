import LegalLayout from '../components/LegalLayout';
import { useLanguage } from '../context/LanguageContext';

const Legal = () => {
  const { t } = useLanguage();

  const sections = [
    { title: t('legal_publisher_title'), text: [t('legal_publisher_text')] },
    { title: t('legal_director_title'), text: [t('legal_director_text')] },
    { title: t('legal_host_title'), text: [t('legal_host_text')] },
    { title: t('legal_ip_title'), text: [t('legal_ip_text')] },
    { title: t('legal_responsibility_title'), text: [t('legal_responsibility_text')] },
    { title: t('legal_data_title'), text: [t('legal_data_text')] },
    { title: t('legal_cookies_title'), text: [t('legal_cookies_text')] },
    { title: t('legal_law_title'), text: [t('legal_law_text')] },
    { title: t('legal_contact_title'), text: [t('legal_contact_text')] },
  ];

  return (
    <LegalLayout
      badge={t('legal_badge')}
      title={t('legal_title')}
      title2={t('legal_title2')}
      subtitle={t('legal_subtitle')}
      sections={sections}
      updated={t('legal_updated')}
    />
  );
};

export default Legal;