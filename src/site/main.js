import {
  BufferGeometry, Color, Float32BufferAttribute, MathUtils, NormalBlending, PerspectiveCamera, Points, Scene, ShaderMaterial, Vector3, WebGLRenderer
} from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './style.css';

(() => {
  // "Reduzir movimento" do sistema: o retrato e as transições continuam (a explosão segue a rolagem),
  // mas saem os movimentos contínuos e decorativos (rolagem suavizada, cursor, botões magnéticos)
  const PREFERS_REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const REDUCED = false;
  const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const PHOTO = "/img/retrato.webp";
  gsap.registerPlugin(ScrollTrigger);
  // sempre abre no topo, com o retrato montado
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  scrollTo(0, 0);
  ScrollTrigger.config({ ignoreMobileResize: true });

  /* ================= conteúdo PT/EN ================= */
  const age = (() => { const n = new Date(), b = new Date(2004, 1, 9); let a = n.getFullYear() - b.getFullYear(); if (n < new Date(n.getFullYear(), 1, 9)) a--; return a; })();

  const T = {
    pt: {
      loader: 'Portfólio · 2026', view: 'Ver', nav_about: 'Sobre', nav_journey: 'Trajetória', nav_work: 'Projetos', nav_contact: 'Contato',
      available: 'Disponível', m_sec: 'Cibersegurança', m_ai: 'Inteligência artificial',
      hero_p: 'Construo sistemas que as pessoas usam e protejo a infraestrutura que roda por trás deles.', scroll: 'Role para entrar',
      about: 'Sobre',
      manifesto: `Tenho ${age} anos, moro no Rio de Janeiro e sou engenheiro de software formado na Austrália. Passei quatro anos em Canberra, onde estudei cibersegurança e dei voz a um robô de teatro com IA. Hoje cuido da infraestrutura e da segurança da <em>Cruz Vermelha Brasileira</em> e construo sistemas que vão para produção.`,
      f1k: 'Formação', f1: 'Engenharia de Software, University of Canberra. GPA 5,67/7.',
      f2k: 'Idiomas', f2: 'Português nativo. Inglês fluente, depois de 4 anos na Austrália.',
      f3k: 'Certificações', f3: 'Microsoft SC-900. CompTIA Security+ em andamento, previsão jan/2027.',
      f4k: 'Como trabalho', f4: 'Scrum, GitHub e comunicação clara. Curso de oratória no Clube da Fala.',
      journey: 'Trajetória',
      s1: 'alunos cadastrados no sistema da escola da Cruz Vermelha, em produção.', s2v: '4,2<small>s</small>',
      s2: 'de latência no robô De Niro, que antes respondia em 7,5s.', s3: 'projetos publicados, de sites para clientes a ferramentas de pentest.',
      work: 'Trabalhos selecionados', work_hint: 'Clique num projeto para ver a história completa',
      kit: 'Arsenal', contact: 'Contato', big: 'Vamos construir<br>algo juntos?', cv: 'Currículo', made: 'Feito no Rio de Janeiro',
      close: 'Fechar', prev: 'Anterior', next: 'Próximo projeto', copied: 'E-mail copiado',
      context: 'Contexto', did: 'O que fiz', outcome: 'Resultado', role: 'Papel', stack: 'Tecnologias', links: 'Links',
      filters: { all: 'Todos', sec: 'Segurança e infra', web: 'Sistemas web', client: 'Clientes' },
      cvUrl: '/cv-matheus-neves.pdf'
    },
    en: {
      loader: 'Portfolio · 2026', view: 'View', nav_about: 'About', nav_journey: 'Journey', nav_work: 'Work', nav_contact: 'Contact',
      available: 'Available', m_sec: 'Cybersecurity', m_ai: 'Artificial intelligence',
      hero_p: 'I build systems people use and secure the infrastructure that runs behind them.', scroll: 'Scroll to enter',
      about: 'About',
      manifesto: `I'm ${age}, based in Rio de Janeiro, and a software engineer who graduated in Australia. I spent four years in Canberra, studying cybersecurity and giving a voice to an AI theatre robot. Today I run infrastructure and security at the <em>Brazilian Red Cross</em> and build systems that ship to production.`,
      f1k: 'Education', f1: 'Software Engineering, University of Canberra. GPA 5.67/7.',
      f2k: 'Languages', f2: 'Native Portuguese. Fluent English after 4 years in Australia.',
      f3k: 'Certifications', f3: 'Microsoft SC-900. CompTIA Security+ in progress, due Jan 2027.',
      f4k: 'How I work', f4: 'Scrum, GitHub and clear communication. Public speaking course at Clube da Fala.',
      journey: 'Journey',
      s1: 'students registered in the Red Cross school system, live in production.', s2v: '4.2<small>s</small>',
      s2: 'latency on the De Niro robot, down from 7.5s.', s3: 'published projects, from client websites to pentest tools.',
      work: 'Selected work', work_hint: 'Click a project to read the full story',
      kit: 'Toolkit', contact: 'Contact', big: "Let's build<br>something together?", cv: 'Résumé', made: 'Made in Rio de Janeiro',
      close: 'Close', prev: 'Previous', next: 'Next project', copied: 'Email copied',
      context: 'Context', did: 'What I did', outcome: 'Outcome', role: 'Role', stack: 'Stack', links: 'Links',
      filters: { all: 'All', sec: 'Security & infra', web: 'Web systems', client: 'Clients' },
      cvUrl: '/resume-matheus-neves.pdf'
    }
  };

  const CHAPTERS = [
    { place: { pt: 'Canberra', en: 'Canberra' }, coord: '35.28°S 149.13°E', when: { pt: 'Até 2024', en: 'Until 2024' },
      title: { pt: 'Engenharia de Software', en: 'Software Engineering' },
      text: { pt: 'Quatro anos morando na Austrália. Bacharelado em Engenharia de Software na University of Canberra, com ênfase em cibersegurança, concluído em dezembro de 2024.',
              en: 'Four years living in Australia. Bachelor of Software Engineering at the University of Canberra, with a cybersecurity focus, completed in December 2024.' } },
    { place: { pt: 'Canberra', en: 'Canberra' }, coord: '35.28°S 149.13°E', when: { pt: 'Jul — Nov 2024', en: 'Jul — Nov 2024' },
      title: { pt: 'Robot De Niro', en: 'Robot De Niro' },
      text: { pt: 'Estagiário de IA e Robótica. Construí a plataforma que dava voz a um robô de teatro, com GPT-4, Whisper e Eleven Labs em tempo real. Reduzi a latência de 7,5s para 4,2s, percebida em 1,3s. O robô foi apresentado no Questacon Science Museum.',
              en: 'AI & Robotics intern. I built the platform that gave a theatre robot its voice, running GPT-4, Whisper and Eleven Labs in real time. I cut latency from 7.5s to 4.2s, perceived at 1.3s. The robot was showcased at the Questacon Science Museum.' } },
    { place: { pt: 'Rio de Janeiro', en: 'Rio de Janeiro' }, coord: '22.90°S 43.17°W', when: { pt: 'Fev 2026 — agora', en: 'Feb 2026 — now' },
      title: { pt: 'Cruz Vermelha Brasileira', en: 'Brazilian Red Cross' },
      text: { pt: 'Coordenador de Infraestrutura e Segurança. Auditei o parque tecnológico, criei protocolos de descarte seguro de dados, expandi e segmentei a rede e reestruturei o monitoramento com foco em IAM. Também projetei o sistema da escola, hoje com 350 alunos.',
              en: 'IT Infrastructure & Security Coordinator. I audited the hardware park, set up secure data disposal, expanded and segmented the network and rebuilt monitoring around IAM. I also designed the school system, now serving 350 students.' } },
    { place: { pt: 'Próximo capítulo', en: 'Next chapter' }, coord: '2027', when: { pt: 'Em andamento', en: 'In progress' },
      title: { pt: 'Security+ e o próximo time', en: 'Security+ and the next team' },
      text: { pt: 'Estou concluindo a CompTIA Security+. Procuro vagas de Analista de Segurança (SOC N1) ou de Infraestrutura e Segurança, e sigo aceitando projetos web como freelancer.',
              en: "I'm completing CompTIA Security+. I'm looking for Security Analyst (SOC L1) or Infrastructure & Security roles, and I still take on freelance web projects." } }
  ];

  const PROJECTS = [
    { id: 'cvb', cat: 'web', img: '/img/cvb.webp',
      title: { pt: 'Cruz Vermelha — Gestão Escolar', en: 'Red Cross — School Management' },
      tag: { pt: 'Sistema web · em produção', en: 'Web system · in production' },
      role: { pt: 'Concepção, desenvolvimento e operação', en: 'Design, development and operations' },
      stack: ['Node.js', 'Express', 'EJS', 'Prisma', 'PostgreSQL', 'Supabase', 'Unicopag', 'Zod'],
      context: { pt: 'A Escola de Educação e Saúde da Cruz Vermelha Brasileira no Rio precisava receber inscrições e pagamentos online e organizar cursos, turmas e alunos num lugar só.',
                 en: 'The Brazilian Red Cross School of Education and Health in Rio needed to take enrollments and payments online and manage courses, classes and students in one place.' },
      did: { pt: ['Inscrições online com pagamento por PIX e cartão e confirmação automática via webhook.', 'Painel administrativo para cursos, turmas, matrículas, alunos, notas e financeiro.', 'Desenvolvimento seguro: senhas com argon2id, proteção CSRF, rate limiting, validação com Zod e controle de acesso por perfil.', 'Banimento automático por atividade suspeita e modelo de dados adequado à LGPD.'],
             en: ['Online enrollment with PIX and card payments, confirmed automatically via webhook.', 'Admin dashboard for courses, classes, enrollments, students, grades and finances.', 'Secure by design: argon2id password hashing, CSRF protection, rate limiting, Zod input validation and role-based access control.', 'Automatic banning on suspicious activity and a data model aligned with LGPD (Brazil’s data protection law).'] },
      outcome: { pt: 'Em produção com 350 alunos cadastrados e crescendo desde o lançamento.', en: 'Live in production with 350 registered students and growing since launch.' },
      links: [{ l: { pt: 'Ver ao vivo', en: 'Visit site' }, u: 'https://escola.cursoscruzvermelha.org' }] },
    { id: 'netscan', cat: 'sec', img: '/img/netscan.webp',
      title: { pt: 'NetScan', en: 'NetScan' },
      tag: { pt: 'Segurança ofensiva · ferramenta própria', en: 'Offensive security · own tool' },
      role: { pt: 'Projeto pessoal', en: 'Personal project' },
      stack: ['Python', 'ThreadPoolExecutor', 'NVD/NIST API', 'Pytest', 'Networking', 'CVE'],
      context: { pt: 'Uma ferramenta para a fase de reconhecimento de um pentest, que junta descoberta de hosts, varredura e pesquisa de vulnerabilidades num fluxo só.',
                 en: 'A tool for the reconnaissance phase of a pentest that brings host discovery, scanning and vulnerability lookup into a single flow.' },
      did: { pt: ['Descoberta de hosts na rede via ARP.', 'Varredura TCP concorrente com ThreadPoolExecutor e banner grabbing.', 'Correlação automática dos serviços encontrados com CVEs pela API da NVD/NIST.', 'Relatórios em HTML, JSON e CSV, com testes em Pytest.'],
             en: ['Host discovery over ARP.', 'Concurrent TCP scanning with ThreadPoolExecutor and banner grabbing.', 'Automatic matching of discovered services to CVEs via the NVD/NIST API.', 'Reports in HTML, JSON and CSV, tested with Pytest.'] },
      outcome: { pt: 'Código aberto no GitHub.', en: 'Open source on GitHub.' },
      links: [{ l: { pt: 'Ver código', en: 'View code' }, u: 'https://github.com/matheusnsp/NetScan' }] },
    { id: 'infra', cat: 'sec', img: '/img/uc.webp', logo: true,
      title: { pt: 'Infraestrutura segura com Windows e Linux', en: 'Secure infrastructure with Windows & Linux' },
      tag: { pt: 'Infraestrutura · projeto acadêmico', en: 'Infrastructure · academic project' },
      role: { pt: 'Projeto na University of Canberra', en: 'University of Canberra project' },
      stack: ['Windows Server', 'Ubuntu Linux', 'Active Directory', 'Cisco CLI', 'VLAN', 'ACL', 'NAT'],
      context: { pt: 'Desenhar e implantar uma rede corporativa segura e justificar cada controle aplicado.',
                 en: 'Design and deploy a secure corporate network and justify every control applied.' },
      did: { pt: ['Rede com Windows Server, Ubuntu Linux e Active Directory.', 'Segmentação com VLANs, ACLs e NAT em roteador Cisco com firewall.', 'Testes de conectividade e de bloqueio entre máquinas Windows e Linux.', 'Relatório técnico com a justificativa dos controles.'],
             en: ['Network with Windows Server, Ubuntu Linux and Active Directory.', 'Segmentation with VLANs, ACLs and NAT on a Cisco router with firewall.', 'Connectivity and blocking tests across Windows and Linux machines.', 'Technical report justifying each control.'] },
      outcome: { pt: 'Documentado em relatório técnico.', en: 'Documented in a technical report.' },
      links: [{ l: { pt: 'Ler relatório', en: 'Read report' }, u: '/A3_Report.pdf' }] },
    { id: 'dash', cat: 'web', img: '/img/dash.webp',
      title: { pt: 'Dash', en: 'Dash' },
      tag: { pt: 'Full stack · finanças', en: 'Full stack · finance' },
      role: { pt: 'Projeto pessoal', en: 'Personal project' },
      stack: ['JavaScript', 'Supabase', 'PostgreSQL', 'Netlify', 'HTML', 'CSS'],
      context: { pt: 'Um app de finanças pessoais em que cada usuário só enxerga os próprios dados.',
                 en: 'A personal finance app where each user can only ever see their own data.' },
      did: { pt: ['Autenticação com Supabase.', 'Row Level Security no PostgreSQL, aplicando menor privilégio na camada de dados.', 'Deploy automatizado no Netlify.'],
             en: ['Authentication with Supabase.', 'PostgreSQL Row Level Security, enforcing least privilege at the data layer.', 'Automated deploys on Netlify.'] },
      outcome: { pt: 'Código aberto no GitHub.', en: 'Open source on GitHub.' },
      links: [{ l: { pt: 'Ver código', en: 'View code' }, u: 'https://github.com/matheusnsp/Dash' }] },
    { id: 'portfolio', cat: 'web', img: '/img/portfolio.webp',
      title: { pt: 'Portfólio pessoal', en: 'Personal portfolio' },
      tag: { pt: 'Pessoal · WebGL', en: 'Personal · WebGL' },
      role: { pt: 'Projeto pessoal', en: 'Personal project' },
      stack: ['React', 'Vite', 'Three.js', 'GSAP', 'Lenis', 'WebGL'],
      context: { pt: 'Um site para contar minha trajetória e mostrar meus projetos.', en: 'A site to tell my story and show my projects.' },
      did: { pt: ['Retrato em partículas com WebGL que reage ao mouse e explode ao rolar.', 'Rolagem suave, animações por cena e páginas de projeto em tela cheia.', 'Conteúdo bilíngue (PT/EN), publicado no GitHub Pages com domínio próprio.'],
             en: ['WebGL particle portrait that reacts to the mouse and bursts on scroll.', 'Smooth scrolling, scene-by-scene motion and full-screen project pages.', 'Bilingual content (PT/EN), deployed to GitHub Pages on a custom domain.'] },
      outcome: { pt: 'Código aberto no GitHub.', en: 'Open source on GitHub.' },
      links: [{ l: { pt: 'Ver código', en: 'View code' }, u: 'https://github.com/matheusnsp/Portfolio' }] },
    { id: 'catia', cat: 'client', img: '/img/catia.webp',
      title: { pt: 'Catia Poggian', en: 'Catia Poggian' },
      tag: { pt: 'Cliente · site institucional', en: 'Client · brand website' },
      role: { pt: 'Site para cliente', en: 'Client website' },
      stack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Vercel'],
      context: { pt: 'Catia Poggian é consultora e mentora de imagem e precisava de um site para apresentar serviços, explicar o método e captar clientes.',
                 en: 'Catia Poggian is an image consultant and mentor who needed a site to present her services, explain her method and bring in clients.' },
      did: { pt: ['Site bilíngue com serviços e método.', 'Captação de leads e newsletter.', 'Integração com redes sociais, layout responsivo e publicação na Vercel.'],
             en: ['Bilingual site covering services and method.', 'Lead capture and newsletter.', 'Social media integration, responsive layout and deploy on Vercel.'] },
      outcome: { pt: 'No ar em catiapoggian.com.', en: 'Live at catiapoggian.com.' },
      links: [{ l: { pt: 'Ver ao vivo', en: 'Visit site' }, u: 'https://www.catiapoggian.com' }] },
    { id: 'inv', cat: 'client', img: '/img/inv.webp', logo: true,
      title: { pt: 'INV Botafogo', en: 'INV Botafogo' },
      tag: { pt: 'Cliente · site da igreja', en: 'Client · church website' },
      role: { pt: 'Site para cliente', en: 'Client website' },
      stack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      context: { pt: 'O site oficial da igreja, para centralizar informações e receber novos visitantes.',
                 en: 'The church’s official website, to centralize information and welcome new visitors.' },
      did: { pt: ['Informações da igreja reunidas num lugar só.', 'Integração com redes sociais e localização.', 'Design responsivo com Bootstrap.'],
             en: ['Church information gathered in one place.', 'Social media and location integration.', 'Responsive design with Bootstrap.'] },
      outcome: { pt: 'No ar em invbotafogo.com.br.', en: 'Live at invbotafogo.com.br.' },
      links: [{ l: { pt: 'Ver ao vivo', en: 'Visit site' }, u: 'https://invbotafogo.com.br' }] }

  ];

  const KIT = [
    { k: { pt: 'Segurança', en: 'Security' }, items: { pt: ['IAM', 'Active Directory', 'Hardening Windows e Linux', 'LGPD', 'OWASP', 'Descarte seguro de dados', 'Gestão de riscos'], en: ['IAM', 'Active Directory', 'Windows & Linux hardening', 'LGPD', 'OWASP', 'Secure data disposal', 'Risk management'] } },
    { k: { pt: 'Redes', en: 'Networking' }, items: { pt: ['TCP/IP', 'Wireshark', 'VLANs L2/L3', 'Cisco ACL e NAT', 'Monitoramento', 'Enumeração de ativos'], en: ['TCP/IP', 'Wireshark', 'L2/L3 VLANs', 'Cisco ACL & NAT', 'Monitoring', 'Asset enumeration'] } },
    { k: { pt: 'Desenvolvimento', en: 'Development' }, items: { pt: ['Python', 'JavaScript', 'Java', 'React', 'Node.js e Express', 'PostgreSQL e Prisma', 'Supabase'], en: ['Python', 'JavaScript', 'Java', 'React', 'Node.js & Express', 'PostgreSQL & Prisma', 'Supabase'] } },
    { k: { pt: 'Ferramentas', en: 'Tools' }, items: { pt: ['Linux', 'Windows Server', 'Docker', 'Git e GitHub', 'Bash e PowerShell', 'Vercel e Netlify'], en: ['Linux', 'Windows Server', 'Docker', 'Git & GitHub', 'Bash & PowerShell', 'Vercel & Netlify'] } }
  ];

  let lang = null;
  try { lang = localStorage.getItem('mn-lang'); } catch (e) {}
  if (lang !== 'pt' && lang !== 'en') lang = (navigator.language || 'pt').toLowerCase().startsWith('pt') ? 'pt' : 'en';
  let filter = 'all', chapterIdx = 0, caseIdx = -1;
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const pad = n => String(n).padStart(2, '0');

  /* ================= montagem do conteúdo ================= */
  $$('[data-split]').forEach(el => { el.innerHTML = [...el.textContent].map(c => `<span class="ch" aria-hidden="true">${c}</span>`).join(''); });

  const wrapWords = node => {
    [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(t => {
          if (!t) return;
          if (/^\s+$/.test(t)) frag.appendChild(document.createTextNode(t));
          else { const s = document.createElement('span'); s.className = 'w'; s.textContent = t; frag.appendChild(s); }
        });
        n.replaceWith(frag);
      } else wrapWords(n);
    });
  };

  const renderChapters = () => {
    const box = $('#chapters');
    if (!box.children.length) box.innerHTML = CHAPTERS.map((c, i) => `<article class="chapter" data-ch="${i}"></article>`).join('');
    CHAPTERS.forEach((c, i) => {
      box.children[i].innerHTML = `<span class="mono" style="color:var(--amber)">${pad(i + 1)} — ${c.when[lang]}<span class="ch-inline"> · ${c.place[lang]}</span></span><h3>${c.title[lang]}</h3><p>${c.text[lang]}</p>`;
    });
  };
  const setChapter = (i, animate) => {
    chapterIdx = i;
    const c = CHAPTERS[i];
    $('#ch-when').textContent = c.when[lang];
    $('#ch-place span').dataset.l = lang;
    $('#ch-coord').textContent = c.coord;
    const span = $('#ch-place span');
    if (span.textContent !== c.place[lang] || animate === 'force') {
      span.textContent = c.place[lang];
      if (animate && !REDUCED) gsap.fromTo(span, { yPercent: 100 }, { yPercent: 0, duration: .9, ease: 'expo.out' });
    }
    $('#ch-bar').style.transform = `scaleX(${(i + 1) / CHAPTERS.length})`;
    $$('.chapter').forEach((el, k) => el.classList.toggle('on', k === i));
  };

  const renderFilters = () => {
    $('#filters').innerHTML = Object.entries(T[lang].filters).map(([k, v]) =>
      `<button type="button" class="chip" data-filter="${k}" aria-pressed="${k === filter}">${v}</button>`).join('');
  };
  const renderRows = () => {
    const list = PROJECTS.map((p, i) => ({ p, i })).filter(({ p }) => filter === 'all' || p.cat === filter);
    $('#rows').innerHTML = list.map(({ p, i }) => `
      <button type="button" class="row" data-open="${i}" data-view>
        <span class="r-idx">${pad(i + 1)}</span>
        <span class="r-title">${p.title[lang]}</span>
        <span class="r-cat">${p.tag[lang].split(' · ')[0]}</span>
        <span class="r-stack">${p.stack.slice(0, 3).join(' · ')}</span>
        <span class="r-go" aria-hidden="true">↗</span>
        <span class="r-thumb${p.logo ? ' logo' : ''}"><img src="${p.img}" alt="" loading="lazy"></span>
      </button>`).join('');
  };
  const renderKit = () => {
    $('#kit').innerHTML = KIT.map(g => `<div class="kit-col"><span class="mono muted">${g.k[lang]}</span><ul>${g.items[lang].map(x => `<li>${x}</li>`).join('')}</ul></div>`).join('');
  };
  const renderBig = () => {
    const big = $('#big');
    big.setAttribute('aria-label', T[lang].big.replace('<br>', ' '));
    big.innerHTML = T[lang].big.split('<br>').map(part => [...part].map(c => c === ' ' ? ' ' : `<span class="l" aria-hidden="true">${c}</span>`).join('')).join('<br>');
  };

  const renderCase = () => {
    const p = PROJECTS[caseIdx], t = T[lang], nxt = PROJECTS[(caseIdx + 1) % PROJECTS.length];
    $('#case-count').textContent = `${pad(caseIdx + 1)} / ${pad(PROJECTS.length)}`;
    $('#case-prev').setAttribute('aria-label', t.prev);
    $('#case-next-top').setAttribute('aria-label', t.next);
    $('#case-body').innerHTML = `
      <div class="case-head">
        <span class="mono" style="color:var(--amber)">${p.tag[lang]}</span>
        <h2 id="case-title">${p.title[lang]}</h2>
      </div>
      <figure class="case-media${p.logo ? ' logo' : ''}"><img src="${p.img}" alt="${p.title[lang]}"></figure>
      <div class="case-grid">
        <aside class="case-aside">
          <dl>
            <div><dt class="mono muted">${t.role}</dt><dd>${p.role[lang]}</dd></div>
            <div><dt class="mono muted">${t.stack}</dt><dd class="stack">${p.stack.map(s => `<span>${s}</span>`).join('')}</dd></div>
            <div><dt class="mono muted">${t.links}</dt><dd class="links">${p.links.map(l => `<a class="btn sm" href="${l.u}" target="_blank" rel="noopener">${l.l[lang]} ↗</a>`).join('')}</dd></div>
          </dl>
        </aside>
        <div class="case-main">
          <section><span class="mono muted">${t.context}</span><p>${p.context[lang]}</p></section>
          <section><span class="mono muted">${t.did}</span><ul>${p.did[lang].map(d => `<li>${d}</li>`).join('')}</ul></section>
          <section><span class="mono muted">${t.outcome}</span><p class="outcome">${p.outcome[lang]}</p></section>
        </div>
      </div>
      <button type="button" class="case-next" id="case-next"><span class="mono muted">${t.next} →</span><b>${nxt.title[lang]}</b></button>`;
    $('#case-next').addEventListener('click', () => goCase(1));
  };

  /* ================= troca de idioma ================= */
  let wordsTween = null;
  const animateWords = () => {
    if (wordsTween) { wordsTween.scrollTrigger && wordsTween.scrollTrigger.kill(); wordsTween.kill(); }
    if (REDUCED) return;
    wordsTween = gsap.fromTo('#manifesto .w', { opacity: .12 }, { opacity: 1, stagger: .06, ease: 'none',
      scrollTrigger: { trigger: '#manifesto', start: 'top 80%', end: 'bottom 50%', scrub: true } });
  };

  const applyLang = (l, first) => {
    lang = l;
    try { localStorage.setItem('mn-lang', l); } catch (e) {}
    document.documentElement.lang = l === 'pt' ? 'pt-BR' : 'en';
    document.title = l === 'pt' ? 'Matheus Neves | Portfólio' : 'Matheus Neves | Portfolio';
    $$('[data-t]').forEach(el => { const v = T[l][el.dataset.t]; if (v != null) el.innerHTML = v; });
    $$('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
    $('#cv').href = T[l].cvUrl;
    $('#manifesto').innerHTML = T[l].manifesto; wrapWords($('#manifesto'));
    renderChapters(); setChapter(chapterIdx, false);
    renderFilters(); renderRows(); renderKit(); renderBig();
    if (caseIdx >= 0) renderCase();
    if (!first) { animateWords(); ScrollTrigger.refresh(); }
  };
  $$('[data-lang]').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.lang === lang) return;
    if (REDUCED) return applyLang(b.dataset.lang);
    gsap.to('main', { opacity: 0, duration: .35, ease: 'power2.in', onComplete: () => {
      applyLang(b.dataset.lang);
      gsap.to('main', { opacity: 1, duration: .6, ease: 'power2.out' });
    } });
  }));
  applyLang(lang, true);

  /* ================= rolagem suave ================= */
  let lenis = null;
  if (!PREFERS_REDUCED) {
    lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  $$('[data-link]').forEach(a => a.addEventListener('click', e => {
    const t = $(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    lenis ? lenis.scrollTo(t, { duration: 1.6 }) : t.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth' });
  }));

  /* ================= cena: retrato em partículas ================= */
  const canvas = $('#scene');
  const uniforms = {
    uTime: { value: 0 }, uAssemble: { value: REDUCED ? 1 : 0 }, uDisperse: { value: 0 },
    uMouse: { value: new Vector3(99, 99, 0) }, uSize: { value: innerWidth < 900 ? 15 : 12 },
    uPR: { value: Math.min(devicePixelRatio, innerWidth < 900 ? 1.25 : 1.5) }, uOpacity: { value: 1 },
    // brilho das partículas: mais baixo no celular, onde o retrato fica atrás do nome
    uBright: { value: innerWidth < 900 ? 0.55 : 0.7 }
  };
  let renderer, scene, camera, points, sceneOn = true;
  // plano B: sem WebGL (ou se ele falhar), mostra a imagem fixa do retrato em partículas
  const showFallback = () => { document.documentElement.classList.add('no-webgl'); sceneOn = false; };
  const mouse = { x: 99, y: 99, tx: 99, ty: 99 };
  try {
    renderer = new WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(uniforms.uPR.value);
    renderer.setClearColor(0x060709, 1);
    scene = new Scene();
    camera = new PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.z = 5;
    renderer.debug.onShaderError = () => showFallback();
    canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); showFallback(); });
  } catch (e) { renderer = null; }

  // encaixa o retrato na tela: altura em unidades do mundo e posição, para qualquer proporção
  const PORTRAIT_H = 2.6;
  let portraitAspect = 0.79;
  const layout = () => {
    if (!renderer) return;
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    if (!points) return;
    const viewH = 2 * Math.tan(MathUtils.degToRad(17.5)) * 5, viewW = viewH * camera.aspect;
    const px2w = viewH / h;
    const nav = (w < 900 ? 70 : 90) * px2w;
    let ph, x, y;
    if (w < 900 || camera.aspect < 0.95) {
      // celular e tablet em pé: retrato no alto, nome embaixo
      const top = (w < 900 ? 140 : 170) * px2w;
      // espaço livre entre o topo e o bloco do nome (título em 2 linhas + frase + margem)
      const titlePx = Math.min(120, Math.max(64, w * 0.21));
      const blockPx = titlePx * 1.7 + (w < 900 ? 150 : 190);
      const free = Math.max(h * 0.3, h - 140 - blockPx) * px2w;
      ph = Math.min(free + titlePx * 1.1 * px2w, viewH * 0.66, (viewW * 0.96) / portraitAspect);
      x = 0;
      y = viewH / 2 - top - ph / 2;
    } else {
      // telas largas: retrato à direita, sem passar de 42% da largura
      ph = Math.min(viewH * 0.84, (viewW * 0.42) / portraitAspect);
      const pw = ph * portraitAspect;
      x = viewW / 2 - Math.max(viewW * 0.05, 40 * px2w) - pw / 2;
      y = (viewH / 2 - nav - ph / 2 + (-viewH / 2 + ph / 2)) / 2;
    }
    points.scale.setScalar(ph / PORTRAIT_H);
    uniforms.uBright.value = w < 900 ? 0.55 : 0.7;
    points.position.set(x, y, 0);
  };

  const buildPortrait = img => {
    const W = innerWidth < 900 ? 165 : innerWidth * devicePixelRatio > 2200 ? 300 : 240, H = Math.round(W * img.height / img.width);
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const ctx = c.getContext('2d'); ctx.drawImage(img, 0, 0, W, H);
    const data = ctx.getImageData(0, 0, W, H).data;
    portraitAspect = W / H;
    // volume de cabeça: centro do rosto à frente, laterais (orelhas) para trás, sem esticar as bordas
    const depth = (nx, lum) => 0.32 * (1 - Math.min(1, (nx / 0.42) ** 2)) - 0.16 + (lum - 0.5) * 0.1;
    const worldH = PORTRAIT_H, worldW = worldH * W / H;
    const tgt = [], rnd = [], col = [], size = [], seed = [];
    const teal = new Color('#2f7f86'), amber = new Color('#f0a55c'), tmp = new Color(), px = new Color();
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4, r = data[i] / 255, g = data[i + 1] / 255, b = data[i + 2] / 255;
      const a = data[i + 3] / 255; // recorte sem fundo; só a base do terno esmaece
      if (a < 0.04) continue;
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      // cabelo: escuro, mas dentro do recorte; desenhado com pontos fracos para a cabeça manter o formato
      const hair = lum < 0.13 && y < H * 0.5 && a > 0.5;
      if (hair ? Math.random() > 0.85 : (lum < 0.075 || Math.random() > (0.72 + lum) * a)) continue;
      const loose = y < H * 0.5 ? 0 : (1 - a) * 0.12;
      tgt.push((x / W - 0.5) * worldW + (Math.random() - .5) * (.004 + loose), -(y / H - 0.5) * worldH + (Math.random() - .5) * loose, depth(x / W - 0.5, lum));
      const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1), rad = 3 + Math.random() * 5;
      rnd.push(Math.sin(ph) * Math.cos(th) * rad, Math.sin(ph) * Math.sin(th) * rad, Math.cos(ph) * rad - 2);
      if (hair) tmp.setRGB(0.52, 0.45, 0.4).lerp(px.setRGB(r, g, b), 0.2);
      else tmp.copy(teal).lerp(amber, Math.min(1, Math.pow(lum, 1.3) * 1.25)).lerp(px.setRGB(r, g, b), 0.62);
      col.push(tmp.r, tmp.g, tmp.b);
      size.push(hair ? 0.5 : lum < 0.16 ? 0.38 : 0.42 + lum * 1.0 + Math.random() * 0.12);
      seed.push(Math.random());
    }
    const geo = new BufferGeometry();
    geo.setAttribute('position', new Float32BufferAttribute(tgt, 3));
    geo.setAttribute('aRandom', new Float32BufferAttribute(rnd, 3));
    geo.setAttribute('aColor', new Float32BufferAttribute(col, 3));
    geo.setAttribute('aSize', new Float32BufferAttribute(size, 1));
    geo.setAttribute('aSeed', new Float32BufferAttribute(seed, 1));
    const mat = new ShaderMaterial({
      uniforms, transparent: true, depthWrite: false, blending: NormalBlending,
      vertexShader: `
        uniform float uTime, uAssemble, uDisperse, uSize, uPR;
        uniform vec3 uMouse;
        attribute vec3 aRandom, aColor; attribute float aSize, aSeed;
        varying vec3 vColor; varying float vGlow;
        void main(){
          float k = clamp(uAssemble * 1.5 - aSeed * 0.5, 0.0, 1.0);
          k = k < .5 ? 4.*k*k*k : 1. - pow(-2.*k + 2., 3.) / 2.;
          vec3 p = mix(aRandom, position, k);
          p += vec3(sin(uTime*.7 + aSeed*40.), cos(uTime*.6 + aSeed*25.), sin(uTime*.5 + aSeed*12.)) * (.006 + (1.-k)*.15);
          vec3 dir = normalize(aRandom + vec3(.0001));
          float d = uDisperse;
          p += dir * d * (1.5 + aSeed * 5.5);
          float ang = d * (1.2 + aSeed * 1.5) + uTime * .03 * d;
          p.xz = mat2(cos(ang), -sin(ang), sin(ang), cos(ang)) * p.xz;
          vec4 world = modelMatrix * vec4(p, 1.0);
          vec2 dm = world.xy - uMouse.xy; float dist = length(dm);
          float f = smoothstep(.75, 0., dist) * (1. - d);
          world.xy += normalize(dm + 1e-4) * f * .38; world.z += f * .5;
          vec4 mv = viewMatrix * world;
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uSize * aSize * uPR * (1. + f * .8) / -mv.z;
          vColor = aColor; vGlow = f;
        }`,
      fragmentShader: `
        uniform float uOpacity, uBright;
        varying vec3 vColor; varying float vGlow;
        void main(){
          float d = length(gl_PointCoord - .5); if (d > .5) discard;
          float a = smoothstep(.5, .05, d);
          gl_FragColor = vec4((vColor + vGlow * .25) * uBright, a * .9 * uOpacity);
        }`
    });
    points = new Points(geo, mat);
    scene.add(points);
    layout();
  };

  let lastW = innerWidth, lastH = innerHeight;
  addEventListener('resize', () => {
    if (innerWidth === lastW && Math.abs(innerHeight - lastH) < 140) return;
    lastW = innerWidth; lastH = innerHeight; layout();
  });
  // as partículas reagem só ao mouse; em telas de toque o dedo não mexe no retrato
  addEventListener('pointermove', e => {
    if (!camera || e.pointerType !== 'mouse' || !FINE) return;
    const nx = e.clientX / innerWidth * 2 - 1, ny = -(e.clientY / innerHeight) * 2 + 1;
    const halfH = Math.tan(MathUtils.degToRad(17.5)) * 5;
    mouse.tx = nx * halfH * camera.aspect; mouse.ty = ny * halfH;
  });
  document.addEventListener('pointerleave', () => { mouse.tx = 99; mouse.ty = 99; });

  // fora do hero o retrato já virou galáxia de fundo: 30 quadros por segundo bastam
  let tick = 0;
  gsap.ticker.add(time => {
    if (!renderer || !points || !sceneOn || document.hidden) return;
    if (uniforms.uDisperse.value > 0.98 && (tick++ & 1)) return;
    uniforms.uTime.value = time;
    if (mouse.tx > 50) { mouse.x = mouse.tx; mouse.y = mouse.ty; }
    else { mouse.x += (mouse.tx - mouse.x) * .12; mouse.y += (mouse.ty - mouse.y) * .12; }
    uniforms.uMouse.value.set(mouse.x, mouse.y, 0);
    points.rotation.y += ((mouse.tx > 50 ? 0 : mouse.x * .04) - points.rotation.y) * .05;
    points.rotation.x += ((mouse.ty > 50 ? 0 : -mouse.y * .03) - points.rotation.x) * .05;
    renderer.render(scene, camera);
  });

  /* ================= abertura ================= */
  // WebP com reserva em PNG para navegadores antigos
  const loadImg = new Promise(res => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = () => { img.onerror = () => res(null); img.src = PHOTO.replace('.webp', '.png'); };
    img.src = PHOTO;
  });
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  const intro = () => {
    gsap.timeline()
      .from('.ch', { yPercent: 115, rotate: 6, duration: 1.4, ease: 'expo.out', stagger: 0.035 }, 0)
      .to(uniforms.uAssemble, { value: 1, duration: 3.2, ease: 'power2.inOut' }, 0)
      .from('.hero-meta span, .reveal, .nav > *', { y: 18, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.05 }, 0.5);
  };
  if (REDUCED) {
    loadImg.then(img => { if (img && renderer) buildPortrait(img); else showFallback(); });
  } else {
    const counter = { v: 0 }, countEl = $('#count'), bar = $('#bar');
    lenis && lenis.stop();
    gsap.set('#loader', { clipPath: 'inset(0 0 0% 0)' });
    const counting = gsap.to(counter, { v: 100, duration: 1.8, ease: 'power2.inOut',
      onUpdate: () => { countEl.textContent = String(Math.round(counter.v)).padStart(3, '0'); bar.style.transform = `scaleX(${counter.v / 100})`; } });
    Promise.all([loadImg, fontsReady, new Promise(r => counting.eventCallback('onComplete', r))]).then(([img]) => {
      if (img && renderer) buildPortrait(img); else showFallback();
      gsap.timeline({ onComplete: () => { $('#loader').style.display = 'none'; lenis && lenis.start(); ScrollTrigger.refresh(); } })
        .to('#loader', { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' })
        .add(intro, '-=0.45');
    });
  }

  /* ================= rolagem ================= */
  CHAPTERS.forEach((_, i) => ScrollTrigger.create({
    trigger: `.chapter[data-ch="${i}"]`, start: 'top 60%', end: 'bottom 60%',
    onToggle: self => { if (self.isActive) setChapter(i, true); }
  }));
  setChapter(0, false);
  animateWords();

  if (!REDUCED) {
    gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 } })
      // começa devagar: rolar um pouco não desmancha o rosto
      .to(uniforms.uDisperse, { value: 1, ease: 'power3.in' }, 0)
      .to(uniforms.uOpacity, { value: .3, ease: 'none' }, 0)
      .to(camera ? camera.position : {}, { z: 3.6, ease: 'power2.in' }, 0)
      .to('.hero h1', { yPercent: -30, opacity: 0, ease: 'none' }, 0)
      .to('.hero-foot, .hero-meta', { opacity: 0, ease: 'none' }, 0);

    gsap.from('.fact', { y: 40, opacity: 0, duration: 1.1, ease: 'power3.out', stagger: .1, scrollTrigger: { trigger: '.facts', start: 'top 85%' } });
    $$('[data-count]').forEach(el => {
      const n = +el.dataset.count, o = { v: 0 };
      gsap.to(o, { v: n, duration: 2, ease: 'power3.out', onUpdate: () => el.textContent = Math.round(o.v), scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    });
    gsap.from('.stat', { y: 40, opacity: 0, duration: 1.2, ease: 'power3.out', stagger: .12, scrollTrigger: { trigger: '.stats', start: 'top 85%' } });
    $$('main h2').forEach(h => gsap.from(h, { yPercent: 40, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 85%' } }));
    gsap.from('#rows', { y: 60, opacity: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '#rows', start: 'top 85%' } });
    gsap.from('.kit-col', { y: 50, opacity: 0, duration: 1.1, ease: 'power3.out', stagger: .1, scrollTrigger: { trigger: '.kit', start: 'top 85%' } });
    gsap.from('.contact-row', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.contact-row', start: 'top 90%' } });
  }

  /* ================= filtros ================= */
  $('#filters').addEventListener('click', e => {
    const b = e.target.closest('[data-filter]');
    if (!b || b.dataset.filter === filter) return;
    filter = b.dataset.filter;
    $$('#filters .chip').forEach(c => c.setAttribute('aria-pressed', String(c === b)));
    const swap = () => { renderRows(); ScrollTrigger.refresh(); if (!REDUCED) gsap.from('#rows .row', { y: 30, opacity: 0, duration: .7, ease: 'power3.out', stagger: .06 }); };
    REDUCED ? swap() : gsap.to('#rows .row', { y: -20, opacity: 0, duration: .25, stagger: .03, ease: 'power2.in', onComplete: swap });
  });

  /* ================= estudo de caso ================= */
  const caseEl = $('#case');
  let lastFocus = null;
  const openCase = i => {
    caseIdx = i; lastFocus = document.activeElement;
    renderCase();
    caseEl.hidden = false; caseEl.scrollTop = 0;
    lenis && lenis.stop(); sceneOn = false; hidePreview();
    document.documentElement.style.overflow = 'hidden';
    if (!REDUCED) {
      gsap.fromTo(caseEl, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: .9, ease: 'expo.inOut' });
      gsap.from('#case-body > *', { y: 50, opacity: 0, duration: 1, ease: 'power3.out', stagger: .08, delay: .45 });
    }
    $('#case-close').focus({ preventScroll: true });
  };
  const closeCase = () => {
    const done = () => { caseEl.hidden = true; caseIdx = -1; document.documentElement.style.overflow = ''; sceneOn = true; lenis && lenis.start(); lastFocus && lastFocus.focus({ preventScroll: true }); };
    REDUCED ? done() : gsap.to(caseEl, { clipPath: 'inset(0 0 100% 0)', duration: .8, ease: 'expo.inOut', onComplete: done });
  };
  const goCase = dir => {
    const n = (caseIdx + dir + PROJECTS.length) % PROJECTS.length;
    if (REDUCED) { caseIdx = n; renderCase(); caseEl.scrollTop = 0; return; }
    gsap.to('#case-body', { opacity: 0, x: -40 * dir, duration: .35, ease: 'power2.in', onComplete: () => {
      caseIdx = n; renderCase(); caseEl.scrollTop = 0;
      gsap.fromTo('#case-body', { opacity: 0, x: 40 * dir }, { opacity: 1, x: 0, duration: .7, ease: 'power3.out' });
    } });
  };
  $('#rows').addEventListener('click', e => { const r = e.target.closest('[data-open]'); if (r) openCase(+r.dataset.open); });
  $('#case-close').addEventListener('click', closeCase);
  $('#case-prev').addEventListener('click', () => goCase(-1));
  $('#case-next-top').addEventListener('click', () => goCase(1));
  addEventListener('keydown', e => {
    if (caseEl.hidden) return;
    if (e.key === 'Escape') closeCase();
    else if (e.key === 'ArrowRight') goCase(1);
    else if (e.key === 'ArrowLeft') goCase(-1);
  });

  /* ================= prévia ancorada na linha ================= */
  const preview = $('#preview'), pImg = preview.querySelector('img');
  const px = gsap.quickTo(preview, 'x', { duration: .7, ease: 'power3' }), py = gsap.quickTo(preview, 'y', { duration: .7, ease: 'power3' });
  let active = null, ptrX = -1, ptrY = -1;
  const hidePreview = () => { if (!active) return; active = null; gsap.to(preview, { opacity: 0, scale: .9, rotate: 0, duration: .35, ease: 'power2.out', overwrite: 'auto' }); };
  const placePreview = () => {
    if (!active) return;
    const r = active.getBoundingClientRect(), h = preview.offsetHeight;
    const right = Math.max(16, innerWidth * .04) + 72;
    const x = innerWidth - preview.offsetWidth - right + (ptrX / innerWidth - .5) * 24;
    const y = Math.min(innerHeight - h - 16, Math.max(84, r.top + r.height / 2 - h / 2));
    px(x); py(y);
  };
  const showPreview = row => {
    if (active === row) return placePreview();
    const first = !active;
    active = row;
    const p = PROJECTS[+row.dataset.open];
    if (pImg.getAttribute('src') !== p.img) pImg.src = p.img;
    preview.classList.toggle('logo', !!p.logo);
    if (first) { const r = row.getBoundingClientRect(); gsap.set(preview, { x: innerWidth - preview.offsetWidth - Math.max(16, innerWidth * .04) - 72, y: r.top + r.height / 2 - preview.offsetHeight / 2 }); }
    gsap.to(preview, { opacity: 1, scale: 1, rotate: -2, duration: .5, ease: 'power3.out', overwrite: 'auto' });
    requestAnimationFrame(placePreview);
  };
  // só procura linha sob o cursor enquanto a seção de projetos está na tela
  let workVisible = false;
  new IntersectionObserver(([e]) => { workVisible = e.isIntersecting; if (!workVisible) hidePreview(); }).observe($('#rows'));
  const checkPreview = () => {
    if (!workVisible) return;
    if (!caseEl.hidden) return hidePreview();
    const el = ptrX < 0 ? null : document.elementFromPoint(ptrX, ptrY);
    const row = el && el.closest ? el.closest('#rows [data-open]') : null;
    row ? showPreview(row) : hidePreview();
  };
  if (FINE) {
    addEventListener('pointermove', e => { ptrX = e.clientX; ptrY = e.clientY; checkPreview(); });
    let frame = 0;
    gsap.ticker.add(() => { if (ptrX >= 0 && (frame++ & 1) === 0) checkPreview(); });
    document.addEventListener('pointerleave', () => { ptrX = -1; hidePreview(); });
  }

  /* ================= título do contato reage ao cursor ================= */
  if (FINE && !PREFERS_REDUCED) {
    let raf = 0, mx = -1e4, my = -1e4, bigVisible = false;
    new IntersectionObserver(([e]) => { bigVisible = e.isIntersecting; }).observe($('#big'));
    const paint = () => {
      raf = 0;
      if (!bigVisible) return;
      $$('#big .l').forEach(l => {
        const r = l.getBoundingClientRect();
        const t = Math.max(0, 1 - Math.hypot(mx - (r.left + r.width / 2), my - (r.top + r.height / 2)) / 320);
        l.style.fontVariationSettings = `"wght" ${300 + t * 500}, "opsz" 96, "wdth" ${100 - t * 18}`;
        l.style.color = t > .55 ? 'var(--amber)' : '';
      });
    };
    addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; if (bigVisible && !raf) raf = requestAnimationFrame(paint); });
  }

  /* ================= cursor e botões magnéticos ================= */
  if (FINE && !PREFERS_REDUCED) {
    document.body.classList.add('has-cursor');
    const cur = $('#cursor'), dot = cur.querySelector('.dot'), ring = cur.querySelector('.ring');
    const dx = gsap.quickTo(dot, 'x', { duration: .12 }), dy = gsap.quickTo(dot, 'y', { duration: .12 });
    const rx = gsap.quickTo(ring, 'x', { duration: .55, ease: 'power3' }), ry = gsap.quickTo(ring, 'y', { duration: .55, ease: 'power3' });
    addEventListener('pointermove', e => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); });
    document.addEventListener('pointerover', e => {
      cur.classList.toggle('is-view', !!e.target.closest('[data-view]'));
      cur.classList.toggle('is-link', !e.target.closest('[data-view]') && !!e.target.closest('a, button'));
    });
    $$('[data-magnet]').forEach(el => {
      const mx = gsap.quickTo(el, 'x', { duration: .6, ease: 'elastic.out(1,.4)' }), my = gsap.quickTo(el, 'y', { duration: .6, ease: 'elastic.out(1,.4)' });
      el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); mx((e.clientX - r.left - r.width / 2) * .35); my((e.clientY - r.top - r.height / 2) * .35); });
      el.addEventListener('pointerleave', () => { mx(0); my(0); });
    });
  }

  /* ================= copiar e-mail ================= */
  $('#copy').addEventListener('click', () => {
    const email = 'matheusn.dev@gmail.com', out = $('#copied');
    const done = msg => { out.textContent = msg; setTimeout(() => out.textContent = '', 2400); };
    try { navigator.clipboard.writeText(email).then(() => done(T[lang].copied), () => done(email)); } catch (e) { done(email); }
  });
})();
