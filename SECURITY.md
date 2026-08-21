# Security and data handling

These dashboards are static applications. Anything placed in `index.html`, JavaScript files, browser storage, or the deployed GitHub Pages site can be inspected by visitors.

- Do not commit passwords, private employee identifiers, confidential targets, or non-public transaction data.
- Browser-side role checks are presentation controls, not authentication or authorization.
- Use a server-side identity provider and API for production access control.
- Keep public/demo datasets anonymized and clearly labelled.
- Rotate any credential that has previously appeared in public source history; deleting it from the latest file does not remove it from Git history.
- Report suspected exposure privately to the repository owner rather than opening a public issue.
