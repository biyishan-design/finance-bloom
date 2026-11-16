
const article = document.querySelector("#article-content");

if (article) {
  const markdownPath = article.dataset.markdown;

  fetch(markdownPath)
    .then(response => {
      if (!response.ok) {
        throw new Error("找不到文章檔案：" + response.status);
      }
      return response.text();
    })
    .then(markdown => {
      const cleanMarkdown = markdown.replace(
        /^---\s*[\r\n]+[\s\S]*?[\r\n]+---\s*[\r\n]*/,
        ""
      );

      article.innerHTML = marked.parse(cleanMarkdown);
    })
    .catch(error => {
      article.textContent = "文章載入失敗：" + error.message;
      console.error(error);
    });
}
