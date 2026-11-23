window.onload = () => {
  const textarea = document.getElementById("Text");
  const btnExport = document.getElementById("btnExport");
  const btnImport = document.getElementById("btnImport");
  const fileImport = document.getElementById("fileImport");
  const saveIndicator = document.getElementById("saveIndicator");
  const menuBtn = document.getElementById("menuBtn");
  const menuDropdown = document.getElementById("menuDropdown");

  // Language detection
  const lang = (navigator.language || navigator.userLanguage || "en").toLowerCase().startsWith("pl") ? "pl" : "en";

  const t = {
    pl: {
      saving: "Zapisywanie…",
      saved: "Zapisano ✓",
      error: "Błąd!",
      emptyNote: "Notatka jest pusta!",
      exported: "Wyeksportowano ✓",
      imported: "Zaimportowano ✓",
      confirmImport: "To nadpisze aktualną notatkę. Kontynuować?",
      exportTitle: "Eksportuj do pliku .txt",
      importTitle: "Importuj z pliku .txt",
      infoTitle: "info",
      menuLabel: "Menu"
    },
    en: {
      saving: "Saving…",
      saved: "Saved ✓",
      error: "Error!",
      emptyNote: "Note is empty!",
      exported: "Exported ✓",
      imported: "Imported ✓",
      confirmImport: "This will overwrite the current note. Continue?",
      exportTitle: "Export to .txt file",
      importTitle: "Import from .txt file",
      infoTitle: "info",
      menuLabel: "Menu"
    }
  }[lang];

  // Menu toggle
  menuBtn.onclick = () => {
    const expanded = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", !expanded);
    menuDropdown.hidden = expanded;
  };

  // Close menu on click outside
  document.addEventListener("click", (e) => {
    if (!menuBtn.contains(e.target) && !menuDropdown.contains(e.target)) {
      menuBtn.setAttribute("aria-expanded", "false");
      menuDropdown.hidden = true;
    }
  });

  // Close menu on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuDropdown.hidden === false) {
      menuBtn.setAttribute("aria-expanded", "false");
      menuDropdown.hidden = true;
      menuBtn.focus();
    }
  });

  // Set ARIA label for menu button
  menuBtn.setAttribute("aria-label", t.menuLabel);

  // Translate menu items
  document.getElementById("menuInfo").querySelector("b").textContent = t.infoTitle;

  const STORAGE_KEY = "pepNota";

  let saveTimeout = null;

  function showSaveStatus(status, message) {
    saveIndicator.textContent = message;
    saveIndicator.className = "save-indicator " + status;
    if (saveTimeout) clearTimeout(saveTimeout);
    if (status === "saved") {
      saveTimeout = setTimeout(() => {
        saveIndicator.textContent = t.saved;
        saveIndicator.className = "save-indicator";
      }, 2000);
    }
  }

  textarea.value = localStorage.getItem(STORAGE_KEY) || "";

  // Initialize save indicator
  saveIndicator.textContent = t.saved;

  textarea.oninput = () => {
    showSaveStatus("saving", t.saving);
    localStorage.setItem(STORAGE_KEY, textarea.value);
    showSaveStatus("saved", t.saved);
  };

  // Update button titles
  btnExport.title = t.exportTitle;
  btnImport.title = t.importTitle;
  btnExport.textContent = lang === "pl" ? "Eksport" : "Export";
  btnImport.textContent = lang === "pl" ? "Import" : "Import";

  btnExport.onclick = () => {
    const text = textarea.value;
    if (!text.trim()) {
      showSaveStatus("error", t.emptyNote);
      return;
    }
    const date = new Date().toISOString().split("T")[0];
    const filename = `notatnik-${date}.txt`;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    showSaveStatus("saved", t.exported);
  };

  btnImport.onclick = () => fileImport.click();

  fileImport.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target.result;
      if (confirm(t.confirmImport)) {
        textarea.value = content;
        localStorage.setItem(STORAGE_KEY, content);
        showSaveStatus("saved", t.imported);
      }
    };
    reader.readAsText(file);
    fileImport.value = "";
  };
};