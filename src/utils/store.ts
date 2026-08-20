import { CONFIG } from './config';
import toyotaLogo from '../assets/marques/toyota.svg';
import nissanLogo from '../assets/marques/nissan.svg';
import suzukiLogo from '../assets/marques/suzuki.svg';
import daciaLogo from '../assets/marques/dacia.svg';
import volkswagenLogo from '../assets/marques/volkswagen.svg';
import citroenLogo from '../assets/marques/citroen.svg';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  brand: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const MESSAGES_KEY = 'louecars_messages';

export const getMessages = (): ContactMessage[] => {
  const data = localStorage.getItem(MESSAGES_KEY);
  return data ? JSON.parse(data) : [];
};

export const addMessage = (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>): ContactMessage => {
  const messages = getMessages();
  const newMsg: ContactMessage = { ...msg, id: Date.now().toString(), createdAt: new Date().toISOString(), read: false };
  localStorage.setItem(MESSAGES_KEY, JSON.stringify([newMsg, ...messages]));
  return newMsg;
};

export const markAsRead = (id: string) => {
  const messages = getMessages().map(m => m.id === id ? { ...m, read: true } : m);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
};

export const deleteMessage = (id: string) => {
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(getMessages().filter(m => m.id !== id)));
};

export interface Marque {
  id: string;
  nom: string;
  logo: string; // base64 ou URL
  type: string;
  description: string;
  createdAt: string;
}

export interface Vehicule {
  id: string;
  marqueId: string;
  nom: string;
  prix: string;
  annee: string;
  carburant: string;
  transmission: string;
  couleur: string;
  description: string;
  image: string; // base64 ou URL
  statut: 'disponible' | 'vendu' | 'réservé';
  createdAt: string;
}

const MARQUES_KEY = 'louecars_marques';
const VEHICULES_KEY = 'louecars_vehicules';

const defaultMarques: Marque[] = [
  { id: '1', nom: 'Toyota', logo: toyotaLogo, type: 'SUV & Minibus', description: 'Fiabilité et polyvalence pour tous vos trajets.', createdAt: new Date().toISOString() },
  { id: '2', nom: 'Nissan', logo: nissanLogo, type: 'SUV & Pick-up', description: 'Robustesse et confort sur toutes les routes.', createdAt: new Date().toISOString() },
  { id: '3', nom: 'Suzuki', logo: suzukiLogo, type: 'SUV & Berlines', description: 'Compacité et économie pour la ville et la route.', createdAt: new Date().toISOString() },
  { id: '4', nom: 'Dacia', logo: daciaLogo, type: 'SUV & 4×4', description: 'Le meilleur rapport qualité-prix du marché.', createdAt: new Date().toISOString() },
  { id: '5', nom: 'Volkswagen', logo: volkswagenLogo, type: 'Berlines', description: 'L\'ingénierie allemande au service de votre confort.', createdAt: new Date().toISOString() },
  { id: '6', nom: 'Citroën', logo: citroenLogo, type: 'SUV & Citadines', description: 'Le confort à la française pour chaque voyage.', createdAt: new Date().toISOString() },
];

const defaultVehicules: Vehicule[] = [
  { id: '1',  marqueId: '1', nom: 'Toyota Corolla Cross', prix: '35 000 / jour', annee: '2023', carburant: 'Essence',  transmission: 'Automatique', couleur: 'Blanc',   description: 'SUV compact confortable, idéal pour la ville et les longues distances.',          image: `${CONFIG.louecarsBaseUrl}/wp-content/uploads/2026/08/louecars-toyota-showroom.jpeg`,                        statut: 'disponible', createdAt: new Date().toISOString() },
  { id: '2',  marqueId: '1', nom: 'Toyota Fortuner',      prix: '50 000 / jour', annee: '2022', carburant: 'Diesel',   transmission: 'Automatique', couleur: 'Gris',    description: 'SUV 4×4 puissant pour tous les terrains, parfait pour les voyages.',             image: `${CONFIG.louecarsBaseUrl}/wp-content/uploads/2023/01/WhatsApp-Image-2023-01-09-at-08.29.46.jpeg`,           statut: 'disponible', createdAt: new Date().toISOString() },
  { id: '3',  marqueId: '1', nom: 'Toyota Prado',         prix: '55 000 / jour', annee: '2022', carburant: 'Diesel',   transmission: 'Automatique', couleur: 'Noir',    description: 'SUV 7 places robuste et spacieux pour voyages en groupe.',                       image: `${CONFIG.louecarsBaseUrl}/wp-content/uploads/2023/01/WhatsApp-Image-2023-01-09-at-08.29.46-1.jpeg`,         statut: 'disponible', createdAt: new Date().toISOString() },
  { id: '4',  marqueId: '1', nom: 'Toyota Hiace',         prix: '60 000 / jour', annee: '2021', carburant: 'Diesel',   transmission: 'Manuelle',    couleur: 'Blanc',   description: 'Minibus 15 places idéal pour les transferts de groupes.',                        image: `${CONFIG.louecarsBaseUrl}/wp-content/uploads/2023/01/WhatsApp-Image-2023-01-09-at-08.29.49-1.jpeg`,         statut: 'disponible', createdAt: new Date().toISOString() },
  { id: '5',  marqueId: '2', nom: 'Nissan Hardbody',      prix: '35 000 / jour', annee: '2022', carburant: 'Diesel',   transmission: 'Manuelle',    couleur: 'Blanc',   description: 'Pick-up polyvalent, parfait pour les terrains difficiles.',                       image: `${CONFIG.louecarsBaseUrl}/wp-content/uploads/2023/01/WhatsApp-Image-2023-01-09-at-08.17.09.jpeg`,           statut: 'disponible', createdAt: new Date().toISOString() },
  { id: '6',  marqueId: '2', nom: 'Nissan X-Trail',       prix: '40 000 / jour', annee: '2022', carburant: 'Essence',  transmission: 'Automatique', couleur: 'Blanc',   description: 'SUV spacieux et confortable pour les voyages en famille.',                        image: `${CONFIG.louecarsBaseUrl}/wp-content/uploads/2023/11/WhatsApp-Image-2023-11-14-at-18.34.26.jpeg`,           statut: 'disponible', createdAt: new Date().toISOString() },
  { id: '7',  marqueId: '3', nom: 'Suzuki Grand Vitara',  prix: '30 000 / jour', annee: '2022', carburant: 'Essence',  transmission: 'Manuelle',    couleur: 'Argenté', description: 'SUV compact robuste, excellent sur route comme hors route.',                      image: `${CONFIG.louecarsBaseUrl}/wp-content/uploads/2023/09/IMG-20230831-WA0005.jpg`,                               statut: 'disponible', createdAt: new Date().toISOString() },
  { id: '8',  marqueId: '3', nom: 'Suzuki Ertiga',        prix: '28 000 / jour', annee: '2023', carburant: 'Essence',  transmission: 'Automatique', couleur: 'Blanc',   description: 'Monospace 7 places économique, idéal pour les familles.',                        image: `${CONFIG.louecarsBaseUrl}/wp-content/uploads/2023/09/IMG-20230831-WA0004.jpg`,                               statut: 'disponible', createdAt: new Date().toISOString() },
  { id: '9',  marqueId: '3', nom: 'Suzuki Vitara',        prix: '28 000 / jour', annee: '2022', carburant: 'Essence',  transmission: 'Automatique', couleur: 'Rouge',   description: 'SUV urbain léger et agile pour vos déplacements quotidiens.',                     image: `${CONFIG.louecarsBaseUrl}/wp-content/uploads/2023/09/IMG-20230831-WA0003.jpg`,                               statut: 'disponible', createdAt: new Date().toISOString() },
  { id: '10', marqueId: '3', nom: 'Suzuki Jimny',         prix: '32 000 / jour', annee: '2024', carburant: 'Essence',  transmission: 'Manuelle',    couleur: 'Vert',    description: 'Petit 4×4 légendaire en version 5 portes, parfait pour l\'aventure.',            image: `${CONFIG.louecarsBaseUrl}/wp-content/uploads/2025/07/IMG-20250515-WA0022-2.jpg`,                             statut: 'disponible', createdAt: new Date().toISOString() },
  { id: '11', marqueId: '4', nom: 'Dacia Duster',         prix: '25 000 / jour', annee: '2022', carburant: 'Essence',  transmission: 'Manuelle',    couleur: 'Gris',    description: 'SUV 4×4 et 4×2 au meilleur rapport qualité-prix pour tous vos trajets.',        image: `${CONFIG.louecarsBaseUrl}/wp-content/uploads/2023/01/WhatsApp-Image-2023-01-09-at-08.16.36.jpeg`,           statut: 'disponible', createdAt: new Date().toISOString() },
  { id: '12', marqueId: '5', nom: 'Volkswagen Polo',      prix: '20 000 / jour', annee: '2022', carburant: 'Essence',  transmission: 'Manuelle',    couleur: 'Blanc',   description: 'Berline compacte économique, idéale pour les déplacements urbains.',              image: `${CONFIG.louecarsBaseUrl}/wp-content/uploads/2023/01/WhatsApp-Image-2023-01-09-at-08.29.48.jpeg`,           statut: 'disponible', createdAt: new Date().toISOString() },
  { id: '13', marqueId: '6', nom: 'Citroën C4 Cactus',   prix: '22 000 / jour', annee: '2021', carburant: 'Essence',  transmission: 'Automatique', couleur: 'Beige',   description: 'Citadine confortable et originale pour vos déplacements en ville.',               image: `${CONFIG.louecarsBaseUrl}/wp-content/uploads/2023/01/WhatsApp-Image-2023-01-09-at-08.29.46-2.jpeg`,         statut: 'disponible', createdAt: new Date().toISOString() },
];

// --- Marques ---
export const getMarques = (): Marque[] => {
  const data = localStorage.getItem(MARQUES_KEY);
  if (!data) {
    localStorage.setItem(MARQUES_KEY, JSON.stringify(defaultMarques));
    return defaultMarques;
  }
  // Réinitialiser si les données sont de l'ancienne base (MIG) ou contiennent d'anciens logos Wikimedia cassés
  const parsed = JSON.parse(data) as Marque[];
  if (parsed.some(m => ['KIA', 'FUSO', 'PIAGGIO', 'ASHOK LEYLAND', 'KAIYI'].includes(m.nom)) || parsed.some(m => m.logo?.includes('upload.wikimedia.org'))) {
    localStorage.setItem(MARQUES_KEY, JSON.stringify(defaultMarques));
    localStorage.setItem(VEHICULES_KEY, JSON.stringify(defaultVehicules));
    return defaultMarques;
  }
  return parsed;
};

export const saveMarques = (marques: Marque[]) => {
  localStorage.setItem(MARQUES_KEY, JSON.stringify(marques));
};

export const addMarque = (marque: Omit<Marque, 'id' | 'createdAt'>): Marque => {
  const marques = getMarques();
  const newMarque: Marque = { ...marque, id: Date.now().toString(), createdAt: new Date().toISOString() };
  saveMarques([...marques, newMarque]);
  return newMarque;
};

export const updateMarque = (id: string, data: Partial<Marque>) => {
  const marques = getMarques().map(m => m.id === id ? { ...m, ...data } : m);
  saveMarques(marques);
};

export const deleteMarque = (id: string) => {
  saveMarques(getMarques().filter(m => m.id !== id));
  saveVehicules(getVehicules().filter(v => v.marqueId !== id));
};

// --- Véhicules ---
export const getVehicules = (): Vehicule[] => {
  const data = localStorage.getItem(VEHICULES_KEY);
  if (!data) {
    localStorage.setItem(VEHICULES_KEY, JSON.stringify(defaultVehicules));
    return defaultVehicules;
  }
  return JSON.parse(data);
};

export const saveVehicules = (vehicules: Vehicule[]) => {
  localStorage.setItem(VEHICULES_KEY, JSON.stringify(vehicules));
};

export const addVehicule = (vehicule: Omit<Vehicule, 'id' | 'createdAt'>): Vehicule => {
  const vehicules = getVehicules();
  const newVehicule: Vehicule = { ...vehicule, id: Date.now().toString(), createdAt: new Date().toISOString() };
  saveVehicules([...vehicules, newVehicule]);
  return newVehicule;
};

export const updateVehicule = (id: string, data: Partial<Vehicule>) => {
  const vehicules = getVehicules().map(v => v.id === id ? { ...v, ...data } : v);
  saveVehicules(vehicules);
};

export const deleteVehicule = (id: string) => {
  saveVehicules(getVehicules().filter(v => v.id !== id));
};
