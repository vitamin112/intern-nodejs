import {Button, Checkbox, Layout, RangeSlider} from '@shopify/polaris';
import React from 'react';
import DesktopPositionInput from '../DesktopPositionInput/DesktopPositionInput';

const DisplayContentTab = ({settings, handleInputChange}) => {
  return (
    <>
      <DesktopPositionInput
        value={settings.position}
        onChange={value => handleInputChange(value, 'position')}
        label={'Desktop Position'}
        helpText={'The display position of pop on your website '}
      />
      <Checkbox
        label="Hide time ago"
        checked={settings.hideTimeAgo}
        id={'hideTimeAgo'}
        onChange={handleInputChange}
      />
      <Checkbox
        label="Truncate content text"
        id="truncateProductName"
        helpText="If you product name is long for one line, it will be truncated to 'Product na..'"
        checked={settings.truncateProductName}
        onChange={handleInputChange}
      />
      <Layout>
        <Layout.Section oneThird>
          <RangeSlider
            output
            label="Display duration"
            id="displayDuration"
            max={5}
            value={settings.displayDuration}
            onChange={handleInputChange}
            suffix={
              <p
                style={{
                  minWidth: '24px',
                  textAlign: 'right'
                }}
              >
                <Button disabled>{settings.displayDuration} second(s)</Button>
              </p>
            }
          />
        </Layout.Section>
        <Layout.Section oneThird>
          <RangeSlider
            output
            label="Time before the first pop"
            id="firstDelay"
            max={10}
            value={settings.firstDelay}
            onChange={handleInputChange}
            suffix={
              <p
                style={{
                  minWidth: '24px',
                  textAlign: 'right'
                }}
              >
                <Button disabled>{settings.firstDelay} second(s)</Button>
              </p>
            }
          />
        </Layout.Section>
      </Layout>
      <Layout>
        <Layout.Section oneThird>
          <RangeSlider
            output
            label="Gap time between two pops"
            id="popsInterval"
            value={settings.popsInterval}
            onChange={handleInputChange}
            max={2}
            suffix={
              <p
                style={{
                  minWidth: '24px',
                  textAlign: 'right'
                }}
              >
                <Button disabled>{settings.popsInterval} second(s)</Button>
              </p>
            }
          />
        </Layout.Section>
        <Layout.Section oneThird>
          <RangeSlider
            output
            label="Maximum of popups"
            value={settings.maxPopsDisplay}
            id="maxPopsDisplay"
            max={20}
            onChange={handleInputChange}
            suffix={
              <p
                style={{
                  minWidth: '24px',
                  textAlign: 'right'
                }}
              >
                <Button disabled>
                  <strong>{settings.maxPopsDisplay} </strong>second(s)
                </Button>
              </p>
            }
          />
        </Layout.Section>
      </Layout>
    </>
  );
};

export default DisplayContentTab;
