import React from 'react';
import './styles.scss';

export default () => {
  return (
    <div className="Banner">
      <div className="opacity-mask">
        <div className="container">
          <div className="BannerContent">
            <div className="BannerContainer">
              <h1>Delivery or Takeaway Food</h1>
              <p>The best restaurants at the best price</p>
              {/* <form method="post" action="grid-listing-filterscol.html">
                                <div className="row no-gutters custom-search-input">
                                    <div className="col-lg-10">
                                        <div className="form-group">
                                            <input className="form-control no_border_r pac-target-input" type="text" id="autocomplete" placeholder="Address, neighborhood..." autoComplete="off" />
                                        </div>
                                    </div>
                                    <div className="col-lg-2">
                                        <button className="btn_1 gradient" type="submit">Search</button>
                                    </div>
                                </div>
                            
                                <div className="search_trends">
                                    <h5>Trending:</h5>
                                    <ul>
                                        <li><a href="#0">Sushi</a></li>
                                        <li><a href="#0">Burgher</a></li>
                                        <li><a href="#0">Chinese</a></li>
                                        <li><a href="#0">Pizza</a></li>
                                    </ul>
                                </div>
                            </form> */}
            </div>
          </div>
        </div>
      </div>
      <div className="wave hero" />
    </div>
  );
};
