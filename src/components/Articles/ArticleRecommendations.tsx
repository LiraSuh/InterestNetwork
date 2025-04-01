import React from 'react';
import { Interest } from '../../types';
import './ArticleRecommendations.css';

interface Article {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  url: string;
  source: string;
  publishedDate: string;
  keywords: string[];
  relevanceScore: number;
}

interface ArticleRecommendationsProps {
  interests: Interest[];
}

export const ArticleRecommendations: React.FC<ArticleRecommendationsProps> = ({ interests }) => {
  // 샘플 기사 데이터 (실제로는 API를 통해 가져올 데이터)
  const sampleArticles: Article[] = [
    {
      id: '1',
      title: 'Recent Advances in Machine Learning Applications',
      authors: ['John Doe', 'Jane Smith'],
      abstract: 'This paper explores the latest developments in machine learning and their practical applications in various fields.',
      url: 'https://example.com/article1',
      source: 'Journal of Computer Science',
      publishedDate: '2024-03-15',
      keywords: ['machine learning', 'AI', 'deep learning', 'artificial intelligence'],
      relevanceScore: 0.95
    },
    {
      id: '2',
      title: 'Sustainable Energy Solutions for the Future',
      authors: ['Alice Johnson', 'Bob Wilson'],
      abstract: 'A comprehensive review of sustainable energy technologies and their potential impact on global energy consumption.',
      url: 'https://example.com/article2',
      source: 'Energy Research Journal',
      publishedDate: '2024-03-10',
      keywords: ['sustainable energy', 'renewable energy', 'climate change', 'green technology'],
      relevanceScore: 0.88
    },
    {
      id: '3',
      title: 'Quantum Computing: A New Era in Information Technology',
      authors: ['David Chen', 'Sarah Lee'],
      abstract: 'This research paper discusses the fundamental principles of quantum computing and its potential applications in cryptography and optimization problems.',
      url: 'https://example.com/article3',
      source: 'Quantum Computing Journal',
      publishedDate: '2024-03-05',
      keywords: ['quantum computing', 'quantum mechanics', 'cryptography', 'information technology'],
      relevanceScore: 0.92
    },
    {
      id: '4',
      title: 'The Impact of Climate Change on Marine Ecosystems',
      authors: ['Michael Brown', 'Emma Davis'],
      abstract: 'An in-depth analysis of how climate change affects marine biodiversity and ecosystem stability in different regions of the world.',
      url: 'https://example.com/article4',
      source: 'Marine Biology Research',
      publishedDate: '2024-03-01',
      keywords: ['climate change', 'marine biology', 'ecosystem', 'biodiversity'],
      relevanceScore: 0.85
    },
    {
      id: '5',
      title: 'Blockchain Technology in Healthcare',
      authors: ['Robert Wilson', 'Lisa Zhang'],
      abstract: 'Examining the potential applications of blockchain technology in healthcare data management and patient privacy protection.',
      url: 'https://example.com/article5',
      source: 'Healthcare Informatics Journal',
      publishedDate: '2024-02-28',
      keywords: ['blockchain', 'healthcare', 'data security', 'patient privacy'],
      relevanceScore: 0.87
    },
    {
      id: '6',
      title: 'Advances in CRISPR Gene Editing Technology',
      authors: ['Jennifer Park', 'Thomas Anderson'],
      abstract: 'A comprehensive review of recent developments in CRISPR technology and its applications in genetic engineering and disease treatment.',
      url: 'https://example.com/article6',
      source: 'Genetics Research',
      publishedDate: '2024-02-25',
      keywords: ['CRISPR', 'gene editing', 'genetics', 'biotechnology'],
      relevanceScore: 0.90
    },
    {
      id: '7',
      title: 'The Future of Autonomous Vehicles',
      authors: ['William Taylor', 'Sophia Chen'],
      abstract: 'Analysis of current trends and future prospects in autonomous vehicle technology, including safety considerations and regulatory challenges.',
      url: 'https://example.com/article7',
      source: 'Transportation Technology Review',
      publishedDate: '2024-02-20',
      keywords: ['autonomous vehicles', 'self-driving cars', 'transportation', 'AI'],
      relevanceScore: 0.83
    },
    {
      id: '8',
      title: 'Nanotechnology in Medicine',
      authors: ['Daniel Kim', 'Rachel Martinez'],
      abstract: 'Exploring the applications of nanotechnology in drug delivery, disease diagnosis, and tissue engineering.',
      url: 'https://example.com/article8',
      source: 'Nanomedicine Journal',
      publishedDate: '2024-02-15',
      keywords: ['nanotechnology', 'medicine', 'drug delivery', 'biomedical engineering'],
      relevanceScore: 0.89
    },
    {
      id: '9',
      title: 'The Role of Artificial Intelligence in Education',
      authors: ['Christopher Lee', 'Maria Garcia'],
      abstract: 'Investigating how AI technologies are transforming educational methods and improving learning outcomes.',
      url: 'https://example.com/article9',
      source: 'Educational Technology Review',
      publishedDate: '2024-02-10',
      keywords: ['artificial intelligence', 'education', 'learning technology', 'edtech'],
      relevanceScore: 0.86
    },
    {
      id: '10',
      title: 'Renewable Energy Storage Solutions',
      authors: ['James Wilson', 'Anna Thompson'],
      abstract: 'A detailed analysis of current and emerging technologies for storing renewable energy efficiently.',
      url: 'https://example.com/article10',
      source: 'Energy Storage Research',
      publishedDate: '2024-02-05',
      keywords: ['renewable energy', 'energy storage', 'battery technology', 'sustainability'],
      relevanceScore: 0.84
    }
  ];

  const getRelevantArticles = () => {
    if (!interests.length) {
      return sampleArticles;
    }

    const relevantArticles = sampleArticles
      .map(article => {
        const score = interests.reduce((acc, interest) => {
          const keywordMatch = article.keywords.some(keyword =>
            keyword.toLowerCase().includes(interest.name.toLowerCase())
          );
          return acc + (keywordMatch ? 1 : 0);
        }, 0) / interests.length;

        return {
          ...article,
          relevanceScore: score
        };
      })
      .filter(article => article.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);

    // 매칭되는 기사가 없으면 랜덤으로 5개 선택
    if (relevantArticles.length === 0) {
      const shuffled = [...sampleArticles].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 5).map(article => ({
        ...article,
        relevanceScore: 0
      }));
    }

    return relevantArticles;
  };

  const articles = getRelevantArticles();

  return (
    <div className="article-recommendations">
      <div className="article-header">
        <h2>Recommended Articles</h2>
        <p className="article-subtitle">
          {interests.length > 0
            ? articles[0]?.relevanceScore > 0
              ? 'Articles based on your interests'
              : 'Random articles you might find interesting'
            : 'Popular articles in your field'}
        </p>
      </div>

      <div className="article-grid">
        {articles.map(article => (
          <div key={article.id} className="article-card">
            <div className="article-content">
              <h3>{article.title}</h3>
              <p className="article-authors">
                {article.authors.join(', ')}
              </p>
              <p className="article-abstract">
                {article.abstract}
              </p>
              <div className="article-meta">
                <span className="article-source">{article.source}</span>
                <span className="article-date">{article.publishedDate}</span>
                {article.relevanceScore > 0 && (
                  <span className="relevance-score">
                    {Math.round(article.relevanceScore * 100)}% match
                  </span>
                )}
              </div>
              <div className="article-keywords">
                {article.keywords.map(keyword => (
                  <span key={keyword} className="keyword-tag">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="read-more-button"
            >
              Read Article
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}; 