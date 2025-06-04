export default function contentParser(
  content: string = "",
  contentObjectType: string = ""
) {
  const config = useRuntimeConfig();

  const paragraphs = new RegExp("\\r\\n\\r\\n", "g");

  // const urlRegexp = /((https?|ftp):\/\/)[\w\/\-?=%.]+\.[a-zA-Z\/\-&?=%.]+/gi;
  // const emailRegexp =
  //   /[a-z0-9!#$%&'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

  // const urlArray = [...content.matchAll(urlRegexp)];
  // const emailArray = [...content.matchAll(emailRegexp)];

  content = `<p>${content}</p>`.replaceAll(paragraphs, "</p><p>");

  // if (contentObjectType !== "page") {
  //   for (const url of urlArray) {
  //     content = content.replace(
  //       url[0],
  //       `<a href="${url[0]}" target="_blank">${url[0]}</a>`
  //     );
  //   }
  //   for (const email of emailArray) {
  //     content = content.replace(
  //       email[0],
  //       `<a href="mailto:${email[0]}" target="_blank">${email[0]}</a>`
  //     );
  //   }
  // }

  const modifiedContent = new DOMParser().parseFromString(content, "text/html");

  const convertedContent = {
    content: modifiedContent,
  };

  // Columns
  const columnWrappers =
    convertedContent.content.querySelectorAll(".wp-block-columns");

  for (const columnWrapper of columnWrappers) {
    columnWrapper.classList.add("d-flex");
  }

  // Images
  const images = convertedContent.content.querySelectorAll("img");

  for (const image of images) {
    image.setAttribute(
      "src",
      `${config.public.IMAGE_URL}${image.getAttribute("src")}`
    );
  }

  // Acoordion
  const accordionHeaders =
    convertedContent.content.querySelectorAll(".faq-title.h3");

  for (const accordionHeader of accordionHeaders) {
    accordionHeader.classList.remove("faq-title", "h3");
    accordionHeader.classList.add("accordion-header");
  }

  const accordionButtons =
    convertedContent.content.querySelectorAll(".accordion-trigger");

  for (const accordionButton of accordionButtons) {
    accordionButton.classList.remove("accordion-trigger");
    accordionButton.classList.add("accordion-button", "collapsed");
    accordionButton.setAttribute("data-bs-toggle", "collapse");
  }

  const accordionCollapsers =
    convertedContent.content.querySelectorAll(".accordion-panel");

  for (const accordionCollapser of accordionCollapsers) {
    accordionCollapser.classList.remove("accordion-panel");
    accordionCollapser.classList.add("accordion-collapse", "collapse");
  }

  const accordionItems = convertedContent.content.querySelectorAll(".faqitem");

  for (const accordionItem of accordionItems) {
    accordionItem.classList.remove("faqitem");
    accordionItem.classList.add("accordion-item");

    const accordionButton = accordionItem.querySelector(
      ".accordion-button.collapsed"
    );
    const accordionTarget = accordionItem.querySelector(
      ".accordion-collapse.collapse"
    );
    const accordionBody = accordionTarget?.querySelector("div:first-child");
    accordionButton?.setAttribute(
      "data-bs-target",
      `#${accordionTarget!.getAttribute("id") ?? ""}`
    );
    accordionTarget?.removeAttribute("hidden");
    accordionBody?.classList.add("accordion-body");
  }

  return convertedContent.content.body.innerHTML;
}
