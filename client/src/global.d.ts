declare let grecaptcha: {
  getResponse(): string;
  reset(): void;
  render(container: string | HTMLElement, parameters: string): number;
};
