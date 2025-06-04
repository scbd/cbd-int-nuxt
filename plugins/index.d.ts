declare module "#app" {
  interface PageMeta {
    pageType?:
      | "page"
      | "componentArticle"
      | "componentGbf"
      | "componentMeeting"
      | "componentNbsap"
      | "componentNotification"
      | "componentStatement"
      | "componentPortal";
  }
}

export {};
