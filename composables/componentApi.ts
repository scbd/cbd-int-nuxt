import type { drupalToken } from "~/types/drupalAuth";
import type {
  componentRequest,
  componentGaiaType,
  componentGaiaRequest,
  componentArticleRaw,
  componentArticleCoverImageRaw,
  componentMeetingRaw,
  componentNotificationRaw,
  componentGbfTargetRaw,
  componentStatementRaw,
  componentPortalRaw,
  componentNbsapRaw,
  componentSanitized,
  searchParams,
  availableLanguages,
} from "~/types/components";
import type {
  drupalEntityPath,
  drupalEntitySearchParams,
} from "~/types/drupalEntityApi";
import type { componentStatus } from "~/types/componentStatus";

export const referencedComponents = ref({
  searchResults: <componentSanitized[]>[],
  numFound: 0,
  start: 0,
});
export const searchResultsStatus = ref<componentStatus>({ status: "pending" });

export const referencedArticles = ref({
  general: <componentSanitized[]>[],
  megamenu: <componentSanitized[]>[],
});
export const articlesStatus = ref<componentStatus>({ status: "pending" });
export const referencedMeetings = ref({
  general: <componentSanitized[]>[],
  megamenu: <componentSanitized[]>[],
  numFound: 0,
  start: 0,
});
export const meetingsStatus = ref<componentStatus>({ status: "pending" });
export const referencedNotifications = ref({
  general: <componentSanitized[]>[],
  megamenu: <componentSanitized[]>[],
  numFound: 0,
  start: 0,
});
export const notificationsStatus = ref<componentStatus>({ status: "pending" });
export const referencedGbfTargets = ref<componentSanitized[]>([]);
export const gbfTargetsStatus = ref<componentStatus>({ status: "pending" });
export const referencedStatements = ref({
  general: <componentSanitized[]>[],
  megamenu: <componentSanitized[]>[],
  numFound: 0,
  start: 0,
});
export const statementsStatus = ref<componentStatus>({ status: "pending" });
export const referencedPortals = ref<componentSanitized[]>([]);
export const portalsStatus = ref<componentStatus>({ status: "pending" });
export const referencedNbsaps = ref({
  general: <componentSanitized[]>[],
  numFound: 0,
  start: 0,
});
export const nbsapsStatus = ref<componentStatus>({ status: "pending" });

export default function getComponents() {
  const config = useRuntimeConfig();
  const languageSettings = useLanguageStore();

  const drupalToken = useState<drupalToken>("drupal_token").value;

  const solrURI = "/api/v2013/index?";
  const thesaurusURI = "/api/v2013/thesaurus/domains";

  const getGaiaComponents = async (
    searchParameters: searchParams,
    components: componentGaiaType,
    megamenu = false
  ) => {
    if (components.length > 1) {
      searchResultsStatus.value.status = "pending";
    } else {
      for (const componentType of components) {
        if (componentType === "meeting") {
          meetingsStatus.value.status = "pending";
        } else if (componentType === "notification") {
          notificationsStatus.value.status = "pending";
        } else if (componentType === "statement") {
          statementsStatus.value.status = "pending";
        } else if (componentType === "nbsap") {
          nbsapsStatus.value.status = "pending";
        }
      }
    }

    searchParameters.q +=
      searchParameters.q !== ""
        ? ` AND schema_s:(${components.join(" OR ")})`
        : `schema_s:(${components.join(" OR ")})`;

    searchParameters.sort =
      searchParameters.sort instanceof Object
        ? (Object.entries(searchParameters.sort as Object)
            .map(
              ([subprop, subvalue]): string =>
                `${subprop} ${encodeURIComponent(subvalue)}`
            )
            .join(",") as string)
        : searchParameters.sort;

    const params = Object.entries(searchParameters)
      .map(
        ([prop, value]) =>
          `${encodeURIComponent(prop)}=${encodeURIComponent(value)}`
      )
      .join("&");

    try {
      const response = await fetch(`${config.public.GAIA}${solrURI}${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const componentsRaw: { response: componentGaiaRequest } =
          await response.json();

        const componentsList = componentsRaw.response.docs!.map(
          (
            componentRaw:
              | componentMeetingRaw
              | componentNotificationRaw
              | componentStatementRaw
              | componentNbsapRaw
          ): componentSanitized => ({
            type: componentRaw.schema_s,
            symbol: (
              componentRaw as
                | componentMeetingRaw
                | componentNotificationRaw
                | componentStatementRaw
            ).symbol_s,
            url: componentRaw.url_ss[0],
            date: new Date(
              (componentRaw as componentMeetingRaw).startDate_dt ??
                (
                  componentRaw as
                    | componentNotificationRaw
                    | componentStatementRaw
                ).date_s ??
                (componentRaw as componentNbsapRaw).submittedDate_s
            ),
            title: {
              ar: componentRaw.title_AR_s,
              en: componentRaw.title_EN_s,
              es: componentRaw.title_ES_s,
              fr: componentRaw.title_FR_s,
              ru: componentRaw.title_RU_s,
              "zh-hans": componentRaw.title_ZH_s,
            } as availableLanguages,
            themes: {
              ar: (
                componentRaw as
                  | componentMeetingRaw
                  | componentNotificationRaw
                  | componentStatementRaw
              ).themes_AR_ss,
              en: (
                componentRaw as
                  | componentMeetingRaw
                  | componentNotificationRaw
                  | componentStatementRaw
              ).themes_EN_ss,
              es: (
                componentRaw as
                  | componentMeetingRaw
                  | componentNotificationRaw
                  | componentStatementRaw
              ).themes_ES_ss,
              fr: (
                componentRaw as
                  | componentMeetingRaw
                  | componentNotificationRaw
                  | componentStatementRaw
              ).themes_FR_ss,
              ru: (
                componentRaw as
                  | componentMeetingRaw
                  | componentNotificationRaw
                  | componentStatementRaw
              ).themes_RU_ss,
              "zh-hans": (
                componentRaw as
                  | componentMeetingRaw
                  | componentNotificationRaw
                  | componentStatementRaw
              ).themes_ZH_ss,
            } as availableLanguages,
            status: (componentRaw as componentMeetingRaw).status_s,
            event_city: {
              ar: (componentRaw as componentMeetingRaw).eventCity_AR_s,
              en: (componentRaw as componentMeetingRaw).eventCity_EN_s,
              es: (componentRaw as componentMeetingRaw).eventCity_ES_s,
              fr: (componentRaw as componentMeetingRaw).eventCity_FR_s,
              ru: (componentRaw as componentMeetingRaw).eventCity_RU_s,
              "zh-hans": (componentRaw as componentMeetingRaw).eventCity_ZH_s,
            },
            event_country: {
              ar: (componentRaw as componentMeetingRaw).eventCountry_AR_s,
              en: (componentRaw as componentMeetingRaw).eventCountry_EN_s,
              es: (componentRaw as componentMeetingRaw).eventCountry_ES_s,
              fr: (componentRaw as componentMeetingRaw).eventCountry_FR_s,
              ru: (componentRaw as componentMeetingRaw).eventCountry_RU_s,
              "zh-hans": (componentRaw as componentMeetingRaw)
                .eventCountry_ZH_s,
            },
            date_action: (componentRaw as componentNotificationRaw).actionDate_s
              ? new Date(
                  (componentRaw as componentNotificationRaw)
                    .actionDate_s as string
                )
              : undefined,
            date_deadline: new Date(
              (componentRaw as componentNotificationRaw).deadline_s
            ),
            sender: (componentRaw as componentNotificationRaw).sender_s,
            reference: (componentRaw as componentNotificationRaw).reference_s,
            recipient: (componentRaw as componentNotificationRaw).recipient_ss,
            fulltext: {
              ar: (componentRaw as componentNotificationRaw).fulltext_AR_s,
              en: (componentRaw as componentNotificationRaw).fulltext_EN_s,
              es: (componentRaw as componentNotificationRaw).fulltext_ES_s,
              fr: (componentRaw as componentNotificationRaw).fulltext_FR_s,
              ru: (componentRaw as componentNotificationRaw).fulltext_RU_s,
              "zh-hans": (componentRaw as componentNotificationRaw)
                .fulltext_ZH_s,
            },
            files: JSON.parse(
              (componentRaw as componentNotificationRaw).files_ss?.[0] ?? "{}"
            ),
          })
        );

        if (components.length > 1) {
          referencedComponents.value.searchResults = componentsList;
          referencedComponents.value.numFound = componentsRaw.response.numFound;
          referencedComponents.value.start = componentsRaw.response.start;

          searchResultsStatus.value.status = "OK";
        } else {
          if (components[0] === "meeting") {
            if (!megamenu) {
              referencedMeetings.value.general = componentsList;
              referencedMeetings.value.numFound =
                componentsRaw.response.numFound;
              referencedMeetings.value.start = componentsRaw.response.start;
            } else {
              referencedMeetings.value.megamenu = componentsList;
            }

            meetingsStatus.value.status = "OK";
          } else if (components[0] === "notification") {
            if (!megamenu) {
              referencedNotifications.value.general = componentsList;
              referencedNotifications.value.numFound =
                componentsRaw.response.numFound;
              referencedNotifications.value.start =
                componentsRaw.response.start;
            } else {
              referencedNotifications.value.megamenu = componentsList;
            }
            notificationsStatus.value.status = "OK";
          } else if (components[0] === "statement") {
            if (!megamenu) {
              referencedStatements.value.general = componentsList;
              referencedStatements.value.numFound =
                componentsRaw.response.numFound;
              referencedStatements.value.start = componentsRaw.response.start;
            } else {
              referencedStatements.value.megamenu = componentsList;
            }

            statementsStatus.value.status = "OK";
          } else if (components[0] === "nbsap") {
            referencedNbsaps.value.general = componentsList;
            referencedNbsaps.value.numFound = componentsRaw.response.numFound;
            referencedNbsaps.value.start = componentsRaw.response.start;

            nbsapsStatus.value.status = "OK";
          }
        }

        return componentsList;
      }
    } catch (error) {
      console.error(error);

      if (components.length > 1) {
        searchResultsStatus.value.status = "error";
      } else {
        for (const componentType of components) {
          if (componentType === "meeting") {
            meetingsStatus.value.status = "error";
          } else if (componentType === "notification") {
            notificationsStatus.value.status = "error";
          } else if (componentType === "statement") {
            statementsStatus.value.status = "error";
          } else if (componentType === "nbsap") {
            nbsapsStatus.value.status = "error";
          }
        }
      }
    }
  };

  const getArticles = async (
    searchParameters: drupalEntitySearchParams,
    megamenu = false
  ) => {
    articlesStatus.value.status = "pending";
    const langCode = languageSettings.active_language;

    let uuid = "";

    if (searchParameters.entity === "content-page") {
      const params = `path=${encodeURIComponent([searchParameters.fl].flat().toString())}`;

      try {
        const response = await fetch(
          `${config.public.DRUPAL_URL}/router/translate-path?${params}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const articleResponse: drupalEntityPath = await response.json();
          uuid = articleResponse.entity.uuid;
        } else {
          throw new Error(response.statusText, {
            cause: { url: response.url, statusCode: response.status },
          });
        }
      } catch (error: any) {
        console.error(error);
        throw createError({
          statusCode: error.cause.statusCode,
          statusMessage: error.message,
          cause: error.cause.url,
          fatal: true,
        });
      }
    }

    const params = Object.entries({
      "page[limit]": searchParameters.limit.toString(),
      "filter[status][value]": 1,
      sort: `${searchParameters.sort ? searchParameters.sort : "-created"}`,
    })
      .map(
        ([prop, value]) =>
          `${encodeURIComponent(prop)}=${encodeURIComponent(value)}`
      )
      .join("&");

    try {
      const response = await fetch(
        `${config.public.DRUPAL_URL}/${langCode !== "en" ? (langCode + "/").toString() : ""}jsonapi/node/article${uuid ? "/" + uuid : ""}?${params}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${drupalToken.token_type} ${drupalToken.access_token}`,
          },
        }
      );
      if (response.ok) {
        const articlesRaw: componentRequest = await response.json();

        if ((articlesRaw.data as componentArticleRaw).attributes) {
          articlesRaw.data = [articlesRaw.data as componentArticleRaw];
        }

        const getArticleImage = async (cover_image_url: string) => {
          const response = fetch(cover_image_url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((json) => {
              return json.json();
            })
            .then((data: componentArticleCoverImageRaw) => {
              return data;
            });

          return response;
        };

        const articlesList = (articlesRaw.data as componentArticleRaw[])!.map(
          (rawData: componentArticleRaw): componentSanitized => ({
            type: "article",
            title: rawData.attributes.title,
            url: rawData.attributes.path.alias,
            langcode: rawData.attributes.langcode,
            image_cover: {
              url: rawData.relationships.field_image.links.related.href,
              mime_type: "",
              file_size: 0,
              title: rawData.relationships.field_image.data.meta.title,
              width: rawData.relationships.field_image.data.meta.width,
              height: rawData.relationships.field_image.data.meta.height,
              alt: rawData.relationships.field_image.data.meta.alt,
            },
            date: new Date(rawData.attributes.created),
            date_edited: new Date(rawData.attributes.changed),
            content: rawData.attributes.body.processed,
          })
        );

        for await (const article of articlesList.flat()) {
          if (article.image_cover?.url) {
            try {
              const image_cover = await getArticleImage(
                article.image_cover.url
              );
              article.image_cover.mime_type =
                image_cover.data.attributes.filemime;
              article.image_cover.file_size =
                image_cover.data.attributes.filesize;
              article.image_cover.url = `${config.public.DRUPAL_URL}/${image_cover.data.attributes.uri.url}`;
            } catch (error) {
              console.error(error);
            }
          }
        }

        if (!megamenu) {
          referencedArticles.value.general = articlesList;
        } else {
          referencedArticles.value.megamenu = articlesList;
        }

        articlesStatus.value.status = "OK";

        return articlesList;
      }
    } catch (error) {
      console.error(error);
      articlesStatus.value.status = "error";
    }
  };

  const getGbfTargets = async (searchParameters: drupalEntitySearchParams) => {
    gbfTargetsStatus.value.status = "pending";
    const langCode = languageSettings.active_language;

    try {
      const response = await fetch(
        `${config.public.GAIA}${thesaurusURI}/GBF-TARGETS/terms`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const gbfTargetsRaw: componentGbfTargetRaw[] = await response.json();

        const dataMapped = gbfTargetsRaw.map(
          (rawData: componentGbfTargetRaw): componentSanitized => ({
            type: "GBF Target",
            identifier: rawData.identifier,
            title: rawData.title,
            title_short: rawData.shortTitle,
            description: rawData.description,
            description_long: rawData.longDescription,
            url: `/gbf/targets/${rawData.identifier.replace("GBF-TARGET-", "").replace(/^0/, "")}`,
            date: new Date("now"),
          })
        );

        const gbfTargetsList: componentSanitized[] = dataMapped;

        referencedGbfTargets.value = gbfTargetsList;
        gbfTargetsStatus.value.status = "OK";

        return gbfTargetsList;
      }
    } catch (error) {
      console.error(error);
      gbfTargetsStatus.value.status = "error";
    }
  };

  const getPortals = async () => {
    portalsStatus.value.status = "pending";
    const languageSettings = useLanguageStore();

    const drupalToken = useState<drupalToken>("drupal_token").value;

    try {
      const langCode = languageSettings.active_language;

      const response = await fetch(
        `${config.public.DRUPAL_URL}/${langCode !== "en" ? (langCode + "/").toString() : ""}jsonapi/menu_link_content/cbd-portals`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${drupalToken.token_type} ${drupalToken.access_token}`,
          },
        }
      );

      if (response.ok) {
        const portalsRaw: componentRequest = await response.json();

        const dataMapped = (portalsRaw.data as componentPortalRaw[])!.map(
          (rawData: componentPortalRaw): componentSanitized => ({
            type: "portal",
            title: rawData.attributes.title,
            url: rawData.attributes.link.uri,
            date: new Date(rawData.attributes.revision_created),
            date_edited: new Date(rawData.attributes.changed),
            image: {
              url: `${config.public.DRUPAL_URL}/sites/default/files/${rawData.attributes.link.options.attributes.icon}`,
              alt: rawData.attributes.title,
            },
          })
        );

        const portalsList: componentSanitized[] = dataMapped;

        referencedPortals.value = portalsList;
        portalsStatus.value.status = "OK";

        return portalsList;
      }
    } catch (error) {
      console.error(error);
      portalsStatus.value.status = "error";
    }
  };

  return {
    getGaiaComponents,
    getArticles,
    getGbfTargets,
    getPortals,
  };
}
