const records = [
  {
    title: "Moscow Police Department Investigation Reports",
    category: "Document",
    status: "Public Source",
    date: "",
    source: "Internet Archive",
    url: "https://archive.org/download/kohberger-investigation-documents",
    tags: ["MPD", "police reports", "investigation", "supplements"],
    description: "Source index for publicly available Moscow Police Department investigation reports and supplements."
  },
  {
    title: "MPD Supplements 1–50",
    category: "Document",
    status: "Public Source",
    date: "",
    source: "Internet Archive",
    url: "https://archive.org/download/kohberger-investigation-documents",
    tags: ["MPD", "supplements", "1-50"],
    description: "First indexed group of Moscow Police Department investigation report supplements."
  },
  {
    title: "MPD Supplements 51–100",
    category: "Document",
    status: "Public Source",
    date: "",
    source: "Internet Archive",
    url: "https://archive.org/download/kohberger-investigation-documents",
    tags: ["MPD", "supplements", "51-100"],
    description: "Second indexed group of Moscow Police Department investigation report supplements."
  },
  {
    title: "MPD Supplements 101–150",
    category: "Document",
    status: "Public Source",
    date: "",
    source: "Internet Archive",
    url: "https://archive.org/download/kohberger-investigation-documents",
    tags: ["MPD", "supplements", "101-150"],
    description: "Third indexed group of Moscow Police Department investigation report supplements."
  },
  {
    title: "MPD Supplements 151–200",
    category: "Document",
    status: "Public Source",
    date: "",
    source: "Internet Archive",
    url: "https://archive.org/download/kohberger-investigation-documents",
    tags: ["MPD", "supplements", "151-200"],
    description: "Fourth indexed group of Moscow Police Department investigation report supplements."
  },
  {
    title: "MPD Supplements 201–250",
    category: "Document",
    status: "Public Source",
    date: "",
    source: "Internet Archive",
    url: "https://archive.org/download/kohberger-investigation-documents",
    tags: ["MPD", "supplements", "201-250"],
    description: "Fifth indexed group of Moscow Police Department investigation report supplements."
  },
  {
    title: "MPD Supplements 251–300",
    category: "Document",
    status: "Public Source",
    date: "",
    source: "Internet Archive",
    url: "https://archive.org/download/kohberger-investigation-documents",
    tags: ["MPD", "supplements", "251-300"],
    description: "Sixth indexed group of Moscow Police Department investigation report supplements."
  },
  {
    title: "MPD Supplements 301–314",
    category: "Document",
    status: "Public Source",
    date: "",
    source: "Internet Archive",
    url: "https://archive.org/download/kohberger-investigation-documents",
    tags: ["MPD", "supplements", "301-314"],
    description: "Final indexed group of Moscow Police Department investigation report supplements."
  },
  {
    title: "Court Filings Collection",
    category: "Court Filing",
    status: "Public Source",
    date: "",
    source: "Public records",
    tags: ["court", "filings", "records"],
    description: "Index for publicly available court filings and related legal records."
  },
  {
    title: "Video and Audio Index",
    category: "Video & Audio",
    status: "Unverified",
    date: "",
    source: "Archive index",
    tags: ["video", "audio", "media"],
    description: "Index for source-linked video and audio material. Individual items should be verified against their original source."
  }
];

function toggleNav() {
  const nav = document.getElementById("nav");
  if (!nav) return;

  nav.classList.toggle("open");
  nav.style.display = nav.classList.contains("open") ? "flex" : "";
}

function renderArchive() {
  const q = (document.getElementById("search")?.value || "").toLowerCase().trim();
  const cat = document.getElementById("category")?.value || "";
  const status = document.getElementById("status")?.value || "";

  const found = records.filter(r =>
    (!q || JSON.stringify(r).toLowerCase().includes(q)) &&
    (!cat || r.category === cat) &&
    (!status || r.status === status)
  );

  const el = document.getElementById("archiveGrid");
  if (!el) return;

  el.innerHTML = found.length
    ? found.map(r => `
      <article class="card">
        <span class="pill">${r.category}</span>
        <h3>${r.title}</h3>
        <p>${r.description}</p>
        <div class="small">
          <strong>Status:</strong> ${r.status}<br>
          <strong>Source:</strong> ${r.source}
        </div>
        ${
          r.url
            ? `<p><a href="${r.url}" target="_blank" rel="noopener noreferrer">Open source archive →</a></p>`
            : ""
        }
      </article>
    `).join("")
    : '<div class="empty">No matching archive records yet.</div>';
}

function submitDemo(e) {
  e.preventDefault();

  const message = document.getElementById("submitMessage");
  if (message) message.hidden = false;

  e.target.reset();
}

document.addEventListener("DOMContentLoaded", () => {
  renderArchive();

  document.getElementById("search")?.addEventListener("input", renderArchive);
  document.getElementById("category")?.addEventListener("change", renderArchive);
  document.getElementById("status")?.addEventListener("change", renderArchive);
});
