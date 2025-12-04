import { LanguageCode } from './types';

export interface Translation {
  title: string;
  subtitle: string;
  name: string;
  height: string;
  color: string;
  compare: string;
  analyzing: string;
  aiAnalysis: string;
  difference: string;
  diffShort: string;
  placeholder: string;
  unitCm: string;
  unitFt: string;
  unitIn: string;
  dir: 'ltr' | 'rtl';
  langName: string;
}

export const translations: Record<LanguageCode, Translation> = {
  en: {
    title: "HeightCompare",
    subtitle: "Visual difference tool",
    name: "Name",
    height: "Height",
    color: "Color",
    compare: "Compare Insights",
    analyzing: "Analyzing...",
    aiAnalysis: "AI Analysis",
    difference: "Difference",
    diffShort: "Diff",
    placeholder: "Enter name",
    unitCm: "cm",
    unitFt: "ft",
    unitIn: "in",
    dir: 'ltr',
    langName: 'English'
  },
  fr: {
    title: "HeightCompare",
    subtitle: "Comparateur visuel",
    name: "Nom",
    height: "Taille",
    color: "Couleur",
    compare: "Comparer",
    analyzing: "Analyse...",
    aiAnalysis: "Analyse IA",
    difference: "Différence",
    diffShort: "Diff",
    placeholder: "Entrez le nom",
    unitCm: "cm",
    unitFt: "pi",
    unitIn: "po",
    dir: 'ltr',
    langName: 'Français'
  },
  ar: {
    title: "مقارنة الطول",
    subtitle: "أداة الفرق البصري",
    name: "الاسم",
    height: "الطول",
    color: "اللون",
    compare: "تحليل المقارنة",
    analyzing: "جاري التحليل...",
    aiAnalysis: "تحليل الذكاء الاصطناعي",
    difference: "الفرق",
    diffShort: "الفرق",
    placeholder: "أدخل الاسم",
    unitCm: "سم",
    unitFt: "قدم",
    unitIn: "بوصة",
    dir: 'rtl',
    langName: 'العربية'
  },
  fa: {
    title: "مقایسه قد",
    subtitle: "ابزار تفاوت بصری",
    name: "نام",
    height: "قد",
    color: "رنگ",
    compare: "تحلیل مقایسه",
    analyzing: "در حال تحلیل...",
    aiAnalysis: "تحلیل هوش مصنوعی",
    difference: "تفاوت",
    diffShort: "تفاوت",
    placeholder: "نام را وارد کنید",
    unitCm: "سانتی‌متر",
    unitFt: "فوت",
    unitIn: "اینچ",
    dir: 'rtl',
    langName: 'فارسی'
  },
  ku: {
    title: "بەراوردکردنی باڵا",
    subtitle: "ئامرازی جیاوازی بینراو",
    name: "ناو",
    height: "باڵا",
    color: "ڕەنگ",
    compare: "شیکاری بەراورد",
    analyzing: "شیکارکردن...",
    aiAnalysis: "شیکاری ژیری دەستکرد",
    difference: "جیاوازی",
    diffShort: "جیا",
    placeholder: "ناو بنووسە",
    unitCm: "سم",
    unitFt: "پێ",
    unitIn: "ئینچ",
    dir: 'rtl',
    langName: 'کوردی'
  }
};