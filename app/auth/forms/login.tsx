"use client";

import React, {useState} from "react";

import {Link} from "@logi-x/link";
import {Button} from "@logi-x/button";
import {Input} from "@logi-x/input";
import {Checkbox} from "@logi-x/checkbox";

import NextLink from "next/link";
import {signIn} from "next-auth/react";
import {z} from "zod";
import {useRouter} from "next/navigation";
import {toast} from "@logi-x/toaster";

type Props = {
  setSelected(arg0: string): void;
};

const formSchema = z.object({
  email: z
    .string()
    .min(1, "This field has to be filled.")
    .email("This is not a valid email")
    .max(300, "Email can't be longer than 300 characters."),
  password: z.string().min(6, "Password has to be at least 6 characters long."),
});

const LoginForm = (props: Props) => {
  const [formData, setFormData] = useState({email: "", password: ""});
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setFormData((prev) => ({...prev, [name]: value}));

    try {
      formSchema.shape[name as keyof typeof formData].parse(value);
      setErrors((prev) => ({...prev, [name]: undefined}));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({...prev, [name]: error.errors[0].message}));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      formSchema.parse(formData);
      setErrors({});

      const response = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (!response?.error) {
        toast.success("You are now signed in!");
        router.push("/");
      } else {
        toast.error("Invalid credentials.");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: {email?: string; password?: string} = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof typeof formData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col">
        <div className="flex w-full flex-wrap flex-col gap-4">
          {/* Email Input */}
          <div>
            <Input
              labelPlacement="outside"
              variant="bordered"
              name="email"
              isRequired
              value={formData.email}
              label="Email"
              placeholder="Enter your email"
              autoComplete="email"
              type="email"
              onChange={handleChange}
              isInvalid={errors.email ? true : false}
              errorMessage={errors.email}
            />
          </div>

          {/* Password Input */}
          <div>
            <Input
              labelPlacement="outside"
              name="password"
              value={formData.password}
              variant="bordered"
              isRequired
              label="Password"
              placeholder="Enter your password"
              type="password"
              onChange={handleChange}
              isInvalid={errors.password ? true : false}
              errorMessage={errors.password}
            />
          </div>
        </div>
        <div className="text-sm text-right">
          <NextLink
            href={"/docs"}
            className="underline text-xs text-primary-500 hover:text-primary-400"
          >
            Forgot your password?
          </NextLink>
        </div>
      </div>

      {/* Remember Me Checkbox */}
      <div className="grid grid-cols-1 xs:flex items-center justify-between">
        <Checkbox
          size="sm"
          name="remember"
          checked={true}
          classNames={{
            wrapper: "group-data-[hover=true]:before:bg-primary-500/25 before:border-gray-500/50",
          }}
        >
          Remember me
        </Checkbox>
      </div>

      {/* Login Button */}
      <div>
        <Button
          isDisabled={
            !formData.email || !formData.password || errors.email || errors.password ? true : false
          }
          type="submit"
          color="primary"
          radius="sm"
          fullWidth
        >
          Login
        </Button>
      </div>

      {/* Register Link */}
      <div className="text-xs text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link size="sm" className="cursor-pointer" onPress={() => props.setSelected("register")}>
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
