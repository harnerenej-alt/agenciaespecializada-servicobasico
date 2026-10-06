/* ===== TIÊ LINGERIE - SCRIPT PRINCIPAL ===== */

document.addEventListener('DOMContentLoaded', function () {

  // ===== MENU MOBILE =====
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      nav.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Fecha menu ao clicar em um link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
  }

  // ===== HEADER SCROLL =====
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  // ===== BACK TO TOP =====
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== ANIMAÇÃO DOS NÚMEROS (SOBRE) =====
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  function animateNumbers() {
    if (statsAnimated) return;
    const sobreSection = document.getElementById('sobre');
    if (!sobreSection) return;

    const sectionTop = sobreSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
      statsAnimated = true;
      statNumbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-target'));
        const duration = 1500;
        const startTime = performance.now();

        function updateNumber(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(easeOut * target);
          num.textContent = current;

          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          } else {
            num.textContent = target;
          }
        }

        requestAnimationFrame(updateNumber);
      });
    }
  }

  window.addEventListener('scroll', animateNumbers);
  animateNumbers(); // Verifica ao carregar

  // ===== FORMULÁRIO DE CONTATO =====
  const form = document.getElementById('contatoForm');
  const feedback = document.getElementById('formFeedback');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const telefone = document.getElementById('telefone').value.trim();
      const mensagem = document.getElementById('mensagem').value.trim();

      // Validação básica
      if (!nome || !email || !mensagem) {
        feedback.textContent = '⚠ Por favor, preencha todos os campos obrigatórios.';
        feedback.className = 'form-feedback error';
        return;
      }

      // Validação de e-mail
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        feedback.textContent = '⚠ Por favor, insira um e-mail válido.';
        feedback.className = 'form-feedback error';
        return;
      }

      // Simulação de envio (aqui você conectaria a um backend)
      feedback.textContent = '✓ Mensagem enviada com sucesso! Entraremos em contato em breve.';
      feedback.className = 'form-feedback success';

      // Log dos dados (apenas para demonstração)
      console.log('--- Nova mensagem de contato ---');
      console.log('Nome:', nome);
      console.log('E-mail:', email);
      console.log('Telefone:', telefone || 'Não informado');
      console.log('Mensagem:', mensagem);

      // Limpa o formulário
      form.reset();

      // Remove a mensagem de sucesso após 5 segundos
      setTimeout(() => {
        feedback.textContent = '';
        feedback.className = 'form-feedback';
      }, 5000);
    });
  }

  // ===== SCROLL SUAVE PARA LINKS INTERNOS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== ANIMAÇÃO DE ENTRADA DOS CARDS (INTERSECTION OBSERVER) =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Aplica animação a cards e elementos
  const animatedElements = document.querySelectorAll(
    '.feature-card, .loja-card, .empresa-card, .privacidade-box'
  );

  animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`;
    observer.observe(el);
  });

  // ===== ANO DINÂMICO NO FOOTER =====
  const footerBottom = document.querySelector('.footer-bottom p');
  if (footerBottom) {
    const currentYear = new Date().getFullYear();
    footerBottom.innerHTML = footerBottom.innerHTML.replace('2025', currentYear);
  }

  // ===== EFEITO DE DIGITAÇÃO NO HERO (OPCIONAL) =====
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.minHeight = '1.3em';
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }

    // Inicia após um pequeno delay
    setTimeout(typeWriter, 500);
  }

  // ===== CONSOLE INFO =====
  console.log('%c💖 Tiê Lingerie', 'font-size: 24px; font-weight: bold; color: #d81b60;');
  console.log('%cModa íntima com qualidade, conforto e atitude há mais de 30 anos.', 'font-size: 14px; color: #8e24aa;');
  console.log('%c📍 Nova Friburgo - RJ | loja@tielingerie.com.br', 'font-size: 12px; color: #6b5b6e;');

});
