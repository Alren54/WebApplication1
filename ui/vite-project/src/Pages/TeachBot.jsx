import React, { useEffect, useRef, useState } from "react";
import Logger from '../Utils/Logger'

export default function TeachBot() {
  Logger.log('TeachBot component initialized');
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getTitle = async (messages) => {
    const prompt = messages.map(msg => msg.text).join(' ');
    try {
      const res = await fetch('http://backend:5000/api/OpenAI/GenerateText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: `Generate a max 3-4 word title for the following conversation: ${prompt}` })
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Something went wrong');
      }

      const data = await res.json();
      return data.response;
    } catch (error) {
      console.error('Error generating title:', error);
      return 'Title not available';
    }
  };

  useEffect(() => {
    if (conversations.length === 0) {
      handleNewConversation();
    }
  }, []);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() !== '' && activeConversation !== null) {
      const newMessage = { text: message, sender: 'main' };
      const updatedConversations = conversations.map((conv, index) => {
        if (index === activeConversation) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage]
          };
        }
        return conv;
      });
      setConversations(updatedConversations);
      Logger.log(`A new message "${message}" sent in the 'Yeni Konuşma ${activeConversation + 1}' chat.`);
      setMessage('');

      // Send message to API
      await sendToAPI(message, activeConversation);
    }
  };

  const sendToAPI = async (inputMessage, convIndex) => {
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://backend:5000/api/OpenAI/GenerateText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: inputMessage })
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Something went wrong');
      }

      const data = await res.json();
      const updatedConversations = conversations.map((conv, index) => {
        if (index === convIndex) {
          return {
            ...conv,
            messages: [...conv.messages, { text: inputMessage, sender: 'main' }, { text: data.response, sender: 'bot' }]
          };
        }
        return conv;
      });

      // Generate title for the conversation
      const title = await getTitle(updatedConversations[convIndex].messages);
      updatedConversations[convIndex].title = title;

      setConversations(updatedConversations);
    } catch (error) {
      setError('Error fetching data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewConversation = () => {
    const newConversation = { id: conversations.length, messages: [], title: '' };
    setConversations([...conversations, newConversation]);
    setActiveConversation(conversations.length);
    Logger.log(`A new chat opened. 'Yeni Konuşma ${conversations.length + 1}'`);
  };

  const handleDeleteConversation = (id) => {
    const updatedConversations = conversations.filter(conv => conv.id !== id).map((conv, index) => ({
      ...conv,
      id: index
    }));
    setConversations(updatedConversations);
    Logger.log(`A chat deleted. 'Yeni Konuşma ${id + 1}'`);

    if (updatedConversations.length === 0) {
      setActiveConversation(null);
    } else if (activeConversation === id) {
      setActiveConversation(0);
    } else {
      setActiveConversation(updatedConversations.findIndex(conv => conv.id === activeConversation));
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversations, activeConversation]);

  return (
    <div style={{ top: "70px" }} className="container-fluid">
      <div className="row">
        <div className="col-md-3" style={{ backgroundColor: "#ABE0F7", position: "fixed", height: "calc(95vh - 70px)", overflowY: "scroll" }}>
          <h3 style={{ textAlign: "center", backgroundColor: "White", borderRadius: '15px', marginTop: "10px" }}>Finansal Okur-Yazarlık Danışmanı</h3>
          <hr />
          <button className="btn btn-primary" onClick={handleNewConversation} style={{ backgroundColor: "#000581", color: "white" }}>Yeni Konuşma</button>
          <div>
            {conversations.map((conv) => (
              <div
                onClick={() => setActiveConversation(conv.id)}
                key={conv.id}
                style={{
                  cursor: 'pointer',
                  marginTop: '10px',
                  padding: '10px',
                  backgroundColor: activeConversation === conv.id ? '#7334FF' : 'white',
                  color: activeConversation === conv.id ? 'white' : 'black',
                  borderRadius: '10px',
                  position: 'relative'
                }}
              >
                <span style={{ width: "80%" }}>{conv.title || `Yeni Konuşma`}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteConversation(conv.id);
                  }}
                  style={{ width: "20%", position: 'absolute', right: '10px', top: '5px', backgroundColor: activeConversation === conv.id ? 'white' : 'red', color: activeConversation === conv.id ? 'black' : 'white' }}
                  className="btn btn-danger btn-sm"
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="container" style={{ backgroundColor: "#E6F5FB", padding: "0 230px 0 270px" }}>
          <div className="col-md-9 offset-md-3" style={{ backgroundColor: "white", height: "calc(95vh - 70px)", borderLeft: "2px solid #C6EEFF", borderRight: "2px solid #C6EEFF", display: "flex", flexDirection: "column" }}>
            <h3 style={{ textAlign: "center", backgroundColor: "white", borderRadius: '15px', marginTop: "0px" }}>TeachBot </h3>
            <hr />
            <div style={{ flex: 1, overflowY: "auto" }}>
              {activeConversation !== null && conversations[activeConversation] && (
                <div style={{ width: "100%" }} className="container">
                  {conversations[activeConversation].messages.map((msg, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                        justifyContent: msg.sender === 'main' ? 'flex-end' : 'flex-start'
                      }}
                    >
                      <p
                        style={{
                          padding: "10px",
                          borderRadius: '10px',
                          backgroundColor: msg.sender === 'main' ? "#C6EEFF" : "#ABE0F7",
                          maxWidth: "70%",
                          boxShadow: "0px 4px 8px rgba(0, 5, 129, 0.6)"
                        }}
                        className="card"
                      >
                        {msg.text}
                      </p>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
              {loading && <p>Loading...</p>}
            </div>
            {error && <p style={{ color: 'red' }}>Hata: {error}</p>}
            <div style={{ padding: "10px", backgroundColor: "white" }}>
              <form onSubmit={handleMessageSubmit} className="">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mesajınızı yazın..."
                    value={message}
                    onChange={handleInputChange}
                    style={{ backgroundColor: "Whitesmoke", color: "", borderRadius: '80px' }}
                    disabled={activeConversation === null}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#000581", color: "white", borderRadius: '80px' }}
                    disabled={activeConversation === null}
                  >
                    Gönder
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
