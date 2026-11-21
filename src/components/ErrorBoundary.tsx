import { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

function getSafeLang(): 'pl' | 'en' {
  return typeof document !== 'undefined' && document.documentElement.lang === 'en' ? 'en' : 'pl';
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      const lang = getSafeLang();
      return (
        <div className="min-h-screen bg-[#040814] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md bg-slate-900/80 border border-slate-800 p-8 rounded-2xl space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold text-blue-400 font-display">
              {lang === 'pl' ? 'Wystąpił problem z ładowaniem strony' : 'Something went wrong loading this page'}
            </h1>
            <p className="text-slate-300 text-sm">
              {lang === 'pl'
                ? 'Odśwież stronę lub spróbuj ponownie za chwilę.'
                : 'Please refresh the page or try again in a moment.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-3d-primary px-6 py-2.5 rounded-full font-semibold text-sm inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              {lang === 'pl' ? 'Odśwież stronę' : 'Refresh page'}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
