import * as React from 'react';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import { Form, Input, SemanticWIDTHS, SemanticICONS } from 'semantic-ui-react';
import Fallback from 'components/Fallback';
import styles from './styles.scss';
import { formatNumber, handleError } from 'utils/common';

export enum TEXTBOX_TYPE {
  TEXT = 'text',
  PASSWORD = 'password',
}

Form.Field.propTypes = {
  label: PropTypes.any,
};

interface ITextBoxProps extends React.ClassAttributes<TextBox> {
  className?: string;
  type: TEXTBOX_TYPE;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  errorContent?: string;
  autoFocus?: boolean;
  label?: string | JSX.Element[];
  disabled?: boolean;
  readOnly?: boolean;
  isNumberInput?: boolean;
  width?: SemanticWIDTHS;
  actionPosition?: 'left' | 'right';
  errorContentPosition?: 'left' | 'right' | 'above' | 'below';
  isEnglishInput?: boolean;
  forceUpdate?: boolean;
  isInteger?: boolean;
  loading?: boolean;
  submitOnEnter?: boolean;
  icon?: SemanticICONS;
  iconPosition?: string;

  onChangeText?(value: string): void;
  onChangeNumber?(value: number): void;
  onFocus?(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void;
  onBlur?(value: string): void;
  onClick?(e: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}

interface ITextBoxState extends React.ClassAttributes<TextBox> {}

class TextBox extends React.Component<ITextBoxProps, ITextBoxState> {
  static defaultProps = {
    isNumberInput: false,
    isInteger: true,
    errorContentPosition: 'above' as 'left' | 'right' | 'above' | 'below',
  };

  private value: string;
  private numberValue?: number;

  constructor(props: ITextBoxProps) {
    super(props);

    this.value = props.defaultValue ? props.defaultValue : props.value ? props.value : '';

    if (this.props.isNumberInput) {
      this.numberValue = Number(this.value.replace(',', ''));
    }

    this.state = {};
  }

  shouldComponentUpdate(nextProps: ITextBoxProps) {
    if (this.props.value !== nextProps.value || this.props.forceUpdate !== nextProps.forceUpdate) {
      this.value = nextProps.value ? nextProps.value : '';
    }
    return true;
  }

  private onKeyDown = (event: KeyboardEvent) => {
    // Check if Enter key
    if (this.props.submitOnEnter !== true && event.keyCode === 13) {
      event.preventDefault();
    }
  };

  private onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (this.props.readOnly || this.props.disabled) {
      return;
    }

    this.value = e.target.value;

    this.setState({});

    if (this.props.isNumberInput === false) {
      if (this.props.onChangeText) {
        this.props.onChangeText(this.value);
      }
    }
  };

  private onValueChange = (values: NumberFormatValues) => {
    if (this.props.readOnly || this.props.disabled) {
      return;
    }

    if (this.props.onChangeNumber) {
      this.numberValue = values.floatValue;
      this.props.onChangeNumber(values.floatValue!);
    }
  };

  private onClick = (e: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };

  private onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  private onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (this.props.readOnly || this.props.disabled) {
      return;
    }

    let value = e.target.value;

    if (this.props.isNumberInput) {
      this.value = formatNumber(this.numberValue, 2);
      this.setState({});
    }

    if (this.props.onBlur) {
      this.props.onBlur(value);
    }
  };

  private disableCopy = (event: React.ClipboardEvent<HTMLInputElement>) => {
    if (this.props.type === TEXTBOX_TYPE.PASSWORD) {
      event.preventDefault();
    }
  };

  render() {
    const { label, loading, isNumberInput, className, icon, iconPosition } = this.props;

    return (
      <div className={`${styles.Textbox} ${className ? className : ''}`}>
        <Form.Field
          control={isNumberInput === true ? NumberFormat : Input}
          {...(isNumberInput === true && {
            customInput: Input,
            thousandSeparator: true,
            onValueChange: this.onValueChange,
            decimalScale: this.props.isInteger ? 0 : 2,
          })}
          fluid
          type={this.props.type}
          value={this.value}
          placeholder={this.props.placeholder}
          autoFocus={this.props.autoFocus}
          disabled={this.props.disabled}
          readOnly={this.props.readOnly}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onClick={this.onClick}
          onBlur={this.onBlur}
          onCopy={this.disableCopy}
          onKeyDown={this.onKeyDown}
          loading={loading}
          label={label && (typeof label === 'string' ? <label className={styles.Label}>{label}</label> : () => label)}
          icon={icon}
          iconPosition={iconPosition}
          width={this.props.width}
          actionPosition={this.props.actionPosition}
        />
      </div>
    );
  }
}

export default withErrorBoundary(TextBox, { FallbackComponent: Fallback, onError: handleError });
