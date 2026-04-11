import { useState, useRef, useEffect } from 'react';

function Chatbot({ onBack, userEmail }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I am FoodBot, your personal food assistant! I can help you find food, recommend dishes, tell you about promo codes and more. What are you craving today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponse = (message) => {
    const msg = message.toLowerCase();

    if (msg.includes('promo') || msg.includes('discount') || msg.includes('code') || msg.includes('offer')) {
      return 'Great news! We have amazing promo codes for you! Use FOOD50 for 50% off, HUNGRY20 for 20% off, NEWUSER for 30% off your first order, or REELS10 for 10% off. Just enter the code in your cart before checkout!';
    }

    if (msg.includes('burger')) {
      return 'We have 2 amazing burgers! The Whopper Burger from Burger King for Rs. 199 is our most popular! Or try the McChicken Burger from McDonalds for Rs. 179. Both are absolutely delicious! Want to order one?';
    }

    if (msg.includes('pizza')) {
      return 'Pizza lover! We have the classic Margherita Pizza from Pizza Hut for Rs. 299 and the spicy Chicken Pizza also from Pizza Hut for Rs. 349. Use promo code FOOD50 to get 50% off!';
    }

    if (msg.includes('chicken')) {
      return 'Chicken fan! Try the Crispy Chicken from KFC for Rs. 249 — it is our most ordered item! Or the McChicken Burger from McDonalds for Rs. 179. Both are finger licking good!';
    }

    if (msg.includes('pasta') || msg.includes('italian')) {
      return 'For pasta lovers we have the Pasta Italiana from Dominos for just Rs. 179! It is the most affordable item on our menu and absolutely delicious!';
    }

    if (msg.includes('sandwich') || msg.includes('veggie') || msg.includes('veg')) {
      return 'Looking for something healthy? Try the Veggie Sandwich from Subway for just Rs. 149! It is our cheapest and healthiest option. Perfect for a light meal!';
    }

    if (msg.includes('cheap') || msg.includes('affordable') || msg.includes('budget') || msg.includes('less')) {
      return 'Looking for budget friendly options? Here are our cheapest dishes! Veggie Sandwich from Subway for Rs. 149, Pasta Italiana from Dominos for Rs. 179, McChicken Burger from McDonalds for Rs. 179. Use REELS10 for extra 10% off!';
    }

    if (msg.includes('expensive') || msg.includes('best') || msg.includes('premium') || msg.includes('top')) {
      return 'Our premium picks are the Chicken Pizza from Pizza Hut for Rs. 349 and Margherita Pizza for Rs. 299. These are our highest rated dishes! Use FOOD50 to get 50% off!';
    }

    if (msg.includes('recommend') || msg.includes('suggest') || msg.includes('what should') || msg.includes('craving') || msg.includes('order')) {
      return 'Based on our most popular items I recommend the Whopper Burger from Burger King for Rs. 199! It is our number 1 bestseller. Or if you are really hungry try the Chicken Pizza from Pizza Hut for Rs. 349. Use FOOD50 for 50% off!';
    }

    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return 'Hello! Welcome to FoodReels! I am FoodBot and I am here to help you find the perfect meal. Are you hungry? Tell me what you are craving and I will find the best option for you!';
    }

    if (msg.includes('thank') || msg.includes('thanks')) {
      return 'You are welcome! Enjoy your meal! Do not forget to use our promo codes for amazing discounts. Come back anytime you are hungry!';
    }

    if (msg.includes('how') && msg.includes('order')) {
      return 'Ordering is super easy! Just scroll through the Feed page, find something you like, tap Add to Cart, go to Cart and place your order. You can also use a promo code for discount!';
    }

    if (msg.includes('track') || msg.includes('status') || msg.includes('delivery')) {
      return 'You can track your order by clicking the Orders tab at the bottom of the screen. It shows the real time status of your order from New to Preparing to Out for Delivery to Delivered!';
    }

    if (msg.includes('restaurant')) {
      return 'We have amazing restaurants on FoodReels! Burger King, Pizza Hut, KFC, Dominos, Subway and McDonalds. Click on any restaurant name in the Feed to see all their dishes!';
    }

    if (msg.includes('menu') || msg.includes('food') || msg.includes('eat')) {
      return 'Here is our full menu! Whopper Burger Rs.199, Margherita Pizza Rs.299, Crispy Chicken Rs.249, Pasta Italiana Rs.179, Veggie Sandwich Rs.149, McChicken Burger Rs.179, Chicken Pizza Rs.349. What looks good to you?';
    }

    return 'That is a great question! I am here to help you with food recommendations, promo codes and order tracking. Try asking me things like What should I order today or Do you have any discounts or What is the cheapest option!';
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const reply = getResponse(userMessage);
    setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const quickQuestions = [
    'What should I order?',
    'Any promo codes?',
    'Best burger?',
    'Cheapest option?'
  ];

  return (
    <div className="fade-in" style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <div style={{
        position: 'sticky',
        top: 0,
        backgroundColor: '#0a0a0a',
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #1a1a1a',
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={onBack} style={{
            backgroundColor: '#1a1a1a',
            color: 'white',
            border: '1px solid #2a2a2a',
            padding: '8px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '13px'
          }}>Back</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#e85d04',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              color: 'white',
              fontWeight: 'bold'
            }}>F</div>
            <div>
              <p style={{ color: 'white', fontWeight: 'bold', margin: 0, fontSize: '15px' }}>FoodBot</p>
              <p style={{ color: '#2ecc71', margin: 0, fontSize: '11px' }}>Online</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        flex: 1,
        padding: '16px',
        overflowY: 'auto',
        paddingBottom: '160px'
      }}>
        {messages.map((msg, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            marginBottom: '12px'
          }}>
            {msg.role === 'assistant' && (
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#e85d04',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                color: 'white',
                fontWeight: 'bold',
                marginRight: '8px',
                flexShrink: 0,
                alignSelf: 'flex-end'
              }}>F</div>
            )}
            <div style={{
              maxWidth: '75%',
              padding: '12px 16px',
              borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
              backgroundColor: msg.role === 'user' ? '#e85d04' : '#1a1a1a',
              border: msg.role === 'user' ? 'none' : '1px solid #2a2a2a',
              color: 'white',
              fontSize: '14px',
              lineHeight: '1.5'
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#e85d04',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              color: 'white',
              fontWeight: 'bold',
              marginRight: '8px',
              flexShrink: 0
            }}>F</div>
            <div style={{
              padding: '12px 16px',
              borderRadius: '20px 20px 20px 4px',
              backgroundColor: '#1a1a1a',
              border: '1px solid #2a2a2a'
            }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <div className="pulse" style={{ width: '8px', height: '8px', backgroundColor: '#888', borderRadius: '50%' }}></div>
                <div className="pulse" style={{ width: '8px', height: '8px', backgroundColor: '#888', borderRadius: '50%', animationDelay: '0.2s' }}></div>
                <div className="pulse" style={{ width: '8px', height: '8px', backgroundColor: '#888', borderRadius: '50%', animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={{
        position: 'fixed',
        bottom: '70px',
        left: 0,
        right: 0,
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid #1a1a1a',
        padding: '12px 16px'
      }}>
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '10px',
          overflowX: 'auto'
        }}>
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => setInput(q)}
              style={{
                backgroundColor: '#1a1a1a',
                color: '#888',
                border: '1px solid #2a2a2a',
                padding: '6px 14px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '12px',
                whiteSpace: 'nowrap'
              }}>{q}</button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            placeholder="Ask FoodBot anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '24px',
              border: '1px solid #2a2a2a',
              backgroundColor: '#1a1a1a',
              color: 'white',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <button
            onClick={sendMessage}
            style={{
              backgroundColor: '#e85d04',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '24px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;