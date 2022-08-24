import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import images from "../../assets/Image";
import Reveal, { Fade, Bounce } from "react-awesome-reveal";

const cx = classNames.bind(styles);
function Home() {
  return (
    <div className={cx("main")}>
      <Bounce delay={300}>
        <div className={cx("intro")}>
          <div className={cx("wrapper")}>
            <div className={cx("intro-content")}>
              <h1 className={cx("name")}>What is HC Store?</h1>
              <p className={cx("desc")}>
                The most popular smartphone store in Vietnam is HC Store. The HC
                Store has four locations: Hanoi, Hue, Da Nang, and Ho Chi Minh
                City. Customers that visit HC Store will have a one-of-a-kind
                experience with the world's best phones. Furthermore, HC Store
                is the country's leading destination to purchase and sell
                secondhand phones. Customers have trusted and been delighted
                with the warranty policy at HC shop.
              </p>
              <div className={cx("intro-btn")}>
                <Link to="/product">
                  <button className={cx("btn")}> Go to Shopping </button>
                </Link>
              </div>
            </div>
            <div className={cx("intro-img")}>
              <img src={images.intro} alt="fb"></img>
            </div>
          </div>
        </div>
      </Bounce>
      <Reveal delay={300}>
        <div className={cx("take-care")}>
          <div className={cx("wrapper")}>
            <div className={cx("care-img")}>
              <img src={images.takeCare} alt="Staff-care" />
            </div>
            <div className={cx("care-content")}>
              <h2> The attentiveness of all staff </h2>
              <p>
                The staff at HC Store is methodically trained to satisfy the
                needs of clients. When clients visit the store, they will be
                consulted precisely by each product to satisfy their demands.
                Furthermore, the personnel will eagerly exchange information
                about the store's marketing program and warranty policy. Meeting
                the demands of our consumers is the number one priority for us.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
      <Fade delay={300}>
        <div className={cx("brand")}>
          <div className={cx("content")}>
            <div className={cx("brand-text")}>
              <h2>Phone's brand in HC Store</h2>
            </div>
            <div className={cx("brand-logo")}>
              <img
                className={cx("logo-apple")}
                src={images.logoApple}
                alt="logo-apple"
              ></img>
              <img
                className={cx("logo-samsung")}
                src={images.logoSamsung}
                alt="logo-samsung"
              ></img>
              <img
                className={cx("logo-xiaomi")}
                src={images.logoXiaomi}
                alt="logo-xiaomi"
              ></img>
              <img
                className={cx("logo-huawei")}
                src={images.logoHuawei}
                alt="logo-huawei"
              ></img>
            </div>
          </div>
        </div>
      </Fade>
      <Reveal delay={300}>
        <div className={cx("process")}>
          <div className={cx("content")}>
            <div className={cx("process-heading")}>
              <h2>Process to buy the phone</h2>
            </div>
            <div className={cx("process-step")}>
              <div className={cx("step")}>
                <h4 className={cx("step-title")}>Step 1</h4>
                <p className={cx("step-desc")}>
                  Understanding consumer needs and leading customers on a tour
                  of smartphone devices that meet their needs
                </p>
              </div>
              <div className={cx("step")}>
                <h4 className={cx("step-title")}>Step 2</h4>
                <p className={cx("step-desc")}>
                  Introduce the product's parameters and explain why it is
                  appropriate for the customer's needs. Pay attention to what
                  customers say about the product. If the consumer is
                  dissatisfied, re-learn the customer's requirements and provide
                  the customer alternative phones.
                </p>
              </div>
              <div className={cx("step")}>
                <h4 className={cx("step-title")}>Step 3</h4>
                <p className={cx("step-desc")}>
                  Once the customer is satisfied with the phone, double-check it
                  before handing it over to the customer. Discuss the warranty
                  policy with customers at the HC Store. The current promotions
                  of the store are available.
                </p>
              </div>
              <div className={cx("step")}>
                <h4 className={cx("step-title")}>Step 4</h4>
                <p className={cx("step-desc")}>
                  Customers will be led to the checkout area and asked to
                  examine their phones. You can pay in cash or by a bank
                  transfer. HC Store also offers an online shopping option and a
                  shipper who will deliver to customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default Home;
