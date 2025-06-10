import type { pageRequest, pageRaw, page, pageParamaters } from "~/types/page";
import type { drupalEntityPath } from "~/types/drupalEntityApi";
import type { componentStatus } from "~/types/componentStatus";

export const referencedPage = ref<page>();
export const pageStatus = ref<componentStatus>({ status: "pending" });

export default async function getPages(pageParamaters: pageParamaters) {
  const config = useRuntimeConfig();
  const languageSettings = useLanguageStore();
  const langCode = languageSettings.active_language;

  const params = new URLSearchParams({
    path: pageParamaters.alias,
  });

  pageStatus.value.status = "pending";

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
      const pagePath: drupalEntityPath = await response.json();

      try {
        const response = await fetch(
          `${config.public.DRUPAL_URL}/${langCode !== "en" ? (langCode + "/").toString() : ""}jsonapi/node/page/${pagePath.entity.uuid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const pageRaw: pageRaw = await response.json();

          const page: page = {
            title: pageRaw.data.attributes.title,
            url: pageRaw.data.attributes.path.alias,
            date_created: new Date(pageRaw.data.attributes.created),
            date_edited: new Date(pageRaw.data.attributes.changed),
            content: pageRaw.data.attributes.body.processed,
            summary: pageRaw.data.attributes.body.summary ?? "",
            field_menu: pageRaw.data.attributes.field_menu ?? "",
          };
          referencedPage.value = page;
          pageStatus.value.status = "OK";
        }
      } catch (error) {
        console.error(error);
        pageStatus.value.status = "error";
      }
    } else {
      pageStatus.value.status = "error";
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
