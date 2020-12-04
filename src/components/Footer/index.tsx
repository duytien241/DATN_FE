import React from 'react';
import { Button } from 'semantic-ui-react';
import './styles.scss';

export default () => {
  return (
    // <footer className={styles.Footer}>
    //   <div className={styles.FooterTop}></div>
    //   <div className={styles.FooterBottom}>
    //     <span style={{ color: '#999', clear: 'both', display: 'block' }}>
    //       ©2020 TMFood Corporation. Số 96 Định Công - Thanh Xuân - Hà Nội
    //     </span>
    //     <span id="foody-hot-line" style={{ color: '#999', clear: 'both', display: 'block' }}>
    //       Điện thoại: 0337981919 Email: varanenguyen@gmail.vn
    //     </span>
    //     <span style={{ color: '#999', clear: 'both', display: 'block' }}>
    //       Giấy CN ĐKDN số xxxxxxxxxx do Sở Kế hoạch và Đầu tư TP.HCM cấp ngày 11/6/2012, sửa đổi lần thứ 21, ngày
    //       04/10/2019
    //     </span>
    //     <span style={{ color: '#999', clear: 'both', display: 'block' }}>
    //       Giấy phép thiết lập MXH trên mạng số 363/GP-BTTTT do Bộ Thông tin và Truyền thông cấp ngày 30/6/2016 Người
    //       chịu trách nhiệm: Nguyễn Đức Minh.
    //     </span>
    //   </div>
    // </footer>
    <>
      <footer id="colophon" className="site-footer footer-v1" role="contentinfo">
        <div className="wave footer"></div>
        <div className="col-full">
          <div className="footer-social-icons">
            <div className="social-icons list-unstyled">
              <Button circular color="facebook" icon="facebook" size="huge" />
              <Button circular color="twitter" icon="twitter" size="huge" />
              <Button circular color="linkedin" icon="linkedin" size="huge" />
              <Button circular color="google plus" icon="google plus" size="huge" />
            </div>
          </div>
          <div className="footer-logo">
            <a href="https://demo2.chethemes.com/pizzaro/" className="custom-logo-link" rel="home">
              <svg id="pizzaro-logo" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 52.39">
                {' '}
                <path
                  className="cls-1"
                  d="M51.33,16.15A5.61,5.61,0,0,0,56,10.88a4,4,0,0,0-4.67-4,5.38,5.38,0,0,0-4.67,5.22A4.07,4.07,0,0,0,51.33,16.15ZM21.42,3.69C6.1,5.62,0,17.8,0,25.47a16.41,16.41,0,0,0,2.6,8.68l5.62-4.92A11,11,0,0,1,7,24.48c0-5.22,5-13,14.42-14.18,8.17-1,10.5,4.17,10.5,8.48,0,8.21-8.17,14.51-14.42,11.78l3.23-8.35A10.87,10.87,0,0,1,25,16.72l-1.54-4.39c-5.3.67-9,5.19-10.5,9.05L1.17,52.4,9.6,51.34l5.73-15.11C29.59,40.35,40,28.8,40,17.72,40,9.67,34.47,2.05,21.42,3.69ZM197,12.22c-2.17,4-4.77,6.3-7.37,7.06A25.1,25.1,0,0,0,192,9.22c0-6.18-3.55-9.47-10-8.66-8.82,1.11-13.92,9-15.71,15.8-4,7.28-6.48,10.81-7.94,11-0.74.09-2-.6,0.42-6.88l1.48-4a8,8,0,0,0,.64-2.74c0-4-6.52-6.16-8.7-7.81L154,1.49,150.53,0c-2.17,1-5,4.2-5,6.92a4,4,0,0,0,1.64,3c-1.54,3.6-3,6.83-4.19,9.06h0c-3.82,7-7.42,11.22-9.54,11.49-1,.12-1.86-0.57.53-6.89l6.58-17.14-9.92,4.87s-1.17-4.17-6.31-3.52c-6.81.86-11.07,8.78-13.14,15.62-3.48,6.34-6.05,7.74-8,8-2.7.34-4.67-1.38-7.11-1.45l15.54-16.19-2.76-3.33c-5.2,2.63-9.17.46-13.52,1-6.36.8-7.58,6.71-12,15.05h0c-3.61,6.74-6.26,8.19-8.22,8.44-2.7.34-4.67-1.38-7.11-1.45L83.56,17.34,80.81,14c-5.2,2.63-9.17.46-13.52,1-6.36.8-7.58,6.71-12,15.05h0c-3.76,7-7.42,11.22-9.54,11.49-0.9.11-1.86-.51,0.58-6.9l6.52-17.13L44.38,18.6l-6,15.62c-3.87,10.13-.48,13.54,4.35,12.94,6.1-.77,11.4-7.62,15.48-15.33h0c3.45-6.51,4.56-7.93,7-8.24,2.23-.28,4.19.48,5.83,0.6L54.51,41.31l2.76,3.33c5.57-5.28,7.05-.2,13.63-1,6.73-.85,11-7.09,15.43-15.32h0c3.45-6.51,4.56-7.93,7-8.24,2.23-.28,4.19.48,5.83,0.6L82.61,37.77l2.76,3.33c5.57-5.29,7.05-.2,13.63-1,4.39-.55,7.72-3.4,10.74-7.59,0.25,3.46,2.25,6,6,5.49,4.67-.59,8.32-5.47,8.32-5.47s0.69,4.34,6.2,3.64c6.47-.81,11.61-7.59,15.75-15.36h0a93.45,93.45,0,0,0,4.24-9.11c1.43,1,2.6,1.86,2.6,2.92a5.62,5.62,0,0,1-.48,1.93L150.64,21c-3.82,9.91.58,12.45,4.72,11.93s7.48-4.12,10.53-8.89c0.9,4.5,4.34,7,9.93,6.31a16.62,16.62,0,0,0,11.08-6.67c5.41-.25,10.23-4.43,13.1-9.75A3.52,3.52,0,0,0,197,12.22ZM125,26.2s-2.44,4.14-5.36,4.51c-1.06.13-1.7-.37-1.7-1.76,0-3.41,3.92-13.87,8.11-14.4,2.33-.29,2.39,2.68,2.39,2.68Zm57.9-12.09a4.93,4.93,0,0,0-4.51,4.83,3.79,3.79,0,0,0,1.17,2.84c-1.17,1.69-2.49,2.93-3.76,3.09S173.7,24,173.7,22.3c0-3.94,4.08-15.65,8.27-16.18C183.09,6,184,6.66,184,8.63A18.75,18.75,0,0,1,182.87,14.11Z"
                  transform="translate(0 -0.01)"
                />{' '}
              </svg>{' '}
            </a>
          </div>
          <div className="site-address">
            <ul className="address">
              <li>TM Food System</li>
              <li>Địa chỉ: 96 Định Công - Hoàng Mai - Hà Nội</li>
              <li>SĐT: 0337 981 919</li>
              <li>Mail: varanenguyen@gmail.com</li>
            </ul>
          </div>
          <div className="site-info">
            <p className="copyright">Copyright © 2020 Nguyen Duc Minh - Mai Van Thanh</p>
          </div>{' '}
          <a role="button" className="footer-action-btn" data-toggle="collapse">
            {' '}
            <i className="po po-map-marker" /> TM Food{' '}
          </a>
        </div>
      </footer>
    </>
  );
};
