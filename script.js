document.addEventListener('DOMContentLoaded', () => {
  
  // =========================================================================
  // 1. Mobile Menu Toggle
  // =========================================================================
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // =========================================================================
  // 2. Scroll Spy and Header Background
  // =========================================================================
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Header styling on scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Spy active navigation link
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // =========================================================================
  // 3. Scroll Reveal & Skill Progress Trigger
  // =========================================================================
  const reveals = document.querySelectorAll('.reveal');
  const skillBars = document.querySelectorAll('.skill-bar');

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    reveals.forEach(reveal => {
      const revealTop = reveal.getBoundingClientRect().top;
      if (revealTop < triggerBottom) {
        reveal.classList.add('active');
      }
    });

    // Animate skill bars when visible
    skillBars.forEach(bar => {
      const barTop = bar.getBoundingClientRect().top;
      if (barTop < triggerBottom) {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  // Initial check
  revealOnScroll();

  // =========================================================================
  // 4. Interactive Terminal Emulator
  // =========================================================================
  const terminalBody = document.getElementById('terminal-body');
  const terminalInput = document.getElementById('terminal-input');

  const commands = {
    help: `Available commands:
  <span class="terminal-prompt">about</span>       - Brief professional summary of Narendra
  <span class="terminal-prompt">skills</span>      - Highlighted technologies and tech stacks
  <span class="terminal-prompt">experience</span>  - Latest roles and responsibilities
  <span class="terminal-prompt">projects</span>    - Details about built projects
  <span class="terminal-prompt">education</span>   - University and degree details
  <span class="terminal-prompt">contact</span>     - How to get in touch (email, phone)
  <span class="terminal-prompt">clear</span>       - Clear the terminal screen`,
    
    about: `<b>Narendra Kumar</b> - Java Backend Developer
---------------------------------------------
- 3.5+ Years of professional Software Engineering experience
- Specializes in building secure, distributed backend microservices
- Strong expertise in Core Java, Spring Boot, Hibernate and database tuning
- Passionate about code quality, microservice architectures, and AWS cloud`,
    
    skills: `<b>Technical Skill Matrix:</b>
-------------------------
- <b>Languages:</b> Core Java, Java 8+/17, SQL
- <b>Frameworks:</b> Spring Boot, Spring MVC, Hibernate ORM, Spring Security
- <b>Microservices:</b> Eureka, API Gateway, Feign Client, Zipkin, Config Server
- <b>DevOps & Clouds:</b> Git, GitLab, Docker, AWS (EC2, S3, RDS, Lambda)
- <b>Databases:</b> MySQL, SQL Server, Oracle SQL
- <b>AI & Tools:</b> Maven, JIRA, Antigravity, Claude, Ollama`,
    
    experience: `<b>Work Experience:</b>
------------------
<b>WEBEARN SOLUTION PVT LTD | Java Developer</b>
<i>June 2022 - Present | Noida, Uttar Pradesh</i>
- Designed/engineered microservices with Spring Boot & Hibernate.
- Created 20+ secure REST APIs with Spring Security & JWT authentication.
- Optimized controller layers and mapped enterprise relational databases.`,
    
    projects: `<b>Featured Projects:</b>
------------------
1. <b>S Chand Publication E-commerce Platform</b> (Dec 2023 - Present)
   - Tech Stack: Java, Spring Boot, Spring Security, JPA, Oracle SQL
   - Description: Scalable e-commerce site matching vast educational catalogs.
2. <b>Online Health Insurance Services</b> (June 2022 - Nov 2023)
   - Tech Stack: Spring Boot, Spring MVC, Hibernate, MySQL, JSP
   - Client: Harvard Pilgrims HealthCare, USA
   - Description: Claims handling and health policy client manager.`,
    
    education: `<b>Education Credentials:</b>
------------------------
- <b>Degree:</b> B.Tech (Computer Science & Engineering)
- <b>Institution:</b> Priyadarshini College of Computer Sciences
- <b>Affiliation:</b> Dr A.P.J Abdul Kalam Technical University, Lucknow
- <b>Performance:</b> 65.92% Aggregate`,
    
    contact: `<b>Contact Channels:</b>
------------------
- <b>Email:</b> <a href="mailto:narenagra007@gmail.com" class="terminal-prompt">narenagra007@gmail.com</a>
- <b>Phone:</b> <a href="tel:+919220748426" class="terminal-prompt">+91-9220748426</a>
- <b>Location:</b> Noida, Uttar Pradesh, India`
  };

  const createTerminalLine = (text, className = '') => {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.innerHTML = text;
    return line;
  };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    // Add command echo line
    const echoLine = createTerminalLine(`<span class="terminal-input-prompt">guest@narendra-portfolio:~$</span> <span style="color: #ffffff">${cmd}</span>`);
    terminalBody.insertBefore(echoLine, terminalInput.parentElement);

    if (trimmedCmd === '') {
      return;
    }

    if (trimmedCmd === 'clear') {
      // Clear lines except the prompt
      const lines = terminalBody.querySelectorAll('.terminal-line');
      lines.forEach(l => l.remove());
    } else if (commands.hasOwnProperty(trimmedCmd)) {
      const output = createTerminalLine(commands[trimmedCmd]);
      terminalBody.insertBefore(output, terminalInput.parentElement);
      
      // Also add spacing
      const spacing = createTerminalLine('');
      terminalBody.insertBefore(spacing, terminalInput.parentElement);
    } else {
      const errOutput = createTerminalLine(`Command not found: <span style="color: #ff5f56">${trimmedCmd}</span>. Type <span class="terminal-prompt">help</span> for all commands.`);
      terminalBody.insertBefore(errOutput, terminalInput.parentElement);
      
      const spacing = createTerminalLine('');
      terminalBody.insertBefore(spacing, terminalInput.parentElement);
    }

    // Scroll to bottom
    terminalBody.scrollTop = terminalBody.scrollHeight;
  };

  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const value = terminalInput.value;
        executeCommand(value);
        terminalInput.value = '';
      }
    });

    // Make clicking the terminal container focus the input
    const terminalBox = document.querySelector('.terminal-box');
    if (terminalBox) {
      terminalBox.addEventListener('click', () => {
        terminalInput.focus();
      });
    }
  }

  // =========================================================================
  // 5. Contact Form Submission
  // =========================================================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      // Simple mock feedback
      const originalBtnText = contactForm.querySelector('button').innerHTML;
      const submitBtn = contactForm.querySelector('button');
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sending... <i class="fas fa-spinner fa-spin"></i>`;
      submitBtn.style.opacity = '0.7';

      setTimeout(() => {
        // Success presentation
        submitBtn.innerHTML = `Sent Successfully! <i class="fas fa-check"></i>`;
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        submitBtn.style.color = '#ffffff';
        
        // Reset form
        contactForm.reset();
        
        // Revert button status after a short delay
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
          submitBtn.innerHTML = originalBtnText;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
        }, 3000);

      }, 1500);
    });
  }
});
