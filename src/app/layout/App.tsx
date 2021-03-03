import "./styles.css";
import NavBar from "../layout/NavBar";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
const App = () => {
  let location = useLocation();
  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={()=> (
          <>
          <Container style={{ marginTop: "7rem" }}>
            <NavBar />
            <Route exact path="/activities" component={ActivityDashboard} />
            <Route path="/activities/:id" component={ActivityDetails} />
            <Route
              path={["/createActivity", "/manage/:id"]}
              key={location.key}
              component={ActivityForm}  />
          </Container>
        </>
        )}
      />
    </>
  );
};

export default observer(App);
