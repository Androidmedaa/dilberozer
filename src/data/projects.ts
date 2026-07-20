export type CaseStudySection = {
  id: string;
  title: string;
  content: string;
  bullets?: string[];
  images?: {
    src: string;
    alt: string;
    caption?: string;
    href?: string;
    width?: number;
    height?: number;
    /** Native resolution — no optimizer downscale */
    unoptimized?: boolean;
    /** Span the full page width (single-image hero-style layout) */
    fullWidth?: boolean;
    /** High-res asset for lightbox zoom */
    zoomSrc?: string;
    zoomWidth?: number;
    zoomHeight?: number;
  }[];
};

export type MiniProject = {
  title: string;
  description: string;
  technologies: string[];
  repository?: string;
};

export type ProjectSections = {
  projectOverview: CaseStudySection;
  problemStatement: CaseStudySection;
  objectives: CaseStudySection;
  architecture: CaseStudySection;
  technologies: CaseStudySection;
  developmentProcess: CaseStudySection;
  challenges: CaseStudySection;
  results: CaseStudySection;
  lessonsLearned: CaseStudySection;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  shortDescription: string;
  coverImage: string;
  role?: string;
  duration?: string;
  technologies: string[];
  gallery?: "work" | "internships" | "ai";
  team?: string;
  course?: string;
  repository?: string;
  /** Use "contain" for title/card graphics that should not be cropped */
  coverFit?: "cover" | "contain";
  /** Fine-tune framing for report/UI screenshots on gallery cards */
  coverObjectPosition?: string;
  /** When set, case study lists mini projects instead of full section flow */
  miniProjects?: MiniProject[];
  sections: ProjectSections;
};

export const CASE_STUDY_SECTION_ORDER: (keyof ProjectSections)[] = [
  "projectOverview",
  "problemStatement",
  "objectives",
  "architecture",
  "technologies",
  "developmentProcess",
  "challenges",
  "results",
  "lessonsLearned",
];

const cover = (id: number) =>
  `https://picsum.photos/seed/portfolio-${id}/1600/900`;

const kits23Base = "/projects/kits23";

const kits23Sections: ProjectSections = {
  projectOverview: {
    id: "project-overview",
    title: "Project Overview",
    content:
      "This project documents our work on the 2023 Kidney and Kidney Tumor Segmentation Challenge (KiTS23), organized to advance automatic semantic segmentation of kidneys, kidney tumors, and cysts from CT imaging. Prepared for İzmir Bakırçay University Computer Engineering course KİTS23, the study evaluates how modern deep learning architectures perform on an expanded, clinically diverse public benchmark.",
    images: [
      {
        src: `${kits23Base}/page-1.png`,
        alt: "KiTS23 report cover and abstract",
        caption: "Project report — KiTS23 kidney tumor segmentation study",
      },
    ],
  },
  problemStatement: {
    id: "problem-statement",
    title: "Problem Statement",
    content:
      "Kidney cancer is diagnosed in more than 430,000 people each year and causes approximately 180,000 deaths. Radiologists often cannot reliably classify small renal masses as malignant or benign from imaging alone. Many lesions thought to be aggressive are actually indolent, which has increased adoption of active surveillance for small masses. However, the risk of progression to metastatic disease remains a major clinical concern—creating strong demand for objective, reproducible tools that support risk stratification and outcome prediction.",
    images: [
      {
        src: `${kits23Base}/page-2.png`,
        alt: "Problem definition and dataset context",
        caption: "Clinical context and segmentation challenge motivation",
      },
    ],
  },
  objectives: {
    id: "objectives",
    title: "Objectives",
    content:
      "KiTS23 aims to improve automatic semantic segmentation performance on a more diverse, challenging, and clinically representative dataset. Our report aligned with these goals by systematically comparing deep learning architectures under a shared training protocol.",
    bullets: [
      "Benchmark AlexNet, RNN, ResNet, InceptionV3, and GoogleNet on the KiTS23 dataset.",
      "Identify the architecture best suited to kidney tumor segmentation and classification.",
      "Analyze the impact of expanded data diversity, including nephrogenic contrast phases.",
      "Contribute reproducible findings to support automation in medical imaging workflows.",
    ],
  },
  architecture: {
    id: "architecture",
    title: "Architecture",
    content:
      "Models were trained on 2D CT slices resized to 224×224 and 299×299 pixels. Training used the Adam optimizer with CrossEntropyLoss for 10 epochs (batch size 8) on an NVIDIA Tesla T4 GPU via Google Colab. InceptionV3 achieved the highest accuracy and was selected as the most suitable architecture for this task.",
    bullets: [
      "AlexNet — 75% accuracy: simple and fast, limited on complex spatial features.",
      "RNN — 65% accuracy: weak on static image slices despite sequential modeling strength.",
      "ResNet — 88% accuracy: strong deep features, higher computational cost.",
      "GoogleNet — 86% accuracy: efficient multi-filter design, below InceptionV3.",
      "InceptionV3 — 92% accuracy: multi-scale analysis and optimized filters (selected).",
    ],
    images: [
      {
        src: `${kits23Base}/page-3.png`,
        alt: "Architecture comparison and conclusions",
        caption: "Model comparison summary from the KiTS23 report",
      },
    ],
  },
  technologies: {
    id: "technologies",
    title: "Technologies",
    content:
      "The pipeline combined public medical imaging data, GPU-accelerated training in the cloud, and established convolutional architectures widely used in computer vision research.",
    bullets: [
      "Dataset: KiTS23 (489 training cases, 110 held-out test cases).",
      "Frameworks: Python deep learning stack (PyTorch-style training workflow).",
      "Models: AlexNet, RNN, ResNet, InceptionV3, GoogleNet.",
      "Optimization: Adam + CrossEntropyLoss.",
      "Infrastructure: Google Colab, NVIDIA Tesla T4 GPU.",
    ],
  },
  developmentProcess: {
    id: "development-process",
    title: "Development Process",
    content:
      "We followed a structured experimentation workflow: dataset review, preprocessing of 2D slices, unified hyperparameters across models, training and validation, then comparative analysis of accuracy and clinical suitability.",
    bullets: [
      "Reviewed KiTS23 guidelines and dataset phases (including nephrogenic contrast additions).",
      "Preprocessed CT volumes into 2D slices at 224×224 and 299×299 resolutions.",
      "Trained each architecture for 10 epochs with batch size 8 under identical settings.",
      "Logged accuracy metrics and qualitative segmentation behavior per model.",
      "Selected InceptionV3 based on highest accuracy and multi-scale tumor sensitivity.",
    ],
    images: [
      {
        src: `${kits23Base}/page-2.png`,
        alt: "Dataset and methodology section",
        caption: "Dataset characteristics and challenge objectives",
      },
    ],
  },
  challenges: {
    id: "challenges",
    title: "Challenges",
    content:
      "Medical segmentation introduces constraints beyond standard vision benchmarks: class imbalance, subtle boundary definition, and the cost of false negatives in oncology workflows.",
    bullets: [
      "Translating 3D CT volumes into 2D slices without losing critical spatial context.",
      "RNN underperformance on slice-based imaging (65% accuracy).",
      "Long training times and GPU memory limits for deeper models.",
      "Increased dataset complexity from multiple contrast phases vs. prior KiTS editions.",
      "Need to balance accuracy with clinical interpretability and deployment feasibility.",
    ],
  },
  results: {
    id: "results",
    title: "Results",
    content:
      "InceptionV3 outperformed all compared architectures on the KiTS23 task, reaching 92% accuracy. ResNet (88%) and GoogleNet (86%) were strong alternatives, while AlexNet (75%) and RNN (65%) lagged on this imaging workload. These results support using multi-scale CNN designs for kidney tumor analysis pipelines.",
    bullets: [
      "InceptionV3: 92% — best overall, recommended for deployment experiments.",
      "ResNet: 88% — robust deep features, higher compute cost.",
      "GoogleNet: 86% — efficient but less accurate than InceptionV3.",
      "AlexNet: 75% — viable for rapid prototyping only.",
      "RNN: 65% — not suitable as primary architecture for this dataset.",
    ],
    images: [
      {
        src: `${kits23Base}/page-4.png`,
        alt: "Final conclusions and references",
        caption: "Conclusion: InceptionV3 as the most suitable architecture",
      },
    ],
  },
  lessonsLearned: {
    id: "lessons-learned",
    title: "Lessons Learned",
    content:
      "KiTS23 provides an international platform to benchmark segmentation algorithms that can shape automation in radiology. Our study reinforced that architecture selection—not only dataset scale—drives outcomes in medical AI.",
    bullets: [
      "Multi-scale feature extraction (InceptionV3) is critical for tumors of varying size.",
      "A unified training protocol is essential for fair architecture comparison.",
      "Public challenges accelerate reproducible research and clinical translation.",
      "Future work should explore full 3D segmentation and external validation on held-out cases.",
    ],
  },
};

const semaBase = "/projects/sema-ai";

const semaAiSections: ProjectSections = {
  projectOverview: {
    id: "overview",
    title: "Overview",
    content:
      "SEMA (Semantic Analysis) is a full-stack web application that helps users upload PDF and TXT documents, search them semantically, ask grounded questions, and generate short or detailed summaries. Built as the BİL440 AI-Assisted Software Development final project at İzmir Bakırçay University, it combines a React + Vite client, Express REST API, Firebase persistence, and Google Gemini for AI features—documented in the technical report and open-sourced on GitHub.",
    bullets: [
      "Upload and organize documents with folders and soft-delete trash.",
      "Semantic and keyword search across your library.",
      "RAG-style Q&A with source document references.",
      "Per-document and free-text summarization (Turkish / English).",
      "Firebase Authentication with JWT-secured API routes.",
      "Dark-themed, responsive UI with theme customization.",
    ],
    images: [
      {
        src: `${semaBase}/sema_image1.png`,
        alt: "SEMA dashboard — document library",
        caption: "Document workspace with folders, search, and AI Q&A",
      },
      {
        src: `${semaBase}/sema_image2.png`,
        alt: "SEMA text summarization screen",
        caption: "Text Summarization — adjustable length and language",
      },
      {
        src: `${semaBase}/sema_image3.png`,
        alt: "SEMA application interface",
        caption: "Product UI — semantic analysis workflow",
      },
    ],
  },
  problemStatement: {
    id: "problem-statement",
    title: "Problem Statement",
    content:
      "Students, researchers, and professionals manage growing libraries of PDFs and notes, yet keyword search misses intent and manual summarization does not scale. Generic chat tools are not grounded in private files, which increases hallucination risk. SEMA targets a document-centric workspace where search, Q&A, and summaries stay tied to uploaded sources with clear ownership and storage.",
  },
  objectives: {
    id: "features",
    title: "Features",
    content:
      "The MVP delivers end-to-end document intelligence in the browser, aligned with user stories US-01 through US-06 from the project report.",
    bullets: [
      "PDF & TXT upload (max 10MB) with metadata in Firestore and files in Firebase Storage.",
      "Semantic search using natural-language queries and relevance-ranked results.",
      "AI Q&A over your corpus with cited source documents.",
      "Short and detailed summaries per file, plus standalone text summarization.",
      "Folder organization, rename, move, and 3-day trash before permanent delete.",
      "Secure register/login, profile settings, and session handling.",
      "Modern UI: grid/list views, breadcrumbs, context menus, and custom themes.",
    ],
    images: [
      {
        src: `${semaBase}/sema_image2.png`,
        alt: "Text summarization feature",
        caption: "Paste or type text, set length % and language, then summarize",
      },
    ],
  },
  architecture: {
    id: "architecture",
    title: "Architecture",
    content:
      "SEMA follows a three-tier design: React client (Vite, port 3000) → Express API (port 5000) → Firebase (Firestore metadata, Storage files) with Gemini invoked from backend/services/aiService.js. JWT protects routes; Multer handles uploads; pdf-parse extracts text. AI calls are isolated so the app degrades gracefully when GEMINI_API_KEY is missing.",
    bullets: [
      "Client layer: React 18, React Router, Axios, Lucide icons, Firebase Auth SDK.",
      "API layer: REST routes for auth, documents, search, ask, summarize, rename, delete.",
      "Service layer: document parsing, embedding/search logic, Gemini prompts for Q&A and summaries.",
      "Data layer: Firestore documents + Storage blobs; optional local JSON backup in development.",
      "Rejected for MVP: GraphQL and Redux—REST + component state kept the stack maintainable.",
    ],
    images: [
      {
        src: `${semaBase}/sema_image3.png`,
        alt: "SEMA UI architecture in practice",
        caption: "Client–API–Firebase flow reflected in the production UI",
      },
    ],
  },
  technologies: {
    id: "tech-stack",
    title: "Tech Stack",
    content:
      "Monorepo structure (frontend/, backend/, root npm scripts) with MIT license. Stack extracted from the repository README and final technical report.",
    bullets: [
      "Frontend: React 18, Vite, React Router, Axios, Lucide React.",
      "Backend: Node.js, Express.js, Multer, JWT, bcryptjs, pdf-parse.",
      "AI: Google Gemini API (summaries, Q&A, keywords; optional API key).",
      "Cloud: Firebase Authentication, Firestore, Firebase Storage.",
      "Tooling: npm workspaces, concurrent dev scripts, Vercel deployment notes.",
    ],
  },
  developmentProcess: {
    id: "development-process",
    title: "Development Process",
    content:
      "Development used AI-assisted user stories, iterative commits on GitHub, and documented architecture/security reviews in semaai.pdf. IDE agents accelerated UI scaffolding; humans reviewed auth, data handling, and AI outputs per the AI Decision Log.",
    bullets: [
      "Requirements → user stories with acceptance criteria (upload, search, Q&A, summarize, manage).",
      "Monorepo bootstrap: npm run install:all and .env setup for frontend and backend.",
      "API-first backend; React pages wired through Axios interceptors.",
      "Migration from local JSON to Firebase for scalable metadata and storage.",
      "Soft-delete trash to fix reappearing deleted files; folder hierarchy and breadcrumbs.",
      "Test matrix T-01–T-05 covering upload, network errors, and Q&A source display.",
    ],
  },
  challenges: {
    id: "challenges",
    title: "Challenges",
    content:
      "The technical report flags security, privacy, and AI reliability as the main risks beyond the course MVP timeline.",
    bullets: [
      "Production secrets: default JWT/Firebase fallbacks and localStorage tokens (XSS exposure).",
      "GDPR/KVKK gaps: no export/delete endpoints or privacy policy in MVP.",
      "Hallucination risk when summaries or answers drift from source text.",
      "Upload validation: extension/MIME checks without deep content scanning or rate limits.",
      "Scope control: limiting formats to PDF/TXT to reduce parser complexity.",
      "Balancing AI-assisted velocity with human review for security and UX quality.",
    ],
  },
  results: {
    id: "results",
    title: "Results",
    content:
      "SEMA meets BİL440 deliverables: ingestion, semantic search, grounded Q&A, and summarization with a deployable codebase and documented REST API. Report evaluation: Security 6/10, Ethics 7/10, License 10/10—with a clear production hardening roadmap.",
    bullets: [
      "Functional MVP: upload, search, ask, summarize, folders, trash, rename, and themes.",
      "Documented endpoints: /api/auth/*, /api/documents/* (upload, search, ask, summarize-text).",
      "Open source: github.com/Androidmedaa/sema-ai-summarizer.",
      "AI features active when GEMINI_API_KEY is set; graceful fallback otherwise.",
      "English UI and technical documentation suitable for portfolio presentation.",
    ],
    images: [
      {
        src: `${semaBase}/sema_image1.png`,
        alt: "SEMA results — document management",
        caption: "Shipped document library with AI-powered workflows",
      },
    ],
  },
  lessonsLearned: {
    id: "lessons-learned",
    title: "Lessons Learned",
    content:
      "SEMA showed that AI-assisted development speeds UI and boilerplate work but demands strict human review for secrets, privacy, and model outputs. Architecture choices (Firebase, REST, isolated AI service) matter as much as model selection for trustworthy document tools.",
    bullets: [
      "Use environment-only secrets in production—remove default JWT and Firebase fallbacks.",
      "Ground every AI answer with explicit source segments; plan confidence scores next.",
      "Prefer soft delete + clear trash UX over hard deletes for document products.",
      "Keep format scope tight (PDF/TXT) until parsers and validation are robust.",
      "Pair technical reports with a public repo README for complete project storytelling.",
    ],
  },
};

const flowerBase = "/projects/flower-classification";

const flowerClassificationSections: ProjectSections = {
  projectOverview: {
    id: "overview",
    title: "Overview",
    content:
      "This project applies deep learning to classify flower species from natural-scene images using the Flowers-5 dataset (a five-class subset derived from Oxford Flowers-102). Developed for the Computer Engineering Artificial Intelligence course at İzmir Bakırçay University, the work compares a custom TensorFlow CNN, VGG16 transfer learning, ResNet101, and AlexNet—culminating in a deployable prediction workflow and comparison of test-set accuracy across architectures.",
    bullets: [
      "5 classes: Daisy, Rose, Tulip, Dandelion, Sunflower (102 → 5 class subset).",
      "4,317 labeled images — 4,022 train, 273 validation, 22 test.",
      "224×224 RGB inputs with rescale, resize, and center crop preprocessing.",
      "Transfer learning on ImageNet-pretrained VGG16 and ResNet101.",
      "Model comparison and error analysis on held-out test images.",
      "Flowers prediction website prototype for end-user inference.",
    ],
    images: [
      {
        src: `${flowerBase}/cover.png`,
        alt: "Sample images from the Flowers-5 dataset",
        caption: "Flowers-5 — natural-scene images across five species",
      },
      {
        src: `${flowerBase}/page-1.png`,
        alt: "Project title slide",
        caption: "Flower Classification — AI course report (May 2025)",
      },
    ],
  },
  problemStatement: {
    id: "problem-statement",
    title: "Problem Statement",
    content:
      "Manual identification of flower species from photos is slow and error-prone. Automated image classification can support education, biodiversity apps, and e-commerce cataloging, but small custom datasets require careful preprocessing and transfer learning to avoid overfitting. This project asks which CNN architecture best classifies five flower types under a fixed train/val/test split.",
    images: [
      {
        src: `${flowerBase}/page-2.png`,
        alt: "Category distribution chart",
        caption: "Class distribution across the selected five categories",
      },
    ],
  },
  objectives: {
    id: "features",
    title: "Features",
    content:
      "The pipeline covers the full ML workflow from dataset curation through deployment-oriented inference.",
    bullets: [
      "Load and explore Flowers-5 (Oxford VGG–derived, high-quality field images).",
      "Preprocess: train/val/test split, resize to 224×224, center crop, RGB histogram analysis.",
      "Train custom CNN from scratch with TensorFlow/Keras.",
      "Apply transfer learning: frozen VGG16 backbone + custom Dense head (5-class softmax).",
      "Train ResNet101 (PyTorch) with frozen backbone and trainable FC layer.",
      "Evaluate AlexNet as an additional baseline.",
      "Report per-class test accuracy and confusion-style error examples.",
      "Prototype web UI for flower prediction (report deliverable).",
    ],
    images: [
      {
        src: `${flowerBase}/page-3.png`,
        alt: "Data preprocessing workflow",
        caption: "Resize, center crop, and normalization for model input",
      },
    ],
  },
  architecture: {
    id: "architecture",
    title: "Architecture",
    content:
      "VGG16 (TensorFlow/Keras): ImageNet weights, include_top=False, frozen base; Flatten → Dense(256, ReLU) → Dropout(0.5) → Dense(5, softmax). Training: Adam, categorical crossentropy, 10 epochs, ImageDataGenerator rescale=1/255. ResNet101 (PyTorch): pretrained on ImageNet, replace fc with Linear(num_features, 5), train only fc with Adam (lr=0.001), CrossEntropyLoss, early stopping (patience=10), up to 50 epochs, batch 16/8.",
    bullets: [
      "Input shape: 224×224×3 RGB, scaled to [0, 1].",
      "Regularization: dropout (0.5), weight constraints, data augmentation concepts.",
      "Transfer learning: freeze feature extractor; retrain classifier head only.",
      "Best validation checkpoint saved as best_model.pth (ResNet101).",
      "Custom CNN built from scratch for baseline comparison (TensorFlow).",
    ],
    images: [
      {
        src: `${flowerBase}/page-4.png`,
        alt: "VGG16 training accuracy and loss curves",
        caption: "VGG16 — peak training accuracy ~90% at epoch 9",
      },
      {
        src: `${flowerBase}/page-6.png`,
        alt: "ResNet101 training metrics",
        caption: "ResNet101 — validation accuracy ~93%, test accuracy 92%",
      },
    ],
  },
  technologies: {
    id: "tech-stack",
    title: "Tech Stack",
    content:
      "Tools and frameworks documented in the course report and Kaggle notebooks.",
    bullets: [
      "Python, TensorFlow/Keras, PyTorch.",
      "VGG16, ResNet101, AlexNet (ImageNet pretrained).",
      "ImageDataGenerator, OpenCV-style preprocessing (resize, crop).",
      "Adam optimizer, categorical crossentropy / cross-entropy loss.",
      "Google Colab / GPU training environment.",
      "Kaggle datasets & notebooks, Hugging Face Oxford Flowers-102 reference.",
    ],
  },
  developmentProcess: {
    id: "development-process",
    title: "Development Process",
    content:
      "The team followed a structured experimentation path: dataset selection (5 of 102 classes), exploratory data analysis (RGB histograms, size distribution), model prototyping, hyperparameter tuning, and comparative evaluation on the 22-image test set.",
    bullets: [
      "Selected 5 flower classes from Oxford Flowers-102 / Flowers-5 on Kaggle.",
      "Split data: 4,022 train / 273 val / 22 test.",
      "Implemented VGG16 transfer learning notebook (~11s training per run reported).",
      "Implemented ResNet101 with early stopping and best-model checkpointing.",
      "Logged misclassified test examples (e.g., rose vs. tulip, dandelion confusion).",
      "Built Flowers Prediction Website UI as final deliverable.",
    ],
    images: [
      {
        src: `${flowerBase}/page-5.png`,
        alt: "VGG16 test phase examples",
        caption: "Test-set predictions and misclassification examples (VGG16)",
      },
    ],
  },
  challenges: {
    id: "challenges",
    title: "Challenges",
    content:
      "Small test set (22 images) makes metrics noisy; visual similarity between species (rose/tulip, dandelion variants) drives confusion. Aspect-ratio distortion from resize-without-preserve-ratio tradeoff was accepted for fixed input dimensions.",
    bullets: [
      "Only 22 test images — high variance in reported test accuracy.",
      "Class imbalance and similar colors across species.",
      "AlexNet underperformed (60% test) despite high training metrics.",
      "Choosing transfer learning vs. fine-tuning for a 5-class subset.",
      "Normalizing inputs to match ImageNet-pretrained expectations (rescale 1/255).",
    ],
  },
  results: {
    id: "results",
    title: "Results",
    content:
      "ResNet101 achieved the best test performance (92% on 22 images, 5 errors). VGG16 reached ~90% training accuracy and 81% test. AlexNet lagged at 60% test despite ~92% training accuracy—indicating overfitting. Per-class VGG16 highlights: Daisy 100%, Dandelion 80%, Sunflower struggled most on test.",
    bullets: [
      "ResNet101 — test accuracy 92% (5/22 wrong).",
      "VGG16 — train ~90%, val ~80%, test 81% (6/22 wrong).",
      "AlexNet — test 60% (9/22 wrong).",
      "Model comparison table documented in report (epochs, loss, test acc).",
      "Kaggle notebooks and best_model published for reproducibility.",
    ],
    images: [
      {
        src: `${flowerBase}/page-7.png`,
        alt: "Flowers prediction website",
        caption: "Flowers Prediction Website — user-facing inference prototype",
      },
    ],
  },
  lessonsLearned: {
    id: "lessons-learned",
    title: "Lessons Learned",
    content:
      "Transfer learning on ImageNet backbones dramatically outperforms training from scratch on small flower datasets. Deeper models (ResNet101) generalized better than VGG16 and AlexNet on the tiny test split, but rigorous evaluation needs a larger held-out set.",
    bullets: [
      "Freeze pretrained layers and retrain only the classifier head for small datasets.",
      "Match preprocessing (224×224, rescale) to the pretrained model’s training regime.",
      "Monitor test-set confusion patterns, not only training accuracy.",
      "Early stopping and checkpointing prevent overfitting on validation loss.",
      "A simple web UI helps communicate model value beyond notebook metrics.",
    ],
  },
};

const cinemaNightBase = "/projects/cinema-night";
const cn = `${cinemaNightBase}/screenshots`;

const cinemaNightSections: ProjectSections = {
  projectOverview: {
    id: "overview",
    title: "Project Overview",
    content:
      "Cinema Night is a Windows Forms desktop application built for the Introduction to Object-Oriented Programming final project at İzmir Bakırçay University (team: Dilber Özer, Ecem Şimşek). The app gives users instant access to current and classic films, lets them follow metadata and reviews, and supports personal watchlists—while admins manage the catalog and push release notifications to logged-in members.",
    bullets: [
      "Standard membership — fixed 100 TL fee for catalog access and watchlists.",
      "Premium membership — standard fee plus 25% for rating, reviewing, and extra features.",
      "Admin role — add/delete films with posters; notify users when new titles go live.",
      "One account per user (database-enforced); profile update and account closure supported.",
      "Filter by genre, year, and IMDb score; sort by most reviewed or highest rated.",
    ],
    images: [
      {
        src: `${cn}/screen-04-0.png`,
        alt: "Cinema Night home screen",
        caption: "Main screen — film carousel, search bar, filter and sort sidebar",
      },
    ],
  },
  problemStatement: {
    id: "problem-statement",
    title: "Purpose & Scope",
    content:
      "The project aims to improve the film discovery experience on desktop: users should browse in-theater and archive titles, read up-to-date details, and submit evaluations without leaving the app. Guests can preview the catalog, but filtering, sorting, commenting, and scoring require login. Each registered user builds a private watchlist, can remove titles from it, and is billed according to membership type. Admins maintain the PostgreSQL-backed catalog without touching the database directly.",
  },
  objectives: {
    id: "objectives",
    title: "Features",
    content:
      "Core capabilities implemented across guest, Standard, Premium, and Admin flows—as documented in the project report walkthrough.",
    bullets: [
      "Guest home — browse posters; login prompt on restricted actions (filter, sort, comment, rate).",
      "Register / login — TC, demographics, membership tier; welcome or error MessageBox feedback.",
      "Film details — title, year, IMDb score, genre, director, cast, description from PostgreSQL.",
      "Premium reviews — score and comment films; view dated reviews on the comments tab.",
      "Watchlist — add/remove titles; duplicate entries blocked with user feedback.",
      "Profile — update account fields, switch Standard ↔ Premium, close account (not for admin).",
      "Admin panel — list all films, add with poster picker, edit fields, delete, clear form.",
      "Default poster asset when a new film has no image uploaded.",
      "Notifcylon toast when a new film is published after user login.",
      "Search by keyword; filter by animation genre, 2023 year, IMDb ≥ 8, and custom sorts.",
    ],
    images: [
      {
        src: `${cn}/screen-05-1.png`,
        alt: "Login screen",
        caption: "Login — routed from the home Sign In button",
      },
      {
        src: `${cn}/screen-06-0.png`,
        alt: "Registration screen with Premium tier",
        caption: "Register — Premium membership example (red username styling)",
      },
      {
        src: `${cn}/screen-09-0.png`,
        alt: "Logged-in home with film carousel",
        caption: "After login — profile, watchlist, filters, and database-driven film list",
      },
    ],
  },
  architecture: {
    id: "architecture",
    title: "Architecture & UML",
    content:
      "The application uses a WinForms front end over a C# domain layer. Kullanici is extended by PremiumKullanici and StandartKullanici; AdminKullanici manages films. Film and FilmYorum entities persist through Npgsql and ADO.NET. Forms navigate from Form1 → Login_UyeOl → role-specific shells (Standart, Premium, Admin) → Profilim and FilmDetayları variants. Poster binaries are handled with Stream and MemoryStream.",
    bullets: [
      "Form1 — guest landing page.",
      "Login_UyeOl — authentication and registration tabs.",
      "Standart / Premium — catalog, filter, search, watchlist, reviews.",
      "Admin + AdminPanel — film grid CRUD and poster upload.",
      "Profilim — account and watchlist management.",
      "FilmDetayları / FilmDetaylarıİncele — detail and comment views.",
    ],
    images: [
      {
        src: `${cinemaNightBase}/uml-diagram.svg`,
        zoomSrc: `${cinemaNightBase}/uml-diagram.svg`,
        alt: "Cinema Night WinForms UML class diagram",
        caption: "UML class diagram — all forms, fields, methods and navigation (click to zoom)",
        width: 1608,
        height: 2206,
        fullWidth: true,
      },
    ],
  },
  technologies: {
    id: "tech-stack",
    title: "Technologies Used",
    content:
      "Stack from the final report — C# on .NET Framework with Windows Forms, backed by PostgreSQL and Material Skin for the dark Cinema Night UI.",
    bullets: [
      "C# — object-oriented application logic.",
      ".NET Framework — runtime and base libraries.",
      "Windows Forms — desktop GUI (Microsoft).",
      "Visual Studio 2022 — integrated development environment.",
      "PostgreSQL — relational storage for users, films, reviews, watchlists.",
      "LINQ (Language-Integrated Query) — queries embedded in C# code.",
      "Material Skin — modern Material Design styling.",
      "Npgsql — PostgreSQL ADO.NET data provider.",
      "ADO.NET — database commands and data exchange.",
      "Stream & MemoryStream — poster image read/write.",
      "Notifcylon — visual notification toasts for new films.",
    ],
  },
  developmentProcess: {
    id: "development-process",
    title: "Implementation Highlights",
    content:
      "Report walkthrough covers the full lifecycle: guest restrictions, premium review flow, profile and membership changes, admin film insert/delete with posters, notification on login after a new release, and filter/sort/search demos.",
    bullets: [
      "Login gate — MessageBox prompts guests before filter, sort, or review actions.",
      "Admin film add — poster double-click picker, field validation, save to database.",
      "Films without posters receive the default “poster” placeholder image.",
      "Membership downgrade Premium → Standard requires re-login; data updated in PostgreSQL.",
      "Account delete — confirmation dialog; admin accounts cannot self-delete.",
      "Filter demos — animation genre, year 2023, IMDb ≥ 8, most-reviewed and top-rated sorts.",
      "Keyword search — e.g. “gump” returns matching titles from the catalog.",
    ],
    images: [
      {
        src: `${cn}/screen-10-0.png`,
        alt: "Film detail and review entry",
        caption: "Film detail — metadata tabs and Premium evaluate flow",
      },
      {
        src: `${cn}/screen-11-0.png`,
        alt: "Comments tab with user reviews",
        caption: "Comments — dated reviews and ratings from the database",
      },
      {
        src: `${cn}/screen-20-0.png`,
        alt: "Admin film management grid",
        caption: "Admin panel — view all films, add, edit, delete with posters",
      },
      {
        src: `${cn}/screen-21-0.png`,
        alt: "Admin add film with poster",
        caption: "Add film — poster picker and metadata fields",
      },
    ],
  },
  challenges: {
    id: "challenges",
    title: "Constraints & Trade-offs",
    content:
      "The course MVP focused on OOP demonstration and a complete desktop workflow rather than production hardening.",
    bullets: [
      "Role-based UI visibility — many controls disabled until login.",
      "Premium-only screens guarded before opening review forms.",
      "Poster optional — fallback image required for films without uploads.",
      "Watchlist duplicate checks handled in code with MessageBox feedback.",
      "Admin vs. user delete rules — admin account closure disabled by design.",
    ],
  },
  results: {
    id: "results",
    title: "Results",
    content:
      "The delivered application meets the report goals: an interactive film platform with tiered users, PostgreSQL persistence, Material Skin UI, Notifcylon notifications, and documented UI flows. Users can track watchlists, premium members rate and comment, and admins maintain the catalog from the desktop without SQL access.",
    bullets: [
      "Working Cinema Night desktop app from guest browse through admin CRUD.",
      "PostgreSQL integration via Npgsql and ADO.NET.",
      "Filter, sort, and keyword search over the live catalog.",
      "Instant notifications when new films are added after user login.",
      "Formal OOP final report with embedded UI captures and custom UML summary.",
    ],
    images: [
      {
        src: `${cn}/screen-33-0.png`,
        alt: "Notifcylon notification for new film",
        caption: "New film notification — Forrest Gump added by admin",
      },
      {
        src: `${cn}/screen-35-0.png`,
        alt: "Filter films by release year",
        caption: "Filter — year 2023 query results",
      },
      {
        src: `${cn}/screen-37-0.png`,
        alt: "Sort by most reviewed films",
        caption: "Sort — most reviewed films ascending",
      },
      {
        src: `${cn}/screen-40-0.png`,
        alt: "Keyword search for gump",
        caption: "Search — keyword match across film titles",
      },
    ],
  },
  lessonsLearned: {
    id: "lessons-learned",
    title: "Conclusion",
    content:
      "Cinema Night strengthens the film-watching workflow on desktop: discover titles, follow metadata, save opinions, and manage watch history through a modern Material Skin interface enriched with Notifcylon alerts. The project demonstrates successful OOP design—inheritance for user tiers, encapsulated film/review entities, and form-based navigation backed by a real database.",
    bullets: [
      "Inheritance cleanly separates Standard, Premium, and Admin behavior.",
      "Early UML planning simplified eight-form navigation.",
      "PostgreSQL + Npgsql proved reliable for a course-scale dataset.",
      "Material Skin delivered a polished dark UI with limited custom CSS.",
    ],
  },
};

const arduinoSimonBase = "/projects/arduino-simon-game";

const arduinoSimonSections: ProjectSections = {
  projectOverview: {
    id: "overview",
    title: "Overview",
    content:
      "Arduino-based Simon Says memory game developed for the İzmir Bakırçay University Embedded Systems laboratory (2024–2025). The device uses four color-matched LED and button pairs, an SSD1306 OLED display, a buzzer, and EEPROM-backed high-score storage. Players repeat an increasingly long light-and-sound sequence; correct answers advance the level, mistakes trigger visual and audio feedback before the game resets.",
    bullets: [
      "Simon-style sequence playback with four colors (green, red, blue, yellow).",
      "OLED status messages for level, score, and game-over state.",
      "Distinct buzzer tones per LED; success melody on level completion.",
      "High score persisted in EEPROM across power cycles.",
      "Hardware interrupt on pin 3 to end the current round safely.",
    ],
    images: [
      {
        src: `${arduinoSimonBase}/image7.jpeg`,
        alt: "Arduino Simon game hardware prototype",
        caption: "Embedded Systems lab project — physical prototype",
      },
    ],
  },
  problemStatement: {
    id: "problem-statement",
    title: "Problem Statement",
    content:
      "The project targets a simple, physical memory game that supports attention and working memory through multisensory feedback. The design emphasizes accessible interaction—large colored buttons, LED cues, and audio guidance—so users can practice short-term recall without a screen-based interface.",
    bullets: [
      "Combine visual (LED), auditory (buzzer), and tactile (button) cues in one flow.",
      "Keep the interaction loop understandable for non-technical users.",
      "Provide immediate feedback on correct and incorrect inputs.",
      "Allow a safe stop mechanism during play via an interrupt button.",
    ],
  },
  objectives: {
    id: "objectives",
    title: "Objectives",
    content:
      "Lab goals aligned with embedded-systems fundamentals: GPIO control, I2C display communication, non-volatile storage, and interrupt-driven event handling on Arduino Uno.",
    bullets: [
      "Build a playable Simon sequence engine with progressive difficulty.",
      "Display level and score information on a 128×64 OLED over I2C.",
      "Store and restore the highest reached level using EEPROM.",
      "Map each color to a dedicated LED, button, and buzzer frequency.",
      "Document circuit design, flow logic, and verification in a formal report.",
    ],
    images: [
      {
        src: `${arduinoSimonBase}/image2.png`,
        alt: "Simon game flow diagram",
        caption: "Game flow — setup, sequence display, input check, level advance",
      },
    ],
  },
  architecture: {
    id: "architecture",
    title: "Architecture",
    content:
      "Arduino Uno runs the game loop in C++ via Arduino IDE. Outputs: four LEDs (pins 4, 6, 8, 11) and buzzer (pin 13). Inputs: four pull-up buttons (pins 5, 7, 9, 10) and interrupt button (pin 3, FALLING edge). SSD1306 OLED (0x3C) connects over I2C using Adafruit_GFX and Adafruit_SSD1306 libraries.",
    bullets: [
      "sequence[] / userInput[] arrays hold up to 100 steps per round.",
      "showSequence() replays the pattern; readButton() debounces player input.",
      "startNewLevel() appends a random step and updates the OLED level label.",
      "gameOver() writes a new high score to EEPROM when beaten, then resets.",
      "handleInterrupt() ISR sets a flag consumed in loop() for immediate stop.",
    ],
    images: [
      {
        src: `${arduinoSimonBase}/image1.png`,
        alt: "Simon game circuit schematic",
        caption: "Circuit diagram — Arduino Uno, LEDs, buttons, OLED, buzzer",
      },
    ],
  },
  technologies: {
    id: "tech-stack",
    title: "Tech Stack",
    content: "Hardware, firmware libraries, and development tools from the laboratory report and Arduino source.",
    bullets: [
      "Arduino Uno microcontroller — main control board.",
      "4× LEDs (green, red, blue, yellow) with 220Ω / 330Ω series resistors.",
      "4× tactile push buttons (INPUT_PULLUP) and 1× interrupt button on pin 3.",
      "Piezo buzzer on pin 13 — tone() / noTone() for per-color frequencies.",
      "SSD1306 128×64 OLED over I2C (address 0x3C) via SDA/SCL.",
      "Breadboard, jumper wires, and USB Type-B programming cable.",
      "Arduino IDE 1.x — compile, upload, and serial debugging.",
      "Wire.h — I2C communication for the OLED display.",
      "Adafruit_GFX.h — text and graphics primitives.",
      "Adafruit_SSD1306.h — SSD1306 display driver.",
      "EEPROM.h — persistent high-score storage across power cycles.",
      "attachInterrupt() + ISR (handleInterrupt) — FALLING-edge stop.",
      "digitalRead(), digitalWrite(), pinMode(), delay(), randomSeed().",
      "Serial monitor — level and debug output during development.",
    ],
  },
  developmentProcess: {
    id: "development-process",
    title: "Development Process",
    content:
      "The team progressed from ideation and component selection through schematic design, firmware implementation, and bench testing. Veysel Bilici and Dilber Özer split circuit assembly, algorithm design, and report documentation; iteration focused on stable button reads, synchronized LED/audio cues, and reliable EEPROM score storage.",
    bullets: [
      "Defined pin map and pull-up wiring for four player buttons.",
      "Integrated OLED welcome and level screens in setup() / startNewLevel().",
      "Tuned delay timings for sequence playback and debouncing.",
      "Validated interrupt path and game-over reset behavior on hardware.",
      "Captured circuit, flow, and prototype photos for the final report.",
    ],
    images: [
      {
        src: `${arduinoSimonBase}/image4.png`,
        alt: "Simon game OLED interface during play",
        caption: "OLED feedback — level and score display",
      },
      {
        src: `${arduinoSimonBase}/image5.png`,
        alt: "Simon game design screenshot",
        caption: "In-game state — sequence and input phases",
      },
    ],
  },
  challenges: {
    id: "challenges",
    title: "Challenges",
    content:
      "Timing relied on delay() rather than hardware timers; button debouncing required careful tuning to avoid false triggers. The four-color palette limits sequence variety, and OLED animations were kept minimal to preserve responsiveness.",
    bullets: [
      "Synchronizing LED illumination with distinct buzzer frequencies.",
      "Avoiding bounce noise on mechanical buttons without a dedicated library.",
      "Keeping interrupt handling short — only a flag in the ISR.",
      "EEPROM byte storage caps high score range (0–254 practical values).",
    ],
  },
  results: {
    id: "results",
    title: "Results",
    content:
      "Delivered a working embedded Simon game: progressive levels, persistent high score, synchronized audio-visual feedback, and interrupt-based round termination. The prototype runs standalone on Arduino Uno with documented schematic, flow chart, and test notes from the May 2025 lab submission.",
    bullets: [
      "End-to-end playable firmware with level progression and reset flow.",
      "OLED shows level, current score, and record after game over.",
      "EEPROM retains highScore after power loss.",
      "Formal report with circuit diagram, flow chart, and team photos.",
    ],
    images: [
      {
        src: `${arduinoSimonBase}/image8.jpeg`,
        alt: "Team working on embedded Simon prototype",
        caption: "Lab collaboration — assembly and testing",
      },
      {
        src: `${arduinoSimonBase}/image9.jpeg`,
        alt: "Simon game prototype on breadboard",
        caption: "Breadboard prototype — LEDs, buttons, and OLED",
      },
    ],
  },
  lessonsLearned: {
    id: "lessons-learned",
    title: "Lessons Learned",
    content:
      "Combining GPIO, I2C peripherals, interrupts, and persistent storage on a single microcontroller clarifies how embedded products are structured from wiring through firmware. Future iterations could add difficulty scaling (speed or color count), richer OLED menus, and hardware timers instead of blocking delays.",
    bullets: [
      "Start with a clear pin map before breadboarding.",
      "Separate game state (level, waitingForInput) from display updates.",
      "Test EEPROM read/write early — uninitialized flash reads as 255.",
      "Physical prototypes surface wiring issues that simulation misses.",
    ],
  },
};

const nutukGptBase = "/projects/nutuk-gpt";

const nutukGptSections: ProjectSections = {
  projectOverview: {
    id: "overview",
    title: "Overview",
    content:
      "A character-level GPT language model trained from scratch on Nutuk (Turkish text). The project follows the Karpathy-style nanoGPT approach: custom tokenizer over the corpus, a 6-layer Transformer in PyTorch, and text generation after training on nutuk.txt.",
    bullets: [
      "Character-level vocabulary built from the Nutuk corpus.",
      "6 Transformer blocks, 6 attention heads, 256-dim embeddings.",
      "90/10 train–validation split on encoded text.",
      "Training loop with AdamW and periodic checkpoint saves.",
    ],
    images: [
      {
        src: `${nutukGptBase}/cover.png`,
        alt: "Developing GPT from Scratch — project title",
        caption: "Developing-GPT-from-Scratch",
      },
    ],
  },
  problemStatement: {
    id: "problem-statement",
    title: "Problem Statement",
    content:
      "Understanding how autoregressive language models work requires implementing attention, positional embeddings, and next-token prediction without high-level APIs. This repo uses a single Turkish historical text to keep the dataset focused while still demonstrating full training and sampling.",
  },
  objectives: {
    id: "features",
    title: "Features",
    content: "Core capabilities implemented in gpt.py and explored in gpt_dev.ipynb.",
    bullets: [
      "Load and encode nutuk.txt to integer token sequences.",
      "Causal multi-head self-attention with masked softmax.",
      "Feed-forward blocks, layer norm, and residual connections.",
      "Train/val loss tracking every 500 steps.",
      "Autoregressive text generation via multinomial sampling.",
    ],
  },
  architecture: {
    id: "architecture",
    title: "Architecture",
    content:
      "GPTLanguageModel: token + position embeddings → 6× Block (MultiHeadAttention + FeedForward) → final LayerNorm → lm_head. Hyperparameters: block_size 256, batch_size 64, max_iters 5000, lr 3e-4, dropout 0.2. Runs on CUDA, MPS, or CPU.",
  },
  technologies: {
    id: "tech-stack",
    title: "Tech Stack",
    content: "Repository stack from GitHub.",
    bullets: ["Python", "PyTorch", "Jupyter Notebook", "Character-level LM", "Transformer"],
  },
  developmentProcess: {
    id: "development-process",
    title: "Development Process",
    content:
      "Iterative development in gpt_dev.ipynb with the training script consolidated in gpt.py. Checkpoints saved during training (model_nutuk_iter_*.pth).",
  },
  challenges: {
    id: "challenges",
    title: "Challenges",
    content:
      "Large Turkish vocabulary at character level increases memory use. Long training on CPU/GPU and tuning block_size vs. context quality.",
  },
  results: {
    id: "results",
    title: "Results",
    content:
      "Working char-level GPT that learns Nutuk-style text patterns. Train and validation loss logged during training; final weights saved as model_nutuk.pth. Open source on GitHub.",
    bullets: [
      "Multi-million-parameter model (6 layers, n_embd 256).",
      "Reproducible training script and notebook.",
      "Foundation for experimenting with Turkish text generation.",
    ],
  },
  lessonsLearned: {
    id: "lessons-learned",
    title: "Lessons Learned",
    content:
      "Building GPT components from scratch clarifies how transformers predict the next character and why causal masking matters.",
    bullets: [
      "Start with a small corpus before scaling data.",
      "Monitor val loss to catch overfitting early.",
      "Separate notebook exploration from the clean training script.",
    ],
  },
};

const rotaAiBase = "/projects/rota-ai";

const rotaAiSections: ProjectSections = {
  projectOverview: {
    id: "overview",
    title: "Overview",
    content:
      "RotaAI is a smart travel assistant that helps users discover museums and attractions and build personalized daily itineraries. It combines a React + TypeScript frontend with an ASP.NET Core 9 Minimal API, Google Places data for real venues, and an AI-powered trip planner that returns timed stops with durations.",
    bullets: [
      "Explore places with filters (nature, history, art, family, etc.).",
      "Generate routes by city, date, duration (2–12h), interests, and pace.",
      "Save favorites and stored plans in one UI.",
      "TR / EN language support and mobile-friendly navigation.",
    ],
    images: [
      {
        src: `${rotaAiBase}/hero-desktop-mobile.png`,
        alt: "RotaAI desktop and mobile product mockup",
        caption: "RotaAI — responsive travel planning (desktop place detail + mobile discovery)",
        fullWidth: true,
        unoptimized: true,
      },
      {
        src: `${rotaAiBase}/logo-concepts.png`,
        alt: "RotaAI logo concept variations",
        caption: "Brand explorations — pin, compass, route map, and RA monogram",
        fullWidth: true,
        unoptimized: true,
      },
    ],
  },
  problemStatement: {
    id: "problem-statement",
    title: "Problem Statement",
    content:
      "Planning a city day trip across blogs, maps, and reviews is slow and rarely tailored to personal pace or accessibility. RotaAI centralizes discovery, venue details, and AI-generated schedules in one responsive web app.",
  },
  objectives: {
    id: "features",
    title: "Features",
    content: "Core user flows from the RotaAI application.",
    bullets: [
      "Home, Explore, Plan, Favorites, and About pages.",
      "Museum/place listing with ratings, distance, and category tags.",
      "Place detail: AI summary, reviews, contact, hours, map placeholder.",
      "Trip planner: options form or chatbot input; relaxed / medium / intense pace.",
      "Generated itinerary with timed stops, PDF/share/save actions.",
      "Add stops to route; profile and auth-ready UI.",
    ],
    images: [
      {
        src: `${rotaAiBase}/mobile-journey-screens.png`,
        alt: "RotaAI mobile journey screens",
        caption: "Designed for the journey — discovery, AI assistant, favorites, and profile",
        fullWidth: true,
        unoptimized: true,
      },
      {
        src: `${rotaAiBase}/place-detail.png`,
        alt: "Place detail page",
        caption: "Venue detail with AI summary and add-to-route",
      },
      {
        src: `${rotaAiBase}/favorites.png`,
        alt: "Favorites and saved plans",
        caption: "Favoriler — saved places and plan history",
      },
    ],
  },
  architecture: {
    id: "architecture",
    title: "Architecture",
    content:
      "React + Vite client talks to ASP.NET Core Minimal API (.NET 9). Google Places API supplies listings, details, and photos (served via backend proxy so keys stay server-side). POST /api/trip-plan builds the AI itinerary; modular service layer with CORS for local dev.",
    bullets: [
      "GET /api/museums — Izmir museums with distance.",
      "GET /api/places/{placeId} — venue details.",
      "GET /api/places/{placeId}/photo — image proxy.",
      "POST /api/trip-plan — smart daily route generation.",
    ],
    images: [
      {
        src: `${rotaAiBase}/preferences.png`,
        alt: "Trip preferences form",
        caption: "Step 1 — date, duration, interests, region",
      },
      {
        src: `${rotaAiBase}/plan-create.png`,
        alt: "AI plan creation",
        caption: "AI ile Plan Oluştur — preferences and trip intensity",
      },
    ],
  },
  technologies: {
    id: "tech-stack",
    title: "Tech Stack",
    content: "From the [RotaAI repository](https://github.com/Androidmedaa/RotaAI).",
    bullets: [
      "Frontend: React 18, TypeScript, Vite, Tailwind-style UI, Motion.",
      "Backend: .NET 9, ASP.NET Core Minimal API.",
      "Data: Google Places API.",
      "Auth-ready profile flows; environment-based API keys.",
    ],
  },
  developmentProcess: {
    id: "development-process",
    title: "Development Process",
    content:
      "Monorepo with backend API and React landing app. Local setup: Google Maps API key in appsettings, VITE_API_BASE for frontend, dotnet run + npm run dev.",
    images: [
      {
        src: `${rotaAiBase}/plan-chatbot.png`,
        alt: "Plan wizard with chatbot option",
        caption: "Planner — options vs. chatbot input",
      },
    ],
  },
  challenges: {
    id: "challenges",
    title: "Challenges",
    content:
      "Securing API keys, normalizing Places data for the UI, and designing clear step-by-step planner UX for Turkish and English users.",
  },
  results: {
    id: "results",
    title: "Results",
    content:
      "Working end-to-end demo: browse venues, view AI summaries, generate multi-stop plans with times, save plans to favorites, and export/share from the itinerary view.",
    bullets: [
      "City templates for Istanbul, Ankara, Izmir, Antalya, Bursa.",
      "Timed itinerary cards with map and detail links.",
      "Portfolio-ready full-stack graduation project.",
    ],
    images: [
      {
        src: `${rotaAiBase}/plan-result.png`,
        alt: "Generated itinerary",
        caption: "Generated plan with stops, times, and save/share",
      },
      {
        src: `${rotaAiBase}/plan-saved.png`,
        alt: "Plan saved confirmation",
        caption: "Plan saved — success feedback",
      },
      {
        src: `${rotaAiBase}/reviews.png`,
        alt: "User reviews section",
        caption: "Place reviews integrated in detail view",
      },
    ],
  },
  lessonsLearned: {
    id: "lessons-learned",
    title: "Lessons Learned",
    content:
      "Combining real map data with AI planning requires a thin API boundary and careful UX so users trust venue details before following generated routes.",
    bullets: [
      "Proxy photos and keys on the server, never in the client.",
      "Wizard + chatbot covers both guided and free-form planning.",
      "Mobile nav and i18n should be planned early for tourism apps.",
    ],
  },
};

const otherSmallProjectsBase = "/projects/other-small-projects";

const otherSmallProjectsSections: ProjectSections = {
  projectOverview: {
    id: "overview",
    title: "Overview",
    content:
      "Smaller Python side projects focused on Instagram automation and reach analytics — browser automation for repetitive profile tasks and a notebook-driven pipeline for predicting post reach.",
  },
  problemStatement: {
    id: "problem-statement",
    title: "Problem Statement",
    content: "",
  },
  objectives: {
    id: "objectives",
    title: "Objectives",
    content: "",
  },
  architecture: {
    id: "architecture",
    title: "Architecture",
    content: "",
  },
  technologies: {
    id: "technologies",
    title: "Technologies",
    content: "",
  },
  developmentProcess: {
    id: "development-process",
    title: "Development Process",
    content: "",
  },
  challenges: {
    id: "challenges",
    title: "Challenges",
    content: "",
  },
  results: {
    id: "results",
    title: "Results",
    content: "",
  },
  lessonsLearned: {
    id: "lessons-learned",
    title: "Lessons Learned",
    content: "",
  },
};

function buildPlaceholderSections(seed: number): ProjectSections {
  const img = (n: number) => cover(seed * 10 + n);
  const placeholder = (title: string, id: string, text: string): CaseStudySection => ({
    id,
    title,
    content: text,
  });

  return {
    projectOverview: {
      ...placeholder(
        "Project Overview",
        "project-overview",
        "Placeholder overview — replace with your project summary, scope, and key outcomes.",
      ),
      images: [{ src: img(1), alt: "Project overview" }],
    },
    problemStatement: placeholder(
      "Problem Statement",
      "problem-statement",
      "Describe the core user or technical problem your project addressed.",
    ),
    objectives: {
      ...placeholder(
        "Objectives",
        "objectives",
        "List the primary goals you set at the start of the project.",
      ),
      bullets: ["Objective one", "Objective two", "Objective three"],
    },
    architecture: placeholder(
      "Architecture",
      "architecture",
      "Explain system design, model structure, or product architecture.",
    ),
    technologies: {
      ...placeholder(
        "Technologies",
        "technologies",
        "Summarize the stack and tools used to deliver the solution.",
      ),
      bullets: ["Technology one", "Technology two"],
    },
    developmentProcess: placeholder(
      "Development Process",
      "development-process",
      "Walk through discovery, build, test, and iteration phases.",
    ),
    challenges: placeholder(
      "Challenges",
      "challenges",
      "Document obstacles encountered and how you responded.",
    ),
    results: placeholder(
      "Results",
      "results",
      "Share measurable outcomes, metrics, or delivered impact.",
    ),
    lessonsLearned: placeholder(
      "Lessons Learned",
      "lessons-learned",
      "Reflect on what you would repeat or change on a future iteration.",
    ),
  };
}

export const projects: Project[] = [
  {
    slug: "cinema-night-film-management",
    title: "Cinema Night — Film Management System",
    category: "Object Oriented Programming",
    year: "2024",
    shortDescription:
      "Cinema Night — WinForms film app with Standard/Premium tiers, PostgreSQL, admin CRUD, watchlists, reviews, filters, and Notifcylon notifications.",
    coverImage: `${cn}/screen-04-0.png`,
    coverObjectPosition: "center top",
    role: "Developer · Report Author",
    duration: "OOP Final Project",
    course: "Introduction to Object-Oriented Programming — İzmir Bakırçay University",
    team: "Dilber Özer, Ecem Şimşek",
    technologies: [
      "C#",
      ".NET Framework",
      "Windows Forms",
      "Visual Studio 2022",
      "PostgreSQL",
      "Npgsql",
      "ADO.NET",
      "LINQ",
      "Material Skin",
      "Notifcylon",
      "Stream / MemoryStream",
      "OOP",
      "Inheritance",
      "UML",
    ],
    gallery: "work",
    sections: cinemaNightSections,
  },
  {
    slug: "arduino-simon-game",
    title: "Arduino Simon — Embedded Memory Game",
    category: "Embedded Systems · IoT",
    year: "2025",
    shortDescription:
      "Simon Says on Arduino Uno — OLED display, LED/button pairs, buzzer feedback, EEPROM high score, and hardware interrupt.",
    coverImage: `${arduinoSimonBase}/image7.jpeg`,
    coverFit: "contain",
    coverObjectPosition: "center center",
    role: "Embedded Software Developer · Report Author",
    duration: "May 2025",
    course: "Embedded Systems Laboratory — İzmir Bakırçay University",
    team: "Dilber Özer, Veysel Bilici",
    technologies: [
      "Arduino Uno",
      "Arduino C / C++",
      "Arduino IDE",
      "Embedded Systems",
      "GPIO",
      "I2C",
      "Wire.h",
      "Adafruit GFX",
      "Adafruit SSD1306",
      "SSD1306 OLED",
      "EEPROM",
      "Hardware Interrupts",
      "ISR",
      "tone() / noTone()",
      "digitalRead / digitalWrite",
      "pinMode",
      "Serial Monitor",
      "Buzzer",
      "LED",
      "Push Buttons",
      "Breadboard",
      "220Ω Resistors",
    ],
    gallery: "work",
    sections: arduinoSimonSections,
  },
  {
    slug: "kits23-kidney-tumor-segmentation",
    title: "KiTS23 — Kidney & Tumor Segmentation",
    category: "Deep Learning · Medical Imaging",
    year: "2025",
    shortDescription:
      "Comparative study of CNN architectures for KiTS23 kidney tumor segmentation — InceptionV3 reached 92% accuracy.",
    coverImage: `${kits23Base}/page-3.png`,
    coverFit: "contain",
    coverObjectPosition: "center top",
    role: "Machine Learning Research · Report Author",
    duration: "January 2025",
    course: "KİTS23 — İzmir Bakırçay University",
    team: "Dilber Özer, Ege Bayrak",
    technologies: [
      "Python",
      "InceptionV3",
      "ResNet",
      "AlexNet",
      "GoogleNet",
      "PyTorch",
      "Google Colab",
      "NVIDIA Tesla T4",
    ],
    gallery: "work",
    sections: kits23Sections,
  },
  {
    slug: "sema-ai-summarizer",
    title: "SEMA — AI Document Search & Summarization",
    category: "Full Stack · NLP / Generative AI",
    year: "2026",
    shortDescription:
      "Semantic search, grounded Q&A, and AI summaries on PDF/TXT — React, Express, Firebase, Gemini API.",
    coverImage: `${semaBase}/sema_image2.png`,
    coverObjectPosition: "center top",
    role: "Full Stack Developer",
    duration: "BİL440 Final Project · Fall 2025–26",
    course: "BİL440 AI-Assisted Software Development — İzmir Bakırçay University",
    team: "Dilber Özer, Serhat Çakmak",
    repository: "https://github.com/Androidmedaa/sema-ai-summarizer",
    technologies: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "Firebase",
      "Gemini API",
      "JWT",
      "PDF-Parse",
      "Multer",
    ],
    gallery: "work",
    sections: semaAiSections,
  },
  {
    slug: "flower-classification-ai",
    title: "Flower Classification — Deep Learning",
    category: "Deep Learning · Computer Vision",
    year: "2025",
    shortDescription:
      "Five-class flower image classification on Flowers-5 — VGG16, ResNet101 & AlexNet compared; ResNet101 reached 92% test accuracy.",
    coverImage: `${flowerBase}/page-7.png`,
    coverObjectPosition: "center center",
    role: "Machine Learning Developer · Report Author",
    duration: "May 2025",
    course: "Artificial Intelligence — İzmir Bakırçay University",
    team: "Dilber Özer, Ümit Yılmaz",
    repository: "https://www.kaggle.com/code/cyberandroid/flower-classification-5",
    technologies: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "VGG16",
      "ResNet101",
      "AlexNet",
      "Transfer Learning",
      "Keras",
    ],
    gallery: "work",
    sections: flowerClassificationSections,
  },
  {
    slug: "nutuk-gpt-from-scratch",
    title: "GPT from Scratch — Nutuk Language Model",
    category: "Deep Learning · NLP",
    year: "2025",
    shortDescription:
      "Character-level Transformer trained on Nutuk with PyTorch — 6-layer GPT, causal attention, text generation.",
    coverImage: `${nutukGptBase}/cover.png`,
    coverFit: "contain",
    role: "Developer",
    duration: "Course project",
    technologies: ["Python", "PyTorch", "Transformer", "Jupyter"],
    repository: "https://github.com/Androidmedaa/Developing-GPT-from-Scratch",
    gallery: "work",
    sections: nutukGptSections,
  },
  {
    slug: "rota-ai",
    title: "RotaAI — AI Travel Route Planner",
    category: "Full Stack · AI / Maps",
    year: "2025",
    shortDescription:
      "Discover places and build AI day-trip plans — React, .NET 9 API, Google Places, timed itineraries.",
    coverImage: `${rotaAiBase}/hero-desktop-mobile.png`,
    coverObjectPosition: "center top",
    role: "Full Stack Developer",
    duration: "Graduation project",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      ".NET 9",
      "ASP.NET Core",
      "Google Places API",
    ],
    repository: "https://github.com/Androidmedaa/RotaAI",
    gallery: "work",
    sections: rotaAiSections,
  },
  {
    slug: "other-small-projects",
    title: "Other Small Projects",
    category: "Automation · Data Science",
    year: "2024–2025",
    shortDescription:
      "Instagram automation and reach prediction — Selenium, Beautiful Soup, and Python data science notebooks.",
    coverImage: `${otherSmallProjectsBase}/cover.svg`,
    role: "Developer",
    duration: "Side projects",
    technologies: [
      "Selenium WebDriver",
      "Beautiful Soup",
      "Python",
      "Data Science",
      "Jupyter Notebook",
      "Machine Learning",
    ],
    gallery: "work",
    sections: otherSmallProjectsSections,
    miniProjects: [
      {
        title: "Instagram Like Removal Bot",
        description:
          "This project is an Instagram Unlike Bot designed to automate the process of unliking posts on Instagram. The bot interacts with Instagram's web interface using Selenium WebDriver to automate repetitive tasks. It logs into the user's account, navigates to the profile page, selects a specific number of posts, and removes the likes from those posts.",
        technologies: ["Selenium WebDriver", "Data Science", "Beautiful Soup"],
        repository: "https://github.com/Androidmedaa/unlike_bot_instagram",
      },
      {
        title: "Instagram Reach Analysis and Prediction",
        description:
          "Insights and predictions for Instagram post reach using a week of post-level data from my own account. The workflow covers manual data collection, preprocessing, exploratory analysis (EDA) to surface patterns, supervised modeling to predict reach, and evaluation of model performance — useful as an end-to-end data science learning example for social metrics.",
        technologies: [
          "Python",
          "Jupyter Notebook",
          "Data Science",
          "Machine Learning",
          "Pandas",
          "scikit-learn",
        ],
        repository: "https://github.com/Androidmedaa/Instagram-Reach-Analysis",
      },
    ],
  },
  {
    slug: "summer-internship-dashboard",
    title: "Internship Analytics Dashboard",
    category: "Internship Project",
    year: "2024",
    shortDescription: "Internal tooling for internship program insights.",
    coverImage: cover(9),
    role: "Design Intern",
    duration: "10 weeks",
    technologies: ["Figma", "React"],
    gallery: "internships",
    sections: buildPlaceholderSections(9),
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Homepage “Projects” gallery order */
const WORK_GALLERY_ORDER = [
  "rota-ai",
  "flower-classification-ai",
  "cinema-night-film-management",
  "nutuk-gpt-from-scratch",
  "arduino-simon-game",
  "kits23-kidney-tumor-segmentation",
  "sema-ai-summarizer",
  "other-small-projects",
] as const;

export function getProjectsByGallery(
  gallery?: "work" | "internships" | "ai",
): Project[] {
  const filtered =
    !gallery
      ? projects.filter((p) => p.gallery === "work" || !p.gallery)
      : projects.filter((p) => p.gallery === gallery);

  if (gallery === "work" || !gallery) {
    const rank = new Map(WORK_GALLERY_ORDER.map((slug, index) => [slug, index]));
    return [...filtered].sort(
      (a, b) => (rank.get(a.slug) ?? 999) - (rank.get(b.slug) ?? 999),
    );
  }

  return filtered;
}
