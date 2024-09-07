import React from 'react';

export function Form({
  action,
  children,
}: {
  action: any;
  children: React.ReactNode;
}) {
  return (
    <form
      action={action}
      className="flex flex-col space-y-4"
    >
      <div className="relative mb-4">
        <i className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 fas fa-envelope"></i>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          required
          className="w-full p-2 pl-8 text-gray-800 border-b border-gray-300 focus:outline-none focus:border-purple-500"
        />
      </div>
      <div className="relative mb-4">
        <i className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 fas fa-lock"></i>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full p-2 pl-8 text-gray-800 border-b border-gray-300 focus:outline-none focus:border-purple-500"
        />
      </div>
      {children}
    </form>
  );
}
