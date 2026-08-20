import LegalLayout from '../components/LegalLayout';
import { useLanguage } from '../context/LanguageContext';

const Privacy = () => {
  const { t } = useLanguage();

  const sections = [
    { title: t('privacy_intro_title'), text: [t('privacy_intro_text')] },
    { title: t('privacy_data_title'), list: [t('privacy_data_1'), t('privacy_data_2'), t('privacy_data_3'), t('privacy_data_4'), t('privacy_data_5')] },
    { title: t('privacy_use_title'), list: [t('privacy_use_1'), t('privacy_use_2'), t('privacy_use_3'), t('privacy_use_4')] },
    { title: t('privacy_base_title'), text: [t('privacy_base_text')] },
    { title: t('privacy_retention_title'), text: [t('privacy_retention_text')] },
    { title: t('privacy_share_title'), text: [t('privacy_share_text')] },
    { title: t('privacy_cookies_title'), text: [t('privacy_cookies_text')] },
    { title: t('privacy_rights_title'), list: [t('privacy_rights_1'), t('privacy_rights_2'), t('privacy_rights_3'), t('privacy_rights_4')] },
    { title: t('privacy_security_title'), text: [t('privacy_security_text')] },
    { title: t('privacy_contact_title'), text: [t('privacy_contact_text')] },
  ];

  return (
    <LegalLayout
      badge={t('privacy_badge')}
      title={t('privacy_title')}
      title2={t('privacy_title2')}
      subtitle={t('privacy_subtitle')}
      sections={sections}
      updated={t('privacy_updated')}
    />
  );
};

export default Privacy;