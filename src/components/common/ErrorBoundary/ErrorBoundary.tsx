import { Alert } from 'antd';
import * as React from 'react';
import './ErrorBoundary.less';

interface IProps {
  messagePrefix?: string;
}

interface IState {
  errorMessage: string | null;
}

class ErrorBoundary extends React.Component<IProps, IState> {
  public state: IState = { errorMessage: null };

  public componentDidCatch(error: Error | null) {
    this.setState({ errorMessage: error ? error.message : null });
  }

  public render() {
    const { messagePrefix } = this.props;
    const { errorMessage } = this.state;
    if (this.state.errorMessage !== null) {
      return (
        <div className="ErrorBoundary">
          <Alert type="error" message={`${messagePrefix}${errorMessage}`} />
          <div className="dp-error-blur">{this.props.children}</div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
