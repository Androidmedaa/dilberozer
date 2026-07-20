export type InternshipImage = {
  src: string;
  alt: string;
  caption?: string;
  href?: string;
  /** Use contain for logos and graphics that should not be cropped */
  objectFit?: "cover" | "contain";
};

export type InternshipExperience = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  /** Optional role / scope summary (shown above highlights) */
  roleDescription?: string;
  /** What the company / product does */
  companyAbout?: string;
  highlights: string[];
  /** Process, collaboration, startup & incubator experience */
  teamAndProcess?: string[];
  technologies: string[];
  /** Photos shown at the bottom of the entry */
  images?: InternshipImage[];
};

export const internshipsPageIntro =
  "I enjoy turning ideas into software that people can use. Over the past year, I have worked in fast-moving teams and taken projects from early prototypes through backend services, APIs, and cloud deployment to production. I care about building practical, reliable solutions that create clear value.";

/** Work experience from CV — most recent first */
export const internshipExperiences: InternshipExperience[] = [
  {
    id: "bilsoft-callmetric",
    company: "CallMetric AI / BilSoft (CRM)",
    role: "Artificial Intelligence Developer",
    period: "Jun 2025 – Present",
    location: "İzmir & Düzce, Turkey",
    roleDescription:
      "I develop, test, optimize, and productionize AI-powered applications. The scope spans speech-to-text, speaker diarization, emotion analysis, LLMs/SLMs, data masking, backend services, cloud infrastructure, scalable system design, and cost analysis. I also contribute to team coordination, technical reporting, presentations, and technical meetings with AWS partners.",
    companyAbout:
      "CallMetric AI (within BilSoft’s CRM ecosystem) builds AI-powered products for analyzing sales and support calls in live CRM environments. The platform turns call audio into structured insight—transcription, speaker separation, emotion and intent signals, and retrieval-augmented assistants—so teams can coach agents, review quality, and act on customer conversations at scale.",
    highlights: [
      "Fine-tuned OpenAI Whisper on the company’s domain and call audio, reducing word error rate (WER) from ~35% to ~12% on in-domain speech.",
      "Benchmarked and optimized ASR stacks including Whisper, Parakeet, VibeVoice, and Kroko.ai; ran speaker diarization on mono recordings.",
      "Built multi-tenant RAG pipelines: grounded prompts with documents, prompt engineering, Redis worker queues, and live SQL analytics on AWS.",
      "Speech emotion: tested Wav2Vec 2.0 and fine-tuning for audio emotion; BERT-based models for text emotion; SER with PyTorch, Transformers, and Silero VAD.",
      "Sensitive data masking in text via regex and LLM-based approaches; large-scale ingestion, cleaning, and standardization for STT and RAG.",
      "Local GPU investment for LLM/SLM experiments; AWS GPU benchmarking of open models with reporting; inference efficiency via SGLang and vLLM.",
      "Model efficiency: quantization, PEFT, LoRA, and QLoRA for deployment-friendly fine-tunes.",
      "Cloud & platform: EC2, Amazon MQ, ElastiCache, IAM, CloudWatch, RDS Aurora, EKS, SageMaker AI, Route 53, load balancers, S3; scalable architecture diagrams for leadership.",
      "Infrastructure: Kubernetes, Docker Swarm, and Docker for deployment; EKS/S3/EC2 tuning, OCR PoCs, FastAPI, agentic AI, cost optimization.",
      "Real-time, low-latency speech analytics for live CRM; SQL profiling of data flows; BDDK/GDPR-aware practices; MCP, Label Studio, open-source LLMs.",
    ],
    teamAndProcess: [
      "Worked in a defined team structure with weekly sprint cadence, epic alignment, and consistent meeting and delivery discipline.",
      "Tracked work and roadmaps in Jira, Trello, and ClickUp as part of day-to-day project management.",
      "Gained familiarity with Teknopark incubation programs—how projects are scoped, applied for, and reviewed—and supported entry into another incubator initiative.",
      "Experienced startup pace firsthand: shifting priorities, lean resourcing, and shipping under uncertainty while keeping production quality bar.",
    ],
    technologies: [
      "Whisper (fine-tuned)",
      "Parakeet",
      "VibeVoice",
      "Kroko.ai",
      "PyTorch",
      "Transformers",
      "Wav2Vec 2.0",
      "BERT",
      "Silero VAD",
      "ASR",
      "Diarization",
      "Speech Emotion Recognition",
      "Quantization",
      "PEFT",
      "LoRA",
      "QLoRA",
      "LLM",
      "SLM",
      "RAG",
      "Prompt Engineering",
      "SGLang",
      "vLLM",
      "Multi-tenant RAG",
      "Redis",
      "AWS",
      "EKS",
      "SageMaker AI",
      "RDS Aurora",
      "Amazon MQ",
      "ElastiCache",
      "Kubernetes",
      "Docker Swarm",
      "Docker",
      "FastAPI",
      "OCR",
      "Agentic AI",
      "MCP",
      "Label Studio",
      "SQL",
      "Jira",
      "Trello",
      "ClickUp",
    ],
  },
  {
    id: "norm-digital-vinter",
    company: "Norm Digital (HR) / Vinter AI Recruitment",
    role: "Artificial Intelligence Developer",
    period: "2025",
    location: "Turkey",
    roleDescription:
      "During this short-term internship, I focused on expanding my professional network and quickly learning the team’s technology stack. I supported the CV data-extraction stream by transforming unstructured resume content into structured candidate fields, including JSON blob outputs for downstream candidate-screening workflows.",
    highlights: [
      "Designed an AI-driven recruitment system using LangChain, Llama, Hugging Face, FAISS, and RAG.",
      "Applied prompt engineering and semantic search to improve candidate screening accuracy.",
      "Implemented OCR-based document parsing to extract structured data from resumes.",
      "Built a recruitment intelligence system for candidate–job matching with embedding models and vector retrieval in FAISS.",
      "Compared LLM embeddings and RAG setups to select the most efficient architecture for reliable hiring insights.",
    ],
    technologies: [
      "LangChain",
      "Llama",
      "Hugging Face",
      "FAISS",
      "RAG",
      "Prompt Engineering",
      "Semantic Search",
      "OCR",
      "Embedding models",
    ],
  },
  {
    id: "expertel-proceedit",
    company: "Expertel SA / Proceedit (FinTech)",
    role: "Artificial Intelligence Developer",
    period: "Aug 2024 – Feb 2025",
    location: "Barcelona, Spain",
    roleDescription:
      "Six-month internship in an international FinTech team in Barcelona. I worked with colleagues from many countries, joined daily morning and evening Scrum-style standups on Google Meet, and coordinated across different time zones. We used Jira for task tracking and Kubernetes as part of the project stack while pushing to improve on prior ML baselines my supervisor had established.",
    highlights: [
      "Developed scalable cloud applications with Flask and GraphQL.",
      "Created pipelines for financial time-series analysis; scraped minute-level data securely using Tor and ProxyChains.",
      "Applied Kolmogorov-Arnold Networks, LSTM, and Facebook Prophet for financial forecasting, aiming to surpass previous model results.",
      "Engineered web scraping pipelines via proxy networks for complete, consistent financial data ingestion.",
      "Built automation with Selenium, Tor Proxy Controller, and Python multithreading for protected and JavaScript-heavy sites.",
      "In the final phase, focused on live web scraping of stock-market data from a popular public site—without a formal API—pulling near–real-time quotes and handling site blocks and anti-bot measures.",
      "Reported progress and blockers regularly to my supervisor; used scatter plots and other visualizations to make results and issues easy to interpret.",
    ],
    teamAndProcess: [
      "Daily morning and evening Scrum ceremonies over Google Meet with an internationally distributed team.",
      "Planned and tracked work in Jira; deployed and tested services in a Kubernetes-based environment.",
      "Collaborated across time zones on forecasting and data-pipeline goals aligned with supervisor benchmarks.",
    ],
    technologies: [
      "Flask",
      "GraphQL",
      "Python",
      "Selenium",
      "Tor",
      "ProxyChains",
      "LSTM",
      "Facebook Prophet",
      "Kolmogorov-Arnold Networks",
      "Kubernetes",
      "Jira",
      "Google Meet",
      "Scrum",
      "Time-series forecasting",
      "Anomaly detection",
      "Web scraping",
      "Data visualization",
    ],
    images: [
      {
        src: "/internships/callmetric/logo.png",
        alt: "CallMetric AI logo",
        caption: "CallMetric AI / BilSoft",
        objectFit: "contain",
      },
      {
        src: "/internships/norm-digital/office.png",
        alt: "Norm Digital / Vinter AI Recruitment office",
        caption: "Norm Digital / Vinter AI Recruitment",
      },
      {
        src: "/internships/callmetric/office.png",
        alt: "Deep Learning AI office at CallMetric",
        caption: "CallMetric — AI workspace",
      },
    ],
  },
];
