import { useState, useEffect } from "react";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import "prismjs/themes/prism-tomorrow.css";
import axios from "axios";
import "./App.css";
import Markdown from "react-markdown"
import rehypeHighlights from "rehype-highlight"
import "highlight.js/styles/github-dark-dimmed.css"




function App() {
  const [ count, setCount ] = useState(0)
  const [loading, setLoading] = useState("")

  const [ code, setCode ] = useState(` function sum() {
  return 1 + 1
}`)

  const [ review, setReview ] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

async function reviewCode() {
  try {
    setLoading(true)
    const response = await axios.post("http://localhost:5000/ai/get-review", { code });
    setReview(response.data.review);
    console.log(response.data.review);
  } catch (err) {
    console.log("Error:", err.response?.data || err);
  }finally {
    setLoading(false)
  }
}

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div
            onClick={reviewCode}
          
            className="review">Review</div>
        </div>
        <div className="right">
  {loading ? (
    <div className="loading-text">Reviewing… ⏳</div>
  ) : (
    <Markdown rehypePlugins={[rehypeHighlights]}>
      {review}
    </Markdown>
  )}
</div>

      </main>
    </>
  )
}



export default App;
