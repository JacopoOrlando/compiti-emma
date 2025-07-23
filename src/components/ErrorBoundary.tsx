import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <Card className="p-8 text-center border-4 border-destructive/30 shadow-card max-w-md">
            <div className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              🦄 Ops! Qualcosa è andato storto
            </h2>
            
            <p className="text-muted-foreground mb-6">
              Emma ha incontrato un piccolo problema. Non preoccuparti, possiamo risolverlo insieme!
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-muted p-4 rounded-lg mb-6 text-left">
                <pre className="text-xs text-destructive font-mono overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </div>
            )}
            
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={this.handleReset} 
                variant="default" 
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Riprova
              </Button>
              <Button 
                onClick={() => window.location.href = '/'} 
                variant="outline"
              >
                Torna alla Home
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;