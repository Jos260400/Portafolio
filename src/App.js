import React, { useEffect, useState } from 'react';
import './App.css'; 
import linkedinIcon from './linkedin-icon.png'; 
import githubIcon from './github-icon.png'; 
import photo1 from './photo1.jpg'; 
import photo2 from './photo2.jpg';
import photo3 from './photo3.jpg';
import backgroundVideo from './background-video.mp4';

function App() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const photos = [photo1, photo2, photo3];

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [photos.length]);

  useEffect(() => {
    const sections = document.querySelectorAll('.Section');

    const scrollReveal = () => {
      sections.forEach(section => {
        const sectionPosition = section.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (sectionPosition < screenHeight) {
          section.classList.add('fadeInUp');
        }
      });
    };

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
      scrollReveal();
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const redirectTo = (path) => {
    window.location.href = path;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = {
      title: formData.get('title'),
      message: formData.get('message'),
    };

    fetch('https://your-server-endpoint.com/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    form.reset();
  };

  return (
    <div className="App">
      <video className="background-video" autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
      
      <header className="App-header">
        <h1>Bienvenido, mi nombre es José</h1>
        <div className="photo-carousel">
          {photos.map((photo, index) => (
            <img 
              key={index}
              src={photo}
              alt={`Foto ${index + 1}`}
              className={index === activePhotoIndex ? 'active' : ''}
            />
          ))}
        </div>
        <nav>
          <ul>
            <li><a href="#section1">Laboratorios</a></li>
            <li><a href="#section2">Proyectos</a></li>
            <li><a href="#section3">Foros</a></li>
            <li><a href="#contact">Llenar Formulario</a></li>
            <li><a href="#hobbies">Pasatiempos</a></li>
          </ul>
        </nav>
      </header>
      
      <div className="Content">
        <div id="section1" className="Section">
          <h2>Laboratorios</h2>
          <p>Actividades prácticas que se realizaron para casa durante el curso de Sistemas y Tecnologías Web.</p>
          <button onClick={() => redirectTo('laboratorios.html')}>Ir a Laboratorios</button>
        </div>
        <div id="section2" className="Section">
          <h2>Proyectos</h2>
          <p>Actividades que recopilan durante el curso de Sistemas y Tecnologías Web.</p>
          <button onClick={() => redirectTo('proyectos.html')}>Ir a Proyectos</button>
        </div>
        <div id="section3" className="Section">
          <h2>Foros</h2>
          <p>Actividades prácticas subidas al portal durante el curso de Sistemas y Tecnologías Web</p>
          <button onClick={() => redirectTo('foros.html')}>Ir a Foros</button>
        </div>

        <div id="contact" className="Section">
          <h2>Llenar Formulario</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Título:
              <input type="text" name="title" required />
            </label>
            <label>
              Mensaje:
              <textarea name="message" rows="4" required></textarea>
            </label>
            <button type="submit">Enviar</button>
          </form>
        </div>

        <div id="hobbies" className="Section">
          <h2>Pasatiempos</h2>
          <div className="video-container">
            <iframe 
              width="560" 
              height="315" 
              src="https://www.youtube.com/embed/example1" 
              title="Video de Pasatiempo 1" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
            <iframe 
              width="560" 
              height="315" 
              src="https://www.youtube.com/embed/example2" 
              title="Video de Pasatiempo 2" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
        </div>
      </div>

      <div className="Biography">
        <h2>Sobre mi</h2>
        <p>Soy un programador apasionado y altamente competente con experiencia en desarrollo de software. Mi enfoque está en crear soluciones eficientes y escalables para desafíos complejos. Además, mantengo un compromiso constante con la mejora continua, manteniéndome actualizado con las últimas tendencias tecnológicas y adoptando mejores prácticas de desarrollo.</p>
      </div>

      <footer className="Footer">
        <div className="SocialLinks">
          <a href="https://www.linkedin.com/in/tu-usuario-de-linkedin" target="_blank" rel="noopener noreferrer"><img src={linkedinIcon} alt="LinkedIn" /></a>
          <a href="https://github.com/tu-usuario-de-github" target="_blank" rel="noopener noreferrer"><img src={githubIcon} alt="GitHub" /></a>
        </div>
        <p>Derechos de autor © 2024 Fernando José Garavito Ovando. Todos los derechos reservados.</p>
      </footer>

      {showScrollButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>↑</button>
      )}
    </div>
  );
}

export default App;
