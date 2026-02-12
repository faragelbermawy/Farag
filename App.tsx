
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import LearningModule from './components/LearningModule';
import Quiz from './components/Quiz';
import AIAssistant from './components/AIAssistant';
import Reminders from './components/Reminders';
import VisitorRegistry from './components/VisitorRegistry';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/learning" element={<Dashboard />} />
          <Route path="/learning/:id" element={<LearningModule />} />
          <Route path="/quiz/:moduleId" element={<Quiz />} />
          <Route path="/assistant" element={<AIAssistant />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/registry" element={<VisitorRegistry />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
