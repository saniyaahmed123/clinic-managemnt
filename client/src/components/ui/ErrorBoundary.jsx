import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  handleReset = () => {
    this.setState({ error: null });
    window.location.reload();
  };

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-brand-ice px-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-soft">
            <p className="text-sm font-bold uppercase tracking-widest text-[#A30D2A]">
              Something went wrong
            </p>
            <h1 className="mt-3 font-serif text-2xl font-bold text-brand-navy">
              The page could not be displayed
            </h1>
            <p className="mt-3 break-words text-sm text-brand-body">
              {this.state.error.message}
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="mt-6 rounded-xl bg-[#A30D2A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-600"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
