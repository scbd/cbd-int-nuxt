import type { drupalLanguage } from "~/interfaces/drupalLanguages";
import type { drupalToken } from "~/interfaces/drupalAuth";

export const getDrupalLanguages = async (language: string | null) => { 
    const langCode = language && ['fr', 'es', 'ru', 'zh-hans', 'ar'].includes(language) ? language : '';
    const drupalToken = useState<drupalToken>("drupal_token").value;
    
    const config = useRuntimeConfig();    
    try {
        const response = await fetch(`${config.public.DRUPAL_URL}/${langCode}/jsonapi/configurable_language/configurable_language`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${drupalToken.token_type} ${drupalToken.access_token}`
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
            console.error(`API Error: ${response.status}`);
            throw new Error(`Error: ${response.status}`);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}