function stripHtml(html) {
  const document = new DOMParser().parseFromString(html ?? "", "text/html");
  return document.body.textContent || "Description not available.";
}

export default stripHtml;
