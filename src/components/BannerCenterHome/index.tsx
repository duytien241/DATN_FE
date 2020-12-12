import React from 'react';
import './styles.scss';

export default () => {
  return (
    <div
      className="BannerCenterHome lazy"
      data-bg="url(http://www.ansonika.com/fooyes/img/banner_bg_desktop.jpg)"
      data-was-processed="true"
      style={{ backgroundImage: 'url("http://www.ansonika.com/fooyes/img/banner_bg_desktop.jpg")' }}
    >
      <div
        className="wrapper d-flex align-items-center opacity-mask"
        data-opacity-mask="rgba(0, 0, 0, 0.3)"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      >
        <div>
          <small>TM Food Delivery</small>
          <h3>Nền tảng tìm kiếm và đặt món ăn</h3>
          <p>Thưởng thức một món ăn ngon trong vài phút!</p>
          <a href="grid-listing-filterscol.html" className="btn_1 gradient">
            Trải nghiệm ngay!
          </a>
        </div>
      </div>
    </div>
  );
};
