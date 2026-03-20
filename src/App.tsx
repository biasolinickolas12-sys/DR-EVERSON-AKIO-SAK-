import { motion, AnimatePresence } from "motion/react";
import {
  Brain,
  Activity,
  Shield,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  MessageCircle,
  CheckCircle2,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Award,
  Users,
  Stethoscope,
  Heart,
  HelpCircle,
  Instagram,
  Facebook,
  Mouse,
  ChevronUp,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const NeuronBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    
    // We put particle definition inside useEffect so it doesn't need to be recreated 
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.2; // Slow movement
        this.vy = (Math.random() - 0.5) * 0.2;
        this.radius = Math.random() * 1.5 + 0.5; // Star-like points
      }

      update(w: number, h: number) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx = -this.vx;
        if (this.y < 0 || this.y > h) this.vy = -this.vy;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(30, 100, 220, 0.8)";
        ctx.fill();
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(30, 100, 220, 1)";
      }
    }

    let particles: Particle[] = [];
    const particleCount = 70;
    const connectionDistance = 140;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };
    window.addEventListener("resize", resize);
    resize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const opacity = 1 - (dist / connectionDistance);
            ctx.strokeStyle = `rgba(30, 100, 220, ${opacity * 0.4})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update(canvas.width, canvas.height);
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none mix-blend-screen"
      style={{ zIndex: 0 }}
    />
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Especialidades', href: '#especialidades' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Unidades', href: '#contato' },
    { name: 'Redes Sociais', href: '#redes-sociais' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-primary/95 backdrop-blur-xl border-b border-secondary/10 py-4" : "bg-transparent py-8"}`}>
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center">
            <a href="#inicio" className="flex items-center gap-4 relative z-50 group transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-[2px] border-cyan-400/80 shadow-[0_0_20px_rgba(34,211,238,0.5)] group-hover:shadow-[0_0_35px_rgba(34,211,238,0.8)] group-hover:border-cyan-300 flex items-center justify-center bg-[#020610] transition-all duration-500 p-[6px]">
                <img src="/logo2.png" alt="Logo" className="w-full h-full object-contain drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
              </div>
              <div className="flex flex-col relative text-left">
                <span className="text-lg sm:text-xl font-display font-bold text-white tracking-widest uppercase">Dr. Everson Akio</span>
                <span className="text-[9px] font-bold text-secondary uppercase tracking-[0.3em] neon-text">Neurocirurgião</span>
                <div className="absolute -bottom-2 left-0 h-[2px] w-0 bg-gradient-to-r from-secondary to-secondary/50 group-hover:w-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
              </div>
            </a>
        <div className="hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.25em] ml-24">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="relative text-white/80 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 py-2 group">
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-secondary transition-all duration-500 group-hover:w-full shadow-[0_0_10px_rgba(255,215,0,1)]"></span>
            </a>
          ))}
        </div>

        <button className="lg:hidden text-white ml-auto" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-0 w-full bg-primary border-b border-secondary/10 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-8 gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs font-bold uppercase tracking-widest text-white/90 hover:text-secondary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contato"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-secondary text-primary py-5 rounded-full font-bold text-[10px] uppercase tracking-widest text-center block"
              >
                AGENDAR AGORA
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex flex-col lg:flex-row items-stretch overflow-hidden bg-transparent">
      {/* Left Content */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-40 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-full bg-secondary/10 neon-border mb-8 max-w-full">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_rgba(255,215,0,0.8)] shrink-0" />
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-widest sm:tracking-[0.3em] text-secondary truncate sm:whitespace-normal">
              Neurocirurgia: “state of the art”
            </span>
          </div>

          <div className="group inline-block mb-12 cursor-default relative">
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-8xl xl:text-9xl font-display font-bold leading-[0.85] pb-4 text-white/90 tracking-tighter uppercase"
            >
              CIÊNCIA, <br />
              <span className="text-secondary italic font-normal font-serif neon-text">PRECISÃO</span> <br />
              & CUIDADO.
            </motion.h1>
            <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-secondary to-secondary/30 group-hover:w-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mb-16">
            <a href="#contato" className="group relative flex items-center justify-center gap-4 px-12 py-6 bg-secondary text-primary rounded-full font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(255,193,7,0.5)] hover:shadow-[0_0_50px_rgba(255,193,7,0.8)] border border-white/40">
              <span className="relative z-10 flex items-center gap-4 text-sm md:text-base">
                AGENDAR AVALIAÇÃO
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              {/* Ultra-premium shine effect on hover */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out skew-x-[-20deg]" />
            </a>
            <a
              href="#faq"
              className="group flex items-center gap-4 px-8 py-5 bg-gradient-to-r from-slate-100 via-slate-400 to-slate-100 border border-white/50 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-all duration-500 hover:scale-[1.05] active:scale-[0.95]"
            >
              <div className="w-10 h-10 rounded-full bg-slate-900/10 flex items-center justify-center text-slate-900">
                <HelpCircle size={20} className="group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">Perguntas Frequentes</span>
            </a>
          </div>

          <div className="relative max-w-2xl group cursor-default">
            {/* Subtle accent line */}
            <div className="absolute -left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-secondary/60 via-secondary/20 to-transparent hidden md:block" />
            
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-6 tracking-tight leading-tight uppercase">
                Especialista em <span className="text-secondary drop-shadow-[0_0_8px_rgba(255,193,7,0.3)]">Neurocirurgia</span>, <br className="hidden md:block" />
                <span className="text-secondary drop-shadow-[0_0_8px_rgba(255,193,7,0.3)]">Coluna Vertebral</span> e <span className="text-secondary drop-shadow-[0_0_8px_rgba(255,193,7,0.3)]">Neuro-oncologia</span>.
              </h2>
              
              <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light max-w-xl">
                Unindo tecnologia robótica ao atendimento profundamente humano para restaurar sua qualidade de vida.
              </p>
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* Right Image - Split Layout */}
      <div className="flex-1 relative min-h-[500px] lg:min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src="/media__1773685054063.jpg"
            alt="Dr. Everson Akio"
            className="w-full h-full object-cover object-top transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          {/* Gradient Overlays for blending into deep blue */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/30 to-transparent lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent lg:hidden block" />
          {/* Radial Vignette for focused technical look */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,#020610_100%)] opacity-80" />
        </motion.div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: "Neurocirurgia Especializada", value: "RQE 87969", icon: <Brain className="w-5 h-5" /> },
    { label: "Especialização de Elite", value: "Residência USP/SP", icon: <Stethoscope className="w-5 h-5" /> },
    { label: "Precisão em cada gesto", value: "Tecnologia Robótica", icon: <Activity className="w-5 h-5" /> },
    { label: "Propósito de vida", value: "Atendimento Humano", icon: <CheckCircle2 className="w-5 h-5" /> },
  ];

  return (
    <section className="bg-[#020610]/60 py-32 relative overflow-hidden border-t border-b border-secondary/30 shadow-[0_0_100px_rgba(255,193,7,0.1)]">
      <div className="absolute inset-0 tech-grid opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/[0.02] to-transparent" />

      <div className="max-w-[1700px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.7 }}
              className="relative group lg:px-6"
            >
              {/* Glassmorphism Card */}
              <div className="absolute -inset-4 bg-gradient-to-br from-white/[0.03] to-white/[0.01] rounded-[32px] blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary mb-8 group-hover:bg-secondary group-hover:text-primary group-hover:shadow-[0_0_20px_rgba(255,215,0,0.6)] transition-all duration-500 drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]">
                  {stat.icon}
                </div>

                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-secondary/20 to-transparent mb-10 group-hover:via-secondary/50 transition-all duration-1000" />

                <div className="flex flex-col gap-3">
                  <span className="text-2xl md:text-3xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-secondary/40 drop-shadow-2xl uppercase">
                    {stat.value}
                  </span>
                  <div className="h-[2px] w-12 bg-gradient-to-r from-secondary/40 to-secondary/10 group-hover:w-full group-hover:from-secondary group-hover:to-secondary/20 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(255,193,7,0.2)]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary/60 mt-2 group-hover:text-secondary group-hover:tracking-[0.5em] transition-all duration-500 neon-text">
                    {stat.label}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => {
  return (
    <section id="sobre" className="py-24 md:py-48 bg-transparent text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-[#050B14]/40 -skew-x-12 translate-x-1/4 border-l border-secondary/10 hidden lg:block" />

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 lg:gap-40 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-secondary mb-12 block neon-text">O Especialista</span>
            <div className="group inline-block mb-16 cursor-default relative">
              <motion.h2 
                className="text-3xl sm:text-5xl md:text-8xl font-display font-bold leading-[0.9] pb-4 tracking-tighter uppercase text-white"
              >
                MAIS QUE UM MÉDICO, <br />
                <span className="italic font-normal text-secondary font-serif neon-text drop-shadow-[0_0_10px_rgba(255,215,0,0.2)]">UM PARCEIRO NA SUA</span> <br />
                RECUPERAÇÃO.
              </motion.h2>
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-secondary to-secondary/30 group-hover:w-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
            </div>

            <div className="space-y-10 text-xl md:text-2xl font-light text-white/70 leading-relaxed max-w-2xl">
              <p>
                Formado pelas Faculdades de Medicinia de Marília, Residência no Hospital das Clínicas da USP/SP e Conjunto Hospitalar de Sorocaba. O Dr. Everson Akio dedica sua carreira ao aperfeiçoamento constante das técnicas de microcirurgia neural.
              </p>
              <div className="pl-8 border-l-2 border-secondary/40">
                <p className="text-white italic text-xl md:text-3xl leading-snug">
                  "O cuidado com o ser humano é uma relação que me cativa, fazer o bem fazendo o que mais amo, aplicar o conhecimento médico em prol dos meus semelhantes, ajudar quem precisa, receber tantos gestos de gratidão tornam essa profissão especial e aumenta ainda mais minha motivação buscar ser cada vez melhor para os meus pacientes."
                </p>
              </div>
            </div>

            <div className="mt-20 grid grid-cols-2 gap-12 lg:gap-20">
              <div className="group border-b border-secondary/10 pb-6 hover:border-secondary transition-colors duration-500">
                <div className="text-3xl md:text-5xl font-display font-bold text-secondary mb-2 neon-text">CRM-SP</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Registro Profissional 162949-SP</div>
              </div>
              <div className="group border-b border-secondary/10 pb-6 hover:border-secondary transition-colors duration-500">
                <div className="text-3xl md:text-5xl font-display font-bold text-secondary mb-2 neon-text">RQE</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Especialidade 87969</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[60px] overflow-hidden border-[2px] border-secondary/30 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative group">
              <img
                src="/media__1773685059489.jpg"
                className="w-full h-full object-cover object-[center_top] transition-all duration-[2000ms] group-hover:scale-105"
                alt="Dr. Everson Akio"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020610] via-transparent to-transparent opacity-60" />
            </div>

            {/* Experience Badge */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-10 -right-10 md:right-10 md:-bottom-12 bg-primary border-2 border-secondary/40 text-white p-10 md:p-14 rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-20 backdrop-blur-xl"
            >
              <Award size={48} className="mb-6 text-secondary drop-shadow-[0_0_15px_rgba(255,215,0,0.7)]" />
              <div className="text-3xl md:text-3xl font-display font-bold leading-none mb-3">Referência</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary/90 neon-text leading-relaxed">
                Neurocirurgião Renomado Em : <br />
                Sorocaba e Região
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Expertise = () => {
  const [selectedExpertise, setSelectedExpertise] = useState<any>(null);
  
  useEffect(() => {
    if (selectedExpertise) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedExpertise]);

  const expertises = [
    {
      title: "Coluna Vertebral",
      desc: "Tratamento de hérnias, estenoses e deformidades com técnicas minimamente invasivas.",
      icon: <Activity />,
      size: "lg",
      img: "/media__1773688221264.jpg",
      fullDetails: "A coluna vertebral é responsável por sustentar o corpo, proteger a medula espinhal e permitir movimentos essenciais para a vida cotidiana. Quando comprometida por doenças, lesões ou desgastes, pode gerar dores intensas, limitação funcional e prejuízo à qualidade de vida.\n\nContar com um acompanhamento especializado é fundamental para garantir um diagnóstico preciso e o tratamento mais adequado."
    },
    {
      title: "Neuro-oncologia",
      desc: "Remoção de tumores cerebrais com monitorização intraoperatória.",
      icon: <Brain />,
      size: "sm",
      img: "/media__1773685070139.jpg",
      fullDetails: "A Neuro-Oncologia é um ramo da medicina que estuda e trata os cânceres do cérebro e da medula espinhal. Essas condições costumam ser graves e podem comprometer significativamente a qualidade de vida do paciente.\n\nCom a evolução da ciência, novos métodos diagnósticos e terapêuticos têm sido desenvolvidos, permitindo tratamentos mais eficazes e um melhor prognóstico para muitos casos."
    },
    {
      title: "Neurocirurgia",
      desc: "Precisão microscópica em patologias vasculares e nervosas.",
      icon: <Shield />,
      size: "sm",
      img: "/media__1773685070153.jpg",
      fullDetails: "A neurocirurgia vascular é uma subespecialidade da neurocirurgia que desempenha um papel vital no diagnóstico e tratamento de alterações nos vasos sanguíneos do cérebro e da medula espinhal. Condições como aneurismas, malformações arteriovenosas (MAVs) e acidentes vasculares cerebrais (AVCs) são algumas das patologias tratadas nessa área, que tem como objetivo prevenir complicações graves e preservar a qualidade de vida, principalmente em pessoas de meia idade e idosos."
    },
    {
      title: "Segunda Opinião",
      desc: "Avaliação detalhada para casos complexos e revisões cirúrgicas.",
      icon: <Stethoscope />,
      size: "md",
      img: "/gallery3.png",
      fullDetails: "Oferecemos um serviço de avaliação criteriosa para diagnósticos complexos. Uma segunda opinião médica é fundamental para confirmar a necessidade cirúrgica, explorar alternativas terapêuticas e proporcionar mais segurança e clareza para o paciente e sua família."
    }
  ];

  return (
    <section id="especialidades" className="py-24 md:py-40 bg-[#020610]/70 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,215,0,0.02)_0%,transparent_50% )]" />
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-4xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-secondary mb-8 block neon-text">Nossa Expertise</span>
            <div className="group inline-block cursor-default relative">
              <motion.h2 
                className="text-4xl sm:text-5xl md:text-8xl font-display font-bold text-white leading-[0.9] tracking-tighter uppercase pb-4"
              >
                TECNOLOGIA A SERVIÇO <br />
                <span className="italic font-normal text-secondary font-serif neon-text drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">DA VIDA HUMANA.</span>
              </motion.h2>
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-secondary to-secondary/30 group-hover:w-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
            </div>
          </div>
          <div className="lg:max-w-md">
            <p className="text-xl text-white/60 leading-relaxed font-light mb-8">
              Utilizamos as plataformas tecnológicas mais avançadas do mundo para garantir resultados previsíveis e recuperações aceleradas.
            </p>
            <div className="h-[1px] w-24 bg-secondary/30" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {expertises.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedExpertise(item)}
              className={`group relative overflow-hidden rounded-[24px] sm:rounded-[40px] bg-[#050B14] aspect-[4/5] sm:aspect-square lg:aspect-auto lg:h-[650px] border border-secondary/10 hover:border-secondary/40 transition-all duration-700 shadow-2xl cursor-pointer`}
            >
              <img
                src={item.img}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out"
                alt={item.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020610]/90 via-[#020610]/40 to-transparent" />

              <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-secondary/20 border border-secondary/30 rounded-2xl flex items-center justify-center text-secondary mb-6 sm:mb-10 group-hover:scale-110 transition-transform duration-500 group-hover:bg-secondary group-hover:text-primary group-hover:shadow-[0_0_20px_rgba(255,215,0,0.6)]">
                  {item.icon}
                </div>
                <h3 className="text-2xl sm:text-3xl xl:text-4xl font-display font-bold text-white mb-4 sm:mb-6 group-hover:text-secondary transition-colors duration-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">{item.title}</h3>
                <p className="text-white text-sm sm:text-lg font-light leading-relaxed max-w-xs mb-6 sm:mb-10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-6 group-hover:translate-y-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] line-clamp-3 lg:line-clamp-none">
                  {item.desc}
                </p>
                <div className="inline-flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-secondary group-hover:text-white transition-colors cursor-pointer">
                  <span>Explorar</span>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-secondary/30 flex items-center justify-center group-hover:bg-secondary group-hover:border-secondary group-hover:text-primary group-hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] transition-all">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedExpertise && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExpertise(null)}
              className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-md w-full bg-primary border border-secondary/20 rounded-[24px] shadow-[0_0_80px_rgba(0,0,0,0.9)] relative flex flex-col max-h-[80vh] overflow-hidden"
              >
                {/* Compact Header Image */}
                <div className="h-32 md:h-40 relative shrink-0">
                  <img
                    src={selectedExpertise.img}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt={selectedExpertise.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
                  <button
                    onClick={() => setSelectedExpertise(null)}
                    className="absolute top-4 right-4 w-8 h-8 bg-black/60 backdrop-blur-sm border border-white/10 text-white flex items-center justify-center rounded-full hover:bg-secondary hover:text-primary transition-all duration-300 z-10"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Content Area - Optimized for Scrolling */}
                <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary rounded-lg shrink-0">
                      {selectedExpertise.icon}
                    </div>
                    <h2 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight uppercase">
                      {selectedExpertise.title}
                    </h2>
                  </div>
                  
                  <div className="h-[1px] w-10 bg-secondary/40 mb-4" />
                  
                  <p className="text-base md:text-lg text-white/70 font-light leading-relaxed whitespace-pre-line">
                    {selectedExpertise.fullDetails}
                  </p>

                  <motion.button
                    onClick={() => setSelectedExpertise(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold uppercase tracking-[0.2em] text-[11px] transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] border border-cyan-300/20 cursor-pointer"
                  >
                    Retornar ao Site e Continuar Navegando
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const HumanConnection = () => {
  return (
    <section className="py-24 md:py-48 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-5" />
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="order-2 lg:order-1"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-secondary/20 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative rounded-[32px] overflow-hidden border border-secondary/20 shadow-2xl">
                <img
                  src="/humanized-care.png"
                  alt="Atendimento Humano"
                  className="w-full h-auto grayscale-[30%] hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60" />
              </div>
              
              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-secondary text-primary p-6 rounded-2xl shadow-xl flex items-center gap-4 z-20"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 fill-primary" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-70">Nosso Propósito</div>
                  <div className="text-sm font-bold uppercase tracking-tight">Cuidado que Transforma</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="order-1 lg:order-2"
          >
            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest md:tracking-[0.6em] text-secondary mb-8 block neon-text">Empatia e Acolhimento</span>
            <div className="group inline-block mb-12 cursor-default relative">
              <motion.h2 
                className="text-3xl sm:text-5xl md:text-7xl font-display font-bold text-white tracking-tighter uppercase leading-[0.9] pb-4"
              >
                MAIS QUE <br />
                <span className="italic font-normal text-secondary font-serif neon-text">MEDICINA,</span> <br />
                UM COMPROMISSO.
              </motion.h2>
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-secondary to-secondary/30 group-hover:w-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
            </div>
            <p className="text-xl md:text-2xl font-light text-white/70 leading-relaxed max-w-xl">
              Entendemos que por trás de cada diagnóstico existe uma vida, uma família e muitos sonhos. Nosso atendimento é pautado pela <span className="text-white font-medium">humanização absoluta</span>, onde a escuta atenta e o acolhimento são tão importantes quanto a precisão cirúrgica.
            </p>
            <div className="mt-12">
              <HistoryButton />
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-2xl font-display font-bold text-white uppercase tracking-tight">Escuta Ativa</span>
                <span className="text-xs text-secondary/50 font-bold uppercase tracking-widest neon-text">Diálogo e Transparência</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-2xl font-display font-bold text-white uppercase tracking-tight">Cuidado Contínuo</span>
                <span className="text-xs text-secondary/50 font-bold uppercase tracking-widest neon-text">Acompanhamento de Perto</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const HistoryButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "/dr-akio-portrait-grey.png",
    "/history_aquarium.jpg",
    "/history1.png",
    "/history2.jpg",
    "/history3.png",
    "/history4.jpg",
    "/history5.jpg",
    "/history6.png",
    "/history7.png",
    "/history8.png",
    "/history9.png",
    "/history10.png"
  ];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const storyParagraphs = [
    "Olá queridos visitantes e pacientes, sejam bem-vindos ao meu site! Meu nome é Everson Akio Sakô, sou neurocirurgião e nesse pequeno trecho vou contar um pouco sobre minha carreira profissional.",
    "Aos 10 anos de idade, minha avó ficou doente, teve uma doença chamada dissecção aorta torácica, precisou operar, ficou bastante tempo internada, lembro dela voltando pra casa num almoço de domingo e mesmo criança vi o quanto a medicina pôde fazer por ela, achei tudo aquilo incrível e como ela estava bem.",
    "Toda minha família me apoiou, não tinha nenhum médico na família e o desafio era grande, pois queria passar em faculdade pública. Foram 3 anos de cursinho, até conseguir uma vaga na Faculdade de Medicina de Marília. Sempre tive um apreço para neurologia, fui da liga científica, fazíamos campanhas, simpósios, sempre gostei também de clínica médica. A inspiração para fazer neurocirurgia foi meu professor, primo e ídolo: Dr. Ruy Okaji. Além de um grande médico, admirado por todos da faculdade, do hospital, um ser-humano fantástico, cativante, um pai, marido e ainda consegue ter tempo pro esporte. Joga basquete e tênis como ninguém!",
    "E assim começou, consegui alcançar meu sonho de entrar na residência no Hospital da Clínicas da USP/SP, fiquei um ano e meio por lá, mas acabei transferindo por problemas de adaptação. Fui na sequência para o Conjunto Hospitalar de Sorocaba, onde me formei in 2020. Época da residência é um período desgastante, rotina árdua, muitos plantões, pouco descanso, mas também de aprendizado e formação do especialista.",
    "Vir pra essa cidade foi uma renovação pra minha vida, onde todos me receberam bem, fiz tantos amigos por onde passei, inúmeros pacientes queridos a quem sou extremamente grato."
  ];

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white rounded-full font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:shadow-[0_0_50px_rgba(6,182,212,0.9)] border border-cyan-300/40 cursor-pointer"
      >
        <span className="relative z-10 flex items-center gap-4 text-xs md:text-sm text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
          CONHEÇA MINHA HISTÓRIA
          <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300 text-cyan-200" />
        </span>
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out skew-x-[-20deg]" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#020617]/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#030712] border border-blue-500/20 rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.9)] max-w-3xl w-[95%] sm:w-full max-h-[85vh] md:max-h-[80vh] overflow-hidden flex flex-col lg:flex-row relative mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/50 border border-blue-500/20 text-blue-400 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-xl"
              >
                <X size={20} />
              </button>
 
              {/* Left Side: Carousel */}
              <div className="lg:w-[45%] relative h-[220px] sm:h-[300px] lg:h-auto bg-black shrink-0">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage}
                    src={images[currentImage]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-contain md:object-cover object-center bg-black"
                  />
                </AnimatePresence>
                
                {/* Navigation Buttons */}
                <div className="absolute inset-x-0 bottom-4 flex justify-center gap-3 z-50">
                  <button onClick={prevImage} className="w-10 h-10 bg-blue-900/40 backdrop-blur-md border border-blue-500/30 text-blue-400 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-2xl">
                    <ArrowRight className="rotate-180" size={18} />
                  </button>
                  <button onClick={nextImage} className="w-10 h-10 bg-blue-900/40 backdrop-blur-md border border-blue-500/30 text-blue-400 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-2xl">
                    <ArrowRight size={18} />
                  </button>
                </div>
 
                {/* Counter */}
                <div className="absolute top-4 left-4 bg-blue-900/40 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-500/20">
                  <span className="text-blue-400 font-bold text-[10px] tracking-widest">{currentImage + 1} / {images.length}</span>
                </div>
              </div>
 
              {/* Right Side: Text */}
              <div className="lg:w-[55%] p-5 sm:p-8 md:p-10 overflow-y-auto custom-scrollbar bg-gradient-to-br from-[#030712] to-[#010B1D]">
                <div className="w-full">
                  <span className="text-blue-500 font-bold text-[8px] uppercase tracking-[0.4em] mb-4 block drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">Minha Jornada</span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-6 leading-tight uppercase tracking-tighter">
                    CONHEÇA <span className="italic font-normal text-secondary font-serif">MINHA HISTÓRIA.</span>
                  </h3>
                  
                  <div className="space-y-4 text-white/70 text-[13px] sm:text-sm md:text-base font-light leading-relaxed">
                    {storyParagraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
 
                  <div className="mt-12 pt-10 border-t border-white/5 flex items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-[1px] bg-secondary/30" />
                      <span className="text-secondary text-[9px] font-bold uppercase tracking-[0.3em] neon-text">Dr. Everson Akio</span>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold uppercase tracking-[0.2em] text-[11px] transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] border border-cyan-300/20 cursor-pointer"
                  >
                    Retornar ao Site e Continuar Navegando
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const questions = [
    {
      q: "Quem precisa desses atendimentos?",
      a: "Um cuidado especial para aqueles que enfrentam desafios com a saúde cerebrovascular, lutam contra tumores no sistema nervoso, sofrem com dores e limitações na coluna, convivem com sintomas neurológicos persistentes ou simplesmente buscam prevenção e máxima qualidade de vida."
    },
    {
      q: "Onde o Dr. Everson Akio realiza os atendimentos?",
      a: "O Dr. Everson atende em unidades de excelência: Ápice Especialidades (Sorocaba, SP), Polimed (Registro, SP) e Clínica Reunidas (Sorocaba, SP). Todas as unidades contam com infraestrutura completa para oferecer o melhor cuidado neurológico."
    },
    {
      q: "Quando a dor na coluna exige cirurgia?",
      a: "A cirurgia é considerada quando tratamentos conservadores não aliviam a dor intensa ou há sinais de comprometimento neurológico."
    },
    {
      q: "O que esperar de um tratamento oncológico?",
      a: "Utilizamos microcirurgia de alta precisão e monitorização intraoperatória para remover o tumor com a máxima segurança."
    },
    {
      q: "Quais as vantagens da cirurgia minimamente invasiva?",
      a: "Cortes menores, menos sangramento, menor tempo de internação e recuperação acelerada."
    },
    {
      q: "Como agendar uma segunda opinião?",
      a: "Basta clicar no botão de agendamento. Oferecemos avaliações detalhadas para casos complexos."
    }
  ];

  return (
    <section id="faq" className="py-24 md:py-48 bg-[#050B14]/60 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,215,0,0.03)_0%,transparent_50%)]" />
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-32">
          <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-secondary mb-8 block neon-text">Esclarecimentos</span>
          <div className="group inline-block cursor-default relative">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
              className="text-3xl sm:text-5xl md:text-8xl font-display font-bold text-white tracking-tighter uppercase drop-shadow-lg pb-4"
            >
              PERGUNTAS <span className="italic font-normal text-secondary font-serif neon-text">FREQUENTES.</span>
            </motion.h2>
            <div className="absolute bottom-0 left-0 right-0 h-[3px] w-0 bg-gradient-to-r from-transparent via-secondary to-transparent group-hover:w-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(255,215,0,0.5)] mx-auto" />
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((item, idx) => (
            <div
              key={idx}
              className={`group transition-all duration-500 rounded-[32px] overflow-hidden ${openIdx === idx
                ? 'bg-[#0A1526] text-white shadow-[0_15px_40px_rgba(255,215,0,0.08)] border border-secondary/40'
                : 'bg-[#020610] border border-secondary/10 hover:border-secondary/40'
                }`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-6 sm:p-10 flex justify-between items-center text-left transition-colors"
              >
                <span className={`text-lg sm:text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 ${openIdx === idx ? 'text-white' : 'text-white/80'}`}>
                  {item.q}
                </span>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-500 scale-90 md:scale-100 ${openIdx === idx
                  ? 'border-secondary text-secondary rotate-180 shadow-[0_0_20px_rgba(255,215,0,0.4)] bg-secondary/10'
                  : 'border-secondary/20 text-secondary'
                  }`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 sm:p-10 pt-2 text-sm sm:text-lg md:text-xl font-light leading-relaxed text-white/70">
                      <div className="w-full h-[1px] bg-secondary/10 mb-6 sm:mb-8" />
                      <p>{item.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Locations = () => {
  const units = [
    {
      name: "Ápice Especialidades",
      logo: "/logo apice.png",
      scale: 1.2,
      address: "Rua Coronel José Pedro de Oliveira, 411 Jardim Faculdade, Sorocaba – SP",
      phones: ["(15) 3229-0213", "(15) 3229-0202"],
      whatsapp: "(15) 3229-0203",
      contactLink: "https://wa.me/551532290203?text=Quero%20marcar%20uma%20consulta%20com%20o%20Dr%20Everson%20Akio%20%21%21",
      contactLabel: "Falar no WhatsApp",
      contactIcon: <MessageCircle className="w-5 h-5" />
    },
    {
      name: "Polimed – Registro",
      logo: "/logo polimed.png",
      scale: 1.5,
      address: "Av. Nelson Brihi Badur, 455 Vila Nova Ribeira, Registro – SP",
      phones: ["(13) 3822-6175"],
      whatsapp: "(13) 99715-2039",
      contactLink: "https://wa.me/5513997152039?text=Quero%20marcar%20uma%20consulta%20com%20o%20Dr%20Everson%20Akio%20!!",
      contactLabel: "Falar no WhatsApp",
      contactIcon: <MessageCircle className="w-5 h-5" />
    },
    {
      name: "Clínica Reunidas",
      logo: "/logo clinica reunidas.png",
      scale: 1.2,
      address: "Rua Antônio Soares, 71 Jardim Paulistano, Sorocaba – SP",
      appointments: "(15) 3202-7535",
      contactLink: "tel:1532027535",
      contactLabel: "Ligar Agora",
      contactIcon: <Phone className="w-5 h-5" />
    }
  ];

  return (
    <section id="contato" className="py-24 md:py-40 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 tech-grid opacity-5" />
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-24">
          <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-secondary mb-8 block neon-text">Onde Atendemos</span>
          <h2 className="text-3xl sm:text-5xl md:text-8xl font-display font-bold text-white tracking-tighter uppercase">
            NOSSAS <span className="italic font-normal text-secondary font-serif neon-text">UNIDADES.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {units.map((unit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[24px] sm:rounded-[40px] p-6 sm:p-10 flex flex-col items-start relative group hover:border-secondary/30 transition-all duration-500 shadow-2xl"
            >
              <div className="bg-[#B9F6F0] px-6 py-4 rounded-2xl mb-10 w-full flex flex-col items-center gap-4 shadow-[0_0_20px_rgba(185,246,240,0.3)] border border-[#4DB0A5]/20">
                {unit.logo && (
                  <div className="h-32 w-full flex items-center justify-center bg-sky-50 rounded-2xl p-4 shadow-inner border border-white/20 group-hover:border-cyan-400 group-hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] transition-all duration-500 relative overflow-hidden">
                    {/* Internal cyan glow on hover */}
                    <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/[0.05] transition-colors duration-500" />
                    <img 
                      src={unit.logo} 
                      alt={`Logo ${unit.name}`} 
                      className="h-full w-auto object-contain transition-transform duration-500 hover:scale-110"
                      style={{ 
                        transform: unit.scale ? `scale(${unit.scale})` : 'none',
                        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
                      }}
                    />
                  </div>
                )}
                <h3 className="text-xl md:text-2xl font-display font-bold text-primary text-center leading-tight drop-shadow-sm">{unit.name}</h3>
              </div>

              <div className="space-y-6 sm:space-y-8 w-full">
                <div className="flex gap-4 sm:gap-6 items-start">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-white/20 flex items-center justify-center shrink-0">
                    <MapPin className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm sm:text-lg font-light leading-relaxed">
                      <span className="font-bold">Endereço:</span> {unit.address}
                    </p>
                  </div>
                </div>

                {unit.phones && (
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center shrink-0">
                      <Phone className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white/80 text-lg font-light leading-relaxed">
                        <span className="font-bold">Telefone:</span> {unit.phones.join(" / ")}
                      </p>
                    </div>
                  </div>
                )}

                {unit.whatsapp && (
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center shrink-0">
                      <MessageCircle className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white/80 text-lg font-light leading-relaxed">
                        <span className="font-bold">WhatsApp:</span> {unit.whatsapp}
                      </p>
                    </div>
                  </div>
                )}

                {unit.appointments && (
                  <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-xl border border-white/20 flex items-center justify-center shrink-0">
                      <Phone className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white/80 text-lg font-light leading-relaxed">
                        <span className="font-bold">Agendamentos:</span><br />
                        {unit.appointments}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-12 w-full">
                <a
                  href={unit.contactLink}
                  target={unit.contactLink.startsWith('http') ? "_blank" : undefined}
                  rel={unit.contactLink.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="group/btn relative flex items-center justify-center gap-4 w-full py-5 bg-[#4DB0A5] text-white rounded-2xl font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_25px_rgba(77,176,165,0.4)] hover:shadow-[0_0_45px_rgba(77,176,165,0.7)] border border-white/30"
                >
                  <span className="relative z-10 flex items-center gap-3 text-xs drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
                    {unit.contactIcon}
                    {unit.contactLabel}
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out skew-x-[-20deg]" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#020610]/80 text-white py-24 md:py-40 border-t border-secondary/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,215,0,0.03)_0%,transparent_50%)]" />
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-32 mb-32">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-6 mb-10 group cursor-default">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-[2px] border-cyan-400/80 shadow-[0_0_25px_rgba(34,211,238,0.5)] group-hover:shadow-[0_0_45px_rgba(34,211,238,0.9)] group-hover:border-cyan-300 flex items-center justify-center bg-[#020610] transition-all duration-500 group-hover:scale-110 p-[10px]">
                <img src="/logo2.png" alt="Logo" className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              </div>
              <span className="font-display font-bold text-2xl sm:text-4xl md:text-5xl tracking-[0.1em] uppercase text-white drop-shadow-md">Dr. Everson Akio</span>
            </div>
            <p className="text-white/50 max-w-md text-xl md:text-2xl font-light leading-relaxed mb-12">
              Excelência em <span className="text-secondary/80 font-medium">Neurocirurgia Complexa</span> e tratamentos de alta precisão para restauração da qualidade de vida.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.5em] text-secondary mb-12 neon-text">Navegação</h4>
            <ul className="space-y-6 text-xl font-light text-white/60">
              <li><a href="#inicio" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Home</a></li>
              <li><a href="#especialidades" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Expertise</a></li>
              <li><a href="#sobre" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">O Especialista</a></li>
              <li><a href="#contato" className="hover:text-white transition-all duration-300 hover:translate-x-2 inline-block">Unidades</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.5em] text-secondary mb-12 neon-text">Autoridade</h4>
            <ul className="space-y-6 text-xl font-light text-white/60">
              <li className="flex flex-col gap-1">
                <span className="text-white">CRM-SP 162949-SP</span>
                <span className="text-xs text-secondary/50 font-bold uppercase tracking-widest neon-text">Conselho Regional</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-white">RQE 87969</span>
                <span className="text-xs text-secondary/50 font-bold uppercase tracking-widest neon-text">Especialização</span>
              </li>
            </ul>
          </div>
        </div>
        <div id="redes-sociais" className="pt-16 border-t border-secondary/10 flex flex-col md:flex-row justify-between items-center gap-12 text-[11px] font-bold uppercase tracking-[0.4em] text-white/30">
          <p>© 2026 Dr. Everson Akio. <span className="text-white/10 mx-4 hidden md:inline">|</span> Todos os direitos reservados.</p>
          <div className="flex flex-wrap gap-6 items-center justify-center md:justify-end">
            <a 
              href="https://www.facebook.com/p/Dr-Everson-Akio-Sak%C3%B4-100076361857226/" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 bg-[#1877F2] rounded-full text-white font-bold text-[10px] uppercase tracking-widest shadow-[0_0_20px_rgba(24,119,242,0.3)] hover:shadow-[0_0_40px_rgba(24,119,242,0.6)] transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <Facebook size={18} className="group-hover:rotate-12 transition-transform duration-300" />
              Facebook
            </a>
            <a 
              href={"https://www.google.com/search?sca_esv=df3bf9aa0d357044&hl=pt-BR&gl=br&sxsrf=ANbL-n6cqy8QMSq5AKH17quFIfFiXgbKEQ:1773859280211&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOfFM0DjsutinJFnxZk-6IoB3KpS29bxjUpM2dq96FCb4kcXGmpLajAB0vZO5nzeDj_eye2nlA69VXLZf_wACMeAFwqq56qpQH7Bb1Zgup8TfzxItiA%3D%3D&q=Dr.+Everson+Akio+Sak%C3%B4+Coment%C3%A1rios&sa=X&ved=2ahUKEwjm8ZzijKqTAxXrpJUCHVEZFvEQ0bkNegQIKxAH&cshid=1773859282355441&biw=1920&bih=991&dpr=1#lrd=0x94c58bc8bad71751:0xcf8fda3d36cadc,3,,,,"}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 bg-white text-[#4285F4] font-bold text-[10px] uppercase tracking-widest shadow-[0_0_20px_rgba(66,133,244,0.2)] hover:shadow-[0_0_40px_rgba(66,133,244,0.5)] transition-all duration-500 hover:scale-105 active:scale-95 border border-[#4285F4]/20"
            >
              <div className="flex gap-0.5">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </div>
              Deixe sua avaliação no Google
            </a>
            <a 
              href="https://www.instagram.com/dr.eversonakio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded-full text-white font-bold text-[10px] uppercase tracking-widest shadow-[0_0_20px_rgba(253,29,29,0.3)] hover:shadow-[0_0_40px_rgba(253,29,29,0.6)] transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <Instagram size={18} className="group-hover:rotate-12 transition-transform duration-300" />
              Instagram
            </a>
            <a 
              href="https://www.doctoralia.com.br/adicionar-opiniao/everson-akio-sako#/opiniao" 
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#00b4cc] via-[#008299] to-[#005f73] rounded-full text-white font-bold text-[10px] uppercase tracking-widest shadow-[0_0_20px_rgba(0,180,204,0.3)] hover:shadow-[0_0_40px_rgba(0,180,204,0.6)] transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <Star size={18} className="group-hover:rotate-12 transition-transform duration-300" />
              Avaliação - Doctoralia
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};



export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Force direct scroll to top on reload
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const handleScroll = () => {
      // Check if user is near the bottom (within 100px)
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      setShowScrollTop(isBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen selection:bg-secondary selection:text-primary font-sans overflow-x-hidden">
      {/* Background neurons affecting the whole site */}
      <NeuronBackground />
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1, background: 'radial-gradient(ellipse at 50% 0%, rgba(2,6,16,0.3) 0%, rgba(2,6,16,0.7) 100%)' }} />
      <Navbar />
      <main className="relative" style={{ zIndex: 2 }}>
        <Hero />
        <Stats />
        <Expertise />
        <Philosophy />
        <HumanConnection />
        <FAQ />
        <Locations />
      </main>
      <Footer />

      {/* Global Dynamic Scroll Indicator / Back to Top */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
        className={`fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3 transition-all duration-500 ${showScrollTop ? "cursor-pointer pointer-events-auto hover:opacity-100 hover:scale-110 active:scale-95" : "pointer-events-none"}`}
        onClick={showScrollTop ? scrollToTop : undefined}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary">
            {showScrollTop ? "Topo" : "Descer"}
          </span>
          <div className="relative">
            {showScrollTop ? (
              <ChevronUp size={24} className="text-secondary" />
            ) : (
              <>
                <Mouse size={24} className="text-secondary" />
                <motion.div
                  animate={{ 
                    y: [2, 12, 2],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-2 bg-secondary rounded-full shadow-[0_0_8px_rgba(255,215,0,0.5)]"
                />
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
