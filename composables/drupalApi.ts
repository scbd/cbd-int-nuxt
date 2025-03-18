import type { drupalLanguage } from "~/interfaces/drupalLanguages";

export const getDrupalLanguages = async (language: string | null) => { 
    const langCode = language && ['fr', 'es', 'ru', 'zh-hans', 'ar'].includes(language) ? language : '';

    const response = await fetch(`${process.env.DRUPAL_URL}/${langCode}/jsonapi/configurable_language/configurable_language`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
        const data = await response.json();

        const languages = data.data
            .filter((item: { attributes: { locked: boolean; }; }) => item.attributes.locked === false)
            .map((item: { attributes: { drupal_internal__id: string; label: string; direction: string; weight: number; }; }): drupalLanguage => ({
                langCode: item.attributes.drupal_internal__id,
                label: item.attributes.label,
                direction: item.attributes.direction,
                weight: item.attributes.weight
            }))
            .sort((a: drupalLanguage, b: drupalLanguage) => a.weight - b.weight)
            .map(({ weight, ...rest }: drupalLanguage) => rest);
        
        return languages;
    } else {
        throw new Error(`Error: ${response.status}`);
    }
}