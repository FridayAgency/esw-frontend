import Button from "./components/Button";
import Container from "./components/Container";

const NotFound = () => {
  return (
    <section className="four-o-four">
      <Container>
        <div className="four-o-four__content">
          <h1 className="four-o-four__title">404</h1>

          <p className="four-o-four__cta-title">Sorry! This page cannot be found </p>
          <div className="four-o-four__cta-btns">
            <Button href="/">Go Home</Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NotFound;
