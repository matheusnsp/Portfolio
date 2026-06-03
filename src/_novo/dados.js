// Dados centralizados da versão nova (PT/EN). Edite aqui que reflete em tudo.
export const projetos = [
  {
    titulo:{pt:"Infraestrutura Segura com Windows & Linux",en:"Secure Infrastructure with Windows & Linux"},
    descricao:{pt:"Rede segura com VLANs, ACLs, NAT e firewall em roteador Cisco, testada entre Windows e Linux. Documentado em relatório técnico.",en:"Secure network with VLANs, ACLs, NAT and a firewall on a Cisco router, tested across Windows and Linux. Documented in a technical report."},
    img:{dark:"UC_logo.png",light:"UC_logo.png"},
    stack:["Windows Server","Ubuntu Linux","Cisco CLI","Firewall ACL","NAT","VLAN"],
    link:"A3_Report.pdf", linkLabel:{pt:"ver relatório",en:"view report"}
  },
  {
    titulo:{pt:"INV Botafogo — Página da Igreja",en:"INV Botafogo — Church Website"},
    descricao:{pt:"Site oficial da igreja para centralizar informações e receber novos visitantes. Design responsivo com integração a redes sociais e localização.",en:"Official church website to centralize information and welcome new visitors. Responsive design with social media and location integration."},
    img:{dark:"logo_invbB.png",light:"logo_invbL.png"},
    stack:["HTML","CSS","JavaScript","Bootstrap"],
    link:"https://invbotafogo.com.br", linkLabel:{pt:"ao vivo",en:"live"}
  },
  {
    titulo:{pt:"Portfólio Pessoal",en:"Personal Portfolio"},
    descricao:{pt:"Site interativo com minha trajetória, projetos e skills. React + Framer Motion, modo claro/escuro e layout totalmente responsivo.",en:"Interactive site with my journey, projects and skills. React + Framer Motion, light/dark mode and a fully responsive layout."},
    img:{dark:"portfolioB.png",light:"portfolioL.png"},
    stack:["React","Framer Motion","JavaScript","CSS","HTML"],
    link:"https://github.com/matheusnsp/Portfolio", linkLabel:{pt:"código",en:"code"}
  },
  {
    titulo:{pt:"Dash — Dashboard Financeiro",en:"Dash — Financial Dashboard"},
    descricao:{pt:"App full stack de finanças pessoais com foco em segurança: autenticação e Row Level Security via Supabase para isolar dados, com deploy automatizado.",en:"Full stack personal finance app focused on security: authentication and Row Level Security via Supabase for data isolation, with automated deploy."},
    img:{dark:"dash.jpeg",light:"dash.jpeg"},
    stack:["JavaScript","Supabase","PostgreSQL","Netlify","HTML","CSS"],
    link:"https://github.com/matheusnsp/Dash", linkLabel:{pt:"código",en:"code"}
  }
];

export const skills = [
  {titulo:{pt:"Linguagens de Programação",en:"Programming Languages"},itens:[
    {name:"Python",img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"},
    {name:"Java",img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"},
    {name:"JavaScript",img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"},
    {name:"HTML",img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"},
    {name:"CSS",img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"}
  ]},
  {titulo:{pt:"Cibersegurança e Infraestrutura",en:"Cybersecurity and Infrastructure"},itens:[
    {name:"Linux",img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"},
    {name:"Wireshark",img:"https://cdn.simpleicons.org/wireshark/1679A7"},
    {name:"Networking",img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ssh/ssh-original.svg"},
    {name:"IAM",img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg"}
  ]},
  {titulo:{pt:"Frameworks e Bibliotecas",en:"Frameworks and Libraries"},itens:[
    {name:"React",img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"},
    {name:"Node.js",img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"},
    {name:"ASP.NET",img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg"}
  ]},
  {titulo:{pt:"DevOps e Ferramentas",en:"DevOps and Tools"},itens:[
    {name:"Git",img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"},
    {name:"Docker",img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"},
    {name:"Supabase",img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg"},
    {name:"Netlify",img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg"},
    {name:"VS Code",img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"},
    {name:"Vercel",img:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg"}
  ]}
];

export const experiencias = [
  {
    atual:true,
    cargo:{pt:"Coordenador de Infraestrutura e Segurança (Voluntário)",en:"IT Infrastructure & Security Coordinator (Volunteer)"},
    periodo:{pt:"Mar 2026 – Presente",en:"Mar 2026 – Present"},
    org:{pt:"Cruz Vermelha Brasileira — Rio de Janeiro",en:"Brazilian Red Cross — Rio de Janeiro"},
    techs:["Redes L2/L3","IAM","CFTV IP","Segurança de Ativos","Hardware"],
    feitos:{pt:["Auditoria técnica e diagnóstico do parque tecnológico, otimizando inventário e ciclo de vida.","Protocolos de descarte seguro de dados e controle de ativos de armazenamento (HDDs).","Manutenção de conectividade crítica e expansão da rede para novos setores.","Reestruturação do monitoramento remoto e segurança eletrônica, com foco em IAM."],en:["Technical auditing and full diagnostics of the hardware park, optimizing inventory and lifecycle.","Secure data decommissioning protocols and control of storage assets (HDDs).","Critical connectivity maintenance and network expansion for new departments.","Restructured remote monitoring and electronic security, focusing on IAM."]},
    resultado:{pt:"Modernização da infraestrutura de TI e mitigação de riscos de vazamento de dados.",en:"Modernized IT infrastructure and mitigated data breach risks."}
  },
  {
    atual:false,
    cargo:{pt:"Estagiário de Desenvolvimento de IA e Robótica",en:"AI & Robotics Development Intern"},
    periodo:{pt:"Jul 2024 – Nov 2024",en:"Jul 2024 – Nov 2024"},
    org:{pt:"Projeto “A Series of Beta Tests” — Robot De Niro (University of Canberra)",en:"Project “A Series of Beta Tests” — Robot De Niro (University of Canberra)"},
    techs:["Python 3.12","GPT-4 / OpenAI","Whisper","Eleven Labs","React Native","VTube Studio"],
    feitos:{pt:["Plataforma interativa com IA generativa para um robô teatral, focada em improvisação.","Pipeline em tempo real, reduzindo a latência de 7,5s para 4,2s (percebida em 1,3s).","Integração das APIs Whisper (fala) e Eleven Labs (voz) para respostas dinâmicas.","Avatar digital (VTuber) e módulos de UI/UX integrados a app Android."],en:["Interactive generative-AI platform for a theatrical robot, focused on improvisation.","Real-time pipeline, cutting latency from 7.5s to 4.2s (perceived at 1.3s).","Integrated Whisper (speech) and Eleven Labs (voice) APIs for dynamic responses.","Digital avatar (VTuber) and UI/UX modules integrated with an Android app."]},
    resultado:{pt:"Demonstração do robô no Questacon Science Museum (Austrália), destacando inovação humano-robô.",en:"Demonstrated the robot at the Questacon Science Museum (Australia), showcasing human-robot innovation."}
  }
];

export const certs = [
  {nome:"SC-900: Security, Compliance & Identity",issuer:"Microsoft",sigla:"MS",cor:"#38bdf8",ano:2025,area:{pt:"Cibersegurança",en:"Cybersecurity"}},
  {nome:"SAP BTP + S/4HANA",issuer:"Lab2Learn",sigla:"SAP",cor:"#4ade80",ano:2025,area:{pt:"Cloud / ERP",en:"Cloud / ERP"}},
  {nome:{pt:"Oratória e Comunicação",en:"Public Speaking & Communication"},issuer:"Clube da Fala",sigla:"CF",cor:"#f59e0b",ano:2025,area:{pt:"Soft skills",en:"Soft skills"}},
  {nome:"Introduction to Mobile Development",issuer:"Meta",sigla:"M",cor:"#a78bfa",ano:2023,area:{pt:"Mobile",en:"Mobile"}}
];

export const idiomas = [
  { nomePt: "Português", nomeEn: "Portuguese", nivelPt: "Nativo", nivelEn: "Native", bandeira: "https://flagcdn.com/w80/br.png" },
  { nomePt: "Inglês", nomeEn: "English", nivelPt: "Fluente", nivelEn: "Fluent", bandeira: "https://flagcdn.com/w160/gb.png" }
];

export const contatos = [
  {k:{pt:"E-mail",en:"Email"},v:"matheusnevessp@gmail.com",href:"mailto:matheusnevessp@gmail.com",ic:"mail"},
  {k:"LinkedIn",v:"/in/matheusnsp",href:"https://www.linkedin.com/in/matheusnsp",ic:"linkedin"},
  {k:"GitHub",v:"@matheusnsp",href:"https://github.com/matheusnsp",ic:"github"}
];

// stats POR ÚLTIMO — ele conta projetos, skills, certs e idiomas,
// então precisa vir depois de todos eles.
export const stats = [
  {alvo: projetos.length, plus:true, lbl:{pt:"projetos",en:"projects"}},
  {alvo: skills.reduce((soma, cat) => soma + cat.itens.length, 0), plus:true, lbl:{pt:"tecnologias",en:"technologies"}},
  {alvo: certs.length, plus:false, lbl:{pt:"certificações",en:"certifications"}},
  {alvo: idiomas.length, plus:false, lbl:{pt:"idiomas",en:"languages"}}
];