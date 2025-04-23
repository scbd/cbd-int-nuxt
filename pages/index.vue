<script setup lang="ts">
import getComponents from "~/composables/componentApi";
import type {
  searchParams,
  componentArticle,
  componentMeeting,
  componentNotification,
  componentSanitized,
} from "~/types/components";

const { getArticles, getMeetings, getNotifications } = getComponents();

const articles_params: searchParams = {
  q: "article",
  rows: 10,
};

const meetings_params: searchParams = {
  q: "schema_s:meeting",
  fl: [
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
    params: "abs(ms(startDate_dt,NOW))",
    direction: "asc",
  },
  rows: 4,
};

const notifications_params: searchParams = {
  q: "schema_s:notification",
  fl: [
    "symbol_s",
    "date_s",
    "actionDate_s",
    "deadline_s",
    "sender",
    "reference_s",
    "url_ss",
    "recipient_ss",
    "title_??_s",
    "themes_??_ss",
    "fulltext_??_s",
  ],
  sort: {
    params: "date_s",
    direction: "desc",
  },
  rows: 4,
};

await getArticles(articles_params);
await getMeetings(meetings_params);
await getNotifications(notifications_params);

const sanitizedArticles = articles.value.articles!.map(
  (article: componentArticle): componentSanitized => ({
    type: "article",
    date: article.date_created,
    url: article.url,
    title: article.title,
    date_edited: article.date_edited,
    content: article.content,
    image_cover: article.image_cover,
  })
);

const sanitizedMeetings = meetings.value.meetings!.map(
  (meeting: componentMeeting): componentSanitized => ({
    type: "meeting",
    date: meeting.date_start,
    url: meeting.url,
    title: meeting.title,
    date_end: meeting.date_end,
    symbol: meeting.symbol,
    event_city: meeting.event_city,
    event_country: meeting.event_country,
    status: meeting.status,
  })
);

const sanitizedNotifications = notifications.value.notifications!.map(
  (notification: componentNotification): componentSanitized => ({
    type: "notification",
    date: notification.date,
    url: notification.url,
    title: notification.title,
    date_action: notification.date_action,
    date_deadline: notification.date_deadline,
    sender: notification.sender,
    reference: notification.reference,
    recipient: notification.recipient,
    themes: notification.themes,
    fulltext: notification.fulltext,
  })
);

const santizied_updates: componentSanitized[] = [
  sanitizedArticles,
  sanitizedMeetings,
  sanitizedNotifications,
]
  .flat()
  .sort((a, b) => {
    return b!.date.getTime() - a!.date.getTime();
  })
  .slice(0, 4);

definePageMeta({
  layout: "landing-home",
});
</script>

<template>
  <!-- <HeroSinglefeature /> -->
  <article class="cus-article container-xxl d-flex flex-column">
    <ContentobjectRow object-type="update" :objects="santizied_updates" />
    <ContentobjectRow object-type="meeting" :objects="meetings" />
    <ContentobjectRow object-type="notification" :objects="notifications" />
  </article>
</template>
