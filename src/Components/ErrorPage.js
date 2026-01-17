import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div style={{ textAlign: "center", padding: "60px" }}>
      <h2>404 - Page Not Found</h2>
      <p>Looks like you entered a wrong URL</p>
      <Link to="/">Go Back Home</Link>
    </div>
  );
}

export default ErrorPage;
