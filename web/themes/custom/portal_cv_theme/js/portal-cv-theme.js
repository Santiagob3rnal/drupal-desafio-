/**
 * @file
 * JavaScript personalizado para melhorar a interatividade do Portal CV.
 */
(function ($, Drupal, once) {
  'use strict';

  Drupal.behaviors.portalCvEnhanced = {
    attach: function (context, settings) {
      once('portalCvEnhanced', 'html', context).forEach(function () {
        // Adicionar classes de animação aos elementos quando ficam visíveis
        const animateElements = document.querySelectorAll('.job-card, .cv-card, .section-title, .hero-banner h1, .hero-banner .lead');
        
        if ('IntersectionObserver' in window) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
              }
            });
          }, { threshold: 0.1 });
          
          animateElements.forEach(el => {
            observer.observe(el);
          });
        } else {
          // Fallback para navegadores que não suportam IntersectionObserver
          animateElements.forEach(el => {
            el.classList.add('fade-in');
          });
        }
        
        // Melhorar a experiência de pesquisa
        $('.views-exposed-form select').on('change', function() {
          // Opcional: enviar formulário automaticamente ao mudar select
          // $(this).closest('form').submit();
        });
        
        // Contador de caracteres para campos de texto
        $('.form-textarea').each(function() {
          const maxLength = $(this).attr('maxlength');
          if (maxLength) {
            const counterHtml = '<div class="char-counter"><span class="current">0</span>/<span class="maximum">' + maxLength + '</span></div>';
            $(this).after(counterHtml);
            
            $(this).on('input', function() {
              const currentLength = $(this).val().length;
              const counter = $(this).next('.char-counter').find('.current');
              counter.text(currentLength);
              
              if (currentLength > maxLength * 0.9) {
                counter.addClass('text-danger');
              } else {
                counter.removeClass('text-danger');
              }
            });
          }
        });
        
        // Adicionar tooltips a elementos com data-toggle="tooltip"
        $('[data-toggle="tooltip"]').tooltip();
        
        // Melhorar a experiência de scroll
        $('a[href*="#"]:not([href="#"])').click(function() {
          if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
              $('html, body').animate({
                scrollTop: target.offset().top - 100
              }, 800);
              return false;
            }
          }
        });
      });
    }
  };
})(jQuery, Drupal, once);
