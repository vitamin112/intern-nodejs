import {Button, Checkbox, FormLayout, Heading, RangeSlider} from '@shopify/polaris';
import React from 'react';
import DesktopPositionInput from '../DesktopPositionInput/DesktopPositionInput';

const DisplayContentTab = ({settings, handleInputChange}) => {
  return (
    <FormLayout>
      <Heading>APPEARANCE</Heading>
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

      <Heading>TIMING</Heading>

      <FormLayout.Group>
        <RangeSlider
          output
          helpText="How long each pop can display on your page"
          label="Display duration"
          id="displayDuration"
          max={20}
          value={settings.displayDuration}
          onChange={handleInputChange}
          suffix={<Button disabled>{settings.displayDuration} second(s)</Button>}
        />

        <RangeSlider
          output
          helpText="The delay time before the first notification."
          label="Time before the first pop"
          id="firstDelay"
          max={40}
          value={settings.firstDelay}
          onChange={handleInputChange}
          suffix={<Button disabled>{settings.firstDelay} second(s)</Button>}
        />
      </FormLayout.Group>

      <FormLayout.Group>
        <RangeSlider
          output
          helpText="The time interval between two pops"
          label="Gap time between two pops"
          id="popsInterval"
          value={settings.popsInterval}
          onChange={handleInputChange}
          max={10}
          suffix={<Button disabled>{settings.popsInterval} second(s)</Button>}
        />

        <RangeSlider
          output
          helpText="The maximum number of popups to show after page loading, maximum number is 80"
          label="Maximum of popups"
          value={settings.maxPopsDisplay}
          id="maxPopsDisplay"
          max={80}
          onChange={handleInputChange}
          suffix={<Button disabled>{settings.maxPopsDisplay} second(s)</Button>}
        />
      </FormLayout.Group>
    </FormLayout>
  );
};

export default DisplayContentTab;
