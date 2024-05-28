"use client";
const ErrorWrapper = ({ error }) => {
  return <h1> {error.message}</h1>;
};
export default ErrorWrapper;
