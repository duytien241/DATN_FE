import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Popper from 'popper.js';
import DatePickerLib from 'react-datepicker';
import { Form, Input, SemanticWIDTHS, InputProps } from 'semantic-ui-react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';
import Fallback from 'components/Fallback';
import './react-datepicker.css';
import styles from './styles.scss';
import { handleError } from 'utils/common';

interface IDatePickerProps extends React.ClassAttributes<DatePicker> {
  label?: string;
  errorContent?: string;
  placeholder?: string;
  value?: Date | null;
  selectsStart?: boolean;
  selectsEnd?: boolean;
  startDate?: Date | null;
  endDate?: Date | null;
  isClearable?: boolean;
  withPortal?: boolean;
  minDate?: Date | null;
  maxDate?: Date | null;
  flipEnabled?: boolean;
  popperPlacement?: string;
  popperModifiers?: Popper.Modifiers;
  disabled?: boolean;
  width?: SemanticWIDTHS;
  notAllowEmpty?: boolean;

  onChange?(value: Date | null): void;

  onFocus?(event: React.FocusEvent<HTMLInputElement>): void;

  onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
}

interface IDatePickerState {
  value?: Date | null;
}

class DatePicker extends React.Component<IDatePickerProps, IDatePickerState> {
  private value?: Date | null;

  constructor(props: IDatePickerProps) {
    super(props);

    this.value = this.props.value;
  }

  shouldComponentUpdate(nextProps: IDatePickerProps) {
    if (this.props.value !== nextProps.value) {
      this.value = nextProps.value;
    }

    return true;
  }

  private onChange = (value: Date | null) => {
    if (this.props.notAllowEmpty && value == null) {
      value = this.value == null ? new Date() : this.value;
    }
    if (this.props.onChange) {
      this.props.onChange(value);
    }

    this.value = value;
    this.setState({});
  };

  private CustomInput = React.forwardRef((props: InputProps, ref) => (
    <NumberFormat
      {...((props as unknown) as NumberFormatProps)}
      customInput={Input}
      format="##/##/####"
      placeholder="DD/MM/YYYY"
      mask={['D', 'D', 'M', 'M', 'Y', 'Y', 'Y', 'Y']}
      icon="calendar alternate outline"
    />
  ));

  render() {
    const { placeholder } = this.props;

    console.log(this.value);

    return (
      <ErrorBoundary FallbackComponent={Fallback} onError={handleError}>
        <div className={styles.DatePicker}>
          <div className={styles.Top}>
            <Form.Field
              label={this.props.label && <label className={styles.Label}>{this.props.label}</label>}
              control={DatePickerLib}
              customInput={<this.CustomInput />}
              className={styles.DateTime}
              placeholderText={placeholder ? placeholder : ''}
              selectsStart={this.props.selectsStart}
              selectsEnd={this.props.selectsEnd}
              selected={this.value}
              onChange={this.onChange}
              startDate={this.props.startDate}
              minDate={this.props.minDate}
              maxDate={this.props.maxDate}
              endDate={this.props.endDate}
              disabled={this.props.disabled}
              dateFormat="dd/MM/yyyy"
              isClearable={this.props.isClearable}
              withPortal={this.props.withPortal}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              popperPlacement={this.props.popperPlacement}
              popperModifiers={
                this.props.flipEnabled === true
                  ? this.props.popperModifiers
                  : {
                      flip: {
                        enabled: false,
                      },
                      preventOverflow: {
                        enabled: true,
                        escapeWithReference: false,
                      },
                    }
              }
              error={
                this.props.errorContent && {
                  content: this.props.errorContent,
                  pointing: 'above',
                }
              }
              width={this.props.width}
            />
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}
export default DatePicker;
