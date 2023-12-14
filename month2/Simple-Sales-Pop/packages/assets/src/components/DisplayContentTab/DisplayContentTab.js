import {Button, Checkbox, Layout, RangeSlider} from '@shopify/polaris';
import React from 'react';
import DesktopPositionInput from '../DesktopPositionInput/DesktopPositionInput';

const DisplayContentTab = ({settings, setSettings}) => {
  return (
    <>
      <DesktopPositionInput
        value={settings.position}
        onChange={value =>
          setSettings(prev => {
            return {...prev, ['position']: value};
          })
        }
        label={'Desktop Position'}
        helpText={'The display position of pop on your website '}
      />
      <Checkbox
        label="Hide time ago"
        checked={settings.hideTimeAgo}
        id={'hideTimeAgo'}
        onChange={(value, id) =>
          setSettings(prev => {
            return {...prev, [id]: value};
          })
        }
      />
      <Checkbox
        label="Truncate content text"
        helpText="If you product name is long for one line, it will be truncated to 'Product na..'"
        checked={settings.truncateProductName}
        onChange={value =>
          setSettings(prev => {
            return {...prev, ['truncateProductName']: value};
          })
        }
      />
      <Layout>
        <Layout.Section oneThird>
          <RangeSlider
            output
            label="Display duration"
            value={settings.displayDuration}
            onChange={value =>
              setSettings(prev => {
                return {...prev, ['displayDuration']: value};
              })
            }
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
            value={settings.firstDelay}
            onChange={value =>
              setSettings(prev => {
                return {...prev, ['firstDelay']: value};
              })
            }
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
            value={settings.popsInterval}
            onChange={value =>
              setSettings(prev => {
                return {...prev, ['popsInterval']: value};
              })
            }
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
            onChange={value =>
              setSettings(prev => {
                return {...prev, ['maxPopsDisplay']: value};
              })
            }
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
