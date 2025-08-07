export const templates = [
  {
    id: "Blank Document",
    label: "Blank Document",
    logo: "images/blank-document.svg",
    initialContent: `<p></p>`,
  },
  {
    id: "Business letter",
    label: "Business letter",
    logo: "images/business-letter.svg",
    initialContent: `
      <h2>Business Letter</h2>
      <p>Dear [Recipient Name],</p>
      <p>I am writing to [state purpose]...</p>
      <p>Sincerely,<br />[Your Name]</p>
    `,
  },
  {
    id: "Cover letter",
    label: "Cover letter",
    logo: "images/cover-letter.svg",
    initialContent: `
      <h2>Cover Letter</h2>
      <p>Dear Hiring Manager,</p>
      <p>I am excited to apply for the [Job Title] position at [Company Name]...</p>
      <p>Best regards,<br />[Your Name]</p>
    `,
  },
  {
    id: "Letter",
    label: "Letter",
    logo: "images/letter.svg",
    initialContent: `
      <h2>Letter</h2>
      <p>Dear [Recipient],</p>
      <p>I hope this message finds you well...</p>
      <p>Warm wishes,<br />[Your Name]</p>
    `,
  },
  {
    id: "Project Proposal",
    label: "Project Proposal",
    logo: "images/letter.svg",
    initialContent: `
      <h2>Project Proposal</h2>
      <p><strong>Project Title:</strong> [Title]</p>
      <p><strong>Objective:</strong> [State the objective]</p>
      <p><strong>Scope:</strong> [Describe the scope]</p>
      <p><strong>Timeline:</strong> [Provide timeline]</p>
    `,
  },
  {
    id: "Resume",
    label: "Resume",
    logo: "images/resume.svg",
    initialContent: `
      <h2>[Your Name]</h2>
      <p><strong>Email:</strong> your.email@example.com</p>
      <h3>Experience</h3>
      <ul>
        <li><strong>Job Title</strong> – Company (Year–Year)</li>
      </ul>
      <h3>Education</h3>
      <ul>
        <li><strong>Degree</strong> – Institution (Year)</li>
      </ul>
    `,
  },
  {
    id: "Software Proposal",
    label: "Software Proposal",
    logo: "images/software-proposal.svg",
    initialContent: `
      <h2>Software Proposal</h2>
      <p><strong>Client:</strong> [Client Name]</p>
      <p><strong>Problem Statement:</strong> [Describe the issue]</p>
      <p><strong>Proposed Solution:</strong> [Describe your solution]</p>
      <p><strong>Technologies:</strong> [List technologies]</p>
    `,
  },
];
