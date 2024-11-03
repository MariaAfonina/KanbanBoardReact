import { Routes, Route } from "react-router-dom";
import AppContainer from "./AppContainer";
import About from "./components/About/About";
import MainBlock from "./components/Main/MainBlock";
import Form from "./components/Form/Form";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppContainer />}>
        <Route index element={<MainBlock />} />
        <Route path="about" element={<About />} />
        {["task/create", "task/edit/:title"].map((path) => (
          <Route path={path} element={<Form />} key={path} />
        ))}
        <Route
          path="notes"
          element={
            <div className="main-container">There will be your notes!</div>
          }
        />
        <Route
          path="*"
          element={<div className="main-container">Not Found</div>}
        />
      </Route>
    </Routes>
  );
};

export default App;
