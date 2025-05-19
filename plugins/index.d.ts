declare module "#app" {
  interface PageMeta {
    pageType?:
      | "page"
      | "componentArticle"
      | "componentGbf"
      | "componentMeeting"
      | "componentNotification"
      | "componentStatement"
      | "componentPortal";
  }
}

export {};
