import React from "react";
import '../../assets/css/Dark.css';

const Dark = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div>
      <button onClick={() => setDarkMode(!darkMode)}>✔</button>
    </div>
  );
};

export default Dark;