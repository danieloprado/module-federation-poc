import { Component, ErrorInfo, Suspense } from 'react';

type State = {
  hasError: boolean;
};

type Props = {
  children: React.ReactNode;
};

export default class FallbackHandler extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <p>Ocorreu um erro</p>;
    }

    return <Suspense fallback={<div>Loading...</div>}>{this.props.children}</Suspense>;
  }
}
