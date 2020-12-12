import React from 'react';
// import { Icon } from 'semantic-ui-react';
import './styles.scss';

export default () => {
  return (
    <div className="shape_element_2">
      <div className="container margin_60_0">
        <div className="row">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-6">
                <div className="box_how">
                  <figure>
                    <img
                      src="http://www.ansonika.com/fooyes/img/how_1.svg"
                      data-src="http://www.ansonika.com/fooyes/img/how_1.svg"
                      alt=""
                      width={150}
                      height={167}
                      className="lazy loaded"
                      data-was-processed="true"
                    />
                  </figure>
                  <h3>Đặt hàng dễ dàng</h3>
                  <p>Đặt các món ăn mà bạn yêu thích chỉ trong giây lắt</p>
                </div>
                <div className="box_how">
                  <figure>
                    <img
                      src="http://www.ansonika.com/fooyes/img/how_2.svg"
                      data-src="http://www.ansonika.com/fooyes/img/how_2.svg"
                      alt=""
                      width={130}
                      height={145}
                      className="lazy loaded"
                      data-was-processed="true"
                    />
                  </figure>
                  <h3>Giao hàng nhanh chóng</h3>
                  <p>Nhận hàng chỉ trong vài phút</p>
                </div>
              </div>
              <div className="col-lg-6 align-self-center">
                <div className="box_how">
                  <figure>
                    <img
                      src="http://www.ansonika.com/fooyes/img/how_3.svg"
                      data-src="http://www.ansonika.com/fooyes/img/how_3.svg"
                      alt=""
                      width={150}
                      height={132}
                      className="lazy loaded"
                      data-was-processed="true"
                    />
                  </figure>
                  <h3>Món ăn ưa thích</h3>
                  <p>Trải nghiệm những món ăn bạn yêu thích</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 offset-lg-1 align-self-center">
            <div className="intro_txt">
              <div className="main_title">
                <span>
                  <em />
                </span>
                <h2>Đặt hàng ngay bây giờ</h2>
              </div>
              <p className="lead">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet libero id nisi euismod, sed porta
                est consectetur deserunt.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p>
                <button className="btn_1 medium gradient pulse_bt mt-2">Đặt hàng ngay</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
