"use client";

import { sendEmail } from "@/lib/utils/api/send";
import {
  EmailContactInput,
  emailContactValidatorSchema,
} from "@/lib/validators/emailContact";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTMLAttributes, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CiCircleAlert, CiCircleCheck } from "react-icons/ci";
import { FiLoader } from "react-icons/fi";
import { LuSend } from "react-icons/lu";

const EmailForm = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailContactInput>({
    resolver: zodResolver(emailContactValidatorSchema),
  });

  const onSubmit: SubmitHandler<EmailContactInput> = async (data) => {
    // Reset error and states
    setError(null);
    setIsSuccess(false);
    setIsLoading(true);

    try {
      await sendEmail(data);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div {...props}>
      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md flex items-start gap-2 text-sm">
          <CiCircleAlert className="size-4 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {isSuccess ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <CiCircleCheck className="h-16 w-16 text-green-500 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            Your message has been sent successfully. I&apos;ll get back to you
            as soon as possible.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="bg-pink-500 text-white hover:bg-pink-600 rounded-md p-2"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="john@example.com"
              className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-pink-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              type="text"
              {...register("subject")}
              placeholder="How can I help?"
              className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-pink-500"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm">{errors.subject.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              {...register("message")}
              placeholder="Your message here..."
              className="w-full min-h-24 border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-pink-500"
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-pink-500 text-white hover:bg-pink-600 rounded-md p-2"
          >
            <div className="flex items-center gap-2 justify-center">
              {isLoading ? (
                <>
                  <FiLoader className="size-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <LuSend className="size-4" />
                  <span>Send Message</span>
                </div>
              )}
            </div>
          </button>
        </form>
      )}
    </div>
  );
};

export default EmailForm;
