

const article = document.querySelector("#article-content");

if (article) {
  const markdownPath = article.dataset.markdown;

  fetch(markdownPath)
    .then(response => {
      if (!response.ok) {
        throw new Error("找不到文章檔案");
      }
      return response.text();
    })
    .then(markdown => {
      // 移除文章開頭的 Front Matter
      const cleanMarkdown = markdown.replace(
        /^---\s*[\r\n]+[\s\S]*?[\r\n]+---\s*[\r\n]*/,
        ""
      );

      // 將 Markdown 轉換成 HTML
      const articleBody = cleanMarkdown.replace(/^\s*#\s+.*(?:\r?\n)+/, "");
article.innerHTML = marked.parse(articleBody);
    })
    .catch(error => {
      article.textContent = "文章載入失敗：" + error.message;
      console.error(error);
    });
}
