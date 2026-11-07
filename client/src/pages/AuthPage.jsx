import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext.jsx";
import { useForm } from "react-hook-form";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  ArrowRight,
  Mail,
  Sparkles,
  User,
  Lock,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

function AuthPage() {
  const { registerUser, login } = useContext(AuthContext);
  const [haveAccount, setHaveAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // 1. Conditional schema to handle dynamic field validations correctly
  const validationSchema = zod.object({
    username: haveAccount
      ? zod.string().optional()
      : zod.string().min(1, "Username is required!"),
    email: zod
      .string()
      .min(1, "Email is required")
      .email("Please enter valid email!"),
    password: zod.string().min(1, "Password is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const handleOnSubmit = async (data) => {
    try {
      console.log("HandleOnsubmit is called");
      console.log(data.email, data.password);
      setIsLoading(true);
      if (haveAccount) {
        await login(data.email, data.password);
      } else {
        await registerUser(data.username, data.email, data.password);
      }
      toast.success(
        haveAccount
          ? "Signed in successfully!"
          : "Account created successfully!",
      );
      reset();
    } catch (err) {
      console.error("Error submitting form data", err);
      toast.error(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 flex items-center justify-center min-h-[80vh] px-4 py-12 relative overflow-hidden dark:bg-slate-950 transition-colors duration-300">
      {/* Decorative ambient background spots */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-100 dark:bg-indigo-950/30 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-100 dark:bg-blue-950/30 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="w-full max-w-md bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-8 relative z-10 dark:bg-slate-900 dark:border-slate-800 dark:shadow-black/20">
        {/* Brand Identity */}
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center justify-center p-2.5 rounded-2xl text-white bg-blue-600 shadow-md shadow-blue-200 dark:shadow-none mx-auto">
            <Sparkles size={22} />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight dark:text-slate-100">
            {haveAccount ? "Welcome Back!" : "Create Account"}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {haveAccount
              ? "Access your smart product profile hub."
              : "Join to start training your custom profile feed."}
          </p>
        </div>

        {/* Login / Register Form */}
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="space-y-4 text-left"
        >
          {/* Username Field */}
          {!haveAccount && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-slate-500 tracking-wider dark:text-slate-400">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("username")}
                  placeholder="Enter your username"
                  className={`w-full px-4 py-3 pl-11 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all dark:bg-slate-950
                      ${
                        errors.username
                          ? "border-red-400 bg-red-50/10 focus:border-red-500"
                          : "border-slate-200 dark:border-slate-800 bg-slate-50 focus:bg-white dark:focus:bg-slate-950"
                      }`}
                />
                <User
                  size={18}
                  className="absolute left-4 top-3.5 text-slate-400"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                {...register("email")}
                placeholder="name@example.com"
                className={`w-full px-4 py-3 pl-11 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all dark:bg-slate-950
              ${
                errors.email
                  ? "border-red-400 bg-red-50/10 focus:border-red-500"
                  : "border-slate-200 dark:border-slate-800 bg-slate-50 focus:bg-white dark:focus:bg-slate-950"
              }`}
              />
              <Mail
                size={16}
                className="absolute left-4 top-3.5 text-slate-400"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Password
              </label>
              {haveAccount && (
                <a
                  href="#forgot"
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors dark:text-indigo-400"
                >
                  Forgot?
                </a>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="••••••••"
                className={`w-full px-4 py-3 pl-11 pr-11 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all dark:bg-slate-950
          ${
            errors.password
              ? "border-red-400 bg-red-50/10 focus:border-red-500"
              : "border-slate-200 dark:border-slate-800 bg-slate-50 focus:bg-white dark:focus:bg-slate-950"
          }`}
              />
              <Lock
                className="absolute left-4 top-3.5 text-slate-400"
                size={16}
              />
              {/* Show / Hide Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-3.5 rounded-xl transition-all shadow-md dark:shadow-none disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 group mt-6"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Please wait...</span>
              </>
            ) : (
              <>
                <span>
                  {haveAccount ? "Sign In to job-board" : "Register Account"}
                </span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </>
            )}
          </button>
        </form>

        {/* Dynamic Mode Switcher */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {haveAccount
              ? "Don't have an account yet?"
              : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                reset();
                setHaveAccount(!haveAccount);
              }}
              className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors focus:outline-none dark:text-indigo-400"
            >
              {haveAccount ? "Sign Up Free" : "Sign In Here"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
