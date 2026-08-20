import type { Lang } from '../context/LanguageContext';
import { translations } from '../context/LanguageContext';

const WHATSAPP_NUMBER = '22997238483';

export type WhatsAppContext =
  | { type: 'home_hero' }
  | { type: 'home_cta' }
  | { type: 'navbar_book' }
  | { type: 'footer_social' }
  | { type: 'footer_contact' }
  | { type: 'floating_button' }
  | { type: 'vehicle_book'; vehicleName: string; vehiclePrice: string; vehicleMarque?: string }
  | { type: 'brand_quote'; brandName: string; brandType?: string }
  | { type: 'contact_form'; name: string; email: string; phone: string; subject: string; brand: string; message: string };

export const buildWhatsAppUrl = (context: WhatsAppContext, lang: Lang = 'FR'): string => {
  const t = translations[lang];
  let message = '';

  switch (context.type) {
    case 'home_hero':
      message = t.wa_home_hero;
      break;
    case 'home_cta':
      message = t.wa_home_cta;
      break;
    case 'navbar_book':
      message = t.wa_navbar_book;
      break;
    case 'footer_social':
      message = t.wa_footer_social;
      break;
    case 'footer_contact':
      message = t.wa_footer_contact;
      break;
    case 'floating_button':
      message = t.wa_floating_button;
      break;
    case 'vehicle_book': {
      const marque = context.vehicleMarque ? `${context.vehicleMarque} ` : '';
      message = t.wa_vehicle_book
        .replace('{vehicle}', `${marque}${context.vehicleName}`)
        .replace('{price}', context.vehiclePrice);
      break;
    }
    case 'brand_quote': {
      const type = context.brandType ? ` (${context.brandType})` : '';
      message = t.wa_brand_quote
        .replace('{brand}', context.brandName)
        .replace('{type}', type);
      break;
    }
    case 'contact_form':
      message = t.wa_contact_form
        .replace('{name}', context.name)
        .replace('{email}', context.email)
        .replace('{phone}', context.phone)
        .replace('{subject}', context.subject)
        .replace('{brand}', context.brand)
        .replace('{message}', context.message);
      break;
    default:
      message = t.wa_default;
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};
