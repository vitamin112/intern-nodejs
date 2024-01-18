import React, {useCallback, useEffect, useState} from 'react';
import './MainFeedMedia.scss';
import {Button} from '@shopify/polaris';
import {HideMinor, ViewMinor} from '@shopify/polaris-icons';

const MainFeedMedia = ({
  data = [],
  settings = {},
  isPreview = false,
  handelSelectedItem = () => {}
}) => {
  const {numOfRow = 2, numOfColumn = 3, spacing = 10, title = ''} = settings;
  const [displayItem, setDisplayItem] = useState([]);

  const [numberItemToShow, setNumberItemToShow] = useState(4);

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const day = date
      .getDate()
      .toString()
      .padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
  useEffect(() => {
    setNumberItemToShow(settings?.numOfRow * settings?.numOfColumn);
  }, [settings]);

  const loadMoreItems = () => {
    setDisplayItem(data.slice(0, numberItemToShow + numOfRow * numOfColumn));
    setNumberItemToShow(prev => prev + numberItemToShow);
  };

  useEffect(() => {
    setDisplayItem(data ? data.slice(0, numberItemToShow) : []);
  }, [data, settings, numberItemToShow]);

  return (
    <div className={`Avava-SP__Wrapper fadeInUp animated ${settings.position}`}>
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <div className="Avava-SP__Header">{title}</div>
          <div
            className="Avava-SP__MediaContainer"
            style={{
              gridTemplateColumns: `repeat(${numOfColumn}, 1fr)`,
              gridGap: `${spacing}px`,
              gridTemplateRows: `repeat(${numOfRow}, 1fr)`
            }}
          >
            {displayItem.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`Avava-SP__MediaItem  ${
                    item?.isHide ? 'Avava-SP__MediaItem--Hide' : ''
                  }`}
                  style={{
                    backgroundImage:
                      item.media_type === 'IMAGE' ? `url(${item.media_url})` : 'none',
                    display: 'block'
                  }}
                  title={formatDate(item.timestamp)}
                >
                  {item.media_type === 'VIDEO' && (
                    <video
                      title={formatDate(item.timestamp)}
                      controls
                      className="Avava-SP__Video"
                      style={{display: item.media_type === 'VIDEO' ? 'block' : 'none'}}
                    >
                      <source src={item.media_url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {isPreview ? (
                    <Button
                      plain
                      id="Avava-sp_ViewPlayer"
                      icon={item?.isHide ? ViewMinor : HideMinor}
                      onClick={() => handelSelectedItem(item)}
                    ></Button>
                  ) : null}
                </div>
              );
            })}
          </div>
          {data?.length > displayItem?.length && (
            <button className="Avava-SP__LoadMore" onClick={loadMoreItems}>
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

MainFeedMedia.propTypes = {};

export default MainFeedMedia;
