import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedOpportunities from '@/components/FeaturedOpportunities';
import HowItWorks from '@/components/HowItWorks';
import WhyChooseUs from '@/components/WhyChooseUs';
import StatsAndPortal from '@/components/StatsAndPortal';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <section className="hero-section">
        <h1>About Our Social Work Platform</h1>
        <p className="tagline">Connecting Compassion with Action Since 2023</p>
      </section>

      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          We bridge the gap between dedicated social workers and communities in need through innovative 
          technology solutions. Our platform empowers professionals to find meaningful social work 
          opportunities while ensuring vulnerable populations receive the support they deserve.
        </p>
      </section>

      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="value-cards">
          <div className="value-card">
            <h3>Compassion First</h3>
            <p>Every connection starts with empathy and understanding</p>
          </div>
          <div className="value-card">
            <h3>Equitable Access</h3>
            <p>Equal opportunities for workers and recipients alike</p>
          </div>
          <div className="value-card">
            <h3>Sustainable Impact</h3>
            <p>Building long-term solutions through meaningful work</p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2>Our Approach</h2>
        <div className="approach-list">
          <ul>
            <li>✓ AI-powered matching between social workers and opportunities</li>
            <li>✓ Verified listings from trusted organizations</li>
            <li>✓ Support for both onsite and remote social work</li>
            <li>✓ Continuous education resources for professionals</li>
          </ul>
        </div>
      </section>

      <section className="cta-section">
        <h2>Join Our Movement</h2>
        <div className="cta-buttons">
          <a href="/jobs" className="cta-button">Browse Opportunities</a>
          <a href="/donate" className="cta-button">Support Our Mission</a>
          <a href="/hire-socialworker" className="cta-button">Request Assistance</a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;