"use client";

import React, {useCallback, useState} from "react";

import {Tabs, Tab} from "@logi-x/tabs";
import {Button} from "@logi-x/button";
import {Card, CardBody, CardHeader, CardFooter} from "@logi-x/card";

import {Icons} from "@/global/Icons/icons";
import Link from "next/link";
import {ThemeSwitch} from "@/components/theme-switch";
import {signIn} from "next-auth/react";
import {Toaster} from "@logi-x/toaster";
import LoginForm from "./login";
import RegisterForm from "./register";
import {usePathname, useSearchParams, useRouter} from "next/navigation";
import {AppleIcon, GithubIcon, GoogleIcon} from "@logi-x/shared-icons";

const Form = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const [selected, setSelected] = useState(searchParams.get("tab") || "login");

  const handleNavigation = (e: string) => {
    router.push(pathname + "?" + createQueryString("tab", e));
    setSelected(e);
  };

  return (
    <Card className="max-w-md w-full h-full bg-bg shadow-lg rounded-2xl px-2">
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <Link href="/">
            <Icons.logoSmall />
          </Link>
          <div className="flex items-center">
            <ThemeSwitch />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-hidden">
        <Tabs
          fullWidth
          disableAnimation
          size="sm"
          aria-label="Auth form"
          selectedKey={selected}
          onSelectionChange={(key) => handleNavigation(key as string)}
          classNames={{
            tab: "!outline-none",
          }}
        >
          <Tab key="login" title="Login">
            <LoginForm setSelected={(key) => handleNavigation(key as string)} />
          </Tab>
          <Tab key="register" title="Sign up">
            <RegisterForm setSelected={(key) => handleNavigation(key as string)} />
          </Tab>
        </Tabs>
      </CardBody>
      <CardFooter className="mt-0">
        <div className="flex flex-col gap-0 w-full">
          <div>
            {/* OR Divider */}
            <div className="mt-0 flex items-center justify-center text-xs">
              <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
              <span className="mx-2 bg-bg text-gray-500">OR CONTINUE WITH</span>
              <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
            </div>

            {/* Social Media Buttons */}
            <div className="flex w-full justify-center mt-6">
              <div className="flex justify-center space-x-8">
                <Button
                  size="lg"
                  radius="full"
                  variant="light"
                  isIconOnly
                  onPress={() => signIn("apple")}
                  className="bg-gradient-to-tr from-bg to-bg text-bg"
                >
                  <AppleIcon size={36} />
                </Button>
                <Button
                  size="lg"
                  radius="full"
                  variant="light"
                  isIconOnly
                  onPress={() => signIn("google")}
                  className="bg-gradient-to-tr from-bg to-bg text-bg"
                >
                  <GoogleIcon size={36} />
                </Button>
                <Button
                  size="lg"
                  radius="full"
                  variant="light"
                  isIconOnly
                  onPress={() => signIn("github")}
                  className="bg-gradient-to-tr from-bg to-bg text-bg"
                >
                  <GithubIcon size={36} />
                </Button>
              </div>
            </div>
          </div>
          <div className="container flex flex-col w-full mx-auto items-center mt-8">
            <div className="w-full mt-0 p-0 border-b border-gray-300 dark:border-gray-700"></div>
            <p className="mt-2 text-center text-xxs text-gray-600 dark:text-gray-400">
              By clicking continue, you agree to our{" "}
              <Link
                href="/docs"
                className="text-xxs font-medium text-primary-400 hover:text-primary-500 underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/docs"
                className="text-xxs font-medium text-primary-400 hover:text-primary-500 underline"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </CardFooter>
      {/* <Button
        color="primary"
        onClick={() =>
          toast("My first toast", {
            duration: 200000,
          })
        }
      >
        Give me a toast
      </Button> */}
      <Toaster richColors />
    </Card>
  );
};

export default Form;
