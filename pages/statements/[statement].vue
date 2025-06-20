<script setup lang="ts">
import type {
  availableLanguages,
  componentSanitized,
  searchParams,
} from "~/types/components";

import getComponents from "~/composables/componentApi";

const { getStatements } = getComponents();
const route = useRoute();
const languageSettings = useLanguageStore();
const { t } = useI18n();

const statementsParams: searchParams = {
  q: `schema_s:statement AND symbol_s:${route.params.statement}`,
  fl: ["symbol_s", "date_s", "url_ss", "title_??_s", "themes_??_ss"],
  sort: ["date_s desc"],
  rows: 1,
};

await getStatements(statementsParams);
const fetchedStatement = referencedStatements.value.general[0];

const toStatementsParams: searchParams = {
  q: `schema_s:statement`,
  fl: ["symbol_s", "date_s", "url_ss", "title_??_s", "themes_??_ss"],
  sort: ["date_s desc"],
  rows: 1,
};

const router = useRouter();
router.beforeEach(async (to) => {
  if (to.meta.acceptStatementData) {
    to.meta.statementQuery = toStatementsParams.q;
  }
});

definePageMeta({
  layout: "content",
  pageType: "componentStatement",
});
</script>
<template>
  <article class="cus-article container-xxl d-flex flex-column page-component">
    <ClientOnly>
      <section>
        <h1>
          {{
            (fetchedStatement.title as availableLanguages)?.[
              languageSettings.active_language
            ]
          }}
        </h1>
        <div class="content-object">
          <div class="information">
            <div class="date">
              {{
                Intl.DateTimeFormat(languageSettings.active_language, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(fetchedStatement.date)
              }}
            </div>
            <div class="description">
              {{ fetchedStatement.symbol }}
            </div>
          </div>
          <div class="subjects-recipients">
            <div
              v-if="fetchedStatement.themes?.[languageSettings.active_language]"
              class="recipients"
            >
              <span class="fw-bold"
                >{{ t("components.statements.themes") }}:
              </span>
              <NuxtLink
                v-for="theme of fetchedStatement.themes[
                  languageSettings.active_language
                ]"
                @click="
                  toStatementsParams.q = `${toStatementsParams.q} AND themes_${languageSettings.active_language.slice(0, 2).toUpperCase()}_ss:(*${theme}*)`
                "
                :to="{
                  name: 'statements',
                }"
                class="badge"
              >
                {{ theme }}
              </NuxtLink>
            </div>
          </div>
          <template v-if="fetchedStatement.url">
            <div class="files">
              <div class="files-title">
                {{ t("components.statements.download") }}
              </div>
              <div class="files-available">
                <NuxtLink
                  class="btn"
                  target="_blank"
                  :to="fetchedStatement.url"
                >
                  <img
                    v-show="fetchedStatement.url.includes('.pdf')"
                    src="/images/icons/icon_file-pdf.svg"
                    :alt="t('components.statements.download_pdf')"
                  />
                  <img
                    v-show="fetchedStatement.url.includes('.doc')"
                    src="/images/icons/icon_file-doc.svg"
                    :alt="t('components.statements.download_doc')"
                  />
                </NuxtLink>
              </div>
            </div>
          </template>
        </div>
      </section>
    </ClientOnly>
  </article>
</template>
