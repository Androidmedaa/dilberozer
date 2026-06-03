export const siteConfig = {
  name: "Dilber Özer",
  title: "Dilber Özer — Artificial Intelligence Portfolio",
  role: "AI Engineer / Software Engineer",
  location: "Based in İzmir, Turkey",
  education:
    "B.S. Computer Engineering, İzmir Bakırçay University (2022–2026, CGPA 3.10/4.0)",
  experience: "Long-term end-to-end internship experience",
  bio: "International cross-collaboration experience across industries and time zones.",
  profileImage: "/profile_photo.png",
  social: {
    github: "https://github.com/Androidmedaa",
    linkedin: "https://www.linkedin.com/in/dilber-ozer",
    medium: "https://medium.com/@dilberozer",
  },
  mediumOcrArticle: {
    url: "https://medium.com/@dilberozer/modern-ocr-sistemlerine-derin-bir-bak%C4%B1%C5%9F-olmocr-rolmocr-ve-trocr-85120dd64f92",
    title: "A Deep Dive into Modern OCR: olmOCR, RolmOCR, and TrOCR",
    image: "/medium-ocr-article/cover.png",
    imageAlt:
      "Document anchoring diagram — mapping PDF page elements to structured OCR coordinates",
  },
} as const;

export const navItems = [
  { label: "Projects", href: "/" },
  { label: "Internships", href: "/internships" },
  { label: "Artificial Intelligence", href: "/artificial-intelligence" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
