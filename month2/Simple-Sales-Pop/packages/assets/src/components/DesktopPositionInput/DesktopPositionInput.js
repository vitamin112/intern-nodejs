import {Labelled, Stack, TextStyle} from '@shopify/polaris';
import PropTypes from 'prop-types';
import React from 'react';
import './DesktopPositionInput.scss';

const defaultOptions = [
  {label: 'Bottom left', value: 'bottom-left'},
  {label: 'Bottom right', value: 'bottom-right'},
  {label: 'Top left', value: 'top-left'},
  {label: 'Top right', value: 'top-right'}
];
const DesktopPositionInput = ({label, value, onChange, helpText, options = defaultOptions}) => {
  return (
    <Labelled label={label}>
      <Stack>
        {options.map((option, key) => {
          return (
            <div
              key={key}
              className={`Avada-DesktopPosition ${
                value === option.value ? 'Avada-DesktopPosition--selected' : ''
              }`}
              onClick={() => onChange(option.value)}
            >
              <div
                className={`Avada-DesktopPosition__Input Avada-DesktopPosition__Input--${option.value}`}
              ></div>
            </div>
          );
        })}
      </Stack>
      <TextStyle variation="subdued">{helpText}</TextStyle>
    </Labelled>
  );
};
DesktopPositionInput.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  helpText: PropTypes.string
};
export default DesktopPositionInput;
