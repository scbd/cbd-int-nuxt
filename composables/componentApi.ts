import type {
  componentRequest,
  componentMeeting,
  componentMeetingRaw,
} from "~/types/components";
import type { componentStatus } from "~/types/componentStatus";
import type { userSettings } from "~/types/userSettings";

export const meetings = ref<componentRequest>({
  numFound: 0,
  start: 0,
  docs: [],
  meetings: [],
});
export const meetings_status = ref<componentStatus>({ status: "pending" });

export default function getComponents() {
  const getMeetings = async (
    rows: number | null,
    field_list: string[] = [
      "startDate_dt",
      "endDate_dt",
      "EVT_CD",
      "title_*_s",
      "url_ss",
      "symbol_s",
      "eventCity_*_s",
      "eventCountry_??_s",
      "status_s",
    ],
    sort: {
      params?: string;
      direction?: string;
    } | null,
    optional: {
      status: boolean;
    } | null
  ) => {
    const config = useRuntimeConfig();

    meetings_status.value.status = "pending";

    /**
     * @param SOLR_QUERY = SOLR_QUERY="https://api.cbddev.xyz/api/v2013/index?q=schema_s:"
     */
    const query = `${config.public.SOLR_QUERY}meeting&fl=${field_list?.toString()}&sort=${sort?.params ?? "abs(ms(startDate_dt,NOW))"}${sort?.direction ?? "abs(ms(startDate_dt,NOW))asc"}&rows=${rows ?? 4}`;

    try {
      const response = await fetch(query, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const meetings_raw: { response: componentRequest } =
          await response.json();

        const data_docs_mapped = meetings_raw.response.docs!.map(
          (raw_data: componentMeetingRaw): componentMeeting => ({
            symbol: raw_data.symbol_s,
            start_date: new Date(raw_data.startDate_dt),
            end_date: new Date(raw_data.endDate_dt),
            url: raw_data.url_ss[0],
            title: {
              ar: raw_data.title_AR_s,
              en: raw_data.title_EN_s,
              es: raw_data.title_ES_s,
              fr: raw_data.title_FR_s,
              ru: raw_data.title_RU_s,
              zh: raw_data.title_ZH_s,
            },
            event_city: {
              ar: raw_data.eventCity_AR_s,
              en: raw_data.eventCity_EN_s,
              es: raw_data.eventCity_ES_s,
              fr: raw_data.eventCity_FR_s,
              ru: raw_data.eventCity_RU_s,
              zh: raw_data.eventCity_ZH_s,
            },
            event_country: {
              ar: raw_data.eventCountry_AR_s,
              en: raw_data.eventCountry_EN_s,
              es: raw_data.eventCountry_ES_s,
              fr: raw_data.eventCountry_FR_s,
              ru: raw_data.eventCountry_RU_s,
              zh: raw_data.eventCountry_ZH_s,
            },
            status: raw_data.status_s,
          })
        );

        const meeting_list: componentRequest = {
          numFound: meetings_raw.response.numFound,
          start: meetings_raw.response.start,
          meetings: data_docs_mapped,
        };

        meetings.value = meeting_list;
        meetings_status.value.status = "OK";
      }
    } catch (error) {
      console.error(error);
      meetings_status.value.status = "error";
    }
  };

  return {
    getMeetings,
  };
}
