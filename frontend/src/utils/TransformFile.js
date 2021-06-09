
const TransformFile = (url, filename) => {
  let a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";

  a.href = url;
  a.download = filename;
  a.click()
   
  window.URL.revokeObjectURL(url);
}


export default TransformFile;