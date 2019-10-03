import * as React from 'react';

interface IPreloaderState {
  isPreloaderLoading: boolean;
}

export default class Skins extends React.Component<{}, IPreloaderState> {

  public constructor (props: {}) {
    super(props);

    this.state = {
      isPreloaderLoading: true,
    };
  }

  public componentDidMount(): void {
    this.asyncLoadageCall().then(() => this.setState({ isPreloaderLoading: false }));
  }

  public render () {
    if (this.state.isPreloaderLoading) {
      return null;
    }

    this.disableProgressBar();
    return this.props.children;
  }

  private asyncLoadageCall() {
    return new Promise((resolve) => setTimeout(() => resolve(), 2000));
  }

  private disableProgressBar() {
    const progressBar = document.getElementById("preloader");
    progressBar.style.display = "none";
  }
}
