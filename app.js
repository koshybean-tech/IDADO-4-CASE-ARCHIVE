const records = [
  ["Moscow Police Department Investigation Reports","Document","Public Source","Internet Archive","https://archive.org/download/kohberger-investigation-documents","MPD, police reports, investigation","Publicly available Moscow Police Department investigation reports and supplements."],
  ["MPD Supplements 1–50","Document","Public Source","Internet Archive","https://archive.org/download/kohberger-investigation-documents","MPD, supplements, 1-50","First indexed group of MPD investigation report supplements."],
  ["MPD Supplements 51–100","Document","Public Source","Internet Archive","https://archive.org/download/kohberger-investigation-documents","MPD, supplements, 51-100","Second indexed group of MPD investigation report supplements."],
  ["MPD Supplements 101–150","Document","Public Source","Internet Archive","https://archive.org/download/kohberger-investigation-documents","MPD, supplements, 101-150","Third indexed group of MPD investigation report supplements."],
  ["MPD Supplements 151–200","Document","Public Source","Internet Archive","MPD, supplements, 151-200","Fourth indexed group of MPD investigation report supplements."],
  ["MPD Supplements 201–250","Document","Public Source","Internet Archive","MPD, supplements, 201-250","Fifth indexed group of MPD investigation report supplements."],
  ["MPD Supplements 251–300","Document","Public Source","Internet Archive","MPD, supplements, 251-300","Sixth indexed group of MPD investigation report supplements."],
  ["MPD Supplements 301–314","Document","Public Source","Internet Archive","https://archive.org/download/kohberger-investigation-documents","MPD, supplements, 301-314","Final indexed group of MPD investigation report supplements."],
  ["Court Filings Collection","Court Filing","Public Source","Idaho Judicial Branch","https://icourt.idaho.gov/","court, filings, records","Publicly available Idaho court filings and related legal records."],
  ["Idaho State Police Moscow Investigation Records","Document","Public Source","Idaho State Police","https://isp.idaho.gov/Moscow/","ISP, Moscow, public records","Official Idaho State Police source for released Moscow investigation records."],
  ["Kohberger Criminal Case CR01-24-31665","Court Filing","Public Source","Idaho Judicial Branch","https://icourt.idaho.gov/","CR01-24-31665, court, case","Official court-record source for the criminal case."],
  ["Video and Audio Index","Video & Audio","Unverified","Archive index","","video, audio, media","Index for source-linked video and audio material."]
];

const FORMINIT_FORM_ID = "97eq4qtdj4r";

function toggleNav() {
  const n = document.getElementById("nav");
  if (!n) return;

  n.classList.toggle("open");
  n.style.display = n.classList.contains("open") ? "flex" : "";
}

function renderArchive() {
  const box = document.getElementById("archiveGrid");
  if (!box) return;

  const q = (document.getElementById("search")?.value || "").toLowerCase();
  const cat = document.getElementById("category")?.value || "";
  const status = document.getElementById("status")?.value || "";

  const list = records.filter(r =>
    (!q || r.join(" ").toLowerCase().includes(q)) &&
    (!cat || r[1] === cat) &&
    (!status || r[2] === status)
  );

  box.innerHTML = list.map(r => `
    <article class="card">
      <span class="pill">${r[1]}</span>
      <h3>${r[0]}</h3>
      <p>${r[6]}</p>
      <div class="small">
        <strong>Status:</strong> ${r[2]}<br>
        <strong>Source:</strong> ${r[3]}
      </div>
      ${r[4] ? `<p><a href="${r[4]}" target="_blank" rel="noopener">Open source archive →</a></p>` : ""}
    </article>
  `).join("") || '<div class="empty">No matching archive records yet.</div>';
}

async function submitToForminit(e) {
  e.preventDefault();

  const form = e.target;
  const button = form.querySelector('button[type="submit"]');
  const message = document.getElementById("submitMessage");
  const error = document.getElementById("submitError");
  const file = document.getElementById("submissionFile")?.files?.[0];

  if (message) message.hidden = true;
  if (error) error.hidden = true;

  if (file && file.size > 25 * 1024 * 1024) {
    if (error) {
      error.textContent =
        "That file is larger than 25 MB. Please submit a smaller file.";
      error.hidden = false;
    }
    return;
  }

  button.disabled = true;
  button.textContent = "Uploading…";

  try {
    const formData = new FormData(form);

    const result = await forminit.submit(
      FORMINIT_FORM_ID,
      formData
    );

    if (result.error) {
      throw new Error(result.error.message || "Submission failed.");
    }

    if (message) {
      message.textContent =
        "Got it! Your material was submitted for administrator review.";
      message.hidden = false;
    }

    form.reset();

    console.log(
      "Submission received:",
      result.data?.hashId || result.data
    );

  } catch (err) {
    console.error("Forminit submission error:", err);

    if (error) {
      error.textContent =
        "We couldn't send the submission. Please try again.";
      error.hidden = false;
    }

  } finally {
    button.disabled = false;
    button.textContent = "Send for administrator review";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderArchive();

  document
    .getElementById("search")
    ?.addEventListener("input", renderArchive);

  document
    .getElementById("category")
    ?.addEventListener("change", renderArchive);

  document
    .getElementById("status")
    ?.addEventListener("change", renderArchive);

  document
    .getElementById("submissionForm")
    ?.addEventListener("submit", submitToForminit);
});
