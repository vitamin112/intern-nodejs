import React from 'react';
import './NoticationPopup.scss';
import moment from 'moment';

const NotificationPopup = ({data, setting}) => {
  const timestamp = data.timestamp;
  const momentObj = moment(timestamp);

  const timeAgo = momentObj.fromNow();

  return (
    <div className={`Avava-SP__Wrapper fadeInUp animated ${setting.position}`}>
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <a href="#" className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${data.productImage})`
              }}
            ></div>
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {data.firstName} in {data.city}, {data.country}
              </div>
              <div className={'Avada-SP__Subtitle'}>purchased {data.productName}</div>
              <div className={'Avada-SP__Footer'}>
                {setting.hideTimeAgo ? '' : timeAgo}{' '}
                <span className="uni-blue">
                  <i className="fa fa-check" aria-hidden="true" /> by Avada
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

NotificationPopup.propTypes = {};

export default NotificationPopup;
