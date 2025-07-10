export default defineNuxtRouteMiddleware((to, from) => {
  referencedComponents.value.searchResults.length = 0;
  referencedComponents.value.numFound = 0;

  referencedMeetings.value.general.length = 0;
  referencedMeetings.value.numFound = 0;

  referencedNotifications.value.general.length = 0;
  referencedNotifications.value.numFound = 0;

  referencedStatements.value.general.length = 0;
  referencedStatements.value.numFound = 0;
});
