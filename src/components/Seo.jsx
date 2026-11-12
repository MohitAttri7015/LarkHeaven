import { useEffect } from "react";

// Change this one line if you ever move to a custom domain.
const SITE_URL = "https://lark-heaven.vercel.app";

const PAGES = {
    "/": {
        title: "Lark Heaven | Web Development & Digital Experiences",
        description:
            "Lark Heaven is a creative web studio in India building fast, responsive websites, full-stack apps and custom software with React, Next.js and modern UI/UX.",
    },
    "/work": {
        title: "Work & Selected Projects | Lark Heaven",
        description:
            "Browse selected web apps, interactive experiences and software projects built by Lark Heaven.",
    },
    "/services": {
        title: "Web, Full-Stack & App Development Services | Lark Heaven",
        description:
            "Custom web development, full-stack apps, UI/UX engineering, API design, Next.js & React solutions, cloud setup and mobile apps by Lark Heaven.",
    },
    "/about": {
        title: "About Lark Heaven | Full-Stack & Creative Developer",
        description:
            "Meet the developer behind Lark Heaven: a full-stack architect building purposeful, high-performance websites, web apps and mobile apps.",
    },
    "/contact": {
        title: "Contact Lark Heaven | Start Your Project",
        description:
            "Get in touch with Lark Heaven for web development, app and custom software projects, collaborations or careers. Based in Haryana, India.",
    },
};

const setMeta = (attr, key, content) => {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute("content", content);
};

export default function Seo({ path }) {
    useEffect(() => {
        const page = PAGES[path] ?? PAGES["/"];
        const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;

        document.title = page.title;
        setMeta("name", "description", page.description);
        setMeta("property", "og:title", page.title);
        setMeta("property", "og:description", page.description);
        setMeta("property", "og:url", url);
        setMeta("name", "twitter:title", page.title);
        setMeta("name", "twitter:description", page.description);

        let link = document.head.querySelector('link[rel="canonical"]');
        if (!link) {
            link = document.createElement("link");
            link.rel = "canonical";
            document.head.appendChild(link);
        }
        link.href = url;
    }, [path]);

    return null;
}
