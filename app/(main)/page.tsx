import {Snippet} from "@logi-x/snippet";
import {Link} from "@logi-x/link";
import {Code} from "@logi-x/code";
import {button as buttonStyles} from "@logi-x/theme";

import {siteConfig} from "@/config/site";
import {title, subtitle} from "@/components/primitives";
import {GithubIcon} from "@/components/icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@logi-x/carousel";
import {Card, CardBody, CardFooter, CardHeader} from "@logi-x/card";
import {GlobeAltIcon} from "@heroicons/react/24/outline";
import {UserIcon} from "lucide-react";
import {Image} from "@logi-x/image";
import {User} from "@logi-x/user";
import {Chip} from "@logi-x/chip";
import {Divider} from "@logi-x/divider";
import {Container} from "@logi-x/container";
import ConfettiButton from "@/components/confetti";

export function generateMetadata() {
  return {
    title: "Home",
  };
}

const Section = () => {
  return (
    <div className="p-1">
      <Card className="py-4 select-none dark:ring-1 dark:ring-opacity-10 dark:ring-white shadow-none cursor-pointer">
        <CardHeader className="pb-0 pt-2 px-4 flex-row items-start justify-between">
          <User
            name={"John Doe"}
            description={"user@email.com"}
            avatarProps={{
              src: "https://ui-avatars.com/api/?name=John+Doe",
            }}
          />
          <div className="ml-2 flex flex-col gap-1">
            <Chip size="sm" color="primary">
              55
            </Chip>
          </div>{" "}
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt={"Course Correct"}
            className="object-cover rounded-xl w-full"
            src={"https://picsum.photos/512/512"}
          />
        </CardBody>
        <CardFooter className="flex flex-col justify-start content-start items-start">
          <p className="text-tiny uppercase font-bold">{"Pharmaceutical"}</p>
          <small className="text-default-500">{"How to cut it!"}</small>
          <h4 className="font-bold text-large">{"Course Correct"}</h4>
        </CardFooter>
        <div className="flex my-1 mx-4">
          <Divider />
        </div>
        <div className="flex flex-row justify-between mx-2 px-2 mt-2">
          <Chip variant="light" color="default" startContent={<GlobeAltIcon className="w-3 h-3" />}>
            <small>English</small>
          </Chip>
          <Chip variant="light" color="default" startContent={<UserIcon className="w-3 h-3" />}>
            <small>239 users enrolled</small>
          </Chip>
        </div>
      </Card>
    </div>
  );
};

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Make&nbsp;</span>
        <span className={title({color: "violet"})}>beautiful&nbsp;</span>
        <br />
        <span className={title()}>websites regardless of your design experience.</span>
        <div className={subtitle({class: "mt-4"})}>
          Beautiful, fast and modern React UI library.
        </div>
      </div>

      <Container>
        <Carousel
          opts={{
            align: "start",
            direction: "ltr",
          }}
          className="w-full"
        >
          <CarouselContent className="mt-6">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <CarouselItem key={index} className={`basis-1/3`}>
                <Section />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Container>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({
            variant: "bordered",
            radius: "full",
          })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <ConfettiButton />

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
