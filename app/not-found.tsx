import Button from "./components/Button";
import Container from "./components/Container";

const NotFound = () => {
  return (
    <section className="four-o-four">
      <Container>
        <div className="four-o-four__content">
          <h1 className="four-o-four__title">That's a 404.</h1>
          <div className="four-o-four__cta">
            <p className="four-o-four__cta-title">Sorry, We can't find the page you are looking for</p>
            <div className="four-o-four__cta-btns">
              <Button href="/">Go Home</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NotFound;
