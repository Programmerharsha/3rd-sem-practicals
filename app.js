// Simple Tab Switcher and Copy Utility

function selectSection(sectionName) {
  const aimlSec = document.getElementById("aiml-section");
  const oscSec = document.getElementById("osc-section");
  const btnAiml = document.getElementById("btn-aiml");
  const btnOsc = document.getElementById("btn-osc");

  if (sectionName === "aiml") {
    aimlSec.classList.add("active");
    oscSec.classList.remove("active");
    btnAiml.classList.add("active");
    btnOsc.classList.remove("active");
  } else {
    oscSec.classList.add("active");
    aimlSec.classList.remove("active");
    btnOsc.classList.add("active");
    btnAiml.classList.remove("active");
  }
}

// Copy code from pre element
function copyCode(btn) {
  // Find the pre block related to this button
  const fileBlock = btn.closest(".file-block") || btn.closest(".program-card");
  const codeElem = fileBlock.querySelector("pre code");
  if (!codeElem) return;

  const textToCopy = codeElem.textContent;

  navigator.clipboard.writeText(textToCopy).then(() => {
    const originalText = btn.textContent;
    btn.textContent = "Copied!";
    btn.classList.add("copied");

    showToast("Code copied to clipboard!");

    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove("copied");
    }, 2000);
  }).catch(() => {
    // Fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      btn.textContent = "Copied!";
      btn.classList.add("copied");
      setTimeout(() => {
        btn.textContent = "Copy Code";
        btn.classList.remove("copied");
      }, 2000);
    } catch (err) {}
    document.body.removeChild(textarea);
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
