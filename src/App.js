import React, { useState, useEffect } from 'react';
import { Plug, MessageCircle, X, Minimize2 } from 'lucide-react';

import { Send, Code, Palette, Database, Globe, Smartphone, Cpu } from 'lucide-react';

const AnimatedPortfolio = () => {
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const texts = [
    'Python Developer',
    'AI/ML Developer', 
    'Data Scientist'
  ];

  const iconStyle = {
    width: '24px',
    height: '24px',
  };

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

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = { type: 'user', content: inputMessage };
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8002/api/v1/qns-ans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ query: inputMessage }),
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
      height: '100vh',
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
      bottom: '70px',
      right: '0',
      width: '350px',
      height: '500px',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
      transform: isChatOpen ? 'scale(1) translateY(0)' : 'scale(0) translateY(20px)',
      transformOrigin: 'bottom right',
      transition: 'all 0.3s ease',
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
      margin: 0
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
      padding: '15px',
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
    }
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
  `;

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>
      
      {/* Hero Section */}
      <div style={styles.heroSection}>
        {/* Animated Background */}
        <div style={{...styles.backgroundBlob, ...styles.blob1}}></div>
        <div style={{...styles.backgroundBlob, ...styles.blob2}}></div>
        <div style={{...styles.backgroundBlob, ...styles.blob3}}></div>

        {/* Left Side - Text Animation */}
        <div style={styles.leftSection}>
          <h1 style={styles.mainTitle}>Hello!</h1>
          <div style={styles.typewriterContainer}>
            You can call me a
            <span style={styles.typewriterText}>
              {currentText}
            </span>
          </div>
          <p style={{ ...styles.description, marginTop: '30px' }}>
            Keep it simple.
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