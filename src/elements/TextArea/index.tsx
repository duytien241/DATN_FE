import React from 'react';
import * as ReactDOM from 'react-dom';
import { Form, TextAreaProps, SemanticWIDTHS, FormFieldProps, TextArea as SemanticArea } from 'semantic-ui-react';
import styles from './styles.scss';

interface ITextAreaProps extends React.ClassAttributes<TextArea>, TextAreaProps {
  value?: string;
  placeholder?: string;
  errorContent?: string;
  label?: string;
  width?: SemanticWIDTHS;
  forceUpdate?: boolean;
  blurOnEnter?: boolean;
  maxLength?: string;

  onChangeText?(value: string): void;
  onFocus?(): void;
  onBlur?(value: string): void;
}

interface ITextAreaState extends React.ClassAttributes<TextArea> {}

class TextArea extends React.Component<ITextAreaProps, ITextAreaState> {
  private textAreaRef: React.RefObject<FormFieldProps>;
  private isFocus = false;
  private value: string;

  constructor(props: ITextAreaProps) {
    super(props);

    this.textAreaRef = React.createRef();

    this.value = props.value != null ? props.value : '';

    this.state = {};
  }

  componentDidMount() {
    if (this.props.blurOnEnter === true) {
      document.addEventListener('keypress', this.onPressKey);
    }
  }

  shouldComponentUpdate(nextProps: ITextAreaProps) {
    if (this.props.value !== nextProps.value || this.props.forceUpdate !== nextProps.forceUpdate) {
      this.value = nextProps.value ? nextProps.value : '';
    }

    return true;
  }

  componentWillUnmount() {
    if (this.props.blurOnEnter === true) {
      document.removeEventListener('keypress', this.onPressKey);
    }
  }

  private onPressKey = (event: KeyboardEvent) => {
    const el = (ReactDOM.findDOMNode(this) as FormFieldProps).querySelector('textarea');
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      if (el && this.isFocus === true) {
        el.blur();
      }
    }
  };

  private onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.value = e.target.value;
    this.setState({});
    if (this.props.onChangeText) {
      this.props.onChangeText(this.value);
    }
  };

  private onFocus = () => {
    this.isFocus = true;
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  render() {
    const { maxLength, errorContent, label, placeholder } = this.props;

    return (
      <div className={styles.TextArea}>
        <Form>
          <Form.Field
            control={SemanticArea}
            label={label && <label className={styles.Label}>{label}</label>}
            value={this.value}
            placeholder={placeholder}
            onChange={this.onChange}
            onFocus={this.onFocus}
            ref={this.textAreaRef}
            maxLength={maxLength}
          />
        </Form>
        {errorContent && <div className={styles.Error}>{errorContent}</div>}
      </div>
    );
  }
}

export default TextArea;
