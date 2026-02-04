import "server-only";

const dictionaries = {
  ar: () => import("../dictionaries/ar.json").then((module) => module.default),
  fr: () => import("../dictionaries/fr.json").then((module) => module.default),
};

export const getDictionary = async (locale: "ar" | "fr") =>
  dictionaries[locale]?.() ?? dictionaries.fr();
