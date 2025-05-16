export default function contentParser(content: string = "") {
  const config = useRuntimeConfig();

  // Paragraphs
  content = `<p>${content}</p>`;
  const paragraphs = new RegExp("\\r\\n\\r\\n", "g");
  const urlRegex = new RegExp(
    "^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*",
    "g"
  );
  const fileRegex = new RegExp(
    "^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*([\w-]+)(\.\w+)+(?!.*(\w+)(\.\w+)+)",
    "g"
  );

  const modifiedContent = new DOMParser().parseFromString(
    content.replaceAll(paragraphs, "</p><p>"),
    "text/html"
  );

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
