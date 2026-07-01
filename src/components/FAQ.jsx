import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ_ITEMS = [
  {
    id: 1,
    question: 'What types of properties do you sell?',
    answer: `We specialize in residential, commercial, and luxury properties, offering a wide range of options to suit every buyer's needs and preferences. We connect you with trusted lenders offering competitive mortgage options and financial advice. We arrange private showings for you to visit and evaluate properties before making a decision. Properties range across different price points, catering to various budgets and investment goals.`,
    image: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    question: 'How do I know if a property is a good investment?',
    answer: `We analyze market trends, location potential, rental yield, and appreciation history to help you evaluate each property. Our experts provide detailed investment reports so you can make confident, informed decisions aligned with your financial goals.`,
    image: null,
  },
  {
    id: 3,
    question: 'Do I need to hire a real estate agent?',
    answer: `While not mandatory, working with a qualified real estate agent provides significant advantages — including access to off-market listings, expert negotiation skills, and end-to-end transaction support. Our licensed agents handle all the paperwork so you can focus on finding your perfect home.`,
    image: null,
  },
  {
    id: 4,
    question: "What's the process for buying a property?",
    answer: `The buying process typically involves: defining your budget, getting pre-approved for a mortgage, shortlisting properties, scheduling viewings, making an offer, conducting due diligence, and finally closing the deal. Our team guides you through every step seamlessly.`,
    image: null,
  },
  {
    id: 5,
    question: 'Can I tour a property before purchasing?',
    answer: `Absolutely. We offer in-person tours, private showings, and virtual walkthroughs at your convenience. Simply reach out to our team and we'll coordinate a suitable time for you to visit any listing.`,
    image: null,
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState(1); // First item open by default

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-inner">

        {/* Section Header — two columns */}
        <div className="faq-header">
          <h2 className="faq-title">Frequently asked<br />questions</h2>
          <p className="faq-header-desc">
            Our experts guide you in making informed investment decisions based on market insights.
            We offer residential, commercial, and luxury properties tailored to different preferences and budgets.
          </p>
        </div>

        {/* Accordion */}
        <div className="faq-list">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
                <button className="faq-question" onClick={() => toggle(item.id)} aria-expanded={isOpen}>
                  <span className="faq-question-text">{item.question}</span>
                  <ChevronDown size={18} className={`faq-chevron${isOpen ? ' faq-chevron--open' : ''}`} />
                </button>

                <div className={`faq-answer-wrapper${isOpen ? ' faq-answer-wrapper--open' : ''}`}>
                  <div className="faq-answer-row">
                    <p className="faq-answer-text">{item.answer}</p>
                    {item.image && (
                      <div className="faq-answer-img-wrapper">
                        <img src={item.image} alt="Property interior" className="faq-answer-img" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
