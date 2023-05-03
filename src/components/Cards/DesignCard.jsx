import { Link } from "react-router-dom";

export const Card = ({design}) => {
  return (
    <>
      <section className="cards-wrapper">
        <div className="card-grid-space">
          <Link
            className="card"
            to={`/design/${design?.id}`}
            style={{
              "--bg-img": `url('https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&resize_w=1500&url=https://codetheweb.blog/assets/img/posts/links-images-about-file-paths/cover.jpg')`,
            }}
          >
            <div className="info">
              <h1>{design?.NAME}</h1>

              <div className="date">{design?.NAME}</div>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
};
