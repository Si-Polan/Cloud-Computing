// articlesController.js
const articlesController = {
    listArticles: async (req, res) => {
      try {
        // Implement logic to fetch articles from the database
        // You may use models and queries depending on your setup
  
        // Sample response for demonstration purposes
        const articles = [
          {
            id: 1,
            title: 'Article Title 1',
            category: 'news',
            tags: ['security'],
            content: 'isi kontennya ya...',
            published_at: 'datetime',
          },
          {
            id: 2,
            title: 'Article Title 2',
            category: 'cars',
            tags: ['finance'],
            content: 'isi kontennya yaaa...',
            published_at: 'datetime',
          },
          // Add more articles as needed
        ];
  
        const response = {
          articles,
          total: articles.length,
          page: 1,
          limit: 10,
        };
  
        res.json(response);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
  
    shareArticle: async (req, res) => {
      try {
        const { articleId, platform } = req.body;
  
        // Implement logic to share the article
        // You may use models and queries depending on your setup
  
        // Sample response for demonstration purposes
        const shareUrl = `https://example.com/articles/${articleId}/share/${platform}`;
  
        res.json({
          code: '200',
          status: 'OK',
          message: 'Article shared successfully',
          data: { shareUrl },
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
  };
  
  module.exports = articlesController;
  