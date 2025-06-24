import React, { useState, useEffect } from 'react';
import { Plug, MessageCircle, X, Minimize2 } from 'lucide-react';

import { Send, Code, Palette, Database, Globe, Smartphone, Cpu } from 'lucide-react';


const AnimatedPortfolio = () => {
  const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [quoteOpacity, setQuoteOpacity] = useState(1);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  

  const iconStyle = {
    width: '24px',
    height: '24px',
  };
  

  const projects = [
  {
    id: 1,
    name: 'Meal planner and Recipe Box',
    description: "A smart food app that suggests the best recipes, cocktails, and wines — powered by AI, personalized just for your cravings.",
    tech: ['Python', 'Fastapi', 'MongoDB', 'LLM', 'Qdrant'],
    animationType: 'food'
  },
  {
    id: 2,
    name: 'Stock Market Predictor',
    description: 'LSTM-based stock price prediction with real-time analysis',
    tech: ['Python', 'TensorFlow', 'LSTM', 'RNN','FastAPI'],
    animationType: 'stock'
  },
  {
    id: 3,
    name: 'AI Personal Assistant',
    description: 'Intelligent chatbot with natural language processing',
    tech: ['Python', 'OpenAI', 'FastAPI', 'Qdrant','RAG','twillio'],
    animationType: 'assistant'
  }
];


// 3. Add this useEffect for project rotation:
// 3. Add this useEffect for project rotation:
useEffect(() => {
  const projectTimer = setInterval(() => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  }, 5000); // Change every 5 seconds
  
  return () => clearInterval(projectTimer);
}, [projects.length]);


  const texts = [
    'a Python Developer',
    'an AI Developer', 
    'a Data Scientist'
  ];

  

  const skills = [
    { name: 'Python', icon: <Code style={iconStyle} /> },
    { name: 'FastAPI', icon: <Plug style={iconStyle} /> },
    { name: 'RAG', icon: <Cpu style={iconStyle} /> },
    { name: 'LLM', icon: <Cpu style={iconStyle} /> },
    { name: 'MongoDB', icon: <Database style={iconStyle} /> },
    { name: 'Postgres', icon: <Database style={iconStyle} /> },
    {
      name: (
        <>
          Microservice<br />Architecture
        </>
      ),
      icon: <Smartphone style={iconStyle} />
    },
  ];

  // Quotes
  const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs"
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House"
  },

  {
    text: "Experience is the name everyone gives to their mistakes.",
    author: "Oscar Wilde"
  },
  {
    text: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs"
  }
];

  // Enhanced message formatting function
  const formatMessage = (content) => {
  const lines = content.split('\n').filter(line => line.trim() !== '');

  return lines.map((line, index) => {
    const trimmedLine = line.trim();

    // Bullet point
    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('• ')) {
      return (
        <div key={index} style={styles.bulletPoint}>
          <span style={styles.bulletSymbol}>•</span>
          <span style={styles.bulletText}>
            {trimmedLine.substring(2).trim()}
          </span>
        </div>
      );
    }

    // Numbered list
    const numberedMatch = trimmedLine.match(/^(\d+)\.\s+(.+)/);
    if (numberedMatch) {
      return (
        <div key={index} style={styles.bulletPoint}>
          <span style={styles.bulletSymbol}>{numberedMatch[1]}.</span>
          <span style={styles.bulletText}>{numberedMatch[2]}</span>
        </div>
      );
    }

    // Link handling
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    if (linkRegex.test(trimmedLine)) {
      const parts = trimmedLine.split(linkRegex);
      return (
        <div key={index} style={styles.regularText}>
          {parts.map((part, partIndex) => {
            if (linkRegex.test(part)) {
              return (
                <a 
                  key={partIndex} 
                  href={part} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={styles.link}
                >
                  {part}
                </a>
              );
            }
            return <span key={partIndex}>{part}</span>;
          })}
        </div>
      );
    }

    // Regular text
    return (
      <div key={index} style={styles.regularText}>
        {trimmedLine}
      </div>
    );
  });
};



  // Typing animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentWord = texts[textIndex];
      
      if (!isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        
        if (currentText === currentWord) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, textIndex, texts]);

  


  // Quote animation effect
  useEffect(() => {
  const quoteTimer = setInterval(() => {
    // Start fade out
    setQuoteOpacity(0);
    
    setTimeout(() => {
      // Change quote during fade
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
      
      // Start fade in
      setTimeout(() => {
        setQuoteOpacity(1);
      }, 100);
    }, 500); // Half second to fade out
  }, 4000); // Change every 4 seconds
  
  return () => clearInterval(quoteTimer);
}, [quotes.length]);

function getOrCreateUserId() {
  let userId = localStorage.getItem("portfolio_user_id");
  if (!userId) {
    userId = crypto.randomUUID(); // Generates a one-time UUID
    localStorage.setItem("portfolio_user_id", userId);
  }
  return userId;
}

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userId = getOrCreateUserId(); 

    const newMessage = { type: 'user', content: inputMessage };
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);



    try {
      const response = await fetch('http://localhost:8002/api/v1/qns-ans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ userId,query: inputMessage ,}),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { type: 'bot', content: data.response || 'Sorry, I could not process your request.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { type: 'bot', content: 'Error connecting to the server. Please try again.' }]);
    } finally {
      setIsLoading(false);
      setInputMessage('');
    }
  };

  const handleFormSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus('');

  try {
    // Simulate form submission - replace with your actual endpoint
    const response = await fetch('http://localhost:8002/api/v1/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } else {
      setSubmitStatus('error');
    }
  } catch (error) {
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
    // Clear status after 3 seconds
    setTimeout(() => setSubmitStatus(''), 3000);
  }
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};



  

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e1b4b 0%, #1e3a8a 50%, #312e81 100%)',
      color: 'white',
      overflow: 'hidden',
      position: 'relative'
    },
    heroSection: {
      position: 'relative',
      height: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 4rem'
    },
    backgroundBlob: {
      position: 'absolute',
      width: '256px',
      height: '256px',
      borderRadius: '50%',
      mixBlendMode: 'multiply',
      filter: 'blur(40px)',
      opacity: 0.2,
      animation: 'pulse 3s ease-in-out infinite'
    },
    blob1: {
      top: '25%',
      left: '25%',
      background: '#a855f7'
    },
    blob2: {
      top: '75%',
      right: '25%',
      background: '#3b82f6',
      animationDelay: '1s'
    },
    blob3: {
      bottom: '25%',
      left: '50%',
      background: '#6366f1',
      animationDelay: '2s'
    },
    leftSection: {
      zIndex: 10,
      flex: 1,
      maxWidth: '512px'
    },
    mainTitle: {
      fontSize: '4rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      background: 'linear-gradient(to right, #22d3ee, #a855f7)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    typewriterContainer: {
      fontSize: '2rem',
      fontWeight: '600',
      marginBottom: '1rem',
      height: '3rem',
      display: 'flex',
      alignItems: 'center'
    },
    typewriterText: {
      marginLeft: '0.5rem',
      color: '#22d3ee',
      borderRight: '2px solid #22d3ee',
      animation: 'pulse 1s ease-in-out infinite'
    },
    description: {
      fontSize: '1.125rem',
      color: '#d1d5db',
      lineHeight: '1.75'
    },
    rightSection: {
      zIndex: 10,
      flex: 1,
      display: 'flex',
      justifyContent: 'center'
    },
    laptopContainer: {
      position: 'relative'
    },
    laptop: {
      width: '320px',
      height: '192px',
      background: '#374151',
      borderRadius: '8px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      transform: 'rotate(2deg)',
      transition: 'transform 0.5s ease',
      cursor: 'pointer'
    },
    laptopHover: {
      transform: 'rotate(0deg)'
    },
    screen: {
      width: '100%',
      height: '128px',
      background: 'black',
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
      padding: '1rem',
      overflow: 'hidden'
    },
    codeLines: {
      animation: 'pulse 2s ease-in-out infinite'
    },
    codeLine: {
      height: '8px',
      borderRadius: '4px',
      marginBottom: '8px'
    },
    codeLine1: {
      background: '#10b981',
      width: '75%'
    },
    codeLine2: {
      background: '#3b82f6',
      width: '50%'
    },
    codeLine3: {
      background: '#f59e0b',
      width: '66%'
    },
    codeLine4: {
      background: '#a855f7',
      width: '33%'
    },
    keyboard: {
      height: '64px',
      background: '#4b5563',
      borderBottomLeftRadius: '8px',
      borderBottomRightRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    trackpad: {
      width: '48px',
      height: '32px',
      background: '#6b7280',
      borderRadius: '4px'
    },
    floatingElement: {
      position: 'absolute',
      background: '#f59e0b',
      color: 'black',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '0.875rem',
      fontFamily: 'monospace',
      animation: 'bounce 2s infinite'
    },
    float1: {
      top: '-16px',
      right: '-16px'
    },
    float2: {
      bottom: '-16px',
      left: '-16px',
      background: '#10b981',
      animationDelay: '0.5s'
    },
    float3: {
      top: '50%',
      right: '-32px',
      background: '#3b82f6',
      animationDelay: '1s'
    },
    skillsSection: {
      padding: '5rem 0',
      background: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(10px)'
    },
    skillsTitle: {
      textAlign: 'center',
      marginBottom: '3rem'
    },
    skillsTitleText: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      background: 'linear-gradient(to right, #22d3ee, #a855f7)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    skillsContainer: {
      position: 'relative',
      overflow: 'hidden'
    },
    skillsSlider: {
      display: 'flex',
      animation: 'scroll 20s linear infinite'
    },
    skillCard: {
      flexShrink: 0,
      margin: '0 2rem',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      padding: '1.5rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    skillCardHover: {
      background: 'rgba(255, 255, 255, 0.2)',
      transform: 'scale(1.05)'
    },
    skillIcon: {
      color: '#22d3ee',
      marginBottom: '0.75rem',
      display: 'flex',
      justifyContent: 'center'
    },
    skillName: {
      textAlign: 'center',
      fontWeight: '600',
      whiteSpace: 'nowrap'
    },    

    // form section
    contactSection: {
    padding: '5rem 0',
    background: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  contactTitle: {
    textAlign: 'center',
    marginBottom: '3rem'
  },
  contactTitleText: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    background: 'linear-gradient(to right, #22d3ee, #a855f7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  contactSubtitle: {
    fontSize: '1.125rem',
    color: '#d1d5db',
    textAlign: 'center'
  },
  formContainer: {
    width: '100%',
    maxWidth: '600px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '2.5rem',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  formGroup: {
    marginBottom: '1.5rem'
  },
  formLabel: {
    display: 'block',
    marginBottom: '0.5rem',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '500'
  },
  formInput: {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box'
  },
  formInputFocus: {
    borderColor: '#22d3ee',
    background: 'rgba(255, 255, 255, 0.15)'
  },
  formTextarea: {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    minHeight: '120px',
    resize: 'vertical'
  },
  submitButton: {
    width: '100%',
    padding: '0.875rem 1.5rem',
    borderRadius: '10px',
    border: 'none',
    background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    outline: 'none'
  },
  submitButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 20px rgba(34, 211, 238, 0.3)'
  },
  submitButtonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
    transform: 'none'
  },
  statusMessage: {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginTop: '1rem',
    textAlign: 'center'
  },
  successMessage: {
    background: 'rgba(16, 185, 129, 0.2)',
    color: '#10b981',
    border: '1px solid rgba(16, 185, 129, 0.3)'
  },
  errorMessage: {
    background: 'rgba(239, 68, 68, 0.2)',
    color: '#ef4444',
    border: '1px solid rgba(239, 68, 68, 0.3)'
  },
  footer: {
    padding: '2rem 0',
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: '0.875rem',
    background: 'rgba(0, 0, 0, 0.2)'
  },

    // Chatbot Widget Styles
    chatWidget: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000,
      fontFamily: 'Arial, sans-serif'
    },
    chatToggleButton: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
      transition: 'all 0.3s ease',
      animation: 'chatPulse 2s ease-in-out infinite'
    },
    chatToggleIcon: {
      color: 'white',
      width: '24px',
      height: '24px'
    },
    chatLabel: {
      position: 'absolute',
      bottom: '70px',
      right: '0',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      whiteSpace: 'nowrap',
      opacity: isChatOpen ? 0 : 1,
      transform: isChatOpen ? 'translateY(10px)' : 'translateY(0)',
      transition: 'all 0.3s ease',
      pointerEvents: 'none'
    },
    chatContainer: {
      position: 'absolute',
      bottom: '80px',
      right: '0',
      width: '420px',
      height: '500px',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '30px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
      transform: isChatOpen ? 'scale(1) translateY(0)' : 'scale(0) translateY(20px)',
      transformOrigin: 'bottom right',
      transition: 'all 0.6s ease',
      opacity: isChatOpen ? 1 : 0,
      pointerEvents: isChatOpen ? 'all' : 'none',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    },
    chatHeader: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '15px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px'
    },
    chatHeaderTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: 0,
  },
    chatHeaderButtons: {
      display: 'flex',
      gap: '10px'
    },
    chatHeaderButton: {
      background: 'none',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      padding: '4px',
      borderRadius: '4px',
      transition: 'background 0.2s ease'
    },
    chatMessages: {
      flex: 1,
      padding: '15px',
      overflowY: 'auto',
      display: isMinimized ? 'none' : 'block'
    },
    chatInputContainer: {
      padding: '12px',
      borderTop: '1px solid rgba(0,0,0,0.1)',
      display: isMinimized ? 'none' : 'flex',
      gap: '10px'
    },
    chatInput: {
      flex: 1,
      padding: '12px 15px',
      border: '1px solid rgba(0,0,0,0.2)',
      borderRadius: '25px',
      outline: 'none',
      fontSize: '14px',
      background: 'white'
    },
    chatSendButton: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      border: 'none',
      borderRadius: '50%',
      width: '45px',
      height: '45px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.2s ease'
    },
    chatSendIcon: {
      color: 'white',
      width: '18px',
      height: '18px'
    },
    
    // Message Styles
    messageRow: {
      display: 'flex',
      marginBottom: '12px'
    },
    userMessageRow: {
      justifyContent: 'flex-end'
    },
    botMessageRow: {
      justifyContent: 'flex-start'
    },
    message: {
      maxWidth: '80%',
      padding: '10px 15px',
      borderRadius: '18px',
      fontSize: '14px',
      lineHeight: '1.4'
    },
    userMessage: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    },
    botMessage: {
      background: '#f1f3f4',
      color: '#333'
    },
    
    // Enhanced formatting styles
    bulletPoint: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '6px',
      lineHeight: '1.4'
    },
    bulletSymbol: {
      color: '#667eea',
      fontWeight: 'bold',
      marginRight: '8px',
      fontSize: '14px',
      minWidth: '12px',
      marginTop: '2px'
    },
    bulletText: {
      flex: 1,
      fontSize: '14px',
      color: '#333'
    },
    regularText: {
      marginBottom: '6px',
      lineHeight: '1.4',
      fontSize: '14px',
      color: '#333'
    },
    link: {
      color: '#667eea',
      textDecoration: 'underline',
      cursor: 'pointer'
    },
    
    // Loading animation
    loadingDots: {
      display: 'flex',
      justifyContent: 'flex-start'
    },
    loadingMessage: {
      background: '#f1f3f4',
      color: '#333',
      padding: '10px 15px',
      borderRadius: '18px'
    },
    dotsContainer: {
      display: 'flex',
      gap: '3px'
    },
    dot: {
      width: '6px',
      height: '6px',
      background: '#999',
      borderRadius: '50%',
      animation: 'bounce 1.4s ease-in-out infinite both'
    },
    dot2: {
      animationDelay: '0.16s'
    },
    dot3: {
      animationDelay: '0.32s'
    },
    
    // Empty state
    emptyState: {
      textAlign: 'center',
      color: '#666',
      padding: '20px',
      fontSize: '14px'
    },
  quotesSection: {
  padding: '0.3rem 0', // Reduced from 5rem
  background: 'rgba(0, 0, 0, 0.3)', // Match other sections
  backdropFilter: 'blur(100px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '180px' // Reduced from 400px
},
quoteContainer: {
  textAlign: 'center',
  maxWidth: '1000px',
  padding: '0 8rem',
  transition: 'opacity 0.6s ease-in-out',
  opacity: quoteOpacity
},
quoteText: {
  fontSize: '1.5rem',
  fontStyle: 'italic',
  color: '#e5e5e5',
  marginBottom: '1rem',
  lineHeight: '1.6'
},
quoteAuthor: {
  fontSize: '1rem',
  color: '#22d3ee',
  fontWeight: '600',
  marginBottom: '1.5rem'
},
quoteDots: {
  display: 'flex',
  justifyContent: 'center',
  gap: '8px'
},
quoteDot: {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.3)',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
},
quoteDotActive: {
  background: '#22d3ee',
  transform: 'scale(1.2)'
},

projectsSection: {
  padding: '5rem 0',
  background: 'rgba(0, 0, 0, 0.2)',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
},
projectsTitle: {
  textAlign: 'center',
  marginBottom: '3rem'
},
projectsTitleText: {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
  background: 'linear-gradient(to right, #22d3ee, #a855f7)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text'
},
projectContainer: {
  position: 'relative',
  width: '100%',
  maxWidth: '800px',
  height: '400px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
},
projectCard: {
  position: 'absolute',
  width: '600px',
  height: '350px',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  padding: '2rem',
  cursor: 'pointer',
  transition: 'all 0.5s ease',
  transform: 'scale(0.9) translateY(20px)',
  opacity: 0
},
projectCardActive: {
  transform: 'scale(1) translateY(0)',
  opacity: 1
},
projectCardHover: {
  background: 'rgba(255, 255, 255, 0.15)',
  transform: 'scale(1.02) translateY(-5px)'
},
projectHeader: {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '1.5rem'
},
projectInfo: {
  flex: 1
},
projectName: {
  fontSize: '1.8rem',
  fontWeight: 'bold',
  color: 'white',
  marginBottom: '0.5rem'
},
projectDescription: {
  fontSize: '1rem',
  color: '#d1d5db',
  marginBottom: '1rem',
  lineHeight: '1.5'
},
projectTech: {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  marginBottom: '1.5rem'
},
techTag: {
  background: 'rgba(34, 211, 238, 0.2)',
  color: '#22d3ee',
  padding: '0.25rem 0.75rem',
  borderRadius: '12px',
  fontSize: '0.875rem',
  fontWeight: '500'
},
projectAnimation: {
  width: '120px',
  height: '120px',
  borderRadius: '15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '3rem',
  marginLeft: '2rem'
},

// Animation specific styles
foodAnimation: {
  background: 'linear-gradient(135deg, #ff6b6b, #ff8e8e)',
  animation: 'foodBounce 2s ease-in-out infinite'
},
stockAnimation: {
  background: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
  animation: 'stockPulse 2s ease-in-out infinite'
},
assistantAnimation: {
  background: 'linear-gradient(135deg, #667eea, #764ba2)',
  animation: 'assistantGlow 2s ease-in-out infinite'
},
projectDots: {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  marginTop: '2rem'
},
projectDot: {
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.3)',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
},
projectDotActive: {
  background: '#22d3ee',
  transform: 'scale(1.3)'
},

  };


  const keyframes = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    @keyframes bounce {
      0%, 80%, 100% { 
        transform: translateY(0);
      }
      40% { 
        transform: translateY(-30px);
      }
    }
    
    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }
    
    @keyframes chatPulse {
      0%, 100% {
        transform: scale(1);
        box-shadow: 0 8px 25px rgba(0,0,0,0.3);
      }
      50% {
        transform: scale(1.05);
        box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
      }
    }
      @keyframes foodBounce {
    0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(5deg); }
    }
    
    @keyframes stockPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    @keyframes assistantGlow {
      0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.5); }
      50% { box-shadow: 0 0 30px rgba(102, 126, 234, 0.8); }
    }
    
  `;




  return (
    
    <div style={styles.container}>
      <style>{keyframes}</style>

      {/* ADD QUOTES SECTION HERE */}
    <div style={styles.quotesSection}>
  <div style={styles.quoteContainer}>
    <div style={styles.quoteText}>
      "{quotes[currentQuoteIndex].text}"
    </div>
    <div style={styles.quoteAuthor}>
      — {quotes[currentQuoteIndex].author}
    </div>
    <div style={styles.quoteDots}>
      {quotes.map((_, index) => (
        <div
          key={index}
          style={{
            ...styles.quoteDot,
            ...(index === currentQuoteIndex ? styles.quoteDotActive : {})
          }}
          onClick={() => {
            setQuoteOpacity(0);
            setTimeout(() => {
              setCurrentQuoteIndex(index);
              setTimeout(() => setQuoteOpacity(1), 100);
            }, 250);
          }}
        />
      ))}
    </div>
  </div>
</div>
      
      {/* Hero Section */}
      <div style={styles.heroSection}>
        {/* Animated Background */}
        <div style={{...styles.backgroundBlob, ...styles.blob1}}></div>
        <div style={{...styles.backgroundBlob, ...styles.blob2}}></div>
        <div style={{...styles.backgroundBlob, ...styles.blob3}}></div>

        {/* Left Side - Text Animation */}
        <div style={styles.leftSection}>
          <h1 style={styles.mainTitle}>Hello! I am Satyam</h1>
          <div style={styles.typewriterContainer}>
            Hire me as
            <span style={styles.typewriterText}>
              {currentText}
            </span>
          </div>
          <p style={{ ...styles.description, marginTop: '30px' }}>
            Simplicity is the ultimate sophistication.
          </p>
        </div>

        {/* Right Side - Animated Coding Figure */}
        <div style={styles.rightSection}>
          <div style={styles.laptopContainer}>
            {/* Laptop */}
            <div 
              style={styles.laptop}
              onMouseEnter={(e) => e.target.style.transform = 'rotate(0deg)'}
              onMouseLeave={(e) => e.target.style.transform = 'rotate(2deg)'}
            >
              <div style={styles.screen}>
                <div style={styles.codeLines}>
                  <div style={{...styles.codeLine, ...styles.codeLine1}}></div>
                  <div style={{...styles.codeLine, ...styles.codeLine2}}></div>
                  <div style={{...styles.codeLine, ...styles.codeLine3}}></div>
                  <div style={{...styles.codeLine, ...styles.codeLine4}}></div>
                </div>
              </div>
              <div style={styles.keyboard}>
                <div style={styles.trackpad}></div>
              </div>
            </div>

            {/* Floating Code Elements */}
            <div style={{...styles.floatingElement, ...styles.float1}}>
              {'</>'}
            </div>
            <div style={{...styles.floatingElement, ...styles.float2}}>
              {'{}'}
            </div>
            <div style={{...styles.floatingElement, ...styles.float3}}>
              {'()'}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div style={styles.skillsSection}>
        <div style={styles.skillsTitle}>
          <h2 style={styles.skillsTitleText}>
            Skills & Technologies
          </h2>
        </div>
        
        <div style={styles.skillsContainer}>
          <div style={styles.skillsSlider}>
            {[...skills, ...skills].map((skill, index) => (
              <div
                key={index}
                style={styles.skillCard}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <div style={styles.skillIcon}>
                  {skill.icon}
                </div>
                <p style={styles.skillName}>{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Projects Section */}
      <div style={styles.projectsSection}>
  <div style={styles.projectsTitle}>
    <h2 style={styles.projectsTitleText}>
      Featured Projects
    </h2>
  </div>
  
  <div style={styles.projectContainer}>
    {projects.map((project, index) => (
      <div
        key={project.id}
        style={{
          ...styles.projectCard,
          ...(index === currentProjectIndex ? styles.projectCardActive : {})
        }}
        onClick={() => window.open(project.githubUrl, '_blank')}
        onMouseEnter={(e) => {
          if (index === currentProjectIndex) {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'scale(1.02) translateY(-5px)';
          }
        }}
        onMouseLeave={(e) => {
          if (index === currentProjectIndex) {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'scale(1) translateY(0)';
          }
        }}
      >
        <div style={styles.projectHeader}>
          <div style={styles.projectInfo}>
            <h3 style={styles.projectName}>{project.name}</h3>
            <p style={styles.projectDescription}>{project.description}</p>
            <div style={styles.projectTech}>
              {project.tech.map((tech, techIndex) => (
                <span key={techIndex} style={styles.techTag}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div style={{
            ...styles.projectAnimation,
            ...(project.animationType === 'food' ? styles.foodAnimation : {}),
            ...(project.animationType === 'stock' ? styles.stockAnimation : {}),
            ...(project.animationType === 'assistant' ? styles.assistantAnimation : {})
          }}>
            {project.animationType === 'food' && '🍕'}
            {project.animationType === 'stock' && '📈'}
            {project.animationType === 'assistant' && '🤖'}
          </div>
        </div>
      </div>
    ))}
  </div>
  
  <div style={styles.projectDots}>
    {projects.map((_, index) => (
      <div
        key={index}
        style={{
          ...styles.projectDot,
          ...(index === currentProjectIndex ? styles.projectDotActive : {})
        }}
        onClick={() => setCurrentProjectIndex(index)}
      />
    ))}
  </div>
</div>

      <div style={styles.contactSection}>
    <div style={styles.contactTitle}>
      <h2 style={styles.contactTitleText}>
        Get In Touch
      </h2>
    
    </div>
    
    <div style={styles.formContainer}>
      <form onSubmit={handleFormSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={styles.formInput}
            placeholder="Your Name"
            required
            onFocus={(e) => {
              e.target.style.borderColor = '#22d3ee';
              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={styles.formInput}
            placeholder="your.email@example.com"
            required
            onFocus={(e) => {
              e.target.style.borderColor = '#22d3ee';
              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            style={styles.formTextarea}
            placeholder="Tell me about your project..."
            required
            onFocus={(e) => {
              e.target.style.borderColor = '#22d3ee';
              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            ...styles.submitButton,
            ...(isSubmitting ? styles.submitButtonDisabled : {})
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 10px 20px rgba(34, 211, 238, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }
          }}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
        
        {submitStatus && (
          <div style={{
            ...styles.statusMessage,
            ...(submitStatus === 'success' ? styles.successMessage : styles.errorMessage)
          }}>
            {submitStatus === 'success' 
              ? '✓ Message sent successfully! I\'ll get back to you soon.'
              : '✗ Failed to send message. Please try again.'
            }
          </div>
        )}
      </form>
    </div>
  </div>

      {/* Chatbot Widget */}
      <div style={styles.chatWidget}>
        {/* Chat Label */}
        <div style={styles.chatLabel}>
          Know more about Satyam
        </div>
        
        {/* Chat Container */}
        <div style={styles.chatContainer}>
          {/* Chat Header */}
          <div style={styles.chatHeader}>
            <h3 style={styles.chatHeaderTitle}>Chat with Satyam</h3>
            <div style={styles.chatHeaderButtons}>
              <button 
                style={styles.chatHeaderButton}
                onClick={() => setIsChatOpen(false)}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={(e) => e.target.style.background = 'none'}
              >
                <X style={{width: '16px', height: '16px'}} />
              </button>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div style={styles.chatMessages}>
            {messages.length === 0 && (
              <div style={styles.emptyState}>
                Hi! I'm Satyam. Ask me anything about my work or experience! 👨‍💻
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={index}
                style={{
                  ...styles.messageRow,
                  ...(message.type === 'user' ? styles.userMessageRow : styles.botMessageRow)
                }}
              >
                <div
                  style={{
                    ...styles.message,
                    ...(message.type === 'user' ? styles.userMessage : styles.botMessage)
                  }}
                >
                  {message.type === 'bot' ? formatMessage(message.content) : message.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div style={styles.loadingDots}>
                <div style={styles.loadingMessage}>
                  <div style={styles.dotsContainer}>
                    <div style={styles.dot}></div>
                    <div style={{...styles.dot, ...styles.dot2}}></div>
                    <div style={{...styles.dot, ...styles.dot3}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div style={styles.chatInputContainer}>
            <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // Prevent newline
                sendMessage();
              }
            }}
  placeholder="Ask me anything..."
  style={styles.chatInput}
/>
            <button
              onClick={sendMessage}
              disabled={isLoading}
              style={{
                ...styles.chatSendButton,
                opacity: isLoading ? 0.6 : 1
              }}
              onMouseEnter={(e) => !isLoading && (e.target.style.transform = 'scale(1.1)')}
              onMouseLeave={(e) => !isLoading && (e.target.style.transform = 'scale(1)')}
            >
              <Send style={styles.chatSendIcon} />
            </button>
          </div>
        </div>
        
        {/* Toggle Button */}
        <button 
          style={styles.chatToggleButton}
          onClick={() => setIsChatOpen(!isChatOpen)}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          {isChatOpen ? 
            <X style={styles.chatToggleIcon} /> : 
            <MessageCircle style={styles.chatToggleIcon} />
          }
        </button>
      </div>
    </div>
  );
};

export default AnimatedPortfolio;