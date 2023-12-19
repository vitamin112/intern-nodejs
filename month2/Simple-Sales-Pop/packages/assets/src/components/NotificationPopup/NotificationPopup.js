import React from 'react';
import './NoticationPopup.scss';
import moment from 'moment';

const NotificationPopup = ({
  data = {
    firstName: 'John Doe',
    city: 'New York',
    country: 'United States',
    productName: 'Puffer Jacket With Hidden Hood',
    timestamp: 1702833702000,
    productImage:
      'https://plus.unsplash.com/premium_photo-1682125177822-63c27a3830ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2hvZXN8ZW58MHx8MHx8fDA%3D'
  },
  setting = {}
}) => {
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
