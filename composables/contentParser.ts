export default function contentParser(content: string = "") {
  const config = useRuntimeConfig();

  const convertedContent = {
    content: new DOMParser().parseFromString(content, "text/html"),
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
