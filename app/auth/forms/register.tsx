"use client";

import React, {useState} from "react";

import {Link} from "@logi-x/link";
import {Button} from "@logi-x/button";
import {Input} from "@logi-x/input";
import {toast} from "@logi-x/toaster";
import {z} from "zod";

type Props = {
  setSelected(arg0: string): void;
};

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, "This field has to be filled.")
      .email("This is not a valid email")
      .max(300, "Email can't be longer than 300 characters."),
    username: z
      .string()
      .min(6, "Username has to be at least 6 characters long.")
      .max(300, "Username can't be longer than 300 characters."),
    password: z.string().min(6, "Password has to be at least 6 characters long."),
    confirmPassword: z.string().min(6, "Confirm-Password has to be at least 6 characters long."),
  })
  .superRefine(({confirmPassword, password}, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

const RegisterForm = (props: Props) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setFormData((prev) => ({...prev, [name]: value}));

    const baseSchema = formSchema._def.schema;

    const fieldSchema = baseSchema.shape[name as keyof typeof formData];

    if (name === "confirmPassword") {
      try {
        formSchema.parse({...formData, [name]: value});
        setErrors((prev) => ({...prev, confirmPassword: undefined}));
      } catch (error) {
        if (error instanceof z.ZodError) {
          const confirmPasswordError = error.errors.find(
            (err) => err.path[0] === "confirmPassword",
          );
          setErrors((prev) => ({
            ...prev,
            confirmPassword: confirmPasswordError?.message,
          }));
        }
      }
    } else {
      try {
        const result = fieldSchema.safeParse(value);
        setErrors((prev) => ({
          ...prev,
          [name]: result.success ? undefined : result.error?.issues[0].message,
        }));
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrors((prev) => ({...prev, [name]: error.errors[0].message}));
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      formSchema.parse(formData);
      setErrors({});

      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Account created!");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: {
          email?: string;
          password?: string;
          confirmPassword?: string;
        } = {};
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
      {/* Username Input */}
      <div>
        <Input
          labelPlacement="outside"
          variant="bordered"
          isRequired
          name="username"
          value={formData.username}
          label="Username"
          placeholder="Enter your username"
          type="text"
          onChange={handleChange}
          isInvalid={errors.username ? true : false}
          errorMessage={errors.username}
        />
      </div>
      {/* Email Input */}
      <div>
        <Input
          labelPlacement="outside"
          variant="bordered"
          isRequired
          name="email"
          value={formData.email}
          label="Email"
          placeholder="Enter your email"
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
          variant="bordered"
          isRequired
          name="password"
          value={formData.password}
          label="Password"
          placeholder="Enter your password"
          type="password"
          onChange={handleChange}
          isInvalid={errors.password ? true : false}
          errorMessage={errors.password}
        />
      </div>

      {/* Confirm Password Input */}
      <div>
        <Input
          labelPlacement="outside"
          variant="bordered"
          isRequired
          name="confirmPassword"
          value={formData.confirmPassword}
          label="Confirm Password"
          placeholder="Enter your password confirmation"
          type="password"
          onChange={handleChange}
          isInvalid={errors.confirmPassword ? true : false}
          errorMessage={errors.confirmPassword}
        />
      </div>

      {/* Register Button */}
      <div>
        <Button
          isDisabled={
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword ||
            errors.email ||
            errors.password ||
            errors.confirmPassword
              ? true
              : false
          }
          type="submit"
          color="primary"
          radius="sm"
          fullWidth
        >
          Sign up
        </Button>
      </div>

      {/* Login Link */}
      <div className="text-xs text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link size="sm" className="cursor-pointer" onPress={() => props.setSelected("login")}>
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
