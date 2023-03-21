import { type ChangeEvent, type FormEvent, useState } from "react";
import Link from "next/link";

function ForgotPasswordWrapper() {
  const [email, setEmail] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>): void {
    setEmail(event.target.value);
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <h1 className="mb-8 text-3xl font-bold text-white">Forgot Password</h1>
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block font-bold text-gray-50">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full rounded-md border border-gray-400 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="flex flex-col items-center justify-between">
          <button
            type="submit"
            className="focus:shadow-outline w-full rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Reset Password
          </button>

          <div className="flex items-center justify-between">
            <Link href="/auth/login">
              <div className="mt-5 inline-block align-baseline text-sm font-bold text-white">
                Login
              </div>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordWrapper;
