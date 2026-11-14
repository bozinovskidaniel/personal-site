export const work = [
  {
    name: "nib",
    role: "Software Engineer",
    period: "2024 – Now",
    href: "https://www.nib.com.au/",
    image: "/images/nib-linkedin.jpg",
    imageClassName: "nib-image",
  },
  {
    name: "Workflow86",
    role: "Software Engineer",
    period: "2022 – 2024",
    href: "https://www.workflow86.com/",
    image: "/images/workflow86.svg",
    imageClassName: "workflow86-image",
  },
  {
    name: "Assess Threat",
    role: "Software Engineer",
    period: "2021 – 2022",
    href: "https://assessthreat.com/",
    image: "/images/assess-threat-linkedin.jpg",
    imageClassName: "inset-logo",
  },
  {
    name: "Success Tutoring",
    role: "Software Developer",
    period: "2020 – 2021",
    href: "https://successtutoring.com.au/",
    image: "/images/success-tutoring-linkedin.jpg",
    imageClassName: "inset-logo",
  },
];

export type Project = {
  name: string;
  description: string;
  category: string;
  image: string;
  imageClassName?: string;
} & (
  | {
      /** Opens an external site in a new tab. */
      href: string;
      slug?: never;
    }
  | {
      /** Opens the write-up at /projects/<slug>, from src/content/projects/<slug>.mdx. */
      slug: string;
      href?: never;
      github?: string;
      meta?: string;
      hero?: { src: string; alt: string };
    }
);

export const projects: Project[] = [
  {
    name: "Arc",
    description: "AI personal trainer",
    category: "iOS",
    href: "https://www.arcstrength.app/",
    image: "/images/arc.jpg",
    imageClassName: "arc-image",
  },
  {
    name: "nudge",
    description: "AI notebook that thinks alongside you",
    category: "Web",
    href: "https://thinkwithnudge.app/",
    image: "/images/nudge.svg",
    imageClassName: "nudge-image",
  },
  {
    name: "STM32 Peripheral Drivers",
    description: "Register-level GPIO, UART and timer drivers",
    category: "Embedded",
    slug: "stm32-peripheral-drivers",
    meta: "C, ARM Cortex-M, bare metal",
    image: "/images/stm32.svg",
    imageClassName: "stm32-image",
    hero: {
      src: "/images/projects/stm32-hero.svg",
      alt: "Diagram of the GPIOA_MODER register as 16 two-bit fields, one per pin. Pin 5's field is set to 01 by the line GPIOA->MODER |= (1 << 10), making PA5 an output that drives an LED.",
    },
  },
  {
    name: "Pneumonia Image Classifier",
    description: "Deep learning for chest X-ray classification",
    category: "ML",
    slug: "pneumonia-classifier",
    github: "https://github.com/bozinovskidaniel/pneumonia-image-classifier",
    meta: "Keras, MobileNet, scikit-learn",
    image: "/images/pneumonia.svg",
    imageClassName: "pneumonia-image",
    hero: {
      src: "/images/projects/pneumonia-hero.svg",
      alt: "Diagram of the model: a 128 by 128 chest X-ray with an opaque patch passes through three rounds of convolution and pooling, then a dense layer, ending in a prediction of pneumonia at 0.99 and normal at 0.01.",
    },
  },
];

export const writeups = projects.filter(
  (project): project is Extract<Project, { slug: string }> =>
    project.slug !== undefined,
);

export const education = [
  {
    name: "Amazon Web Services",
    href: "https://aws.amazon.com/certification/",
    image: "/images/aws.png",
    imageClassName: "aws-image",
    qualifications: [
      { name: "AWS Certified Solutions Architect – Associate", period: "2025" },
    ],
  },
  {
    name: "University of New South Wales",
    href: "https://www.unsw.edu.au/",
    image: "/images/unsw-linkedin.jpg",
    imageClassName: "unsw-image",
    qualifications: [
      {
        name: "Bachelor’s Degree, Computer Science & Engineering",
        period: "2018 – 2021",
      },
    ],
  },
];
