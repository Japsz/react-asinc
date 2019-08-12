import React from 'react';
import {Switch, Route} from "react-router-dom";
import Header from "../components/common/header";
import {Container, Col} from "react-bootstrap";
import Episodes from "../components/Episode";
import Characters from "../components/Character";
import Login from "./Login";
import PrivateRoute from "../components/common/privateRoute";
import Home from "./Home";


const Index = () => {
  return (
    <div>
      <Header/>
      <Container>
        <Col md={10}>
          <Switch>
            <PrivateRoute exact path={'/episodes'} component={Episodes} />
            <PrivateRoute exact path={'/characters'} component={Characters} />
            <PrivateRoute exact path={'/'} component={Home} />
            <Route to={'/login'} component={Login}/>
          </Switch>
        </Col>
      </Container>
    </div>
  );
};

export default Index;